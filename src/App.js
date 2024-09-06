
import './App.css';
import search_icon from './WeatherPics/search.png';
import clear_icon from './WeatherPics/clear.png';
import cloud_icon from './WeatherPics/cloud.png';
import drizzle_icon from './WeatherPics/drizzle.png';
import rain_icon from './WeatherPics/cloud.png';
import snow_icon from './WeatherPics/snow.png';
import wind_icon from './WeatherPics/wind.png';
import humidity_icon from './WeatherPics/humidity.png';
import { useState } from 'react';

function App() {

  let [city, setCity] = useState('');
  let [wDetails, setWDetails] = useState();

  let getData = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=84a2b1d851fc1dfef9fdfa80dc8be2b0`)
    .then((res) => res.json())
    .then((finalRes) => {
      console.log(finalRes);
      if(finalRes.cod === "404"){
        setWDetails(undefined);
      }
      else{
        setWDetails(finalRes);
      }
    })

    event.preventDefault();
    setCity('');
  }

  // Determine the weather icon based on the weather condition
  let getWeatherImage = (wCondition) =>
  {
    switch(wCondition) 
    {
      case 'Clear' : 
      return clear_icon;
      case 'Clouds' : 
      return cloud_icon;
      case 'Drizzle' : 
      return drizzle_icon;
      case 'Rain' : 
      return rain_icon;
      case 'Snow' : 
      return snow_icon;
      default : 
      return clear_icon;
    }
  }
  
  return (
    <div className="App">

    <form onSubmit={getData}> 
      <div className='weather'>
        
        <div className='searchBar'>
          <input type='text' placeholder='Search' value={city} onChange={(e) => setCity(e.target.value)}/>
          <img src= {search_icon} alt=''/>
        </div>

        {wDetails ? (
        <>
        <img src= {getWeatherImage(wDetails.weather[0].main)} className='weatherIcon' alt=''/>

        <div>
          <p className='temperature'>{Math.floor(wDetails.main.temp)}°C</p>
          <p className='feelsLike'>Feels Like {Math.floor(wDetails.main.feels_like)}°C</p>
        </div>
        
        <p className='location'>{wDetails.name}</p>
        
        <div className='weatherData'>
          <div className='col'>
            <img src={humidity_icon} alt=''/>
              <div>
                <p>{wDetails.main.humidity}%</p>
                <span>Humidity</span>
              </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt=''/>
              <div>
                <p>{wDetails.wind.speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
          </div>
        </div>
        
        </>
          ) : (
            <p className='noData'>No Data</p>
          )}

      </div>
      </form>
    </div>
  );
}

export default App;
