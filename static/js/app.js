var markerLayerGroup = L.layerGroup();
// building maps to plot data to the map

function buildMapsStyle(style) {
    d3.json('/usa').then(function (data) {
        // console.log(data)
        var breweries = [];
        var popupContent = [];
        var markers = [];

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

        //console.log(style);
        var filteredData = data.filter(beer => beer.beer.beer_style === style);
        
        //console.log(filteredData);

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
            breweries = [];
            popupContent = [];
            markers = [];
            filteredData.forEach(e => {
                var latLonString = e.brewery.beer_brewery_coordinates;
                //console.log(latLonString);

                //remove the space and rejoin the array into a single string
                latLonString = latLonString.split(" ").join("");

                // remove Math.round -> 
                var latitude = +(latLonString.split(",")[0])
                var longitude = +(latLonString.split(",")[1])

                // console.log(latitude, longitude)

                //check to see if this brewery's beer is in our array, if not then add the name, latlon, and popupContent
                // console.log(e.brewery.beer_brewery_name)
                if (breweries.indexOf(e.brewery.beer_brewery_name) === -1) {
                    if (latitude & longitude) {
                        breweries.push(e.brewery.beer_brewery_name)
                        var latlng = L.latLng(latitude, longitude);
                        markers.push(L.marker(latlng))
                        popupContent.push(`<strong>Brewery:</strong> ${e.brewery.beer_brewery_name} <br> 
                                            <strong>Beer:</strong> ${e.beer.beer_name} <br>`
                        )
                    }
                }
                //this runs if the brewery is in our arrays, it 
                else {
                    breweryIndex = breweries.indexOf(e.brewery.beer_brewery_name)
                    popupContent[breweryIndex] += `<strong>Beer:</strong> ${e.beer.beer_name} <br>`
                }
                // console.log(markers);
                // console.log(breweries);
                // console.log(popupContent);

                for (i = 0; i < markers.length; i++) {
                    markerLayerGroup.addLayer(markers[i]
                        .bindPopup(popupContent[i]))
                }




            });
        }
        else {
            plotAllTypes();
        };

        if (style === 'All Types') {
            plotAllTypes();
        }

        function plotAllTypes(){
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
        }
        //markerLayerGroup=L.layerGroup(markerLayer);
        markerLayerGroup.addTo(myMap);
        // console.log('new markers');
    });
};

function buildMapsState(state) {
    d3.json('/usa').then(function (data) {
        // console.log(data)
        var breweries = [];
        var popupContent = [];
        var markers = [];

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

        //console.log(style);
        var filteredData = data.filter(brewery => brewery.brewery.beer_brewery_state === state);        

        //iterate through data and add marker for each coordinate when coordinates != null and when style ===
        markerLayerGroup.clearLayers()
        if (state) {
            breweries = [];
            popupContent = [];
            markers = [];
            filteredData.forEach(e => {
                var latLonString = e.brewery.beer_brewery_coordinates;
                //console.log(latLonString);

                //remove the space and rejoin the array into a single string
                latLonString = latLonString.split(" ").join("");

                // remove Math.round -> 
                var latitude = +(latLonString.split(",")[0])
                var longitude = +(latLonString.split(",")[1])

                // console.log(latitude, longitude)

                //check to see if this brewery's beer is in our array, if not then add the name, latlon, and popupContent
                // console.log(e.brewery.beer_brewery_name)
                if (breweries.indexOf(e.brewery.beer_brewery_name) === -1) {
                    if (latitude & longitude) {
                        breweries.push(e.brewery.beer_brewery_name)
                        var latlng = L.latLng(latitude, longitude);
                        markers.push(L.marker(latlng))
                        popupContent.push(`<strong>Brewery:</strong> ${e.brewery.beer_brewery_name} <br> 
                                            <strong>Beer:</strong> ${e.beer.beer_name} <br>`
                        )
                    }
                }
                //this runs if the brewery is in our arrays, it 
                else {
                    breweryIndex = breweries.indexOf(e.brewery.beer_brewery_name)
                    popupContent[breweryIndex] += `<strong>Beer:</strong> ${e.beer.beer_name} <br>`
                }
                // console.log(markers);
                // console.log(breweries);
                // console.log(popupContent);

                for (i = 0; i < markers.length; i++) {
                    markerLayerGroup.addLayer(markers[i]
                        .bindPopup(popupContent[i]))
                }




            });
        }
        else {
            plotAllStates();
        };

        if (state === 'All States') {
            plotAllStates();
        }

        function plotAllStates() {
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
        }
        //markerLayerGroup=L.layerGroup(markerLayer);
        markerLayerGroup.addTo(myMap);
        // console.log('new markers');
    });
};

buildMapsStyle();

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
    var stateSelector = d3.select("#selState");

    var statesArray = ['All States', 'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    console.log(statesArray);
    
    // import data
    d3.json('/usa').then(function (data) {
        // console.log(data)
        var stylesList = ["All Types"];
        // create a for loop for each beer
        data.forEach((beer) => {
            // console.log(beer)

            // get each style of beer
            var styleType = beer.beer.beer_style;
            if (stylesList.indexOf(styleType) == -1) {
                stylesList.push(styleType);
            }
            // stylesList.push(styleType);
            // console.log(styleType)

            // create a for loop for each style of beer
            // for (var i = 0; i < styleType.length; i++) {

            //     selector
            //         .append('option')
            //         .text(styleType)
            //         .property('value', styleType)

            // }

        })
        // console.log(stylesList);
        stylesList = stylesList.sort();
        // console.log(stylesList);
        for (var i = 0; i < stylesList.length; i++) {

            selector
                .append('option')
                .text(stylesList[i])
                .property('value', stylesList[i])

        };

        for (var i = 0; i < statesArray.length; i++) {
            stateSelector
                .append('option')
                .text(statesArray[i])
                .property('value', statesArray[i])
        };


        // // eliminate the duplicates 
        // var types = document.getElementById('selDataset');
        // [].slice.call(types.options)
        //     .map(function (a) {
        //         if (this[a.value]) {
        //             types.removeChild(a);
        //         } else {
        //             this[a.value] = 1
        //         }
        //     }, {});

        // use first name from list to build initial plots
        const firstStyle = stylesList[0]
        buildCharts(firstStyle);
        buildMapsStyle(firstStyle);

    });

}

function optionChangedStyle() {
    var selector = d3.select('#selDataset');
    var stateSelector = d3.select("#selState");
    var selectedStyle = selector.property("value");
    var selectedState = stateSelector.property("value");
    //console.log("========================")
    console.log(selectedStyle);
    console.log(selectedState);
    buildMapsStyle(selectedStyle);
    updateScatter(selectedStyle, selectedState);
}

function optionChangedState() {
    var selector = d3.select('#selDataset');
    var stateSelector = d3.select("#selState");
    var selectedStyle = selector.property("value");
    var selectedState = stateSelector.property("value");
    console.log("========================")
    console.log(selectedStyle);
    console.log(selectedState);
    buildMapsState(selectedState);
    updateScatter(selectedStyle, selectedState);
}



//build first maps
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
}).setView([37.09, -95.71], 2.5);
myMap.options.minZoom = 3;
myMap.options.maxZoom = 14;

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

init();
