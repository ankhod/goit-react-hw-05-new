// src/components/MovieReviews/MovieReviews.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        setError('Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {reviews.length === 0 && !loading && <p>No reviews available</p>}
      <ul className={styles.list}>
        {reviews.map(review => (
          <li key={review.id} className={styles.item}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
