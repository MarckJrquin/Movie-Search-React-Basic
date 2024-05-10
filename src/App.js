import {useEffect, useState} from 'react';

import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com/?apikey=b6003d8a';

const movie = {
    "Title": "Shrek 2",
    "Year": "2004",
    "imdbID": "tt0298148",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovie('shrek');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovie(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )
                : (
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )
            }     
        </div>
    );
}

export default App;