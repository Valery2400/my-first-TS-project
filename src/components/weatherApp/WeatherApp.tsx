import React, { useState, useEffect } from 'react';
import WeatherCard from '../weatherCard/WeatherCard';
import style from "./weatherApp.module.css"
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from "yup";


interface ICity {
    name: string;
}
// const schema = Yup.object().shape({
//     name: Yup.string()
//       .required(" скажи city ")
//       .min(3, " name должно быть больше 2 ")
//       .typeError(" введи city "),
//   });

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const apiKey = 'cf0e2a39b2a02de3de9d2e679c11aa7a';
    
    const formik = useFormik({
        initialValues: {
            name: ''
          } as ICity,
        //   validationSchema: schema,
        //   validateOnChange: false,

          onSubmit: (values: ICity, { resetForm }) => {
            fetchWeather(values.name);
            resetForm();
          }
    })

  
    const fetchWeather = async (city: string) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setWeatherData(null);
      }
    };
  
    
    useEffect(() => {
      if (weatherData) {
       
      }
    }, [weatherData]);
  
    return (
      <div className={style.background}>
        <h1>Weather App</h1>
        <Formik
          initialValues={{ city: '' }}
          validate={values => {
            const errors: { city?: string } = {};
            if (!values.city) {
              errors.city = 'Required';
            } else if (!/^[a-zA-Z\s]+$/.test(values.city)) {
              errors.city = 'Invalid city name';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            fetchWeather(values.city);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field type="text" name="city" placeholder="Enter city name" />
              {errors.city && <div className="error">{errors.city}</div>}
              <button type="submit" disabled={isSubmitting}>Search</button>
            </Form>
          )}
        </Formik>
        {error && <p className="error">{error}</p>}
        <div className='card'>
          {weatherData && (        
            <WeatherCard
              city={weatherData.name}
              temperature={weatherData.main.temp}
              description={weatherData.weather[0].description}
              icon={weatherData.weather[0].icon}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default WeatherApp;