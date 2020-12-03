Select * from open_beer_database

drop table if exists open_beer_database 

create table open_beer_database (
	Name VARCHAR(500),
	id INT, 
	brewery_id INT, 
	cat_id INT, 
	style_id INT, 
	Alcohol_By_Vol INT, 
	International_Bitterness_Units VARCHAR, 
	Standard_Reference_Method INT, 
	Universal_Product_Code INT, 	
	Description VARCHAR(10000),
	add_user INT,
	last_mod DATE,
	Style VARCHAR,
	Category VARCHAR,
	Brewer VARCHAR,
	Address VARCHAR,
	City VARCHAR,
	State VARCHAR,
	Country VARCHAR,
	Coordinates VARCHAR
	
);