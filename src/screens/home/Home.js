import './Home.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header.js';
import Details from '../details/Details.js';

import moviesData from '../../common/header/moviesData.js';
import artists from '../../common/header/artists.js';
import genres from '../../common/header/genres.js';
 
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            movieName: '',
            upcomingMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            genresList: genres,
            artistsList: artists,
            releaseDateStart: '',
            releaseDateEnd: ''
        }
    }
    movieNameChangeHandler = event => {
        this.setState({ movieName: event.target.value });
      }

      genreSelectHandler = event => {
        this.setState({ genres: event.target.value });
      }

      artistSelectHandler = event => {
        this.setState({ artists: event.target.value });
      }

      releaseDateStartHandler = event => {
        this.setState({ releaseDateStart: event.target.value });
      }

      releaseDateEndHandler = event => {
        this.setState({ releaseDateEnd: event.target.value });
      }

      movieClickHandler = (movieId) => {
        ReactDOM.render(<Details movieId={movieId} />, document.getElementById('root'));
      }

    render() {
        var filteredList=moviesData.filter((movie)=>{
            return(movie.title=== this.state.movieName ||this.state.artists.includes( (movie.artists[0].first_name+' '+movie.artists[0].last_name)))
        })
        if(this.state.movieName.length === 0  && this.state.artists.length === 0){
            filteredList=moviesData;
        }

        return(
            <div style={{fontFamily: "Roboto"}}>
                <Header />
    
                <div className='upcomingHead'>Upcoming Movies</div>
                <GridList cols={5}>
                    {moviesData.map((card) => (
                    <GridListTile key={card.id}>
                        <img src={card.poster_url} alt={card.title} />
                        <GridListTileBar title={card.title} />
                    </GridListTile>
                    ))}
                </GridList><br /> <br />
    
                <div className='flex-container'>
                    <div className='left'>
                    <GridList cellHeight={350} cols={4}>
                    {filteredList.map((movie) => (
                         <GridListTile class="movie-card" onClick={() => this.movieClickHandler(movie.id)} key={'grid' + movie.id} >
                        <img
                            src={movie.poster_url}
                            className='movie-poster2'
                            alt={movie.title}
                        />
                        <GridListTileBar
                            title={movie.title}
                            subtitle={
                            <span>
                                Release Date:
                                {new Date(movie.release_date).toDateString()}
                            </span>
                            }
                        />
                        </GridListTile>
                    ))}
                    </GridList>
                    </div>
                    <div className='right'>

                        <Card>
                        <CardContent className='cardContent'>
                            <FormControl className='formHead'>
                            <Typography lassName="theme-primary-color text-uppercase" color="primary">
                            Find movies by:
                            </Typography>
                                </FormControl><br />
                                <FormControl>
                                <TextField id='standard-basic' label='Movie Name' variant='standard' />
                                </FormControl><br /><br />
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='select-genre-label'>Genres</InputLabel>
                                    <Select
                                        labelId='select-genre-label'
                                        multiple
                                        input={<Input id='select-genre' />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}
                                    >
                                        {genres.map(genre => (
                                            <MenuItem key={genre.id} value={genre.name}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
                                                <ListItemText primary={genre.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id='dropdown' variant='standard'>
                                    <InputLabel htmlFor='select-artist-label'>Artists</InputLabel>
                                    <Select
                                        labelId='select-artist-label'
                                        multiple
                                        input={<Input id='select-artist' />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.artistSelectHandler}
                                    >
                                        {artists.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + ' ' + artist.last_name}>
                                            <Checkbox checked={this.state.artists.indexOf(artist.first_name + ' ' + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + ' ' + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl><br /><br />
                                <FormControl>
                                <TextField label='Release Date Beg' type='date' InputLabelProps={{ shrink: true }} />
                                </FormControl><br /><br />
                                <FormControl>
                                <TextField label='Release Date End' type='date' InputLabelProps={{ shrink: true }} />
                                </FormControl><br /><br /><br />
                                <FormControl>
                                <Button  variant='contained' color='primary'>APPLY</Button>
                                </FormControl>

                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        );
    }
}
export default Home;