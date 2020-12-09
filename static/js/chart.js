var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {

    type: "radar",
    data: {

        labels: ["International_Bitterness_Units", "Alcohol_By_Vol", "BoilTime", "PrimaryTemp", "PrimingAmount", "ounces", "abv"],
        datasets: [{
            label: 'country with highest beer production',

            // Load Data from csv data files

            data: ['beers.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
        {
            label: 'beer with the highest boil time',

            // Load Data from csv data files

            data: ['breweries.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
        {
            label: ' best style beer ',

            // Load Data from csv data files

            data: ['recipeData.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
        {
            label: 'state with the highest production',

            // Load Data from csv data files

            data: ['open-beer-database.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        }
        ]
    },

    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

