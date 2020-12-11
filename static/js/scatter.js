// ============ Helper funtion to create tooltip HTML ============
function scatterTipHTML(data) {
    var beerName = data.beer.beer_name;
    var beerStyle = data.beer.beer_style;
    var breweryName = data.brewery.brewery_name;
    var htmlString = `
    <strong>${beerName}</strong>
    <hr>
    Style: ${beerStyle}
    <br>
    Brewery: ${breweryName}
    `;

    return htmlString
}



// ========================SVG SET UP=============================
// Set up SVG and Chart Group
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 100,
    right: 60,
    bottom: 80,
    left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#bubble")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// ==================== Pull and Use Data =========================
// Import, format, and chart data
function updateScatter(type) {
    d3.json('/usa').then(function (data) {

        // var type = 'Pumpkin Ale';
        console.log(type);
        // parse integer values
        data.forEach(function (d) {
            d.beer.beer_abv = +d.beer.beer_abv;
            d.beer.beer_ibu = +d.beer.beer_ibu;

        })

        // set up chart scales
        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.beer.beer_abv))
            .range([0, chartWidth])
            .nice();

        console.log(xLinearScale(50));

        var yLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.beer.beer_ibu))
            .range([chartHeight, 0])
            .nice();

        // set up chart axis
        var bottomAxis = d3.axisBottom(xLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);

        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .call(leftAxis);

        // append chart axis labels to chart
        var labelsGroupX = chartGroup.append("g")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

        var abvLabel = labelsGroupX.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "abv") // value to grab if event listener
            .classed("active", true)
            .text("Alcohol by Volume (%)");

        var labelsGroupY = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

        // append y axis labels
        var ibuLabel = labelsGroupY.append("text")
            .attr("y", 0 - margin.left + 30)
            .attr("x", 0 - (chartHeight / 2))
            .attr("value", "ibu")
            .attr("text-anchor", "middle")
            .classed("active", true)
            .text("International Bitterness Units");

        // append a chart Title
        var titleGroup = chartGroup.append("g")
            .attr("transform", `translate(${chartWidth / 2}, -30)`);

        var titleLabel = titleGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "title") // value to grab if event listener
            .classed("titleLabel", true)
            .text("ABV vs. IBU");

        chartGroup.selectAll("circle").remove();
        // create and add circles to chart
        var circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.beer.beer_abv))
            .attr("cy", d => yLinearScale(d.beer.beer_ibu))
            .attr("r", function (d) {
                if (d.beer.beer_style == type) {
                    return 10;
                } else {
                    return 5;
                }
            })
            .attr("fill", function (d) {
                if (d.beer.beer_style == type) {
                    return "red";
                } else {
                    return "blue";
                }
            })
            .attr("opacity", function (d) {
                if (d.beer.beer_style == type) {
                    return "0.75";
                } else {
                    return "0.25";
                }
            })
            .classed("beerCircle", true);

        // create Tool tip
        var toolTip = d3.tip()
            .attr("class", "scatterTip")
            .offset([-4, 4])
            .html(function (d) {
                var beerName = d.beer.beer_name;
                var beerStyle = d.beer.beer_style;
                var breweryName = d.brewery.beer_brewery_name;
                var htmlString = `
            <strong>${beerName}</strong>
            <hr>
            Style: ${beerStyle}
            <br>
            Brewery: ${breweryName}
            `;

                return htmlString
            });

        chartGroup.call(toolTip);

        // circlesGroup.on("click", function (d) {
        //     toolTip.show(d, this);
        // });

        circlesGroup.on("mouseover", function (d) {
            toolTip.show(d, this);
        });

        circlesGroup.on("mouseout", function (d) {
            toolTip.hide(d, this);
        })





    });

}
updateScatter("Winter Warmer");