import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_

from flask import Flask, jsonify, render_template

from config import pgPassword


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False


#################################################
# Database Setup
#################################################

# Create engine
pg_user = 'postgres'
pg_password = pgPassword
db_name = 'beersDB'

connection_string = f"{pg_user}:{pgPassword}@localhost:5432/{db_name}"
engine = create_engine(f'postgresql://{connection_string}')

# NEW=========Creating joined table to be used in special route
beersDF = pd.read_sql_table('beers', con=engine)
breweriesDF = pd.read_sql_table('breweries', con=engine)
openBeerDF = pd.read_sql_table('openBeer', con=engine)

beersAndBreweries = pd.merge(left = beersDF, right = breweriesDF, how="inner", left_on="brewery_id", right_on = "id")
beersAndBreweries = beersAndBreweries[["name_x", "style", "name_y", "abv", "ibu"]]
beersAndBreweries = beersAndBreweries.rename(columns = {"name_x": "beer",
                                                       "name_y": "brewery"})
breweryLocations = openBeerDF[["Brewer", "Address", "City", "State", "Country", "Coordinates"]]

usaDF = pd.merge(left = breweryLocations, right = beersAndBreweries, how="inner", left_on="Brewer", right_on = "brewery")
usaDF = usaDF.dropna().drop_duplicates()

# end NEW=========================

# reflect an existing database into a new model
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()

# Save reference to the table
Beers = Base.classes.beers
Breweries = Base.classes.breweries
Recipes = Base.classes.recipes
OpenBeer = Base.classes.openBeer

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return (render_template("index.html"))
    # return (
    #     f"HOME PAGE</br>"
    #     f"==== Available Routes ====<br/>"
    #     f"/beers<br/>"
    #     f"/breweries<br/>"
    #     f"/recipes<br/>"
    #     f"/openbeers"
    # )

# 


@app.route("/beers")
def beers():
    """Return a list of candidates that have ran for president"""
    session = Session(engine)

    results = session.query(Beers).all()

    # close the session to end the communication with the database
    session.close()

    # Convert the query results to a dictionary
    summary_list = []
    for beer in results:
        summary_dict = {}
        summary_dict["beer_id"] = beer.id
        summary_dict["beer_name"] = beer.name
        summary_dict["beer_brewery_id"] = beer.brewery_id
        summary_dict["beer_style"] = beer.style
        summary_dict["beer_abv"] = beer.abv
        summary_dict["beer_ibu"] = beer.ibu
       
        summary_list.append(summary_dict)

    # Return the JSON representation of the dictionary
    return jsonify(summary_list)

@app.route("/breweries")
def breweries():
    """Return a list of candidates that have ran for president"""
    session = Session(engine)

    results = session.query(Breweries).all()

    # close the session to end the communication with the database
    session.close()

    # Convert the query results to a dictionary
    summary_list = []
    for brewery in results:
        summary_dict = {}
        summary_dict["brewery_id"] = brewery.id
        summary_dict["brewery_name"] = brewery.name
        summary_dict["brewery_city"] = brewery.city
        summary_dict["brewery_state"] = brewery.state
       
        summary_list.append(summary_dict)

    # Return the JSON representation of the dictionary
    return jsonify(summary_list)

@app.route("/openbeers")
def openbeers():
    
    session = Session(engine)

    results = session.query(OpenBeer).all()

    # close the session to end the communication with the database
    session.close()

    # Convert the query results to a dictionary
    summary_list = []
    for beer in results:
        summary_dict = {}
        beer_dict = {}
        brewery_dict = {}

        beer_dict["beer_id"] = beer.id
        beer_dict["beer_name"] = beer.Name
        beer_dict["beer_style_id"] = beer.style_id
        beer_dict["beer_style"] = beer.Style
        beer_dict["beer_category"] = beer.Category
        beer_dict["beer_abv"] = beer.Alcohol_By_Vol
        beer_dict["beer_ibu"] = beer.International_Bitterness_Units

        brewery_dict["beer_brewery_id"] = beer.brewery_id
        brewery_dict["beer_brewery_name"] = beer.Brewer
        brewery_dict["beer_brewery_address"] = beer.Address
        brewery_dict["beer_brewery_city"] = beer.City
        brewery_dict["beer_brewery_state"] = beer.State
        brewery_dict["beer_brewery_country"] = beer.Country
        brewery_dict["beer_brewery_coordinates"] = beer.Coordinates

        summary_dict["beer"] = beer_dict
        summary_dict["brewery"] = brewery_dict


        # summary_dict["beer_id"] = beer.id
        # summary_dict["beer_name"] = beer.Name
        # summary_dict["beer_style_id"] = beer.style_id
        # summary_dict["beer_style"] = beer.Style
        # summary_dict["beer_category"] = beer.Category
        # summary_dict["beer_abv"] = beer.Alcohol_By_Vol
        # summary_dict["beer_ibu"] = beer.International_Bitterness_Units
        # summary_dict["beer_brewery_id"] = beer.brewery_id
        # summary_dict["beer_brewery_name"] = beer.Brewer
        # summary_dict["beer_brewery_address"] = beer.Address
        # summary_dict["beer_brewery_city"] = beer.City
        # summary_dict["beer_brewery_state"] = beer.State
        # summary_dict["beer_brewery_country"] = beer.Country
        # summary_dict["beer_brewery_coordinates"] = beer.Coordinates

       
        summary_list.append(summary_dict)

    # Return the JSON representation of the dictionary
    return jsonify(summary_list)

@app.route("/recipes")
def recipes():
    """Return a list of candidates that have ran for president"""
    session = Session(engine)

    results = session.query(Recipes).all()

    # close the session to end the communication with the database
    session.close()

    # Convert the query results to a dictionary
    summary_list = []
    for beer in results:
        summary_dict = {}
        summary_dict["beer_id"] = beer.BeerID
        summary_dict["beer_name"] = beer.Name
        summary_dict["beer_style_id"] = beer.StyleID
        summary_dict["beer_style"] = beer.Style
        summary_dict["beer_abv"] = beer.ABV
        summary_dict["beer_ibu"] = beer.IBU
        summary_dict["beer_og"] = beer.OG
        summary_dict["beer_fg"] = beer.FG
        summary_dict["beer_color"] = beer.Color
        summary_dict["beer_efficiency"] = beer.Efficiency
        summary_dict["beer_brew_method"] = beer.BrewMethod
       
        summary_list.append(summary_dict)

    # Return the JSON representation of the dictionary
    return jsonify(summary_list)


@app.route("/usa")
def usa():
    # """Return a list of candidates that have ran for president"""
    # session = Session(engine)

    # results = session.query(Breweries).all()

    # # close the session to end the communication with the database
    # session.close()

    # # Convert the query results to a dictionary
    summary_list = []
    for i, row in usaDF.iterrows():
        summary_dict = {}
        beer_dict = {}
        brewery_dict = {}

        beer_dict["beer_name"] = row["beer"]
        beer_dict["beer_style"] = row["style"]
        beer_dict["beer_abv"] = row["abv"]
        beer_dict["beer_ibu"] = row["ibu"]

        brewery_dict["beer_brewery_name"] = row["Brewer"]
        brewery_dict["beer_brewery_address"] = row["Address"]
        brewery_dict["beer_brewery_city"] = row["City"]
        brewery_dict["beer_brewery_state"] = row["State"]
        brewery_dict["beer_brewery_country"] = row["Country"]
        brewery_dict["beer_brewery_coordinates"] = row["Coordinates"]

        summary_dict["beer"] = beer_dict
        summary_dict["brewery"] = brewery_dict
       
        summary_list.append(summary_dict)

    # Return the JSON representation of the dictionary
    return jsonify(summary_list)

# @app.route("/summary")
# def summary():
#     """Return a list of candidates that have ran for president"""
#     session = Session(engine)

#     results = session.query(Beers, Breweries).filter(Beers.brewery_id == Breweries.id).all()

#     # close the session to end the communication with the database
#     session.close()

#     # Convert the query results to a dictionary
#     summary_list = []
#     for beer, brewery in results:
#         summary_dict = {}
#         summary_dict["beer_name"] = beer.name
#         summary_dict["brewery_name"] = brewery.name
        
       
#         summary_list.append(summary_dict)

#     # Return the JSON representation of the dictionary
#     return jsonify(summary_list)


if __name__ == '__main__':
    app.run(debug=True, port=5000)