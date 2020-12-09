var markerLayerGroup=L.layerGroup();
// building maps to plot data to the map
function buildMaps(style) {
    d3.json('/usa').then(function (data) {
        // console.log(data)
        
        

        data.forEach((beer) => {
            //console.log(beer)
            var styleType = beer.beer.beer_style;
            // console.log(styleType)
            var styleABV = beer.beer.beer_abv;
            // console.log(styleABV)
            var styleIBU = beer.beer.beer_ibu;
            // console.log(styleIBU)
            var state = beer.brewery.beer_brewery_state;
            // console.log(state)
            var country = beer.brewery.beer_brewery_country;
            // console.log(country)
            var city = beer.brewery.beer_brewery_city
            // console.log(city)
            var latitude = beer.brewery.beer_brewery_coordinates;
            //console.log(latitude)
        })

        console.log(style);
        var filteredData = data.filter(beer => beer.beer.beer_style === style);
        console.log(filteredData);

        // ADD CODE HERE TO PLOT MARKERS ON THE MAP
        // var myMap = L.map("map", {
        //     center: [37.09, -95.71],
        //     zoom: 4
        // });
        
        // L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        //     maxZoom: 18,
        //     id: "streets-v11",
        //     accessToken: API_KEY
        // }).addTo(myMap);

        //iterate through data and add marker for each coordinate when coordinates != null and when style ===
        markerLayerGroup.clearLayers()
        if (style) {
            filteredData.forEach(e => {
                var latLonString = e.brewery.beer_brewery_coordinates;
                //console.log(latLonString);
    
                //remove the space and rejoin the array into a single string
                latLonString = latLonString.split(" ").join("");
                
                // remove Math.round -> 
                var latitude = +(latLonString.split(",")[0])
                var longitude = +(latLonString.split(",")[1])
                // console.log(latitude, longitude)
                if (latitude & longitude) {
                    var latlng = L.latLng(latitude, longitude);
                    markerLayerGroup.addLayer(L.marker(latlng)
                            .bindPopup(`<strong>Beer:</strong> ${e.beer.beer_name} <br>
                                <strong>Brewery:</strong> ${e.brewery.beer_brewery_name} <br>`)
                        )
                           
                    }    
                });
        }
        else {
            data.forEach(e => {
            var latLonString = e.brewery.beer_brewery_coordinates;
            //console.log(latLonString);

            //remove the space and rejoin the array into a single string
            latLonString = latLonString.split(" ").join("");
            
            // remove Math.round -> 
            var latitude = +(latLonString.split(",")[0])
            var longitude = +(latLonString.split(",")[1])
            // console.log(latitude, longitude)
            if (latitude & longitude) {
                var latlng = L.latLng(latitude, longitude);
                markerLayerGroup.addLayer(L.marker(latlng)
                        .bindPopup(`<strong>Beer:</strong> ${e.beer.beer_name} <br>
                            <strong>Brewery:</strong> ${e.brewery.beer_brewery_name} <br>`)
                    )
                       
                }    
            });
        };
        //markerLayerGroup=L.layerGroup(markerLayer);
        markerLayerGroup.addTo(myMap);
        console.log('new markers');
    });
};

buildMaps();

// building charts to pull data for each style of beer 
function buildCharts(style) {

    // import data
    d3.json('/usa').then(function (data) {
        data.forEach((beer) => {

        })
    })


}
buildCharts();

// create an initial page 
function init() {

    // select from the HTML ID
    var selector = d3.select('#selDataset');
    // import data
    d3.json('/usa').then(function (data) {
        // console.log(data)

        // create a for loop for each beer
        data.forEach((beer) => {
            // console.log(beer)

            // get each style of beer
            var styleType = beer.beer.beer_style;
            // console.log(styleType)

            // create a for loop for each style of beer
            for (var i = 0; i < styleType.length; i++) {

                selector
                    .append('option')
                    .text(styleType)
                    .property('value', styleType)

            }

        })

        // eliminate the duplicates 
        var types = document.getElementById('selDataset');
        [].slice.call(types.options)
            .map(function (a) {
                if (this[a.value]) {
                    types.removeChild(a);
                } else {
                    this[a.value] = 1
                }
            }, {});

        // use first name from list to build initial plots
        const firstStyle = styleType[0]
        buildCharts(firstStyle);
        buildMaps(firstStyle);

        
    });

    

}

function optionChanged(newStyle) {
    buildMaps(newStyle);
    updateScatter(newStyle)
}

//build first maps
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
}).setView([37.09, -95.71], 2.5);
myMap.options.minZoom = 4;
myMap.options.maxZoom = 14;

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

init();
