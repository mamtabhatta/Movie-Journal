import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [message, setMessage] = useState("");
    useEffect(() => {
        const movieDetail = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/movies/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                setMovie(res.data);
            } catch (error) {
                setMessage("Failed to load movies: " + (error.response?.data?.message || error.message))
            }
        };
        movieDetail();
    }, [id])

    return (
        <div className="movie-detail">
            <div className="movie-detail__poster">
                <img src={movie.poster} alt={movie.title} />
            </div>

            <div className="movie-detail__content">
                <h1 className="movie-detail__title">{movie.title}</h1>

                <section className="movie-detail__section">
                    <h2 className="movie-detail__section-heading">Basic Info</h2>
                    <ul className="movie-detail__info">
                        <li className="movie-detail__info-item"><strong>Genre:</strong> {movie.genre}</li>
                        <li className="movie-detail__info-item"><strong>Year:</strong> {movie.year}</li>
                        <li className="movie-detail__info-item"><strong>Duration:</strong> {movie.duration}</li>
                        <li className="movie-detail__info-item"><strong>Status:</strong> {movie.status}</li>
                    </ul>
                </section>

                <section className="movie-detail__section synopsis">
                    <h2 className="movie-detail__section-heading">Synopsis</h2>
                    <p>{movie.synopsis}</p>
                </section>


                <section className="movie-detail__section">
                    <h2 className="movie-detail__section-heading">Cast & Crew</h2>
                    <ul className="movie-detail__info">
                        <li className="movie-detail__info-item cast"><strong>Cast:</strong> <span>{movie.cast?.join(", ")}</span></li>
                        <li className="movie-detail__info-item"><strong>Rating:</strong> {movie.rating}</li>
                        <li className="movie-detail__info-item"><strong>Review:</strong> {movie.review}</li>
                    </ul>
                </section>
            </div>
        </div>

    )
}

export default MovieDetail

