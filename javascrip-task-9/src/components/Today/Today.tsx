import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { WeatherItemType } from "../../utils/types";
import { FC } from "react";
import {
  Brightness,
  NightsStay,
  PaddingBox,
  StyledCard,
  TitleBox,
  WbSunny,
  WbTwilight,
} from "../../styles/StyledComponents";

interface IToday {
  day: WeatherItemType[];
}

export const Today: FC<IToday> = ({ day }) => {
  const [morning, midday, evening, night] = day;
  return (
    <StyledCard elevation={4}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TitleBox>
              <Typography variant="h2">Сегодня</Typography>
            </TitleBox>
            <PaddingBox>
              <Typography variant="h1">{midday.temperature}</Typography>
              <WbSunny />
            </PaddingBox>
            <TitleBox>
              <Typography variant="body2">Облачность {midday.cloud}</Typography>
              <Typography variant="body2">
                Скорость ветра {midday.windSpeed}
              </Typography>
              <Typography variant="body2">
                Порывы ветра до {midday.gust}
              </Typography>
              <Typography variant="body2">
                Видимость {midday.visibility}
              </Typography>
            </TitleBox>
          </Grid>
          <Grid item xs={4}>
            <PaddingBox>
              <WbTwilight />
              <Typography variant="body1">{morning.temperature}</Typography>
            </PaddingBox>
          </Grid>
          <Grid item xs={4}>
            <PaddingBox>
              <Brightness />
              <Typography variant="body1">{evening.temperature}</Typography>
            </PaddingBox>
          </Grid>
          <Grid item xs={4}>
            <PaddingBox>
              <NightsStay />
              <Typography variant="body1">{night.temperature}</Typography>
            </PaddingBox>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};
