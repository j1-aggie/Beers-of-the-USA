// building charts
function buildCharts(style){
    d3.csv('data/open-beer-database.csv', function(data){
        console.log(data)
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
        console.log(beer)
        var styleType = beer.Style;

        var uniqueStyles = [];

        var count = 0;
        var start = false;
        
        console.log(styleType)
        for (var i = 0; i < styleType.length; i++){
            // for (var a = 0; a < uniqueStyles.length; a++) {
            //     if (i = uniqueStyles[a]){
            //         start = true;
            //     }
            // }
            // count ++
            // if (count == 1 && start == false){
            //     uniqueStyles.push(i)
            // }
            // start = false;
            // count = 0;

            // // document.write(uniqueStyles)
            // console.log(uniqueStyles)
            selector
            .append('option')
            .text(styleType)
            .property('value', styleType)

        }

            // selector
            // .append('option')
            // .text(styleType)
            // .property('value', styleType)
        })
        // styleType.forEach((beer) => {
        //     selector
        //     .append('option')
        //     .text(beer)
        //     .property('value', beer)
        // })


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