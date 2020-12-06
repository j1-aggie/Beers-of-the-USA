create table openBeer(
	Name VARCHAR(1000) NOT NULL,
	id VARCHAR(1000),
	brewery_id VARCHAR(1000),
	cat_id VARCHAR(1000),
	style_id VARCHAR(1000),
	Alcohol_By_Vol VARCHAR(1000), 
	IBU VARCHAR(1000),
	SRM VARCHAR(1000),
	UPC VARCHAR(1000),
	Description VARCHAR(1000),
	add_user VARCHAR(1000),
	last_mod VARCHAR(1000),
	Style VARCHAR(1000),
	Category VARCHAR(1000),
	Brewer VARCHAR(1000),
	Address VARCHAR(1000),
	City VARCHAR(1000),
	State VARCHAR(1000),
	Country VARCHAR(1000),
	Coordinates VARCHAR(1000)	
);

select * from openBeer

drop table openBeer