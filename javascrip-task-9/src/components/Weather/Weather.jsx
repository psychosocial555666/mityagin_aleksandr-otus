import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getWeatherData } from "../../utils/utils";
import Today from "../Today/Today";
import DayOfWeek from "../DayOfWeek/DayOfWeek";

const Weather = () => {
  const city = useLoaderData();
  const [data, setData] = useState([]);

  useEffect(() => {
    getWeatherData(city, setData);
  }, [city]);

  return (
    <Grid container spacing={2} sx={{ p: 0, pt: 3 }}>
      {data.map((day, index) => {
        if (index === 0) {
          return (
            <Grid item xs={3}>
              <Today day={day} />
            </Grid>
          );
        } else {
          return (
            <Grid item xs={1.5}>
              <DayOfWeek day={day} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default Weather;
