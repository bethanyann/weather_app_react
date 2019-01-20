import React from "react"; //this statement is telling this file to import react object
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "54fb46972c488d8fd113d8bcd34f02ea";
//initilize component
class App extends React.Component
{
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async(e) => {
    e.preventDefault(); 

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&APPID=" + API_KEY + "&units=imperial"); 
  
    const data = await api_call.json();

    if (city && country && data)
    {
      console.log(data);

        this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
    }); }
    else{
      this.setState({
         city: undefined,
         temperature: undefined,
       
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter in a value for city & state"
      });
  }
    

  
}
 
  render() {
    return(
     
       
            <div className="container">
              <div className="row">
                  <div class="col-xs-5 title-container">
                        <Titles />
                  </div>
                  <div class="col-xs-7 form-container">
                    
                    <Form getWeather={this.getWeather}/> 
                  
                    <Weather 
                        city={this.state.city}
                        country={this.state.country}
                        temperature={this.state.temperature}
                        humidity={this.state.humidity}
                        description={this.state.description}
                        error={this.state.error}
                    />
                  </div>
              </div> 
            </div> 
      
      
      
    );
  }
};

export default App;