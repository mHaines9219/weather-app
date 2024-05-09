'use client';
import React, { useState } from 'react';

export default function Page() {
  const [temp, setTemp] = useState(0);
  async function getWeather() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=91601&aqi=no`;
    try {
      const response = await fetch(url);
      const weatherResults = await response.json();
      console.log(weatherResults);
      setTemp(weatherResults.current.temp_f);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Weather</h1>
      <button onClick={getWeather}>Get Weather</button>
      <div>{temp}</div>
    </>
  );
}
