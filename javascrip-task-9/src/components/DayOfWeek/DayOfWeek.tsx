import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { WeatherItemType } from "../../utils/types";
import { FC } from "react";
import {
  StyledCard,
  TitleBox,
  PaddingBox,
  StyledBox,
  Brightness,
  WbSunny,
  WbCloudy,
  Air,
  RemoveRedEye,
  WbTwilight,
  NightsStay,
} from "../../styles/StyledComponents";

interface IDayOfWeek {
  day: WeatherItemType[];
}

export const DayOfWeek: FC<IDayOfWeek> = ({ day }) => {
  const [morning, midday, evening, night] = day;
  return (
    <StyledCard elevation={4}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TitleBox>
              <Typography variant="body1">{midday.day}</Typography>
            </TitleBox>
            <PaddingBox>
              <Typography variant="body1">{midday.temperature}</Typography>
              <WbSunny />
            </PaddingBox>
            <TitleBox>
              <StyledBox>
                <WbCloudy />
                <Typography variant="body2">{midday.cloud}</Typography>
              </StyledBox>
              <StyledBox>
                <Air />
                <Typography variant="body2">{midday.windSpeed}</Typography>
              </StyledBox>
              <StyledBox>
                <RemoveRedEye />
                <Typography variant="body2">{midday.visibility}</Typography>
              </StyledBox>
            </TitleBox>
          </Grid>
          <Grid item xs={4}>
            <PaddingBox>
              <WbTwilight />
              <Typography variant="body2">{morning.temperature}</Typography>
            </PaddingBox>
          </Grid>
          <Grid item xs={4}>
            <PaddingBox>
              <Brightness />
              <Typography variant="body2">{evening.temperature}</Typography>
            </PaddingBox>
          </Grid>
          <Grid item xs={4}>
            <PaddingBox>
              <NightsStay />
              <Typography variant="body2">{night.temperature}</Typography>
            </PaddingBox>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};
