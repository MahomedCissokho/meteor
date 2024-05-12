/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const App = () => {
  const API_KEY = "5620b1d19b078ba967c653000bb8f584";
  
  const [temperature, setTemperature] = useState(0);
  const [cordinates, setCordinates] = useState({latitude : 12.5, longitude : -16}); 
  const [APIURL, setAPIURL] = useState(`
  https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}&appid=${API_KEY}&units=metric`
  )
  const [city, setCity] = useState("");
  const [mainInfo, setMainInfo] = useState({
    main: "",
    description: "",
  });
  const [imageZone, setImageZone] = useState("");
  const [sunInfo, setSunInfo] = useState({
    sunrise: 0,
    sunset: 0,
  });
  const [loading, isLoading] = useState(true);
  
  const updatesFormValues = (e) => {
    setCordinates({
      ...cordinates,
      [e.target.placeholder.toLowerCase()]: e.target.value
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(cordinates.latitude, cordinates.longitude)
    setAPIURL(`
    https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}&appid=${API_KEY}&units=metric`
    )
  }

  useEffect(() => {
    fetch(APIURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTemperature(data.main.temp);
        setMainInfo({
          main: data.weather[0].main,
          description: data.weather[0].description,
        });
        setSunInfo({
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        });
        setCity(data.name);
        setImageZone(
          `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        );
      })
      .catch((error) => console.error(error));
    isLoading(false);
  }, [APIURL]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Weather App</h1>
          <form onSubmit={handleSubmit}>
            <h3>Put coordinates</h3>
            <input type="text" placeholder="Latitude" value={cordinates.latitude} onChange={updatesFormValues}/>
            <input type="text" placeholder="Longitude" value={cordinates.longitude} onChange={updatesFormValues}/>
            <input type="submit" value="Get Weather"/>
          </form>
          <div>
            <h1>City : {city}</h1>
            <h1>Temperature : {temperature}°C</h1>
            <h2>Main : {mainInfo.main}</h2>
            <h2>Description : {mainInfo.description}</h2>
            <img src={imageZone} alt="Weather" />
            <h3>
              Sunrise:{" "}
              {new Date(sunInfo.sunrise * 1000).toLocaleTimeString(`fr-FR`)}
            </h3>
            <h3>
              Sunset:{" "}
              {new Date(sunInfo.sunset * 1000).toLocaleTimeString("fr-FR")}
            </h3>
          </div>
          
        </div>
      )}
    </>
  );
};

export default App;
