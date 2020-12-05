// building charts
function buildCharts(style){
    d3.csv('data/open-beer-database.csv', function(data){
        // console.log(data)
        data.forEach((beer)=> {
            // console.log(beer)
            var styleType = beer.Style
            // console.log(styleType)
            var styleABV = beer.Alcohol_By_Vol
            // console.log(styleABV)
            var styleIBU = beer.International_Bitterness_Units
            // console.log(styleIBU)
            var state = beer.State
            // console.log(state)
            var country = beer.Country
            // console.log(country)
        })



    })
}
buildCharts();

// create an initialize page
function init(){
    // select from the HTML ID
    var selector = d3.select('#selDataset');
    // import data
    d3.csv('data/open-beer-database.csv', function(data){
    
        // create a for loop for each beer
        data.forEach((beer) => {
        // console.log(beer)

        // get each style of beer
        var styleType = beer.Style;

        // create a for loop for each style of beer
        for (var i = 0; i < styleType.length; i++){
          
            selector
            .append('option')
            .text(styleType)
            .property('value', styleType)

        }

        })

        // eliminate the duplicates 
        var types = document.getElementById('selDataset');
        [].slice.call(types.options)
        .map(function(a){
            if(this[a.value]){
                types.removeChild(a);
            } else {
                this[a.value]=1
            }
        }, {});



    })


}



init();
