export type CityType = {
  city: string;
  id: string;
  lat: string;
  lng: string;
};

export type WeatherRawDataType = {
  airTemperature: {
    noaa: number;
  };
  cloudCover: {
    noaa: number;
  };
  gust: {
    noaa: number;
  };
  time: string;
  visibility: {
    noaa: number;
  };
  windSpeed: {
    noaa: number;
  };
};

export type WeatherItemType = {
  temperature: string;
  cloud: string;
  gust: string;
  time: string;
  day: string;
  visibility: string;
  windSpeed: string;
};

export type ErrorType = {
  statusText: string;
  message: string;
};