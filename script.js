//put info pulled from weather app API into specific locations on page
    //need to finish UV index 
    //need to add icon next to city 
//create ordered list with local storage for searched cities 
var currentDate = moment().format("MMM Do YYYY"); 




$("#searchBtn").on("click", function() {

    var city= $("#citySearch").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      city + "&units=imperial&APPID=119090b7f3bb3a2c44906450f645dd9a";
    var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city + "&units=imperial&APPID=119090b7f3bb3a2c44906450f645dd9a"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response)
    var cityImg = $("<img>");
    cityImg.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
    $("#city").append(" " + response.name + " " + currentDate + " " + cityImg);
    $("#temp").append(Math.floor(" " + response.main.temp));
    $("#humidity").append(" " + response.main.humidity + "%");
    $("#wind").append(" " + response.wind.speed + " MPH");

  })
  $.ajax({
    url: fiveDayForecast,
    method: "GET"
  }).then(function(data) {
    //   console.log(data)
        for (var i = 0; i < 5; i++ ) {
            var dateForecast = $("<p>");
            dateForecast.text(moment().add(i + 1, 'days').format("MMM Do YYYY"));
            $("#day" + i).append(dateForecast);
            var newImg = $("<img>");
            newImg.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
            $("#day" + i).append(newImg);
            var newTemp = $("<p>");
            var tempForecast = data.list[i].main.temp;
            newTemp.text("Temp: " + Math.floor(tempForecast) + "F")
            $("#day" + i).append(newTemp);
            var newHumidity = $("<p>");
            var humidityForecast = data.list[i].main.humidity;
            newHumidity.text("Humidity: " + humidityForecast + "%")
            $("#day" + i).append(newHumidity);

        }

  })

})