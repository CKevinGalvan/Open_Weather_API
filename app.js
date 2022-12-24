const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "7375c2835e0e45bbe4ec5b837409968a";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const object = {
                name: "Angela",
                favouriteFood: "Ramen"
            }
            const temp = weatherData.main.temp;
            console.log("temperature: "+temp);

            const description = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(description);
            // var output = "The weather is currently "+ description + 
            // ".\n<h1>The temperature in London is "+temp + " degrees Celsius. </h1>";
            // res.send(output);
            res.write("<p>The weather is currently "+ description + ".</p>");
            res.write("\n<h1>The temperature in "+ query +" is "+temp + " degrees Celsius. </h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });

});



app.listen(3000, function(){
    console.log("Server is running at port 3000.");
});