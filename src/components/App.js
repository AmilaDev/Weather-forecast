import React from 'react';
import { useState } from 'react';
import './App.css';
import '../index.css';

const api = {
	base: 'https://api.openweathermap.org/data/2.5/',
	key: '3265874a2c77ae4a04bb96236a642d2f',
};

export default function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = e => {
		if (e.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then(res => res.json())
				.then(result => {
					setWeather(result);
					setQuery('');
					console.log(result);
				});
		}
	};

	const dateBuilder = d => {
		let months = [
			'Januery',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		let days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wendsday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div className={typeof weather.main != 'undefined'}>
			<main>
				<div className='search-box'>
					<input
						className='search'
						type='text'
						placeholder='Find the weather in your city'
						onChange={e => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>

				{typeof weather.main != 'undefined' ? (
					<div className='container'>
						<div className='weather-container'>
							<div className='temperature'>{Math.round(weather.main.temp)}° c</div>
							<div className='weather'>{weather.weather[0].main}</div>
							{/*	import { BsSun, BsSnow2 } from 'react-icons/bs';
<div className='icons'>
								Sunny <BsSun />
								Winter <BsSnow2 /> 
							</div>*/}
						</div>

						<div className='location-box'>
							<div className='location'>
								{' '}
								{weather.name}, {weather.sys.country}
							</div>
							<div className='date'> {dateBuilder(new Date())} </div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}
