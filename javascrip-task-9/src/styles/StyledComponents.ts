import styled from "@emotion/styled";
import {
  Box,
  BoxProps,
  Card,
  CardProps,
  IconButton,
  IconButtonProps,
  IconProps,
  Paper,
  PaperProps,
} from "@mui/material";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import WbCloudyRoundedIcon from "@mui/icons-material/WbCloudyRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";

export const StyledCard = styled(Card)<CardProps>(() => ({
  backgroundColor: "rgba(255, 255, 255, 0.01)",
  backdropFilter: "blur(50px)",
}));

export const TitleBox = styled(Box)<BoxProps>(() => ({
  padding: 16,
}));

export const PaddingBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
}));

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
}));

export const WbSunny = styled(WbSunnyRoundedIcon)<IconProps>(() => ({
  width: 45,
  height: 45,
  marginLeft: 8,
  color: "#ffeb3b",
}));

export const WbCloudy = styled(WbCloudyRoundedIcon)<IconProps>(() => ({
  width: 15,
  height: 15,
  marginRight: 8,
  color: "#008394",
}));

export const Air = styled(AirRoundedIcon)<IconProps>(() => ({
  width: 15,
  height: 15,
  marginRight: 8,
  color: "#008394",
}));

export const RemoveRedEye = styled(RemoveRedEyeRoundedIcon)<IconProps>(() => ({
  width: 15,
  height: 15,
  marginRight: 8,
  color: "#008394",
}));

export const NightsStay = styled(NightsStayRoundedIcon)<IconProps>(() => ({
  width: 20,
  height: 20,
  marginRight: 8,
  color: "#2a3eb1",
}));

export const WbTwilight = styled(WbTwilightRoundedIcon)<IconProps>(() => ({
  width: 20,
  height: 20,
  marginRight: 8,
  color: "#ffc107",
}));

export const Brightness = styled(Brightness4RoundedIcon)<IconProps>(() => ({
  width: 20,
  height: 20,
  marginRight: 8,
  color: "#3d5afe",
}));

export const StyledPaper = styled(Paper)<PaperProps>(() => ({
  padding: 16,
  marginTop: 8,
  display: "flex",
  flexGrow: 1,
}));

export const StyledIconButton = styled(IconButton)<IconButtonProps>(() => ({
  padding: 10,
}));
