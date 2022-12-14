import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Filter(props) {

  const [genres, setGenres] = useState();
  const [artists, setArtists] = useState();

  const [genrename, setGenrename] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [movieName, setMovieName] = React.useState("");


  useEffect(() => {

    let tempGenres = [];
    let tempArtists = [];
    
    props.movieList.forEach((element) => {
      element.genres.forEach((genres) => {
        if (tempGenres.indexOf(genres) === -1) {
          tempGenres.push(genres);
        }
      });
      element.artists.forEach((artist) => {
        if (
          tempArtists.indexOf(artist.first_name + " " + artist.last_name) === -1
        ) {
          tempArtists.push(artist.first_name + " " + artist.last_name);
        }
      });
    });

    setGenres(tempGenres);
    setArtists(tempArtists);
  }, [props]);

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleGenreChange = (event) => {
    setGenrename(event.target.value);
  };
  const handleMovieName = (event) => {
    setMovieName(event.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.filterTrigger({
      movieName: movieName,
      personName: personName,
      genrename: genrename,
    });
  };

  return (
    <Card>
      <form name="movieDetails" id="movieDetails">
        <CardContent>
          <Typography
            className="theme-primary-color text-uppercase" color="primary"
            gutterBottom={true}
          >
            Find movies by:
          </Typography>
          <br />

          <FormControl className="formControl">
            <InputLabel htmlFor="movieName">Movie Name</InputLabel>
            <Input
              id="movieName"
              name="movieName"
              value={movieName}
              onChange={handleMovieName}
            />
          </FormControl>
          <br />
          <br />
          <FormControl className="formControl">
            <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple = "true"
              value={genrename}
              onChange={handleGenreChange}
              input={<Input />}
              name="genrename"
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {genres &&
                genres.map((name) => (
                  <MenuItem key={name.id} value={name.genrename}>
                    <Checkbox checked={genrename.indexOf(name) > -1} />
                    <ListItemText primary={name.genrename} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl className="formControl">
            <InputLabel id="demo-mutiple-checkbox-label">Artists</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={personName}
              onChange={handlePersonChange}
              input={<Input />}
              name="personName"
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {artists &&
                artists.map((name) => (
                  <MenuItem key={name.id} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl className="formControl">
            <TextField
              id="releaseDateStart"
              label="Release Date Start"
              type="date"
              name="releaseDateStart"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl className="formControl">
            <TextField
              id="releaseDateEnd"
              label="Release Date End"
              type="date"
              name="releaseDateEnd"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <br />
          <br />
        </CardContent>
        <CardActions>
          <Button
            onClick={handleSubmitForm}
            fullWidth={true}
            variant="contained"
            color="primary"
          >
            Apply
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default Filter;