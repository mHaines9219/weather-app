'use client';
import React, { useState } from 'react';

export default function Page() {
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState('');
  const [img, setImg] = useState('');
  async function getWeather() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=91601&aqi=no`;
    try {
      const response = await fetch(url);
      const weatherResults = await response.json();
      console.log(weatherResults);
      setTemp(weatherResults.current.temp_f);
      setCondition(weatherResults.current.condition.text);
      setImg(weatherResults.current.condition.icon);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Weather</h1>
      <button onClick={getWeather}>Get Weather</button>
      <div>{temp}</div>
      <div>{condition}</div>
      <img src={img} />
    </>
  );
}
