
import { useEffect, useState } from "react";
import {
    Container,
    Movie,
    MovieList,
    Btn,
    GenreList,
    GenreButton
} from "./style";
import { Link } from "react-router-dom";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const KEY = process.env.REACT_APP_KEY;

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Busca os gêneros disponíveis no TMDB
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Não foi possível carregar os gêneros.");
                }
                return response.json();
            })
            .then((data) => {
                setGenres(data.genres || []);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [KEY]);

    // Busca os filmes populares ou filtra pelo gênero escolhido
    useEffect(() => {
        setLoading(true);
        setError("");

        const endpoint = selectedGenre
            ? `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${selectedGenre}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;

        fetch(endpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Não foi possível carregar os filmes. Confira sua chave do TMDB."
                    );
                }
                return response.json();
            })
            .then((data) => {
                setMovies(data.results || []);
            })
            .catch((error) => {
                setError(error.message);
                setMovies([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [KEY, selectedGenre]);

    return (
        <Container>
            <h1>Movies</h1>

            <h2>Filtrar por gênero</h2>

            <GenreList>
                <GenreButton
                    type="button"
                    $active={selectedGenre === null}
                    onClick={() => setSelectedGenre(null)}
                >
                    Todos
                </GenreButton>

                {genres.map((genre) => (
                    <GenreButton
                        type="button"
                        key={genre.id}
                        $active={selectedGenre === genre.id}
                        onClick={() => setSelectedGenre(genre.id)}
                    >
                        {genre.name}
                    </GenreButton>
                ))}
            </GenreList>

            <h2>
                {selectedGenre === null
                    ? "Filmes populares"
                    : `Filmes de ${
                        genres.find((genre) => genre.id === selectedGenre)
                            ?.name || "gênero selecionado"
                    }`}
            </h2>

            {loading && <p>Carregando filmes...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && movies.length === 0 && (
                <p>Nenhum filme encontrado para este gênero.</p>
            )}

            {!loading && !error && (
                <MovieList>
                    {movies.map((movie) => (
                        <Movie key={movie.id}>
                            {movie.poster_path && (
                                <img
                                    src={`${imagePath}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}

                            <span>{movie.title}</span>

                            <Link to={`/${movie.id}`}>
                                <Btn type="button">Detalhes</Btn>
                            </Link>
                        </Movie>
                    ))}
                </MovieList>
            )}
        </Container>
    );
}

export default Home;