// Store our API from our Flask return
var queryUrl = "/usa";

//Perform a GET request to the query Url
// d3.json(queryUrl, function (data) {
//     var breweries = L.geoJSON(data.features, {
//         onEachFeature: addPopup
//     });

//     createMap(breweries);
// });

// Define a function we want to run once for each feature 
function addPopup(feature, layer) {
    // giving each feature a popup describing Name and City
    return layer.bindPopup(`<h3> ${feature.properties.Name} </h3> <hr> <p> ${City(feature.properties.City)} </p>`);
}

// function to recieve a layer of markers and plot them on a map.
function createMap(breweries) {
    d3.json(queryUrl).then(function (data) {
        //console.log(data);
        var myMap = L.map("map", {
            center: [37.09, -95.71],
            zoom: 4
        });

        // var baseMaps = {
        //     "Street Map": streetmap,
        //     "Dark Map": darkmap
        // };

        L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            maxZoom: 18,
            id: "streets-v11",
            accessToken: API_KEY
        }).addTo(myMap);

        // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        //     maxZoom: 18,
        //     id: "dark-v10",
        //     accessToken: API_KEY
        // });


        //iterate through data and add marker for each coordinate when coordinates != null
        data.forEach(e => {
            var latLonString = e.brewery.beer_brewery_coordinates;

            //remove the space and rejoin the array into a single string
            latLonString = latLonString.split(" ").join("");
            var latitude = latLonString.split(",")[0]
            var longitude = latLonString.split(",")[1]
            var latlng = L.latLng(latitude, longitude);
            if (latlng != null) {
                L.marker(latlng)
                    .bindPopup(`<strong>Beer:</strong> ${e.beer.beer_name} <br>
                        <strong>Brewery:</strong> ${e.brewery.beer_brewery_name} <br>`)
                    .addTo(myMap);
            }
            //L.marker(e.brewery.beer_brewery_coordinates).addTo(mymap);
        });
    })

    // Define a function we want to run once for each feature 
    // function addPopup(feature, layer) {
    //     // giving each feature a popup describing Name and City
    //     return layer.bindPopup(`<h3> ${feature.properties.Name} </h3> <hr> <p> ${Date(feature.properties.City)} </p>`);
    // }



    // function to recieve a layer of markers and plot them on a map.
    // function createMap() {

    //     // Define streetmap and darkmap layers
    //     var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //         maxZoom: 18,
    //         id: "streets-v11",
    //         accessToken: API_KEY
    //     });

    //     var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //         maxZoom: 18,
    //         id: "dark-v10",
    //         accessToken: API_KEY
    //     });

    //     // Define a baseMaps object to hold our base layers
    //     var baseMaps = {
    //         "Street Map": streetmap,
    //         "Dark Map": darkmap
    //     };

    //     // Create overlay object to hold our overlay layer
    //     // var overlayMaps = {
    //     //     "Breweries": breweries
    //     // };

    //     // Create our map
    //     var myMap = L.map("map", {
    //         center: [37.09, -95.71],
    //         zoom: 4,
    //         layers: [baseMaps]
    //     });

    //     // Create a layer control
    //     // Pass in our baseMaps and overlayMaps
    //     // Add the layer control to the map
    //     L.control.layers(baseMaps, overlayMaps, {
    //         collapsed: false
    //     }).addTo(myMap);
    // }

    // chloromap
    var chloroMap = L.map("chloroMap", {
        center: [37.8, -96],
        zoom: 4
    });

    //colors for chloroMap ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c']
    function getColor(d) {
        return d > 80 ? '#006d2c' :
            d > 50 ? '#31a354' :
                d > 20 ? '#74c476' :
                    d > 10 ? '#a1d99b' :
                        d > 5 ? '#c7e9c0' :
                            '#edf8e9';
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.no_of_unique_breweries),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    var geojson;

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        chloroMap.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(chloroMap);

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 5, 10, 20, 50, 80],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Number of Breweries</h4>' + (props ?
            '<b>' + props.name + '</b><br />' + props.no_of_unique_breweries + ' breweries.'
            : 'Hover over a state');
    };

    info.addTo(chloroMap);

    legend.addTo(chloroMap);

    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        id: 'light-v9',
        // attribution: ...
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
    }).addTo(chloroMap);



