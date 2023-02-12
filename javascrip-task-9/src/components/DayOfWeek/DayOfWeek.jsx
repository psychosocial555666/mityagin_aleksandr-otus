import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import WbCloudyRoundedIcon from "@mui/icons-material/WbCloudyRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";

const DayOfWeek = ({ day }) => {
  return (
    <Card elevation={4} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', backdropFilter: 'blur(50px)' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1">{day[1].day}</Typography>
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
              <Typography variant="body1">{day[1].temperature}</Typography>
              <WbSunnyRoundedIcon
                sx={{ width: 45, height: 45, ml: 1, color: "#ffeb3b" }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <WbCloudyRoundedIcon
                  sx={{ width: 15, height: 15, mr: 1, color: "#008394" }}
                />
                <Typography variant="body2">{day[1].cloud}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AirRoundedIcon
                  sx={{ width: 15, height: 15, mr: 1, color: "#008394" }}
                />
                <Typography variant="body2">{day[1].windSpeed}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RemoveRedEyeRoundedIcon
                  sx={{ width: 15, height: 15, mr: 1, color: "#008394" }}
                />
                <Typography variant="body2">{day[1].visibility}</Typography>
              </Box>
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
                sx={{ width: 20, height: 20, mr: 1, color: "#ffc107" }}
              />
              <Typography variant="body2">{day[0].temperature}</Typography>
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
                sx={{ width: 20, height: 20, mr: 1, color: "#3d5afe" }}
              />
              <Typography variant="body2">{day[2].temperature}</Typography>
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
                sx={{ width: 20, height: 20, mr: 1, color: "#2a3eb1" }}
              />
              <Typography variant="body2">{day[3].temperature}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DayOfWeek;