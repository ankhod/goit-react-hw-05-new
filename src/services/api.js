// src/services/api.js
import axios from 'axios';

const API_KEY = '9d8e61112a523d121d82d5e1687cdbd6';
const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDhlNjExMTJhNTIzZDEyMWQ4MmQ1ZTE2ODdjZGJkNiIsIm5iZiI6MTc0MjYzNzM1MC41MDEsInN1YiI6IjY3ZGU4OTI2YWRmMjFhMTY2OGY1ODM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AdzUhX6aDNIAceZztc-_VO_kzPbe3lzHAgqEQl_EKlE';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day', {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await api.get('/search/movie', {
    params: {
      api_key: API_KEY,
      query,
      include_adult: false,
      language: 'en-US',
    },
  });
  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await api.get(`/movie/${movieId}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

export const getMovieCredits = async movieId => {
  const response = await api.get(`/movie/${movieId}/credits`, {
    params: { api_key: API_KEY },
  });
  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await api.get(`/movie/${movieId}/reviews`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};
