d3.json('/beers').then(function(data) {
    console.log(d3.select("div").text());
    console.log(data);
});

console.log("hello");