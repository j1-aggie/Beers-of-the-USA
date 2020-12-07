// building maps to plot data to the map
function buildMaps(style) {
    d3.json('/usa').then(function (data) {
        // console.log(data)
        data.forEach((beer) => {
            console.log(beer)
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
            console.log(latitude)
        })

        // ADD CODE HERE TO PLOT MARKERS ON THE MAP


    })
}
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
        buildMaps(firstStyle)



    });


}

function optionChanged(newStyle) {
    buildMaps(newStyle)
    buildMaps(newStyle);
}


init();
