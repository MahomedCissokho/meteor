import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

const App = () => {
  const API_KEY = "5620b1d19b078ba967c653000bb8f584";

  const [temperature, setTemperature] = useState(0);
  const [cordinates, setCordinates] = useState({
    latitude: 12.5,
    longitude: -16,
  });
  const [APIURL, setAPIURL] = useState(`
  https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}&appid=${API_KEY}&units=metric`);
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
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cordinates.latitude, cordinates.longitude);
    setAPIURL(`
    https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}&appid=${API_KEY}&units=metric`);
  };

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
        isLoading(false);
      })
      .catch((error) => console.error(error));
  }, [APIURL]);

  let backgroundColor = temperature < 0 ? 'bg-[#f5f5f5]' : temperature <= 10 ? 'bg-blue-400' : temperature >10 && temperature <= 20 ? 'bg-yellow-500' : temperature > 20 && temperature <= 25 ? 'bg-green-400' : temperature <= 30 ? 'bg-orange-400' : 'bg-red-400'
  let changeColor = temperature < 0 ? '' : "text-white"

  return (
    <>
      {loading ? (
        <div className="flex w-screen h-screen items-center justify-center">
          <DotLoader color="#cdcdcd" loading={loading} size={50} />
        </div>
      ) : (
        <div className={`w-screen h-screen ${backgroundColor}`} >
  <div className="flex flex-col max-w-6xl mx-auto px-5 py-10 items-center justify-center gap-7">
            <h1 className={`md:text-3xl  text-2xl  text-gray-800 ${changeColor} font-bold tracking-[.5rem]`}>Weather App</h1>
            <h3 className={`text-xl md:text-2xl text-[#aaa]/90 ${changeColor} font-400`}>Put coordinates</h3>
            <form
              onSubmit={handleSubmit}
              className="md:flex-row flex-col flex items-center justify-center gap-7 mb-3"
            >
              <div className="flex items-center justify-center gap-5 ">
                  <input
                  type="text"
                  placeholder="Latitude"
                  value={cordinates.latitude}
                  className="outline-none border rounded-lg py-3 px-4 "
                  onChange={updatesFormValues}
                />
                <input
                  type="text"
                  placeholder="Longitude"
                  value={cordinates.longitude}
                  className="outline-none border rounded-lg py-3 px-4 "
                  onChange={updatesFormValues}
                />
              </div>
              
              <input
                type="submit"
                className="bg-neutral-700 text-white p-3 rounded-xl hover:bg-neutral-700/90 cursor-pointer transition-all ease-out duration-300"
                value="Get Weather"
              />
            </form>
            <div className="flex justify-center md:gap-20 flex-col md:flex-row gap-5 ">
              <div className="text-xl flex flex-col items-center jusitfy-center gap-8">
                <h1 className={`font-semibold text-gray-400 ${changeColor}`}>
                  <span className="font-bold text-neutral-700">City</span> :{" "}
                  {city}
                </h1>
                <h1 className={`font-semibold text-gray-400 ${changeColor}`}>
                  <span className="font-bold text-neutral-700">Temperature</span>{" "}
                  : {temperature}°C
                </h1>
                <h1 className={`font-semibold text-gray-400 ${changeColor}`}>
                  <span className="font-bold text-neutral-700">Main</span> :{" "}
                  {mainInfo.main}
                </h1>
                <h1 className={`font-semibold text-gray-400 ${changeColor}`}>
                  <span className="font-bold text-neutral-700">Description</span>{" "}
                  : {mainInfo.description}
                </h1>
              </div>
              <div className="flex items-center justify-center gap-5 flex-col  text-xl ">
                <img
                  src={imageZone}
                  alt="Weather"
                  className="w-20 h-20 bg-center"
                />
                <div className="flex items-center md:flex-col flex-row gap-5">
                    <h3 className={`font-semibold text-gray-400 ${changeColor}`}>
                    <span className="font-bold text-neutral-700">Sunrise:{" "}</span>
                    {new Date(sunInfo.sunrise * 1000).toLocaleTimeString(`fr-FR`)}
                  </h3>
                  <h3 className={`font-semibold text-gray-400 ${changeColor}`}>
                    <span className="text-neutral-700 font-bold">Sunset:{" "}</span>
                    {new Date(sunInfo.sunset * 1000).toLocaleTimeString("fr-FR")}
                  </h3>
                </div>
                
              </div>
            </div>
          </div>

        </div>
        
      )}
    </>
  );
};

export default App;

