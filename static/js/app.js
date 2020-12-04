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


function createDropDown(style){
    var selector = d3.select('#selDataset');
    d3.csv('data/open-beer-database.csv', function(data){
    data.forEach((beer) => {
        // console.log(beer)
        var styleType = beer.Style;

        for (var i = 0; i < styleType.length; i++){
          
            selector
            .append('option')
            .text(styleType)
            .property('value', styleType)

        }

        })
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



createDropDown();

// function init() {

//     var selector = d3.select('#selDataset');
//     // import data
//     d3.csv('data/open-beer-database.csv',function(data){
//     // console.log(data)
//     // var name = data[0]
//     // console.log(name)

//     // for (var i = 0; i <data.length; i++) {
//     //     console.log(data)
//     // }
//     data.forEach((beer) => {
        
//     // console.log(beer)
//     var styleType = beer.Style
//     // console.log(styleType)
    
//     // styleType.forEach((style) => {
//     //     selector
//     //     .append('option')
//     //     .text(style)
//     //     .property('value', style)
//     // })


//     })

//     // var styleType = data.style;
    






// })
// }

// init();