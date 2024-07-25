import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './app/App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import WeatherCard from './components/weatherCard/WeatherCard';
import HomePage from './components/homePage/HomePage';
import WeatherApp from './components/weatherApp/WeatherApp';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<WeatherApp />}>
        <Route path='/home' element={<HomePage />} />
        <Route path='/weather' element={<WeatherCard city={''} temperature={0} description={''} icon={''} />}></Route>
        <Route path='*' element ={<h1>Error 404</h1>} />
      </Route>
    </Routes>
  </HashRouter>
);



