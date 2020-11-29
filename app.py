#########################################
# import dependencies and setup 
#########################################
import numpy as numpy
from flask import Flask
from flask import Flask, render_template, jsonify

#import sql dependencies if we use sql
    #import sqlalchemy
    #from sqlalchemy.ext.automap import automap_base
    #from sqlalchemy.orm import Session
    #from sqlalchemy import create_engine, func

# import databse login credentials
from db_key import user, password

#from config import password

##########################################
#Database setup
##########################################
engine = create_engine(f'postgresql://{user}:{password}@localhost:5432/#####_db')

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# We can view all of the classes that automap found
print(Base.classes.keys())

# Save reference to the tables
Identifier = Base.classes.#####
Identifier = Base.classes.#####


###########################################
# Flask Setup
app = Flask(__name__)

###########################################
# Flask Routes
###########################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return(
        f"<!DOCTYPE html>"
        f"<html lang='en-us'>"
        f"<meta charset='UTF-8'><title>#########</title>"
        f"<p style='color:blue'>Welcome to the ######## API app!</p><br/>"
        f"<u>Available Routes:</u><br/>"
        f"<a href='/api/v1.0/######' target='_blank'>/api/v1.0/#####</a><br/>"
        f"<a href='/api/v1.0/#####' target='_blank'>/api/v1.0/####</a><br/>"
        f"<a href='/api/v1.0/#####' target='_blank'>/api/v1.0/####</a><br/>"
    )

@app.route("/api/v1.0/#####")
def #####():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of #####"""
    # Query all ###### listing
    #####_qry = session.query(source.column header, source.column header, etc).all()

    # close the session to end the communication with the database
    session.close()

    # create a dict form the row data and append to a list


    return jsonify(###list)

# additional app.routes here







if __name__ == "__main__":
    app.run(debug=True)
