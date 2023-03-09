import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { CityType } from "../../utils/types";
import {
  StyledIconButton,
  StyledPaper,
  TitleBox,
} from "../../styles/StyledComponents";

export const App: FC = () => {
  const { citiesList } = useLoaderData() as { citiesList: CityType[] };
  const [selected, setSelected] = useState<string | null>(null);

  const changeHandler = (
    evt: React.SyntheticEvent<Element, Event>,
    option: CityType | null
  ) => {
    option && setSelected(option.id);
  };

  return (
    <TitleBox>
      <StyledPaper elevation={6}>
        <Autocomplete
          autoHighlight
          size="small"
          options={citiesList}
          getOptionLabel={(option) => option.city || ""}
          onChange={changeHandler}
          sx={{ flexGrow: 1 }}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.city}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} color="success" label="Поиск" />
          )}
        />
        <Link to={`weather/${selected}`}>
          <StyledIconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </StyledIconButton>
        </Link>
      </StyledPaper>
      <Outlet />
    </TitleBox>
  );
};
