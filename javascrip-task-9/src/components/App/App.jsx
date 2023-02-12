import TextField from "@mui/material/TextField";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

function App() {
  const { citiesList } = useLoaderData();
  const [selected, setSelected] = useState();

  const changeHandler = (evt, option) => {
    setSelected(option.id);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mt: 1, display: "flex", flexGrow: 1 }} elevation={6}>
        <Autocomplete
          autoHighlight
          size="small"
          options={citiesList}
          getOptionLabel={(option) => option.city}
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
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Link>
      </Paper>
      <Outlet />
    </Box>
  );
}

export default App;
