var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {

    type: "radar",
    data: {

        labels: ["IBU", "PitchRate", "BoilTime", "PrimaryTemp", "PrimingAmount", "SugarScale", "ABV"],
        datasets: [{
            label: 'PrimingAmount',

            // Load Data from csv data files

            data: ['recipedata.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
        {
            label: 'beer with the highest IBU',

            // Load Data from csv data files

            data: ['recipedata.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
        {
            label: 'beer with highest BoilTime',

            // Load Data from csv data files

            data: ['recipeData.csv'],
            // Choose color
            backgroundcolor: 'rgba(255, 99, 132, 2)',

            bordercolor: ['rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
        {
            label: 'Beer with highest SugarScale',

            // Load Data from csv data files

            data: ['recipedata.csv'],
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

