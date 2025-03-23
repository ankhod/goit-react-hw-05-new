// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/movies';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(from.pathname + from.search); // Повертаємося з усіма параметрами URL
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go back
      </button>
      <div className={styles.movieInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h1>{movie.title}</h1>
          <p>Rating: {movie.vote_average}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className={styles.additional}>
        <h2>Additional Information</h2>
        <div className={styles.links}>
          <button
            onClick={() =>
              navigate(`/movies/${movieId}/cast`, { state: { from } })
            }
            className={styles.linkButton}
          >
            Cast
          </button>
          <button
            onClick={() =>
              navigate(`/movies/${movieId}/reviews`, { state: { from } })
            }
            className={styles.linkButton}
          >
            Reviews
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;
