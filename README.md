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
Our project will be focused on querying data from a brewery dataset (csv) so that users can query a style of beer using a drop down menu from beers within the US.  Once the user has picked a beer, the dashboard visuals will change accordingly.  For the dashboard, we will make use of the leafet to produce a state from street maps that will then have a marker that will mark the location of a brewer associated with the picked beer.  When the user hovers over the marker, general information of the brewery will popup.  A second map will also be from leaflet and will show the US in a chlorophyll map.  When the user hovers over a particular state, the amount of breweries within the state will be displayed.  The user will also be able to interact with a scatter plot that plots a representation of the dataset while comparing IBU to alcohol % by vol.  Last but not least, the user will be able to interact with a radar chart that compares IBU to alcohol content by volume.  Views of the dashboard can be seen below. 

![screenshot 1](https://user-images.githubusercontent.com/66078772/102307401-04677f00-3f2a-11eb-83e1-0bc43e6f8515.PNG)
![screenshot 2](https://user-images.githubusercontent.com/66078772/102307410-08939c80-3f2a-11eb-86c7-3b81171e14d1.PNG)
![screenshot 3](https://user-images.githubusercontent.com/66078772/102307418-0c272380-3f2a-11eb-8677-9ad28bb08c28.PNG)

## Datasets:
The datasets that will be utilized in this project were acquired from the link below.  The data was provided in csv format and the group will utilize SQLalchemy to push the data to a SQL database called "beersDB" and then route to our flask app to connect the rest of the project. 
https://www.kaggle.com/ritesaluja/the-beer
