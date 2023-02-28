import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getWeatherData } from "../../utils/utils";
import { Today } from "../Today/Today";
import { DayOfWeek } from "../DayOfWeek/DayOfWeek";
import { CityType, WeatherItemType } from "../../utils/types";

export const Weather = () => {
  const city = useLoaderData() as CityType;
  const [data, setData] = useState<WeatherItemType[][]>([]);

  useEffect(() => {
    getWeatherData(city, setData);
  }, [city]);

  return (
    <Grid container spacing={2} sx={{ p: 0, pt: 3 }}>
      {data.map((day, index) =>
        index === 0 ? (
          <Grid item xs={3} key={day[0].day}>
            <Today day={day} />
          </Grid>
        ) : (
          <Grid item xs={1.5} key={day[0].day}>
            <DayOfWeek day={day} />
          </Grid>
        )
      )}
    </Grid>
  );
};
