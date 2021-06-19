import MySQLdb
import json
import collections
from pymongo import MongoClient

# Connexió a la base de dades
db = MySQLdb.connect(host="147.83.250.104",
                     user="xarxasocial",
                     passwd="toh4ib9zoGaic3aiph",
                     db="xarxasocial",
                     charset="utf8")
cur = db.cursor()

# Petició CentreUniversitaris: 
cur.execute("SELECT nom_catala,sigles,poblacio FROM vw_unitats_estructurals_340 WHERE sigles = 'EPSEVG';")

objects_list = []
for row in cur.fetchall():
    c=collections.OrderedDict()
    c["nomComplet"]=row[0]
    c["nomSigles"]=row[1]
    c["localitzacio"]=row[2]
    objects_list.append(c)

centre = json.dumps(objects_list)
f = open("./scripts/centreData.json","w+")
f.write(centre)

# Petició Graus:
cur.execute("SELECT nom, credits_totals FROM vw_programes_340 WHERE CENTRE = 340 AND nivell = 08 AND estat_programa = 'Implantat';")

objects_list = []
for row in cur.fetchall():
    g=collections.OrderedDict()
    g["nom"]=row[0]
    g["credits"]=row[1]
    g["centreUniversitariID"]="EPSEVG"
    objects_list.append(g)

grau = json.dumps(objects_list)
f = open("./scripts/grauData.json","w+")
f.write(grau)


# Petició Assignaturas:
cur.execute("SELECT ass.nom, ass.sigles_ud, ass.nivell, ass.credits, ass.tipus, GROUP_CONCAT(DISTINCT pers.email order by pers.email SEPARATOR '; '), gr.nom FROM (((vw_unitats_docents_pro_340 ass INNER JOIN vw_programes_340 gr ON gr.codi_programa = ass.codi_programa AND estat_programa = 'Implantat' AND gr.nivell = 08) INNER JOIN vw_professor_ud_grup_340 prof ON ass.codi_upc_ud = prof.codi_upc_ud AND prof.curs = 2020) INNER JOIN vw_persones_340 pers ON prof.codi_persona = pers.codi_persona AND pers.email != '') group by ass.nom, gr.nom order by ass.nom, gr.nom;")

objects_list_assig = []
objects_list_xatAssig = []
for row in cur.fetchall():
    a=collections.OrderedDict()
    b=collections.OrderedDict()
    if (len(row[1]) != 6):
        a["nomComplet"]=row[0]
        b["assignaturaID"]=row[0]
        b["grauID"]=row[6]
        b["guiaDocent"]="-"
        a["nomSigles"]=row[1].split('-')[0]
        a["quadrimestre"]=row[2]
        a["credits"]=row[3]
        a["tipus"]=row[4]
        a["mailProfessor"]=row[5].split("; ")
        b["mailProfessor"]=row[5].split("; ")
        a["grauID"]=row[6]
        a["xatAssignaturaID"]=""
        a["LlistaEstudiants"]=[]
        b["delegatID"]="-"
        b["titol"]=row[1].split('-')[0]
        b["descripcio"]="Aquest xat és el xat oficial de l'assignatura de " + row[0] + "."
        b["imatge"]="-"
        b["ultimMissatgeID"]="-"
        objects_list_assig.append(a)
        objects_list_xatAssig.append(b)

assig = json.dumps(objects_list_assig)
xatAssig = json.dumps(objects_list_xatAssig)
f = open("./scripts/assigData.json","w+")
f.write(assig)
x = open("./scripts/xatAssigData.json","w+")
x.write(xatAssig)

# Petició Xats Assignatura

db.close()

try:
    conn = MongoClient("mongodb://localhost:27017/OnCampus")
    print("Connected successfully!!!")
except:  
    print("Could not connect to MongoDB")
db = conn.OnCampus
centreCol = db.centreuniversitaris
centreCol.insert_many(json.load(open('./scripts/centreData.json')))
grauCol = db.graus
grauCol.insert_many(json.load(open('./scripts/grauData.json')))
assigCol = db.assignaturas
assigCol.insert_many(json.load(open('./scripts/assigData.json')))
xatAssigCol = db.xatassignaturas
xatAssigCol.insert_many(json.load(open('./scripts/xatAssigData.json')))