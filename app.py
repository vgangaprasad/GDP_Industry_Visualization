# import libraries
from flask import Flask,render_template,jsonify
import pandas as pd
import sqlite3
import os
import numpy as np

from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, MetaData
import os
from sqlalchemy.orm import Session
from orderedset import OrderedSet

from sqlalchemy import create_engine, MetaData
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from flask import Flask,render_template,jsonify

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

@app.route("/total_gdp")
def total_gdp():
    # results = session.query(Gdp.GeoName, Gdp.IndustryId, Gdp.Y1997, Gdp.Y1998, Gdp.Y1999, Gdp.Y2000, Gdp.Y2001, Gdp.Y2002, Gdp.Y2003, Gdp.Y2004, Gdp.Y2005, Gdp.Y2006, Gdp.Y2007, Gdp.Y2008, Gdp.Y2009, Gdp.Y2010, Gdp.Y2011, Gdp.Y2012, Gdp.Y2013, Gdp.Y2014, Gdp.Y2015, Gdp.Y2016, Gdp.Y2017).filter(Gdp.IndustryId == 1).all()
    
    # state = [row[0] for row in results]
    # industry_id = [row[1] for row in results]
    # Y1997 = [row[2] for row in results]
    # Y1998 = [row[3] for row in results]
    # Y1999 = [row[4] for row in results]
    # Y2000 = [row[5] for row in results]
    # Y2001 = [row[6] for row in results]
    # Y2002 = [row[7] for row in results]
    # Y2003 = [row[8] for row in results]
    # Y2004 = [row[9] for row in results]
    # Y2005 = [row[10] for row in results]
    # Y2006 = [row[11] for row in results]
    # Y2007 = [row[12] for row in results]
    # Y2008 = [row[13] for row in results]
    # Y2009 = [row[14] for row in results]
    # Y2010 = [row[15] for row in results]
    # Y2011 = [row[16] for row in results]
    # Y2012 = [row[17] for row in results]
    # Y2013 = [row[18] for row in results]
    # Y2014 = [row[19] for row in results]
    # Y2015 = [row[20] for row in results]
    # Y2016 = [row[21] for row in results]
    # Y2017 = [row[22] for row in results]

    data = {
        "state": state.values.tolist(),
    }
    return jsonify(data)
    # return jsonify([state, industry_id, Y1997, Y1998, Y1999, Y2000, Y2001, Y2002, Y2003, Y2004, Y2005, Y2006, Y2007, Y2008, Y2009, Y2010, Y2011, Y2012, Y2013, Y2014, Y2015, Y2016, Y2017])


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
        
    cursor.execute(f"select Y{year}, IndustryId, Description from GDP where GeoName == '{state}'")
        
    results = cursor.fetchall()
    
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

    # Return a list of the column names (sample names)
    return jsonify(list(df.GeoName.unique()))


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