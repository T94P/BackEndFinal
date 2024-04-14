document.addEventListener('DOMContentLoaded', () => {
  const movieListSection = document.getElementById('movie-list');
  const token = localStorage.getItem('token');

  function loadMovieTrailers() {
      const headers = new Headers({
          'Content-Type': 'application/json',
      });

      if (token) {
          headers.append('Authorization', `Bearer ${token}`);
          fetch('http://localhost:3000/api/movies', { headers: headers })
              .then(response => {
                  if (response.ok) {
                      return response.json();
                  } else if (response.status === 401) {
                      throw new Error('Unauthorized: No token provided or token is invalid.');
                  } else {
                      throw new Error('An error occurred while fetching the movies.');
                  }
              })
              .then(movies => {
                  movies.forEach(movie => {
                      const movieItem = document.createElement('article');
                      movieItem.classList.add('movie');
                      movieItem.innerHTML = `
                          <h3>${movie.title}</h3>
                          <p>Release Date: ${movie.releaseDate}</p>
                          <a href="${movie.trailerLink}" target="_blank">Watch Trailer</a>
                          <img src="assets/images/${movie.poster}" alt="${movie.title} Poster">
                      `;
                      movieListSection.appendChild(movieItem);
                  });
              })
              .catch(error => {
                  console.error('Error fetching movies:', error);
                  movieListSection.innerHTML = '<p>Failed to load movie trailers. Please try again later.</p>';
                  if (error.message.includes('Unauthorized')) {
                      // Redirect to login only if unauthorized
                      window.location.href = 'login.html';
                  }
              });
      } else {
          if (!token && !location.pathname.endsWith('login.html') && !location.pathname.endsWith('register.html') && !location.pathname.endsWith('index.html') && location.pathname !== '/') {
            window.location.href = 'login.html';
          } else {
              movieListSection.innerHTML = '<p>Welcome to Movie Trailer Rating. Log in to see the trailers, or register if you don’t have an account.</p>';
          }
      }
  }

  loadMovieTrailers();
});
