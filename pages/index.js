import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CurrentWeather from "../components/CurrentWeather";
import Loader from "../components/Loader";

/**
 *
 * @template {*} T
 * @typedef {import("next/types").NextPage<T>} NextPage */
/**
 *
 * @typedef WeatherAlert
 * @property {string} sender_name
 * @property {string} event
 * @property {number} start
 * @property {number} end
 * @property {string} description
 * @property {string[]} tags
 *
 * @typedef {{
 * day: number,
 * night: number,
 * eve: number,
 * morn: number,
 * min?: number,
 * max?: number,
 * }} Temperature
 *
 * @typedef  {{
 * dt: number,
 * coord:{
 *  lon:number,
 *  lat:number
 * },
 * weather: {
 *  id: number,
 *  main: string,
 *  description: string,
 *  icon: string,
 *  }[],
 * base:string,
 * temp: number,
 * feels_like: number,
 * temp_min?: number,
 * temp_max?: number,
 * pressure: number,
 * humidity: number,
 * sea_level: number,
 * grnd_level: number,
 * visibility:number,
 * wind: {
 *  speed: number,
 *  deg: number,
 *  gust: number,
 * }
 * rain: {
 *   1h:number
 * }
 * clouds: {all:number},
 * sys: {
 *  sunrise: number,
 *  sunset: number,
 *  country:string,
 *  id:number,
 *  type:number,
 * },
 * timezone: number,
 * id: number,
 * name: string,
 * cod: number
 * }} WeatherData
 *
 */

/**
 *
 * @param {{data: WeatherData}} props
 * @return {NextPage<WeatherInfo>}
 */
export default function Home({ data }) {
  const content = data === null ? <Loader /> : <CurrentWeather data={data} />;

  return (
    <>
      <Head>
        <title>Weather Today</title>
        <meta
          name="description"
          content="Displays the current weather in Stockholm"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <CssBaseline />
        <Container maxWidth="lg">{content}</Container>
      </main>
    </>
  );
}

/**
 *
 * @returns {Promise<{props: {data: WeatherData }}>}
 */
export async function getServerSideProps() {
  const country = "stockholm";
  const url = `${process.env.WEATHER_URL}/data/2.5/weather?q=${country}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
  let data = null;
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (error) {
    // TODO: add error tracking service
    console.info(error);
  }
  return {
    props: {
      data,
    },
  };
}
