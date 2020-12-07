# Project-2: Brews Clues

# Team Members

 * Gabriel Alade
 * Chad Dubiel
 * Jeremy Jones
 * Nick Orewiler
 * Debra Wu
 
 # Requirements
 *  Must have a Python Flask with restful API, HTML/CSS, JavaScript, and at least one database(SQL, MongoDB, etc.).
 *  At least one chart must be D3 or Leaflet.
 *  Project should use one JS library that was not covered in class.
 *  Data must be at least 100 records. 
 *  Project must be interactive for the user. 
 *  The final visualization should have at least three views. 

# Proposal 
Our project will be focused on querying data from a brewery dataset (csv) so that users can query a style of beer using a drop down menu from beers within the US.  Once the user has picked a beer, the dashboard visuals will change accordingly.  For the dashboard, we will make use of the leafet to produce a state from street maps that will then have a marker that will mark the location of a brewer associated with the picked beer.  When the user hovers over the marker, general information of the brewery will popup.  A second map will also be from leaflet and will show the US in a chlorophyll map.  When the user hovers over a particular state, the amount of breweries within the state will be displayed.  The user will also be able to interact with a scatter plot that plots a represetation of the dataset while comparing IBU to alcholol % by vol.  Last but not least, the user will be able to interact with a radar chart that compares IBU to alcohol content by volume.  A rough outline of our dashboard can be seen in the image below. 

## Datasets:
The datasets that will be utilized in this project were acquired from the link below.  The data was provided in csv format and the group will utilize SQLalchemy to push the data to a SQL database called "beersDB" and then route to our flask app to connect the rest of the project. 
https://www.kaggle.com/ritesaluja/the-beer
