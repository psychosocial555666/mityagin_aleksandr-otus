import moment from "moment";
import "moment/locale/ru";
import { LoaderFunctionArgs } from "react-router";
import { CityType, WeatherItemType } from "../utils/types";
import { storageController } from "./cities";
import { WeatherRawDataType } from "./types";

export const rootLoader = () => {
  return { citiesList: storageController.getCities() };
};

export const cityLoader = ({ params }: LoaderFunctionArgs) => {
  return params.id && storageController.getCity(params.id);
};

export const apiKey =
  "a51b9034-a86a-11ed-bce5-0242ac130002-a51b90de-a86a-11ed-bce5-0242ac130002";

const filterData = (data: WeatherRawDataType[]) => {
  const filtered = data
    .filter(
      (item) =>
        new Date(item.time).getHours() === 0 ||
        new Date(item.time).getHours() === 6 ||
        new Date(item.time).getHours() === 12 ||
        new Date(item.time).getHours() === 19
    )
    .map((item) => ({
      temperature: `${Math.floor(item.airTemperature.noaa)}`,
      cloud: `${Math.floor(item.cloudCover.noaa)}%`,
      gust: `${Math.floor(item.gust.noaa)} м/с`,
      time: `${moment(new Date(item.time)).format("HH:mm")}`,
      day: `${moment(new Date(item.time)).format("dd").toUpperCase()}`,
      visibility: `${Math.floor(item.visibility.noaa)} км`,
      windSpeed: `${Math.floor(item.windSpeed.noaa)} м/с`,
    }));

  filtered.pop();

  const SIZE = 4;

  const result: WeatherItemType[][] = filtered.reduce(
    (p: WeatherItemType[][], c) => {
      if (p[p.length - 1].length === SIZE) {
        p.push([]);
      }
      p[p.length - 1].push(c);
      return p;
    },
    [[]]
  );
  return result;
};

export const getWeatherData = async (
  city: CityType,
  callback: (data: WeatherItemType[][]) => void
) => {
  const { lat, lng } = city;
  const start = moment().startOf("day").toISOString();
  const end = moment().startOf("day").add(7, "days").toISOString();
  const params = "airTemperature,cloudCover,gust,visibility,windSpeed";
  const data = await fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&source=noaa&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      return jsonData;
    });
  callback(filterData(data.hours || mockData));
};

const mockData = [
  {
    airTemperature: {
      noaa: -8.13,
    },
    cloudCover: {
      noaa: 74.2,
    },
    gust: {
      noaa: 0.52,
    },
    time: "2023-02-09T18:00:00+00:00",
    visibility: {
      noaa: 9.5,
    },
    windSpeed: {
      noaa: 0.37,
    },
  },
  {
    airTemperature: {
      noaa: -8.35,
    },
    cloudCover: {
      noaa: 72.8,
    },
    gust: {
      noaa: 0.48,
    },
    time: "2023-02-09T19:00:00+00:00",
    visibility: {
      noaa: 9.23,
    },
    windSpeed: {
      noaa: 0.37,
    },
  },
  {
    airTemperature: {
      noaa: -8.57,
    },
    cloudCover: {
      noaa: 71.4,
    },
    gust: {
      noaa: 0.44,
    },
    time: "2023-02-09T20:00:00+00:00",
    visibility: {
      noaa: 8.96,
    },
    windSpeed: {
      noaa: 0.38,
    },
  },
  {
    airTemperature: {
      noaa: -8.79,
    },
    cloudCover: {
      noaa: 70,
    },
    gust: {
      noaa: 0.41,
    },
    time: "2023-02-09T21:00:00+00:00",
    visibility: {
      noaa: 8.69,
    },
    windSpeed: {
      noaa: 0.38,
    },
  },
  {
    airTemperature: {
      noaa: -8.98,
    },
    cloudCover: {
      noaa: 67.8,
    },
    gust: {
      noaa: 0.51,
    },
    time: "2023-02-09T22:00:00+00:00",
    visibility: {
      noaa: 8.79,
    },
    windSpeed: {
      noaa: 0.48,
    },
  },
  {
    airTemperature: {
      noaa: -9.17,
    },
    cloudCover: {
      noaa: 65.6,
    },
    gust: {
      noaa: 0.61,
    },
    time: "2023-02-09T23:00:00+00:00",
    visibility: {
      noaa: 8.9,
    },
    windSpeed: {
      noaa: 0.58,
    },
  },
  {
    airTemperature: {
      noaa: -9.36,
    },
    cloudCover: {
      noaa: 63.4,
    },
    gust: {
      noaa: 0.71,
    },
    time: "2023-02-10T00:00:00+00:00",
    visibility: {
      noaa: 9.01,
    },
    windSpeed: {
      noaa: 0.68,
    },
  },
  {
    airTemperature: {
      noaa: -9.38,
    },
    cloudCover: {
      noaa: 63,
    },
    gust: {
      noaa: 0.64,
    },
    time: "2023-02-10T01:00:00+00:00",
    visibility: {
      noaa: 8.61,
    },
    windSpeed: {
      noaa: 0.63,
    },
  },
  {
    airTemperature: {
      noaa: -9.39,
    },
    cloudCover: {
      noaa: 62.6,
    },
    gust: {
      noaa: 0.58,
    },
    time: "2023-02-10T02:00:00+00:00",
    visibility: {
      noaa: 8.21,
    },
    windSpeed: {
      noaa: 0.57,
    },
  },
  {
    airTemperature: {
      noaa: -9.41,
    },
    cloudCover: {
      noaa: 62.2,
    },
    gust: {
      noaa: 0.51,
    },
    time: "2023-02-10T03:00:00+00:00",
    visibility: {
      noaa: 7.82,
    },
    windSpeed: {
      noaa: 0.52,
    },
  },
  {
    airTemperature: {
      noaa: -7.59,
    },
    cloudCover: {
      noaa: 47.97,
    },
    gust: {
      noaa: 0.48,
    },
    time: "2023-02-10T04:00:00+00:00",
    visibility: {
      noaa: 13.26,
    },
    windSpeed: {
      noaa: 0.37,
    },
  },
  {
    airTemperature: {
      noaa: -5.77,
    },
    cloudCover: {
      noaa: 33.73,
    },
    gust: {
      noaa: 0.44,
    },
    time: "2023-02-10T05:00:00+00:00",
    visibility: {
      noaa: 18.7,
    },
    windSpeed: {
      noaa: 0.21,
    },
  },
  {
    airTemperature: {
      noaa: -3.95,
    },
    cloudCover: {
      noaa: 19.5,
    },
    gust: {
      noaa: 0.4,
    },
    time: "2023-02-10T06:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 0.06,
    },
  },
  {
    airTemperature: {
      noaa: -2.15,
    },
    cloudCover: {
      noaa: 14.67,
    },
    gust: {
      noaa: 0.74,
    },
    time: "2023-02-10T07:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 0.67,
    },
  },
  {
    airTemperature: {
      noaa: -0.36,
    },
    cloudCover: {
      noaa: 9.83,
    },
    gust: {
      noaa: 1.07,
    },
    time: "2023-02-10T08:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.27,
    },
  },
  {
    airTemperature: {
      noaa: 1.43,
    },
    cloudCover: {
      noaa: 5,
    },
    gust: {
      noaa: 1.4,
    },
    time: "2023-02-10T09:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.88,
    },
  },
  {
    airTemperature: {
      noaa: 1.21,
    },
    cloudCover: {
      noaa: 35.33,
    },
    gust: {
      noaa: 1.57,
    },
    time: "2023-02-10T10:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 2,
    },
  },
  {
    airTemperature: {
      noaa: 1,
    },
    cloudCover: {
      noaa: 65.67,
    },
    gust: {
      noaa: 1.73,
    },
    time: "2023-02-10T11:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 2.11,
    },
  },
  {
    airTemperature: {
      noaa: 0.78,
    },
    cloudCover: {
      noaa: 96,
    },
    gust: {
      noaa: 1.9,
    },
    time: "2023-02-10T12:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 2.23,
    },
  },
  {
    airTemperature: {
      noaa: -0.67,
    },
    cloudCover: {
      noaa: 85.97,
    },
    gust: {
      noaa: 1.57,
    },
    time: "2023-02-10T13:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.82,
    },
  },
  {
    airTemperature: {
      noaa: -2.13,
    },
    cloudCover: {
      noaa: 75.93,
    },
    gust: {
      noaa: 1.24,
    },
    time: "2023-02-10T14:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.42,
    },
  },
  {
    airTemperature: {
      noaa: -3.59,
    },
    cloudCover: {
      noaa: 65.9,
    },
    gust: {
      noaa: 0.91,
    },
    time: "2023-02-10T15:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.01,
    },
  },
  {
    airTemperature: {
      noaa: -4.16,
    },
    cloudCover: {
      noaa: 58.03,
    },
    gust: {
      noaa: 0.93,
    },
    time: "2023-02-10T16:00:00+00:00",
    visibility: {
      noaa: 23.17,
    },
    windSpeed: {
      noaa: 1.03,
    },
  },
  {
    airTemperature: {
      noaa: -4.72,
    },
    cloudCover: {
      noaa: 50.17,
    },
    gust: {
      noaa: 0.94,
    },
    time: "2023-02-10T17:00:00+00:00",
    visibility: {
      noaa: 22.21,
    },
    windSpeed: {
      noaa: 1.04,
    },
  },
  {
    airTemperature: {
      noaa: -5.29,
    },
    cloudCover: {
      noaa: 42.3,
    },
    gust: {
      noaa: 0.96,
    },
    time: "2023-02-10T18:00:00+00:00",
    visibility: {
      noaa: 21.25,
    },
    windSpeed: {
      noaa: 1.06,
    },
  },
  {
    airTemperature: {
      noaa: -5.35,
    },
    cloudCover: {
      noaa: 31.4,
    },
    gust: {
      noaa: 0.95,
    },
    time: "2023-02-10T19:00:00+00:00",
    visibility: {
      noaa: 21.39,
    },
    windSpeed: {
      noaa: 1.06,
    },
  },
  {
    airTemperature: {
      noaa: -5.4,
    },
    cloudCover: {
      noaa: 20.5,
    },
    gust: {
      noaa: 0.93,
    },
    time: "2023-02-10T20:00:00+00:00",
    visibility: {
      noaa: 21.53,
    },
    windSpeed: {
      noaa: 1.06,
    },
  },
  {
    airTemperature: {
      noaa: -5.46,
    },
    cloudCover: {
      noaa: 9.6,
    },
    gust: {
      noaa: 0.92,
    },
    time: "2023-02-10T21:00:00+00:00",
    visibility: {
      noaa: 21.68,
    },
    windSpeed: {
      noaa: 1.06,
    },
  },
  {
    airTemperature: {
      noaa: -5.24,
    },
    cloudCover: {
      noaa: 38.2,
    },
    gust: {
      noaa: 0.85,
    },
    time: "2023-02-10T22:00:00+00:00",
    visibility: {
      noaa: 22.5,
    },
    windSpeed: {
      noaa: 0.96,
    },
  },
  {
    airTemperature: {
      noaa: -5.02,
    },
    cloudCover: {
      noaa: 66.8,
    },
    gust: {
      noaa: 0.77,
    },
    time: "2023-02-10T23:00:00+00:00",
    visibility: {
      noaa: 23.32,
    },
    windSpeed: {
      noaa: 0.87,
    },
  },
  {
    airTemperature: {
      noaa: -4.8,
    },
    cloudCover: {
      noaa: 95.4,
    },
    gust: {
      noaa: 0.7,
    },
    time: "2023-02-11T00:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 0.77,
    },
  },
  {
    airTemperature: {
      noaa: -4.29,
    },
    cloudCover: {
      noaa: 96.63,
    },
    gust: {
      noaa: 0.57,
    },
    time: "2023-02-11T01:00:00+00:00",
    visibility: {
      noaa: 16.29,
    },
    windSpeed: {
      noaa: 0.56,
    },
  },
  {
    airTemperature: {
      noaa: -3.78,
    },
    cloudCover: {
      noaa: 97.87,
    },
    gust: {
      noaa: 0.44,
    },
    time: "2023-02-11T02:00:00+00:00",
    visibility: {
      noaa: 8.45,
    },
    windSpeed: {
      noaa: 0.36,
    },
  },
  {
    airTemperature: {
      noaa: -3.27,
    },
    cloudCover: {
      noaa: 99.1,
    },
    gust: {
      noaa: 0.32,
    },
    time: "2023-02-11T03:00:00+00:00",
    visibility: {
      noaa: 0.61,
    },
    windSpeed: {
      noaa: 0.15,
    },
  },
  {
    airTemperature: {
      noaa: -2.63,
    },
    cloudCover: {
      noaa: 92.47,
    },
    gust: {
      noaa: 0.32,
    },
    time: "2023-02-11T04:00:00+00:00",
    visibility: {
      noaa: 5.51,
    },
    windSpeed: {
      noaa: 0.26,
    },
  },
  {
    airTemperature: {
      noaa: -1.98,
    },
    cloudCover: {
      noaa: 85.83,
    },
    gust: {
      noaa: 0.33,
    },
    time: "2023-02-11T05:00:00+00:00",
    visibility: {
      noaa: 10.4,
    },
    windSpeed: {
      noaa: 0.37,
    },
  },
  {
    airTemperature: {
      noaa: -1.34,
    },
    cloudCover: {
      noaa: 79.2,
    },
    gust: {
      noaa: 0.34,
    },
    time: "2023-02-11T06:00:00+00:00",
    visibility: {
      noaa: 15.29,
    },
    windSpeed: {
      noaa: 0.48,
    },
  },
  {
    airTemperature: {
      noaa: 0,
    },
    cloudCover: {
      noaa: 65.67,
    },
    gust: {
      noaa: 0.41,
    },
    time: "2023-02-11T07:00:00+00:00",
    visibility: {
      noaa: 18.24,
    },
    windSpeed: {
      noaa: 0.79,
    },
  },
  {
    airTemperature: {
      noaa: 1.34,
    },
    cloudCover: {
      noaa: 52.13,
    },
    gust: {
      noaa: 0.48,
    },
    time: "2023-02-11T08:00:00+00:00",
    visibility: {
      noaa: 21.19,
    },
    windSpeed: {
      noaa: 1.11,
    },
  },
  {
    airTemperature: {
      noaa: 2.68,
    },
    cloudCover: {
      noaa: 38.6,
    },
    gust: {
      noaa: 0.55,
    },
    time: "2023-02-11T09:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.42,
    },
  },
  {
    airTemperature: {
      noaa: 1.96,
    },
    cloudCover: {
      noaa: 58.7,
    },
    gust: {
      noaa: 1.31,
    },
    time: "2023-02-11T10:00:00+00:00",
    visibility: {
      noaa: 19.13,
    },
    windSpeed: {
      noaa: 1.73,
    },
  },
  {
    airTemperature: {
      noaa: 1.24,
    },
    cloudCover: {
      noaa: 78.8,
    },
    gust: {
      noaa: 2.07,
    },
    time: "2023-02-11T11:00:00+00:00",
    visibility: {
      noaa: 14.13,
    },
    windSpeed: {
      noaa: 2.05,
    },
  },
  {
    airTemperature: {
      noaa: 0.52,
    },
    cloudCover: {
      noaa: 98.9,
    },
    gust: {
      noaa: 2.82,
    },
    time: "2023-02-11T12:00:00+00:00",
    visibility: {
      noaa: 9.13,
    },
    windSpeed: {
      noaa: 2.36,
    },
  },
  {
    airTemperature: {
      noaa: 0.04,
    },
    cloudCover: {
      noaa: 99.1,
    },
    gust: {
      noaa: 2.49,
    },
    time: "2023-02-11T13:00:00+00:00",
    visibility: {
      noaa: 6.64,
    },
    windSpeed: {
      noaa: 1.91,
    },
  },
  {
    airTemperature: {
      noaa: -0.43,
    },
    cloudCover: {
      noaa: 99.3,
    },
    gust: {
      noaa: 2.15,
    },
    time: "2023-02-11T14:00:00+00:00",
    visibility: {
      noaa: 4.15,
    },
    windSpeed: {
      noaa: 1.47,
    },
  },
  {
    airTemperature: {
      noaa: -0.9,
    },
    cloudCover: {
      noaa: 99.5,
    },
    gust: {
      noaa: 1.82,
    },
    time: "2023-02-11T15:00:00+00:00",
    visibility: {
      noaa: 1.65,
    },
    windSpeed: {
      noaa: 1.02,
    },
  },
  {
    airTemperature: {
      noaa: -0.95,
    },
    cloudCover: {
      noaa: 99.57,
    },
    gust: {
      noaa: 1.39,
    },
    time: "2023-02-11T16:00:00+00:00",
    visibility: {
      noaa: 9.15,
    },
    windSpeed: {
      noaa: 0.87,
    },
  },
  {
    airTemperature: {
      noaa: -0.99,
    },
    cloudCover: {
      noaa: 99.63,
    },
    gust: {
      noaa: 0.97,
    },
    time: "2023-02-11T17:00:00+00:00",
    visibility: {
      noaa: 16.64,
    },
    windSpeed: {
      noaa: 0.73,
    },
  },
  {
    airTemperature: {
      noaa: -1.03,
    },
    cloudCover: {
      noaa: 99.7,
    },
    gust: {
      noaa: 0.55,
    },
    time: "2023-02-11T18:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 0.58,
    },
  },
  {
    airTemperature: {
      noaa: -1.24,
    },
    cloudCover: {
      noaa: 95.8,
    },
    gust: {
      noaa: 0.6,
    },
    time: "2023-02-11T19:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 0.64,
    },
  },
  {
    airTemperature: {
      noaa: -1.45,
    },
    cloudCover: {
      noaa: 91.9,
    },
    gust: {
      noaa: 0.65,
    },
    time: "2023-02-11T20:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 0.7,
    },
  },
  {
    airTemperature: {
      noaa: -1.66,
    },
    cloudCover: {
      noaa: 88,
    },
    gust: {
      noaa: 0.71,
    },
    time: "2023-02-11T21:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 0.76,
    },
  },
  {
    airTemperature: {
      noaa: -1.51,
    },
    cloudCover: {
      noaa: 92,
    },
    gust: {
      noaa: 0.76,
    },
    time: "2023-02-11T22:00:00+00:00",
    visibility: {
      noaa: 16.34,
    },
    windSpeed: {
      noaa: 0.72,
    },
  },
  {
    airTemperature: {
      noaa: -1.36,
    },
    cloudCover: {
      noaa: 96,
    },
    gust: {
      noaa: 0.81,
    },
    time: "2023-02-11T23:00:00+00:00",
    visibility: {
      noaa: 8.55,
    },
    windSpeed: {
      noaa: 0.69,
    },
  },
  {
    airTemperature: {
      noaa: -1.21,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 0.86,
    },
    time: "2023-02-12T00:00:00+00:00",
    visibility: {
      noaa: 0.76,
    },
    windSpeed: {
      noaa: 0.65,
    },
  },
  {
    airTemperature: {
      noaa: -1.19,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 0.75,
    },
    time: "2023-02-12T01:00:00+00:00",
    visibility: {
      noaa: 0.6,
    },
    windSpeed: {
      noaa: 0.54,
    },
  },
  {
    airTemperature: {
      noaa: -1.18,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 0.63,
    },
    time: "2023-02-12T02:00:00+00:00",
    visibility: {
      noaa: 0.45,
    },
    windSpeed: {
      noaa: 0.43,
    },
  },
  {
    airTemperature: {
      noaa: -1.16,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 0.52,
    },
    time: "2023-02-12T03:00:00+00:00",
    visibility: {
      noaa: 0.3,
    },
    windSpeed: {
      noaa: 0.32,
    },
  },
  {
    airTemperature: {
      noaa: -0.92,
    },
    cloudCover: {
      noaa: 98.63,
    },
    gust: {
      noaa: 0.65,
    },
    time: "2023-02-12T04:00:00+00:00",
    visibility: {
      noaa: 0.54,
    },
    windSpeed: {
      noaa: 0.39,
    },
  },
  {
    airTemperature: {
      noaa: -0.68,
    },
    cloudCover: {
      noaa: 97.27,
    },
    gust: {
      noaa: 0.79,
    },
    time: "2023-02-12T05:00:00+00:00",
    visibility: {
      noaa: 0.78,
    },
    windSpeed: {
      noaa: 0.45,
    },
  },
  {
    airTemperature: {
      noaa: -0.45,
    },
    cloudCover: {
      noaa: 95.9,
    },
    gust: {
      noaa: 0.93,
    },
    time: "2023-02-12T06:00:00+00:00",
    visibility: {
      noaa: 1.02,
    },
    windSpeed: {
      noaa: 0.52,
    },
  },
  {
    airTemperature: {
      noaa: 0.3,
    },
    cloudCover: {
      noaa: 96.8,
    },
    gust: {
      noaa: 1.59,
    },
    time: "2023-02-12T07:00:00+00:00",
    visibility: {
      noaa: 7.84,
    },
    windSpeed: {
      noaa: 0.84,
    },
  },
  {
    airTemperature: {
      noaa: 1.04,
    },
    cloudCover: {
      noaa: 97.7,
    },
    gust: {
      noaa: 2.25,
    },
    time: "2023-02-12T08:00:00+00:00",
    visibility: {
      noaa: 14.66,
    },
    windSpeed: {
      noaa: 1.17,
    },
  },
  {
    airTemperature: {
      noaa: 1.79,
    },
    cloudCover: {
      noaa: 98.6,
    },
    gust: {
      noaa: 2.9,
    },
    time: "2023-02-12T09:00:00+00:00",
    visibility: {
      noaa: 21.48,
    },
    windSpeed: {
      noaa: 1.49,
    },
  },
  {
    airTemperature: {
      noaa: 2.28,
    },
    cloudCover: {
      noaa: 98.5,
    },
    gust: {
      noaa: 4.72,
    },
    time: "2023-02-12T10:00:00+00:00",
    visibility: {
      noaa: 22.37,
    },
    windSpeed: {
      noaa: 2.44,
    },
  },
  {
    airTemperature: {
      noaa: 2.77,
    },
    cloudCover: {
      noaa: 98.4,
    },
    gust: {
      noaa: 6.54,
    },
    time: "2023-02-12T11:00:00+00:00",
    visibility: {
      noaa: 23.25,
    },
    windSpeed: {
      noaa: 3.38,
    },
  },
  {
    airTemperature: {
      noaa: 3.27,
    },
    cloudCover: {
      noaa: 98.3,
    },
    gust: {
      noaa: 8.36,
    },
    time: "2023-02-12T12:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 4.33,
    },
  },
  {
    airTemperature: {
      noaa: 2.43,
    },
    cloudCover: {
      noaa: 98.87,
    },
    gust: {
      noaa: 9.86,
    },
    time: "2023-02-12T13:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 4.8,
    },
  },
  {
    airTemperature: {
      noaa: 1.6,
    },
    cloudCover: {
      noaa: 99.43,
    },
    gust: {
      noaa: 11.36,
    },
    time: "2023-02-12T14:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.27,
    },
  },
  {
    airTemperature: {
      noaa: 0.77,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 12.86,
    },
    time: "2023-02-12T15:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.74,
    },
  },
  {
    airTemperature: {
      noaa: 0.81,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 12.91,
    },
    time: "2023-02-12T16:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.73,
    },
  },
  {
    airTemperature: {
      noaa: 0.85,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 12.96,
    },
    time: "2023-02-12T17:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.72,
    },
  },
  {
    airTemperature: {
      noaa: 0.88,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.01,
    },
    time: "2023-02-12T18:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.71,
    },
  },
  {
    airTemperature: {
      noaa: 1.17,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.64,
    },
    time: "2023-02-12T19:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 6.14,
    },
  },
  {
    airTemperature: {
      noaa: 1.46,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 14.27,
    },
    time: "2023-02-12T20:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 6.58,
    },
  },
  {
    airTemperature: {
      noaa: 1.75,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 14.9,
    },
    time: "2023-02-12T21:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 7.01,
    },
  },
  {
    airTemperature: {
      noaa: 0.92,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.28,
    },
    time: "2023-02-12T22:00:00+00:00",
    visibility: {
      noaa: 16.11,
    },
    windSpeed: {
      noaa: 6.58,
    },
  },
  {
    airTemperature: {
      noaa: 0.09,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 11.66,
    },
    time: "2023-02-12T23:00:00+00:00",
    visibility: {
      noaa: 8.09,
    },
    windSpeed: {
      noaa: 6.14,
    },
  },
  {
    airTemperature: {
      noaa: -0.74,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 10.03,
    },
    time: "2023-02-13T00:00:00+00:00",
    visibility: {
      noaa: 0.07,
    },
    windSpeed: {
      noaa: 5.71,
    },
  },
  {
    airTemperature: {
      noaa: -1.99,
    },
    cloudCover: {
      noaa: 99.13,
    },
    gust: {
      noaa: 8.72,
    },
    time: "2023-02-13T01:00:00+00:00",
    visibility: {
      noaa: 1.11,
    },
    windSpeed: {
      noaa: 4.7,
    },
  },
  {
    airTemperature: {
      noaa: -3.24,
    },
    cloudCover: {
      noaa: 98.27,
    },
    gust: {
      noaa: 7.42,
    },
    time: "2023-02-13T02:00:00+00:00",
    visibility: {
      noaa: 2.16,
    },
    windSpeed: {
      noaa: 3.68,
    },
  },
  {
    airTemperature: {
      noaa: -4.49,
    },
    cloudCover: {
      noaa: 97.4,
    },
    gust: {
      noaa: 6.11,
    },
    time: "2023-02-13T03:00:00+00:00",
    visibility: {
      noaa: 3.2,
    },
    windSpeed: {
      noaa: 2.67,
    },
  },
  {
    airTemperature: {
      noaa: -4.54,
    },
    cloudCover: {
      noaa: 77.53,
    },
    gust: {
      noaa: 5.04,
    },
    time: "2023-02-13T04:00:00+00:00",
    visibility: {
      noaa: 10.18,
    },
    windSpeed: {
      noaa: 2.34,
    },
  },
  {
    airTemperature: {
      noaa: -4.6,
    },
    cloudCover: {
      noaa: 57.67,
    },
    gust: {
      noaa: 3.97,
    },
    time: "2023-02-13T05:00:00+00:00",
    visibility: {
      noaa: 17.16,
    },
    windSpeed: {
      noaa: 2.02,
    },
  },
  {
    airTemperature: {
      noaa: -4.65,
    },
    cloudCover: {
      noaa: 37.8,
    },
    gust: {
      noaa: 2.91,
    },
    time: "2023-02-13T06:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.69,
    },
  },
  {
    airTemperature: {
      noaa: -3.67,
    },
    cloudCover: {
      noaa: 26.87,
    },
    gust: {
      noaa: 2.65,
    },
    time: "2023-02-13T07:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.73,
    },
  },
  {
    airTemperature: {
      noaa: -2.68,
    },
    cloudCover: {
      noaa: 15.93,
    },
    gust: {
      noaa: 2.38,
    },
    time: "2023-02-13T08:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.76,
    },
  },
  {
    airTemperature: {
      noaa: -1.7,
    },
    cloudCover: {
      noaa: 5,
    },
    gust: {
      noaa: 2.12,
    },
    time: "2023-02-13T09:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.8,
    },
  },
  {
    airTemperature: {
      noaa: -1.51,
    },
    cloudCover: {
      noaa: 8.07,
    },
    gust: {
      noaa: 1.95,
    },
    time: "2023-02-13T10:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.79,
    },
  },
  {
    airTemperature: {
      noaa: -1.33,
    },
    cloudCover: {
      noaa: 11.13,
    },
    gust: {
      noaa: 1.78,
    },
    time: "2023-02-13T11:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.77,
    },
  },
  {
    airTemperature: {
      noaa: -1.14,
    },
    cloudCover: {
      noaa: 14.2,
    },
    gust: {
      noaa: 1.62,
    },
    time: "2023-02-13T12:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.76,
    },
  },
  {
    airTemperature: {
      noaa: -2.6,
    },
    cloudCover: {
      noaa: 33.7,
    },
    gust: {
      noaa: 1.28,
    },
    time: "2023-02-13T13:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.33,
    },
  },
  {
    airTemperature: {
      noaa: -4.06,
    },
    cloudCover: {
      noaa: 53.2,
    },
    gust: {
      noaa: 0.95,
    },
    time: "2023-02-13T14:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 0.89,
    },
  },
  {
    airTemperature: {
      noaa: -5.52,
    },
    cloudCover: {
      noaa: 72.7,
    },
    gust: {
      noaa: 0.62,
    },
    time: "2023-02-13T15:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 0.46,
    },
  },
  {
    airTemperature: {
      noaa: -6.12,
    },
    cloudCover: {
      noaa: 57.97,
    },
    gust: {
      noaa: 0.98,
    },
    time: "2023-02-13T16:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 0.88,
    },
  },
  {
    airTemperature: {
      noaa: -6.73,
    },
    cloudCover: {
      noaa: 43.23,
    },
    gust: {
      noaa: 1.34,
    },
    time: "2023-02-13T17:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 1.31,
    },
  },
  {
    airTemperature: {
      noaa: -7.33,
    },
    cloudCover: {
      noaa: 28.5,
    },
    gust: {
      noaa: 1.71,
    },
    time: "2023-02-13T18:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.73,
    },
  },
  {
    airTemperature: {
      noaa: -7.28,
    },
    cloudCover: {
      noaa: 20.67,
    },
    gust: {
      noaa: 1.86,
    },
    time: "2023-02-13T19:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.74,
    },
  },
  {
    airTemperature: {
      noaa: -7.23,
    },
    cloudCover: {
      noaa: 12.83,
    },
    gust: {
      noaa: 2.01,
    },
    time: "2023-02-13T20:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.74,
    },
  },
  {
    airTemperature: {
      noaa: -7.18,
    },
    cloudCover: {
      noaa: 5,
    },
    gust: {
      noaa: 2.16,
    },
    time: "2023-02-13T21:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.75,
    },
  },
  {
    airTemperature: {
      noaa: -7.06,
    },
    cloudCover: {
      noaa: 31.7,
    },
    gust: {
      noaa: 2,
    },
    time: "2023-02-13T22:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.65,
    },
  },
  {
    airTemperature: {
      noaa: -6.95,
    },
    cloudCover: {
      noaa: 58.4,
    },
    gust: {
      noaa: 1.85,
    },
    time: "2023-02-13T23:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.56,
    },
  },
  {
    airTemperature: {
      noaa: -6.84,
    },
    cloudCover: {
      noaa: 85.1,
    },
    gust: {
      noaa: 1.7,
    },
    time: "2023-02-14T00:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 1.46,
    },
  },
  {
    airTemperature: {
      noaa: -6.7,
    },
    cloudCover: {
      noaa: 73.33,
    },
    gust: {
      noaa: 1.84,
    },
    time: "2023-02-14T01:00:00+00:00",
    visibility: {
      noaa: 22.98,
    },
    windSpeed: {
      noaa: 1.52,
    },
  },
  {
    airTemperature: {
      noaa: -6.56,
    },
    cloudCover: {
      noaa: 61.57,
    },
    gust: {
      noaa: 1.98,
    },
    time: "2023-02-14T02:00:00+00:00",
    visibility: {
      noaa: 21.82,
    },
    windSpeed: {
      noaa: 1.59,
    },
  },
  {
    airTemperature: {
      noaa: -6.42,
    },
    cloudCover: {
      noaa: 49.8,
    },
    gust: {
      noaa: 2.12,
    },
    time: "2023-02-14T03:00:00+00:00",
    visibility: {
      noaa: 20.67,
    },
    windSpeed: {
      noaa: 1.65,
    },
  },
  {
    airTemperature: {
      noaa: -4.8,
    },
    cloudCover: {
      noaa: 56.47,
    },
    gust: {
      noaa: 3.15,
    },
    time: "2023-02-14T04:00:00+00:00",
    visibility: {
      noaa: 21.82,
    },
    windSpeed: {
      noaa: 1.77,
    },
  },
  {
    airTemperature: {
      noaa: -3.18,
    },
    cloudCover: {
      noaa: 63.13,
    },
    gust: {
      noaa: 4.19,
    },
    time: "2023-02-14T05:00:00+00:00",
    visibility: {
      noaa: 22.98,
    },
    windSpeed: {
      noaa: 1.9,
    },
  },
  {
    airTemperature: {
      noaa: -1.55,
    },
    cloudCover: {
      noaa: 69.8,
    },
    gust: {
      noaa: 5.22,
    },
    time: "2023-02-14T06:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 2.02,
    },
  },
  {
    airTemperature: {
      noaa: 0.12,
    },
    cloudCover: {
      noaa: 79.87,
    },
    gust: {
      noaa: 6.72,
    },
    time: "2023-02-14T07:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 3.01,
    },
  },
  {
    airTemperature: {
      noaa: 1.8,
    },
    cloudCover: {
      noaa: 89.93,
    },
    gust: {
      noaa: 8.22,
    },
    time: "2023-02-14T08:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 3.99,
    },
  },
  {
    airTemperature: {
      noaa: 3.47,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 9.71,
    },
    time: "2023-02-14T09:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 4.98,
    },
  },
  {
    airTemperature: {
      noaa: 3.25,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 11.12,
    },
    time: "2023-02-14T10:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.47,
    },
  },
  {
    airTemperature: {
      noaa: 3.03,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 12.52,
    },
    time: "2023-02-14T11:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.95,
    },
  },
  {
    airTemperature: {
      noaa: 2.81,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.93,
    },
    time: "2023-02-14T12:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 6.44,
    },
  },
  {
    airTemperature: {
      noaa: 2.14,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.68,
    },
    time: "2023-02-14T13:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 6.2,
    },
  },
  {
    airTemperature: {
      noaa: 1.47,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.42,
    },
    time: "2023-02-14T14:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.96,
    },
  },
  {
    airTemperature: {
      noaa: 0.8,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.17,
    },
    time: "2023-02-14T15:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.72,
    },
  },
  {
    airTemperature: {
      noaa: 0.73,
    },
    cloudCover: {
      noaa: 89.4,
    },
    gust: {
      noaa: 14.22,
    },
    time: "2023-02-14T16:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.71,
    },
  },
  {
    airTemperature: {
      noaa: 0.66,
    },
    cloudCover: {
      noaa: 78.8,
    },
    gust: {
      noaa: 15.27,
    },
    time: "2023-02-14T17:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.69,
    },
  },
  {
    airTemperature: {
      noaa: 0.59,
    },
    cloudCover: {
      noaa: 68.2,
    },
    gust: {
      noaa: 16.32,
    },
    time: "2023-02-14T18:00:00+00:00",
    visibility: {
      noaa: 24.14,
    },
    windSpeed: {
      noaa: 5.68,
    },
  },
  {
    airTemperature: {
      noaa: 0.32,
    },
    cloudCover: {
      noaa: 54.97,
    },
    gust: {
      noaa: 16.26,
    },
    time: "2023-02-14T19:00:00+00:00",
    visibility: {
      noaa: 23.42,
    },
    windSpeed: {
      noaa: 5.69,
    },
  },
  {
    airTemperature: {
      noaa: 0.05,
    },
    cloudCover: {
      noaa: 41.73,
    },
    gust: {
      noaa: 16.21,
    },
    time: "2023-02-14T20:00:00+00:00",
    visibility: {
      noaa: 22.71,
    },
    windSpeed: {
      noaa: 5.71,
    },
  },
  {
    airTemperature: {
      noaa: -0.21,
    },
    cloudCover: {
      noaa: 28.5,
    },
    gust: {
      noaa: 16.15,
    },
    time: "2023-02-14T21:00:00+00:00",
    visibility: {
      noaa: 21.99,
    },
    windSpeed: {
      noaa: 5.72,
    },
  },
  {
    airTemperature: {
      noaa: -0.19,
    },
    cloudCover: {
      noaa: 52.33,
    },
    gust: {
      noaa: 14.34,
    },
    time: "2023-02-14T22:00:00+00:00",
    visibility: {
      noaa: 14.7,
    },
    windSpeed: {
      noaa: 5.35,
    },
  },
  {
    airTemperature: {
      noaa: -0.16,
    },
    cloudCover: {
      noaa: 76.17,
    },
    gust: {
      noaa: 12.53,
    },
    time: "2023-02-14T23:00:00+00:00",
    visibility: {
      noaa: 7.4,
    },
    windSpeed: {
      noaa: 4.99,
    },
  },
  {
    airTemperature: {
      noaa: -0.14,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 10.72,
    },
    time: "2023-02-15T00:00:00+00:00",
    visibility: {
      noaa: 0.1,
    },
    windSpeed: {
      noaa: 4.62,
    },
  },
  {
    airTemperature: {
      noaa: -0.59,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 9.89,
    },
    time: "2023-02-15T01:00:00+00:00",
    visibility: {
      noaa: 0.09,
    },
    windSpeed: {
      noaa: 4.21,
    },
  },
  {
    airTemperature: {
      noaa: -1.05,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 9.05,
    },
    time: "2023-02-15T02:00:00+00:00",
    visibility: {
      noaa: 0.08,
    },
    windSpeed: {
      noaa: 3.8,
    },
  },
  {
    airTemperature: {
      noaa: -1.51,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 8.22,
    },
    time: "2023-02-15T03:00:00+00:00",
    visibility: {
      noaa: 0.07,
    },
    windSpeed: {
      noaa: 3.39,
    },
  },
  {
    airTemperature: {
      noaa: -1.65,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 7.49,
    },
    time: "2023-02-15T04:00:00+00:00",
    visibility: {
      noaa: 0.26,
    },
    windSpeed: {
      noaa: 3.23,
    },
  },
  {
    airTemperature: {
      noaa: -1.8,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 6.77,
    },
    time: "2023-02-15T05:00:00+00:00",
    visibility: {
      noaa: 0.46,
    },
    windSpeed: {
      noaa: 3.06,
    },
  },
  {
    airTemperature: {
      noaa: -1.95,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 6.05,
    },
    time: "2023-02-15T06:00:00+00:00",
    visibility: {
      noaa: 0.65,
    },
    windSpeed: {
      noaa: 2.9,
    },
  },
  {
    airTemperature: {
      noaa: -1.46,
    },
    cloudCover: {
      noaa: 98.47,
    },
    gust: {
      noaa: 5.91,
    },
    time: "2023-02-15T07:00:00+00:00",
    visibility: {
      noaa: 1.34,
    },
    windSpeed: {
      noaa: 3.14,
    },
  },
  {
    airTemperature: {
      noaa: -0.96,
    },
    cloudCover: {
      noaa: 96.93,
    },
    gust: {
      noaa: 5.78,
    },
    time: "2023-02-15T08:00:00+00:00",
    visibility: {
      noaa: 2.03,
    },
    windSpeed: {
      noaa: 3.38,
    },
  },
  {
    airTemperature: {
      noaa: -0.47,
    },
    cloudCover: {
      noaa: 95.4,
    },
    gust: {
      noaa: 5.64,
    },
    time: "2023-02-15T09:00:00+00:00",
    visibility: {
      noaa: 2.73,
    },
    windSpeed: {
      noaa: 3.62,
    },
  },
  {
    airTemperature: {
      noaa: -0.56,
    },
    cloudCover: {
      noaa: 96.93,
    },
    gust: {
      noaa: 5.98,
    },
    time: "2023-02-15T10:00:00+00:00",
    visibility: {
      noaa: 3.45,
    },
    windSpeed: {
      noaa: 3.66,
    },
  },
  {
    airTemperature: {
      noaa: -0.65,
    },
    cloudCover: {
      noaa: 98.47,
    },
    gust: {
      noaa: 6.31,
    },
    time: "2023-02-15T11:00:00+00:00",
    visibility: {
      noaa: 4.17,
    },
    windSpeed: {
      noaa: 3.7,
    },
  },
  {
    airTemperature: {
      noaa: -0.74,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 6.64,
    },
    time: "2023-02-15T12:00:00+00:00",
    visibility: {
      noaa: 4.9,
    },
    windSpeed: {
      noaa: 3.74,
    },
  },
  {
    airTemperature: {
      noaa: -1.26,
    },
    cloudCover: {
      noaa: 99.97,
    },
    gust: {
      noaa: 6.43,
    },
    time: "2023-02-15T13:00:00+00:00",
    visibility: {
      noaa: 3.34,
    },
    windSpeed: {
      noaa: 3.13,
    },
  },
  {
    airTemperature: {
      noaa: -1.77,
    },
    cloudCover: {
      noaa: 99.93,
    },
    gust: {
      noaa: 6.22,
    },
    time: "2023-02-15T14:00:00+00:00",
    visibility: {
      noaa: 1.79,
    },
    windSpeed: {
      noaa: 2.52,
    },
  },
  {
    airTemperature: {
      noaa: -2.29,
    },
    cloudCover: {
      noaa: 99.9,
    },
    gust: {
      noaa: 6.01,
    },
    time: "2023-02-15T15:00:00+00:00",
    visibility: {
      noaa: 0.24,
    },
    windSpeed: {
      noaa: 1.91,
    },
  },
  {
    airTemperature: {
      noaa: -2.56,
    },
    cloudCover: {
      noaa: 99.93,
    },
    gust: {
      noaa: 6.31,
    },
    time: "2023-02-15T16:00:00+00:00",
    visibility: {
      noaa: 0.21,
    },
    windSpeed: {
      noaa: 2.13,
    },
  },
  {
    airTemperature: {
      noaa: -2.83,
    },
    cloudCover: {
      noaa: 99.97,
    },
    gust: {
      noaa: 6.61,
    },
    time: "2023-02-15T17:00:00+00:00",
    visibility: {
      noaa: 0.19,
    },
    windSpeed: {
      noaa: 2.35,
    },
  },
  {
    airTemperature: {
      noaa: -3.1,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 6.91,
    },
    time: "2023-02-15T18:00:00+00:00",
    visibility: {
      noaa: 0.16,
    },
    windSpeed: {
      noaa: 2.57,
    },
  },
  {
    airTemperature: {
      noaa: -3.44,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 5.82,
    },
    time: "2023-02-15T19:00:00+00:00",
    visibility: {
      noaa: 1.14,
    },
    windSpeed: {
      noaa: 2.19,
    },
  },
  {
    airTemperature: {
      noaa: -3.77,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 4.73,
    },
    time: "2023-02-15T20:00:00+00:00",
    visibility: {
      noaa: 2.12,
    },
    windSpeed: {
      noaa: 1.82,
    },
  },
  {
    airTemperature: {
      noaa: -4.11,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 3.64,
    },
    time: "2023-02-15T21:00:00+00:00",
    visibility: {
      noaa: 3.1,
    },
    windSpeed: {
      noaa: 1.44,
    },
  },
  {
    airTemperature: {
      noaa: -4.45,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 3.9,
    },
    time: "2023-02-15T22:00:00+00:00",
    visibility: {
      noaa: 2.16,
    },
    windSpeed: {
      noaa: 1.48,
    },
  },
  {
    airTemperature: {
      noaa: -4.78,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 4.17,
    },
    time: "2023-02-15T23:00:00+00:00",
    visibility: {
      noaa: 1.22,
    },
    windSpeed: {
      noaa: 1.51,
    },
  },
  {
    airTemperature: {
      noaa: -5.12,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 4.43,
    },
    time: "2023-02-16T00:00:00+00:00",
    visibility: {
      noaa: 0.28,
    },
    windSpeed: {
      noaa: 1.55,
    },
  },
  {
    airTemperature: {
      noaa: -5.55,
    },
    cloudCover: {
      noaa: 98.97,
    },
    gust: {
      noaa: 3.56,
    },
    time: "2023-02-16T01:00:00+00:00",
    visibility: {
      noaa: 0.38,
    },
    windSpeed: {
      noaa: 1.42,
    },
  },
  {
    airTemperature: {
      noaa: -5.97,
    },
    cloudCover: {
      noaa: 97.93,
    },
    gust: {
      noaa: 2.69,
    },
    time: "2023-02-16T02:00:00+00:00",
    visibility: {
      noaa: 0.47,
    },
    windSpeed: {
      noaa: 1.29,
    },
  },
  {
    airTemperature: {
      noaa: -6.4,
    },
    cloudCover: {
      noaa: 96.9,
    },
    gust: {
      noaa: 1.82,
    },
    time: "2023-02-16T03:00:00+00:00",
    visibility: {
      noaa: 0.57,
    },
    windSpeed: {
      noaa: 1.16,
    },
  },
  {
    airTemperature: {
      noaa: -5.9,
    },
    cloudCover: {
      noaa: 95.83,
    },
    gust: {
      noaa: 2.36,
    },
    time: "2023-02-16T04:00:00+00:00",
    visibility: {
      noaa: 1.86,
    },
    windSpeed: {
      noaa: 1.31,
    },
  },
  {
    airTemperature: {
      noaa: -5.4,
    },
    cloudCover: {
      noaa: 94.77,
    },
    gust: {
      noaa: 2.89,
    },
    time: "2023-02-16T05:00:00+00:00",
    visibility: {
      noaa: 3.15,
    },
    windSpeed: {
      noaa: 1.47,
    },
  },
  {
    airTemperature: {
      noaa: -4.9,
    },
    cloudCover: {
      noaa: 93.7,
    },
    gust: {
      noaa: 3.43,
    },
    time: "2023-02-16T06:00:00+00:00",
    visibility: {
      noaa: 4.44,
    },
    windSpeed: {
      noaa: 1.62,
    },
  },
  {
    airTemperature: {
      noaa: -4.02,
    },
    cloudCover: {
      noaa: 95.73,
    },
    gust: {
      noaa: 3.79,
    },
    time: "2023-02-16T07:00:00+00:00",
    visibility: {
      noaa: 8.03,
    },
    windSpeed: {
      noaa: 2.17,
    },
  },
  {
    airTemperature: {
      noaa: -3.14,
    },
    cloudCover: {
      noaa: 97.77,
    },
    gust: {
      noaa: 4.16,
    },
    time: "2023-02-16T08:00:00+00:00",
    visibility: {
      noaa: 11.61,
    },
    windSpeed: {
      noaa: 2.72,
    },
  },
  {
    airTemperature: {
      noaa: -2.27,
    },
    cloudCover: {
      noaa: 99.8,
    },
    gust: {
      noaa: 4.53,
    },
    time: "2023-02-16T09:00:00+00:00",
    visibility: {
      noaa: 15.2,
    },
    windSpeed: {
      noaa: 3.27,
    },
  },
  {
    airTemperature: {
      noaa: -1.95,
    },
    cloudCover: {
      noaa: 78.93,
    },
    gust: {
      noaa: 5.99,
    },
    time: "2023-02-16T10:00:00+00:00",
    visibility: {
      noaa: 18.18,
    },
    windSpeed: {
      noaa: 3.77,
    },
  },
  {
    airTemperature: {
      noaa: -1.63,
    },
    cloudCover: {
      noaa: 58.07,
    },
    gust: {
      noaa: 7.45,
    },
    time: "2023-02-16T11:00:00+00:00",
    visibility: {
      noaa: 21.16,
    },
    windSpeed: {
      noaa: 4.27,
    },
  },
  {
    airTemperature: {
      noaa: -1.31,
    },
    cloudCover: {
      noaa: 37.2,
    },
    gust: {
      noaa: 8.91,
    },
    time: "2023-02-16T12:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 4.77,
    },
  },
  {
    airTemperature: {
      noaa: -1.89,
    },
    cloudCover: {
      noaa: 57.37,
    },
    gust: {
      noaa: 10.38,
    },
    time: "2023-02-16T13:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.18,
    },
  },
  {
    airTemperature: {
      noaa: -2.48,
    },
    cloudCover: {
      noaa: 77.53,
    },
    gust: {
      noaa: 11.85,
    },
    time: "2023-02-16T14:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.6,
    },
  },
  {
    airTemperature: {
      noaa: -3.06,
    },
    cloudCover: {
      noaa: 97.7,
    },
    gust: {
      noaa: 13.32,
    },
    time: "2023-02-16T15:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 6.01,
    },
  },
  {
    airTemperature: {
      noaa: -3.06,
    },
    cloudCover: {
      noaa: 98.47,
    },
    gust: {
      noaa: 13.35,
    },
    time: "2023-02-16T16:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.8,
    },
  },
  {
    airTemperature: {
      noaa: -3.06,
    },
    cloudCover: {
      noaa: 99.23,
    },
    gust: {
      noaa: 13.38,
    },
    time: "2023-02-16T17:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.58,
    },
  },
  {
    airTemperature: {
      noaa: -3.06,
    },
    cloudCover: {
      noaa: 100,
    },
    gust: {
      noaa: 13.41,
    },
    time: "2023-02-16T18:00:00+00:00",
    visibility: {
      noaa: 24.13,
    },
    windSpeed: {
      noaa: 5.37,
    },
  },
];
