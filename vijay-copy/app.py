# import libraries
from flask import Flask,render_template,jsonify
import pandas as pd
import sqlite3
import os
import numpy as np
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import Session
#from orderedset import OrderedSet
from sqlalchemy import Column, Integer, String, Float

# Flask Setup
app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/GDPNew.db"
db = SQLAlchemy(app)


Base = automap_base()

engine = create_engine('sqlite:///db/GDPNew.db')

Base.prepare(engine, reflect=True)
Gdp = Base.classes.GDP

session = Session(engine)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/GDP")
def GDP():
 
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d
 
    connection = sqlite3.connect("db/GDPNew.db")
    connection.row_factory = dict_factory
        
    cursor = connection.cursor()
        
    cursor.execute("select * from GDP")
    #print("In GDP")
    #print(results)

    results = cursor.fetchall()
    
    return jsonify(results)

@app.route("/GDP/<state>")
def GDPstate(state):
 
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d
 
    connection = sqlite3.connect("db/GDPNew.db")
    connection.row_factory = dict_factory
        
    cursor = connection.cursor()
        
    cursor.execute(f"select * from GDP where GeoName == '{state}' and IndustryId == 1")
        
    results = cursor.fetchall()
    #print("In state")
    #print(results)
    
    return jsonify(results)

@app.route("/GDP/<state>/<year>")
def GDPstateyear(state, year):
 
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d
 
    connection = sqlite3.connect("db/GDPNew.db")
    connection.row_factory = dict_factory
        
    cursor = connection.cursor()
        
    cursor.execute(f"select {year}, IndustryId, Description from GDP where GeoName == '{state}' order by {year} desc")
    
    #print("In state and Year")
    
    #print(results)
        
    results = cursor.fetchall()
    
    return jsonify(results)

@app.route("/<state>/<industryId>")
def GDPindustry(state, industryId):
 
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d
 
    connection = sqlite3.connect("db/GDPNew.db")
    connection.row_factory = dict_factory
        
    cursor = connection.cursor()
        
    cursor.execute(f"select * from GDP where GeoName == '{state}' and IndustryId == '{industryId}'")
        
    results = cursor.fetchall()
    #print("In state and Industry")
    #print(results)

    return jsonify(results)

@app.route("/years")
def years():

    # Use Pandas to perform the sql query
    stmt = db.session.query(Gdp).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[4:])

@app.route("/states")
def states():

    # Use Pandas to perform the sql query
    stmt = db.session.query(Gdp).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    new_df = df.GeoName.unique()
    new_df = new_df[2:]


    # Return a list of the column names (sample names)
    return jsonify(list(new_df))

@app.route("/industryIds")
def industryIds():

    # Use Pandas to perform the sql query
    stmt = db.session.query(Gdp).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    new_df = df[['IndustryId']]
    new_df = new_df[new_df.IndustryId != 100]
    new_df = new_df[new_df.IndustryId != 101]
    new_df = new_df[new_df.IndustryId != 102]
    new_df = new_df[new_df.IndustryId != 103]
    new_df = new_df[new_df.IndustryId != 104]
    new_df = new_df.IndustryId.unique()
    new_df = new_df[1:]

    # Return a list of the column names (sample names)
    return jsonify(list(new_df))

@app.route("/industry/<year>")
def industry(year):

    stmt = db.session.query(Gdp).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    sample_data = df.loc[:, ["IndustryId", "Description", "GeoName", year]]

    # # Sort by sample
    # sample_data.sort_values(by=year, ascending=False, inplace=True)

    # Format the data to send as json
    data = {
        "state": sample_data.GeoName.values.tolist(),
        "industryId": sample_data.IndustryId.values.tolist(),
        "GDPyear": sample_data[year].values.tolist(),
        "description": sample_data.Description.tolist(),
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)