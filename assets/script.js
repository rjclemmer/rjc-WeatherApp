

$(document).ready(function () {
const API_KEY = '0ecf829d1f1196a32f84e1c28d293d91';

var lat = "";
var lon = "";
var cityName = ' ';

// sets default to from localStorage. If localStorage is null, default to Staunton, VA
if (cityName === " ") {
    cityName = localStorage.getItem("CityName");
    if (cityName == null) {
        cityName = " ";
    }
}
//cityName = localStorage.getItem("cityname");

var todayEl = document.getElementById('todayBox');
var day2El = document.getElementById('day2');
var day3El = document.getElementById('day3');
var day4El = document.getElementById('day4');
var day5El = document.getElementById('day5');
var day6El = document.getElementById('day6');

// search button
function searchButton() {
    cityName = $("input").val().trim();
    localStorage.setItem('CityName', cityName);

//creates a button that will load results from previous search
    var cityList = $("<button>");
        cityList.addClass("list-group-item list-group-item-action");
        cityList.text(cityName);
        

        $("ul").prepend(cityList);
        $("input").val("");

        getCoordinates();
    }
    
// activates searchbutton function
$("#city-form").submit(function (event)
    {   
        event.preventDefault();
        searchButton();
    })
// user clicks on value from history
$("ul").on("click", "button", function () 
    {
        cityName = $(this).text();
        console.log(cityName);
        

        getCoordinates();
    })

function getCoordinates () {
var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+ cityName + "&appid=0ecf829d1f1196a32f84e1c28d293d91";
 fetch(requestUrl)
    .then(function (response) {
        console.log(response.status);
      //  Conditional for bad request
      if (response.status !== 200) {
        // alert if not a valid city
       alert("Please enter a valid city");
       return false;
      } 
        return response.json();}
    )
    .then(function (data) {

        // this clears out previous searches
        $("#todayBox").empty();
        $('#day2').empty();
        $('#day3').empty();
        $('#day4').empty();
        $('#day5').empty();
        $('#day6').empty();
        
        //
        
        for (var i = 0; i < data.length; i++) {
            var repoList = data[i]}
        console.log('Weather \n----------');
        console.log(repoList);

        //gets lat and long coord from repoList and is used in getWeather function

        lat = repoList.lat;
        lon = repoList.lon;
        console.log(lat);
        console.log(lon);
        
        // **** ADDs CITY and STATE HERE ****
        var listCity = repoList.name;
        var listState = repoList.state;
        
        var cityHeader = document.createElement('h2');
        cityHeader.textContent = listCity + ", " + listState;
        todayEl.appendChild(cityHeader);

        getWeather(lat, lon);
    })};



function getWeather (a,b) {
var url2 ="https://api.openweathermap.org/data/2.5/forecast?lat=" + a + "&lon=" + b + "&appid=0ecf829d1f1196a32f84e1c28d293d91&units=imperial";
console.log(url2);
    fetch(url2)
     .then(function (response) {
        return response.json();
         })
     .then(function (data) {
       
        console.log("weather forecast");
        console.log(data);
       
        
        // Info for Today's Forecast
        var weatherListA = data.list[0].main;
        // why does dt_text not work???
        var realDate = data.list[0].dt_text;
        var weatherTempA = weatherListA.temp;
        var humidityA = weatherListA.humidity;
        // displays the date from unix time
        var dateA = moment.unix(data.list[0].dt).format("dddd MM/DD/YYYY");
        var windA = data.list[0].wind.speed;
        var iconA = data.list[0].weather[0].icon;

        // why is this undefined???
        console.log(realDate);
        console.log(dateA); 
        var listDateA = document.createElement('p');
        listDateA.textContent = dateA;
        todayEl.appendChild(listDateA);

        var listIconA = document.createElement('img');
        var iconUrlA = "https://openweathermap.org/img/wn/" + iconA + "@2x.png"
        listIconA.setAttribute('src', iconUrlA );
        todayEl.appendChild(listIconA);
        console.log(iconA);

        console.log(weatherListA); 
        console.log("The temp is " + weatherTempA + " F");
        var listTempA = document.createElement('p');
        listTempA.textContent = ("The temp is " + weatherTempA + " F");
        todayEl.appendChild(listTempA);
        console.log("The humidity is " + humidityA);
        var listHumidityA = document.createElement('p');
        listHumidityA.textContent = ("The humidity is " + humidityA + "%");
        todayEl.appendChild(listHumidityA);
        console.log("The wind speed is " + windA);
        var listWindA = document.createElement('p');
        listWindA.textContent = ("The wind speed is " + windA + " mph");
        todayEl.appendChild(listWindA);

        // info for next days
        
        // day 2
        var weatherListB = data.list[8].main;
        var weatherTempB = weatherListB.temp;
        var humidityB = weatherListB.humidity;
        var dateB = moment.unix(data.list[8].dt).format("dddd MM/DD/YYYY");
        var iconB = data.list[8].weather[0].icon;
        var windB = data.list[8].wind.speed;
        
        console.log(dateB);
        var listDateB = document.createElement('p');
        listDateB.textContent = dateB;
        day2El.appendChild(listDateB); 
        console.log(weatherListB); 

        var listTempB = document.createElement('p');
        listTempB.textContent = ("The temp is " + weatherTempB + " F");
        day2El.appendChild(listTempB);
        console.log("The temp is " + weatherTempB+ " F");

        var listHumidityB = document.createElement('p');
        listHumidityB.textContent = ("The humidity is " + humidityB + "%");
        day2El.appendChild(listHumidityB);
        console.log("The humidity is " + humidityB + "%");

        var listWindB = document.createElement('p');
        listWindB.textContent = ("The wind speed is " + windB + " mph");
        day2El.appendChild(listWindB);
        console.log("The wind speed is " + windB + " mph");

        var listIconB = document.createElement('img');
        var iconUrlB = "https://openweathermap.org/img/wn/" + iconB + "@2x.png"
        listIconB.setAttribute('src', iconUrlB );
        day2El.appendChild(listIconB);
        console.log(iconB);
        
        // day 3
        var weatherListC = data.list[16].main;
        var weatherTempC = weatherListC.temp;
        var humidityC = weatherListB.humidity;
        var dateC = moment.unix(data.list[16].dt).format("dddd MM/DD/YYYY");
        var iconC = data.list[16].weather[0].icon;
        var windC = data.list[16].wind.speed;
        
        var listDateC = document.createElement('p');
        listDateC.textContent = dateC;
        day3El.appendChild(listDateC);
        console.log(dateC); 
        console.log(weatherListC); 

        var listTempC = document.createElement('p');
        listTempC.textContent = ("The temp is " + weatherTempC + " F");
        day3El.appendChild(listTempC);
        console.log("The temp is " + weatherTempC+ " F");

        var listHumidityC = document.createElement('p');
        listHumidityC.textContent = ("The humidity is " + humidityC + "%");
        day3El.appendChild(listHumidityC);
        console.log("The humidity is " + humidityC);

        var listWindC = document.createElement('p');
        listWindC.textContent = ("The wind speed is " + windC + " mph");
        day3El.appendChild(listWindC);
        console.log("The wind speed is " + windC);

        var listIconC = document.createElement('img');
        var iconUrlC = "https://openweathermap.org/img/wn/" + iconC + "@2x.png"
        listIconC.setAttribute('src', iconUrlC );
        day3El.appendChild(listIconC);
        console.log(iconC);

        // day 4
        var weatherListD = data.list[24].main;
        var weatherTempD = weatherListD.temp;
        var humidityD = weatherListB.humidity;
        var dateD = moment.unix(data.list[24].dt).format("dddd MM/DD/YYYY");
        var iconD = data.list[24].weather[0].icon;
        var windD = data.list[24].wind.speed;

        var listDateD = document.createElement('p');
        listDateD.textContent = dateD;
        day4El.appendChild(listDateD);
        console.log(dateD); 
        console.log(weatherListD); 

        var listTempD = document.createElement('p');
        listTempD.textContent = ("The temp is " + weatherTempD + " F");
        day4El.appendChild(listTempD);
        console.log("the temp is " + weatherTempD+ " F");

        var listHumidityD = document.createElement('p');
        listHumidityD.textContent = ("The humidity is " + humidityD + "%");
        day4El.appendChild(listHumidityD);
        console.log("the humidity is " + humidityD);

        var listWindD = document.createElement('p');
        listWindD.textContent = ("The wind speed is " + windD + " mph");
        console.log("the wind speed is " + windD);
        day4El.appendChild(listWindD)

        var listIconD = document.createElement('img');
        var iconUrlD = "https://openweathermap.org/img/wn/" + iconD + "@2x.png"
        listIconD.setAttribute('src', iconUrlD );
        day4El.appendChild(listIconD);
        console.log(iconD);

        // day 5

        var weatherListE = data.list[32].main;
        var weatherTempE = weatherListE.temp;
        var humidityE = weatherListB.humidity;
        var dateE = moment.unix(data.list[32].dt).format("dddd MM/DD/YYYY");
        var iconE = data.list[32].weather[0].icon;
        var windE = data.list[32].wind.speed;

        var listDateE = document.createElement('p');
        listDateE.textContent = dateE;
        day5El.appendChild(listDateE);
         
        var listTempE = document.createElement('p');
        listTempE.textContent = ("The temp is " + weatherTempE + " F");
        day5El.appendChild(listTempE);
      
        var listHumidityE = document.createElement('p');
        listHumidityE.textContent = ("The humidity is " + humidityE + "%");
        day5El.appendChild(listHumidityE);
       
        var listWindE = document.createElement('p');
        listWindE.textContent = ("The wind speed is " + windE + " mph");
        day5El.appendChild(listWindE);

        var listIconE = document.createElement('img');
        var iconUrlE = "https://openweathermap.org/img/wn/" + iconE + "@2x.png"
        listIconE.setAttribute('src', iconUrlE );
        day5El.appendChild(listIconE);

         // day 6

         var weatherListF = data.list[39].main;
         var weatherTempF = weatherListF.temp;
         var humidityF = weatherListB.humidity;
         var dateF = moment.unix(data.list[39].dt).format("dddd MM/DD/YYYY");
         var iconF = data.list[39].weather[0].icon;
         var windF = data.list[39].wind.speed;
 
         var listDateF = document.createElement('p');
         listDateF.textContent = dateF;
         day6El.appendChild(listDateF);
          
         var listTempF = document.createElement('p');
         listTempF.textContent = ("The temp is " + weatherTempF + " F");
         day6El.appendChild(listTempF);
       
         var listHumidityF = document.createElement('p');
         listHumidityF.textContent = ("The humidity is " + humidityF + "%");
         day6El.appendChild(listHumidityF);
        
         var listWindF = document.createElement('p');
         listWindF.textContent = ("The wind speed is " + windF + " mph");
         day6El.appendChild(listWindF);

         var listIconF = document.createElement('img');
         var iconUrlF = "https://openweathermap.org/img/wn/" + iconF + "@2x.png"
         listIconF.setAttribute('src', iconUrlF );
         day6El.appendChild(listIconF);
        
         console.log("the wind speed is " + windF);

        
    })};

// getCoordinates()




});
