import React from "react";
import style from "./weatherCard.module.css";

export interface WeatherCardProps {
  city: string;
  temperature: number;
  description?: string;
  icon: string;
}

export default function WeatherCard({
  city,
  temperature,
  description,
  icon,
}: WeatherCardProps) {
  return  (
    <div className={style.weathercard}>
      <h2>{city}</h2>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
      {/* <p>{description}</p> */}
      <h3>{temperature}°C</h3>

    </div>
  );



  
}
