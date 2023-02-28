import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import { WeatherItemType } from "../../utils/types";

export const Today = ({ day }: { day: WeatherItemType[] }) => (
  <Card
    elevation={4}
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(50px)",
    }}
  >
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h2">Сегодня</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h1">{day[1].temperature}</Typography>
            <WbSunnyRoundedIcon
              sx={{ width: 70, height: 70, ml: 2, color: "#ffeb3b" }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2">Облачность {day[1].cloud}</Typography>
            <Typography variant="body2">
              Скорость ветра {day[1].windSpeed}
            </Typography>
            <Typography variant="body2">
              Порывы ветра до {day[1].gust}
            </Typography>
            <Typography variant="body2">
              Видимость {day[1].visibility}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <WbTwilightRoundedIcon
              sx={{ width: 30, height: 30, mr: 1, color: "#ffc107" }}
            />
            <Typography variant="body1">{day[0].temperature}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Brightness4RoundedIcon
              sx={{ width: 30, height: 30, mr: 1, color: "#3d5afe" }}
            />
            <Typography variant="body1">{day[2].temperature}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <NightsStayRoundedIcon
              sx={{ width: 30, height: 30, mr: 1, color: "#2a3eb1" }}
            />
            <Typography variant="body1">{day[3].temperature}</Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
