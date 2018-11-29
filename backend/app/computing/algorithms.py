import pandas as pd
import numpy as np
import sys
from nltk.corpus import wordnet as wn


Data=pd.read_csv("/Users/Ammallan/Desktop/PFE/Planificateur-intelligent/backend/app/computing/Data.csv", sep=',',na_values='NULL',engine='python')
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

def get_best_places(tags,activity_type,nbActivities):
    ### calculer les scores pour tous les lieux :
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

