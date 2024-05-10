'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Page() {
  const [location, setLocation] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState('');
  const [img, setImg] = useState('');
  async function getWeather() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputLocation}&aqi=no`;
    try {
      const response = await fetch(url);
      const weatherResults = await response.json();
      console.log(weatherResults);
      setTemp(weatherResults.current.temp_f);
      setCondition(weatherResults.current.condition.text);
      setImg(weatherResults.current.condition.icon);
      setLocation(weatherResults.location.name);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getWeather();
  };

  const weatherMessage = (temp: number) => {
    if (temp > 80) {
      return 'its hot, wear sunscreen';
    } else if (temp < 80) {
      return 'cool day today brother';
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 items-center border">
        <div className="flex flex-col items-center border ">
          <h1>Weather</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputLocation}
              onChange={(e) => setInputLocation(e.target.value)}
              placeholder="Enter Zip Code or City"
              style={{ color: 'black' }}
            />
            <button type="submit" className="outline">
              Get Weather
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center border">
          <div className="border w-24 h-24">
            <div>{location}</div>
          </div>
          <div className="border w-24 h-24">
            <div>{temp}</div>
          </div>
          <div className="border w-24 h-24">
            <div>{condition}</div>
          </div>
          <div className="border w-24 h-24">
            <img src={img} alt="Weather Icon" width={100} height={100} />
          </div>
          <div>{weatherMessage(temp)}</div>
        </div>
      </div>
    </>
  );
}
