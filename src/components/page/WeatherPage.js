import React from "react";
import Info from "../info";
import Form from "../form";
import Weather from "../weather";
import ToastsActions from '../../flux/actions/ToastsActions';

const API_KEY = "fd5ace1207a82503f898861cbf598bc2";

export default class Weather_page extends React.Component {
    state = {
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined
    };

    gettingWeather = async e => {
        e.preventDefault();
        const city = e.target.elements.city.value;
    
        if (city) {
          const api_url = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          const data = await api_url.json();
    
          if (!data || !data.sys || !data.sys.sunset) {
            ToastsActions.createToast({ 'message': 'City not found', 'type': 'danger' });
            this.setState({
              temp: undefined,
              city: undefined,
              country: undefined,
              pressure: undefined,
              sunset: undefined,
            });
            return;
          }

          var sunset = data.sys.sunset;
          var date = new Date();
          date.setTime(sunset);
          var sunset_date =
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
          this.setState({
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            pressure: data.main.pressure,
            sunset: sunset_date,
          });
        } else {
          ToastsActions.createToast({ 'message': 'Please, enter city name', 'type': 'danger' });
          this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            sunset: undefined,
          });
        }
      };

      render() {
        return (
          <div className="weather-form">
            <Info />
            <Form weatherMethod={this.gettingWeather} />
            <Weather className="dataWeather"
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunset={this.state.sunset}
              />
          </div>
        );
      }
    }