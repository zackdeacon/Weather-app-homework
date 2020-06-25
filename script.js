//create ordered list with local storage for searched cities 
var currentDate = moment().format("MMM Do YYYY"); 
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
// var storedCities = JSON.parse(localStorage.getItem("searchHistory"));

createButtons();
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
   
    var city= $("#citySearch").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      city + "&units=imperial&APPID=119090b7f3bb3a2c44906450f645dd9a";
    var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city + "&units=imperial&APPID=119090b7f3bb3a2c44906450f645dd9a"

    if (!searchHistory.includes(city)) {
        searchHistory.unshift(city);
       
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    createButtons();


    
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //   console.log(response)
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
    var cityImg = $("<img>");
    cityImg.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
    $("#city-pic").empty().append(cityImg);
    $("#city").empty().append(" " + response.name + " " + "(" + currentDate + ") ");
    $("#temp").empty().append(" " + Math.floor(response.main.temp) + " F");
    $("#humidity").empty().append(" " + response.main.humidity + "%");
    $("#wind").empty().append(" " + response.wind.speed + " MPH");
    var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=119090b7f3bb3a2c44906450f645dd9a&" + "lat=" + latitude + "&lon=" + longitude ;
       //Ajax call to set UV index with colored span div 
    $.ajax({
        url: uvIndex,
        method: "GET"
      }).then(function(uvResponse) {
        //   console.log(uvResponse)
          var uvText = $("<span>");
          uvText.text(uvResponse.value);
          $("#uv").empty().append(uvText);
          if (uvResponse.value > 9) {
          uvText.attr("class", "high")
          } else if (uvResponse.value < 4) {
            uvText.attr("class", "low")
        } else {
            uvText.attr("class", "medium")
        }
      })
  })
  $.ajax({
    url: fiveDayForecast,
    method: "GET"
  }).then(function(data) {
    //   console.log(data)
        for (var i = 0; i < 5; i++ ) {
            $("#day" + i).empty();
            var dateForecast = $("<p>");
            dateForecast.text(moment().add(i + 1, 'days').format("MMM Do YYYY"));
            $("#day" + i).append(dateForecast);
            var newImg = $("<img>");
            newImg.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
            $("#day" + i).append(newImg);
            var newTemp = $("<p>");
            var tempForecast = data.list[i].main.temp;
            newTemp.text("Temp: " + Math.floor(tempForecast) + " F")
            $("#day" + i).append(newTemp);
            var newHumidity = $("<p>");
            var humidityForecast = data.list[i].main.humidity;
            newHumidity.text("Humidity: " + humidityForecast + "%")
            $("#day" + i).append(newHumidity);

        }

  })

})

function createButtons () {
    $("#searchResult").empty();
    for (var i = 0; i < searchHistory.length; i++) {
        var newLi = $("<li>");
        newLi.attr("class", "list-group-item");
        var newBtn = $("<button>");
        newBtn.attr("class", "list-group-item list-group-item-action");
        newBtn.text(searchHistory[i]);
        newBtn.on("click", function(){
            
            var city= $(this).text();
            var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
              city + "&units=imperial&APPID=119090b7f3bb3a2c44906450f645dd9a";
            var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" +
            city + "&units=imperial&APPID=119090b7f3bb3a2c44906450f645dd9a"
            
            console.log(city);
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            //   console.log(response)
              var latitude = response.coord.lat;
              var longitude = response.coord.lon;
            var cityImg = $("<img>");
            cityImg.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            $("#city-pic").empty().append(cityImg);
            $("#city").empty().append(" " + response.name + " " + "(" + currentDate + ") ");
            $("#temp").empty().append(" " + Math.floor(response.main.temp) + " F");
            $("#humidity").empty().append(" " + response.main.humidity + "%");
            $("#wind").empty().append(" " + response.wind.speed + " MPH");
            var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=119090b7f3bb3a2c44906450f645dd9a&" + "lat=" + latitude + "&lon=" + longitude ;
               //Ajax call to set UV index with colored span div 
            $.ajax({
                url: uvIndex,
                method: "GET"
              }).then(function(uvResponse) {
                //   console.log(uvResponse)
                  var uvText = $("<span>");
                  uvText.text(uvResponse.value);
                  $("#uv").empty().append(uvText);
                  if (uvResponse.value > 9) {
                  uvText.attr("class", "high")
                  } else if (uvResponse.value < 4) {
                    uvText.attr("class", "low")
                } else {
                    uvText.attr("class", "medium")
                }
              })
          })
          $.ajax({
            url: fiveDayForecast,
            method: "GET"
          }).then(function(data) {
            //   console.log(data)
                for (var i = 0; i < 5; i++ ) {
                    $("#day" + i).empty();
                    var dateForecast = $("<p>");
                    dateForecast.text(moment().add(i + 1, 'days').format("MMM Do YYYY"));
                    $("#day" + i).append(dateForecast);
                    var newImg = $("<img>");
                    newImg.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
                    $("#day" + i).append(newImg);
                    var newTemp = $("<p>");
                    var tempForecast = data.list[i].main.temp;
                    newTemp.text("Temp: " + Math.floor(tempForecast) + " F")
                    $("#day" + i).append(newTemp);
                    var newHumidity = $("<p>");
                    var humidityForecast = data.list[i].main.humidity;
                    newHumidity.text("Humidity: " + humidityForecast + "%")
                    $("#day" + i).append(newHumidity);
        
                }
        
          })
        
        })
        newLi.append(newBtn);
        $("#searchResult").append(newLi);
    }
}