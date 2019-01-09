import pandas as pd
import numpy as np
import sys
from nltk.corpus import wordnet as wn
import datetime
from datetime import timedelta
import json
from urllib.request import urlopen
import os, ssl
#from datetime import date


Data=pd.read_csv("/Users/thomashuang/Desktop/5A/PFE/Planificateur-intelligent/backend/app/computing/Data.csv", sep=',',na_values='NULL',engine='python')
def get_similarity(str1,str2):
    try:
        word1=wn.synsets(str1)[0]
        word2=wn.synsets(str2)[0]
        s=word1.wup_similarity(word2)
    except IndexError:
        s=0.0
    return(s)

def place_score(tags,activity_type,place_id):
    s=[]
    place_subcat = Data.loc[Data['id'] == place_id, 'subCategory'].iloc[0]
    for i in range(len(tags)):
        similarity=get_similarity(tags[i],place_subcat)
        s.append(similarity)
    similarity =  max(s)
    checkins = Data.loc[Data['id'] == place_id, 'checkinsCount'].iloc[0]/Data['checkinsCount'].max()
    users = Data.loc[Data['id'] == place_id, 'usersCount'].iloc[0]/Data['usersCount'].max()
    global ScoreCategory
    if activity_type == "Solo":
        ScoreCategory=Data.loc[Data['id'] == place_id, 'Solo'].iloc[0]/2
        
    if activity_type == "Famille":
        ScoreCategory=Data.loc[Data['id'] == place_id, 'Famille'].iloc[0]/2
        
    if activity_type == "Couple":
        ScoreCategory=Data.loc[Data['id'] == place_id, 'Couple'].iloc[0]/2
        
    if activity_type == "Entre amis":
        ScoreCategory=Data.loc[Data['id'] == place_id, 'Entre amis'].iloc[0]/2
        
    if activity_type == "Entre collègues":
        ScoreCategory=Data.loc[Data['id'] == place_id, 'Entre collègues'].iloc[0]/2
    
    final_score = 4*similarity + 1.5*checkins + 2*users 
    return final_score

def get_best_places(tags,activity_type,nbActivities):#, j_arr, j_dep):
    ### calculer les scores pour tous les lieux :
    #nbdays = (j_arr - j_dep).days
    #diff_days = nbdays*nbActivities
    scores = []
    for i in range(Data.shape[0]):
        id = Data['id'].iloc[i]
        score = place_score(tags,activity_type,id)
        scores.append(score)
    #print(scores)
    scores_copy = scores[:]
    ### classer les lieux par notes décroissantes
    indices = np.argsort(scores) 
    scores.sort(reverse=True)
    print(scores[:nbActivities])
    selected_id = []
    ### récupérer les id des places sélectionnées
    for index in indices[-nbActivities:]:
        selected_id.append(Data['id'].iloc[index])   
    return selected_id

def get_places_info(selected_id):
    result=[]
    for i in selected_id:
        result.append({'id': int(i), 'nom': Data.loc[Data['id'] == i, 'name'].iloc[0], 'Categorie':Data.loc[Data['id'] == i, 'subCategory'].iloc[0] })
    return result

#test=get_best_places(['Culture'],'Famille',5)
#print(test)
#test1=get_places_info(test)
#print(test1)


acti = Data[0:100]
acti = acti[['name','lat','lng','id']]
print(acti)

def get_position(ids):
    position = []
    for id in ids:
        position.append({'id':id, 'name': Data.loc[Data['id'] == id, 'name'].iloc[0], 'lat':Data.loc[Data['id'] == id, 'lat'].iloc[0],'long':Data.loc[Data['id'] == id, 'lng'].iloc[0]})
    return(position)   

def calc_time(latA,lngA,latB,lngB):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+str(latA)+","+str(lngA)+"&destinations="+str(latB)+","+str(lngB)+"&language=fr&transit_mode=subway&key=AIzaSyB8pxsl2jFQSwshMT2I5Weue8CKLgxalY8"
    data = json.load(urlopen(url))
    time = data["rows"][0]["elements"][0]["duration"]["value"]
    return time

def next_activities(latA,lngA,lat,lng,ids):
    res = []
    for (latB,lngB,id) in zip(lat,lng,ids):
        time = calc_time(latA,lngA,latB,lngB)
        res.append({'id':id,'time':time})
    time = [d['time'] for d in res ]
    id = [d['id'] for d in res ]
    final_indice = np.argsort(time)[0]
    return {'id':id[final_indice],'time':time[final_indice],'lat':lat[final_indice],'lng':lng[final_indice]}

def planning(positions,nbActivities,dateDebut,dateFin):
    diff_days = (dateFin - dateDebut).days
    act_duration = int(10/nbActivities)
    lat = [d['lat'] for d in positions ] 
    lng = [d['long'] for d in positions ]
    ids = [d['id'] for d in positions ]
    lat_init = lat[0]
    lng_init = lng[0]
    res = [{'id':ids[0],'date':dateDebut,'ordre':0,'time':0}]
    lng = lng[1:]
    lat = lat[1:]
    ids = ids[1:]
    print(res)
    ## calcul de l'edt
    k=0
    for i in range(diff_days):
        for j in range(1,nbActivities):
            next = next_activities(lat_init,lng_init,lat,lng,ids)
            #print(next)
            res.append({'id':next['id'], 'date':dateDebut+timedelta(days = i),'ordre':j,'time':next['time']})
            lat_init = next['lat']
            lng_init = next['lng']
            ids.remove(next['id'])
            lat.remove(next['lat'])
            lng.remove(next['lng'])
        ##print("i = ",i)
        ##print("j = ",j)
        ##print(lat)
        if  i !=diff_days-1:  
            lat_init = lat[0]
            lng_init = lng[0]
            res.append({'id':ids[0],'date':dateDebut+timedelta(days = i+1),'ordre':0,'time':0})
            lng = lng[1:]
            lat = lat[1:]
            ids = ids[1:]
        k = k + 1
    return res

def timing(res,nbActivities,nbDays):
    tps_trans = []
    ordre_acti = []
    
    for i in range(nbDays):
        time_total = 0
        for j in range(nbActivities):
            time_total = time_total + res[nbActivities*i+j]['time']
        tps_trans.append(time_total)
    
    hours = [36000 - time for time in tps_trans]  
    hours_per_acti = [int(hour/nbActivities) for hour in hours]
    
    for i in range(nbDays):
        actu_date = datetime.datetime(res[nbActivities*i]['date'].year, res[nbActivities*i]['date'].month, res[nbActivities*i]['date'].day, 8, 0)
        ##print(actu_date)
        temp=1
        for j in range(nbActivities):
            ordre_acti.append({'id':res[nbActivities*i+j]['id'], 
                               'name':Data.loc[Data['id'] == res[nbActivities*i+j]['id'], 'name'].iloc[0], 
                               'startDateTime':actu_date,
                               'endDateTime':actu_date+timedelta(seconds=hours_per_acti[i])})
            actu_date = actu_date+timedelta(seconds=hours_per_acti[i])+timedelta(seconds=res[nbActivities*i+j]['time'])
            
            if temp==1:
                actu_date = actu_date+timedelta(hours=1)
                temp=2
    return ordre_acti

