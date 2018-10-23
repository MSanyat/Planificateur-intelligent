#!/usr/bin/env python
# coding: utf-8


###############################################################################
# Fichier contenant les fonction de planification
# Par Arnaud Duhamel et Robin Cavalieri
# Planificateur intelligent
# SOLUTEC Paris
# juin 2018
###############################################################################


###############################################################################
# LIBRAIRIES
###############################################################################
from flask_bootstrap import Bootstrap
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_mongoengine import MongoEngine, Document
import pymongo as pm
import computing.computing as cp
import computing.plan as pl
import computing.schedule as sc
from classes.graphnode import *
from flask import Flask, request, jsonify
import jwt
import datetime
import configparser
###############################################################################


###############################################################################
# App config.
###############################################################################
DEBUG = True
"""
app = Flask(__name__)
app.config.from_object(__name__)
cfg = configparser.ConfigParser()
cfg.read('conf.cfg')
user = cfg.get('DB', 'user')
password = cfg.get('DB', 'password')
app.config['MONGODB_SETTINGS'] = {'host': 'mongodb://localhost:27017/smartplanner_users'}
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'
"""
###############################################################################


###############################################################################
# DATABASE
###############################################################################
login_manager = LoginManager()
app = Flask(__name__)
app.config.from_object(__name__)
cfg = configparser.ConfigParser()
cfg.read('conf.cfg')
user = cfg.get('DB', 'user')
password = cfg.get('DB', 'password')
app.config['MONGODB_SETTINGS'] = {'host': 'mongodb://localhost:27017/smartplanner_users'}
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'
login_manager.init_app(app)
login_manager.login_view = 'login'
bootstrap = Bootstrap(app)
datas = cp.init_matrix()
SESSION_TYPE = "mongodb"
mongo = pm.MongoClient()
db = MongoEngine(app)
###############################################################################

###############################################################################
class User(UserMixin, db.Document):
    email = db.EmailField(max_length=30)
    password = db.StringField(max_length=100)
    nom = db.StringField(max_length=30)
    prenom = db.StringField(max_length=30)
    rue = db.StringField(max_length=30)
    cp = db.StringField(max_length=30)
    ville = db.StringField(max_length=30)
    tags = db.StringField(max_length=30)


def encodeAuthToken(user_id, groups=[]):
    try:
        admin = True if 'admin' in groups else False
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=60),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'admin': admin
        }
        token = jwt.encode(payload, 'super-secret-key', algorithm='HS256')
        token=token.decode('utf-8')
        return token
    except Exception as e:
        print(e)
        return e


@login_manager.user_loader
def load_user(user_id):
    return User.objects(pk=user_id).first()

@app.route('/auth/welcome', methods=['POST'])
def welcome():
    phrase = request.form['phrase']
    print(phrase)
    if phrase == 'root':
        return jsonify({
            'message':'Bienvenue'
        })
    else:
        return jsonify({
            'message':'Error'
        })

###############################################################################
# ROUTES
###############################################################################
# Page de login
@app.route('/auth/login', methods=['POST'])
def login():
    email=request.form['email']
    password=request.form['mdp']
    print(email)
    print(password)
    try:
        check_user = User.objects(email=email).first()
        if check_user:
            if check_password_hash(check_user['password'], password):
                token = encodeAuthToken(email)
                login_user(check_user)
        return jsonify(result={
            'status': 'Success',
            'auth_token': str(token)
        })
    except Exception as e:
        return jsonify({
            'status': 'Failure',
            'error': 'echec de l\'authentification',
            'type': str(type(e))
        })
###############################################################################
# Page de registering
@app.route('/auth/register', methods=['POST'])
def register():
    email=request.form['email']
    password=request.form['mdp']
    print(email + password + request.form['nom'] + request.form['prenom'] + request.form['rue'] + request.form['cp'] + request.form['ville'] + request.form['tags'])
    existing_user = User.objects(email=email).first()
    if existing_user is None:
        pwd = generate_password_hash(password, method='sha256')
        new = User(email=email,
                   password=pwd,
                   nom=request.form['nom'],
                   prenom=request.form['prenom'],
                   rue=request.form['rue'],
                   cp=request.form['cp'],
                   ville=request.form['ville'],
                   tags=request.form['tags']).save()
        token = encodeAuthToken(new.email)
        login_user(new)
        return jsonify({
            'status': 'Success',
            'auth_token': str(token)
        })
    else:
        error = "Compte existant"
        return jsonify({
            'status': 'Failure',
            'error': error
        })
###############################################################################
@app.route('/auth/form', methods=['GET'])
#@login_required
def form():
    start = Node(1000, 0, None, 0, 0)
    target = Node(10000, 0, None, 0, 0)
    add_dep = request.args.get('add_dep')
    add_arr = request.args.get('add_arr')
    escales = request.args.getlist('escales')
    tags = request.args.getlist('tags')
    max_escales = int(request.args.get('max_escales'))
    optimisation = request.args.get('optimisation')
    mode = request.args.get('mode')
    h_dep = request.args.get('h_dep')
    j_dep = request.args.get('j_dep')
    h_arr = request.args.get('h_arr')
    j_arr = request.args.get('j_arr')
    t_max = int(request.args.get('t_max'))
    d_max = int(request.args.get('d_max'))
    overallScore = cp.get_classement(datas[2], tags, datas[1], datas[3], datas[0])[0]
    print('avant dtfr')
    dtfr = cp.get_graph_matrix(add_dep, add_arr, escales, mode, overallScore)
    print('avant if')
    if (optimisation == 'distance'):
        df_filtered = dtfr.loc[(dtfr['distance'] < d_max)]
    elif (optimisation == 'time'):
        df_filtered = dtfr.loc[dtfr['time'] < t_max]
    elif (optimisation == 'affinity'):
        df_filtered = dtfr.loc[(dtfr['distance'] < d_max)]
    print("PRINT!")
    print(df_filtered)
    test = pl.get_path(start, target, dtfr, overallScore, optimisation, df_filtered, datas[0], add_dep, add_arr, escales)
    try:
        trajet_id=test[1]
    except :
        return jsonify({'error': 'aucun trajet disponible'})
    trajet_donnees=test[0]
    time = sc.schedule_str(h_dep, h_arr, dtfr, trajet_id)
    #Création du JSON contenant tout le trajet
    temp=[]
    for i in range(0, len(time)):
        temp.append({'id': int(trajet_id[i]), 'ville': trajet_donnees[i][0], 'note': float(trajet_donnees[i][1]), 'temps': time[i]})
    return jsonify({'steps': temp})
###############################################################################
@app.route('/auth/profile', methods=['POST'])
@login_required
def profile():
        email=request.form.get('email')
        password=request.form.get('password')
        nom=request.form.get('nom')
        prenom=request.form.get('prenom')
        rue=request.form.get('rue')
        cp=request.form.get('cp')
        ville=request.form.get('ville')
        tags=request.form.getlist('tags')
        if check_password_hash(current_user.password, password):
            current_user.email=email
            current_user.nom = nom
            current_user.prenom = prenom
            current_user.rue = rue
            current_user.cp = cp
            current_user.ville = ville
            current_user.tags = tags
            current_user.save()
            return jsonify({
                'status': 'Success'
            })
        else:
            error="Mot de passe invalide"
            return jsonify({
                'status': 'Failure',
                'error': error
            })
###############################################################################
@app.route('/auth/get_profile', methods=['GET'])
@login_required
def get_profile():
    return jsonify({
        'email':current_user.email,
        'nom':current_user.nom,
        'prenom':current_user.prenom,
        'tags':current_user.tags,
        'rue':current_user.rue,
        'ville':current_user.ville,
        'cp':current_user.cp
    })
###############################################################################
@app.route('/auth/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({
        'status':'Logout'
    })
###############################################################################
# MAIN
###############################################################################
if __name__ == "__main__":
    app.run(host='0.0.0.0')
###############################################################################