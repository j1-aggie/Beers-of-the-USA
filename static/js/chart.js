function buildRadar(beer) {
    d3.json('/recipes').then(function (data) {
        
        console.log(data[0]);

        var abvMean = d3.mean(data, d => d.beer_abv);
        var ibuMean = d3.mean(data, d => d.beer_ibu);
        var colMean = d3.mean(data, d => d.beer_color);
        var effMean = d3.mean(data, d => d.beer_efficiency);
        var ogMean = d3.mean(data, d => d.beer_og);
        var fgMean = d3.mean(data, d => d.beer_fg);

        dataMeans = [abvMean, ibuMean, colMean, effMean, ogMean, fgMean]
        console.log(dataMeans)

        new Chart(document.getElementById("radarChart"), {
            type: 'radar',
            data: {
              labels: ["ABV", "IBU", "Color", "Efficiency", "OG", "FG"],
              datasets: [
                {
                  label: "Means",
                  fill: true,
                  backgroundColor: "rgba(179,181,198,0.2)",
                  borderColor: "rgba(179,181,198,1)",
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "rgba(179,181,198,1)",
                  data: dataMeans
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Values for Means Across All Recipes'
              }
            }
        });

               
    });
};

buildRadar();