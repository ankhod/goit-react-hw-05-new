// src/components/MovieList/MovieList.jsx
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }} // Зберігаємо попередню локацію з параметрами
            className={styles.link}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <span className={styles.title}>{movie.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
