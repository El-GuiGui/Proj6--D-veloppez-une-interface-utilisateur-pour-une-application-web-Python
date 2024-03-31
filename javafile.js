// Récupération modal
var modal = document.getElementById("Modaldetails");

// Récupération de tous les boutons qui ouvrent la modal
var btns = document.querySelectorAll(".open-modal-btn");

// Récupération de l'élément <span> qui ferme la modal
var span = document.getElementsByClassName("close")[0];

// Ouvre la modal, après l'ppuie sur le bouton
btns.forEach(function (btn) {
    btn.onclick = function () {
        modal.style.display = "block";
    }
});

// Ferme la modal avec le bouton
span.onclick = function () {
    modal.style.display = "none";
}

// Ferme la modal si clique extérieur à celui-ci
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}







// Gestion avec l'api
// best movie 
// Trie avec l'imdb décroissant en prenant le premier résultats sortie, donc le score le plus élever
async function loadBestMovie() {
    try {
        // Récupére la liste des films
        const response = await fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score');
        const data = await response.json();

        // Prend le premier film après avoir trier par score imdb, le plus haut ressort en premier
        const bestMovie = data.results[0];

        // Récupére les détails du meilleur film en utilisant son URL
        const bestMovieDetailsResponse = await fetch(bestMovie.url);
        const bestMovieDetails = await bestMovieDetailsResponse.json();

        // Affiche les détails du meilleur film, envoi directement avec le sélecteur css !
        document.querySelector('#best-movie .movie-info h3').textContent = bestMovieDetails.title;
        document.querySelector('#best-movie .movie-info p').textContent = bestMovieDetails.description; // Assurez-vous que la description est disponible
        document.querySelector('#best-movie img').src = bestMovieDetails.image_url;

        const bestMovieDetailButton = document.querySelector('#best-movie .button_détails1');
        if (bestMovieDetailButton) {
            bestMovieDetailButton.onclick = function () {
                loadAndDisplayMovieDetails(bestMovie.id);
            };
        }

    } catch (error) {
        console.log('Erreur lors du chargement du meilleur film:', error);
    }
}

// Catégorie choisi
// Load catégories
async function loadMoviesByCategory(genre, containerSelector) {
    try {
        let movies = [];
        let currentPage = 1;
        let url = `http://127.0.0.1:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score&page=${currentPage}`;

        // Check les pages, jusqu'à avor 6 films
        while (movies.length < 6) {
            const response = await fetch(url);
            const data = await response.json();

            // Ajoutez les films de la réponse actuelle à la liste des films
            movies = movies.concat(data.results.slice(0, 6 - movies.length));

            if (data.next && movies.length < 6) {
                // Check film et page
                url = data.next;
                currentPage += 1;
            } else {
                // Plus de pages ou suffisament de films collecté
                break;
            }
        }

        // Contenu vide avant d'injecter 
        const movieGrid = document.querySelector(containerSelector);
        movieGrid.innerHTML = '';

        const defaultImage = 'images/image_non_disponible3.png'; // Image par défaut si aucune image possible

        // Injectez chaque film dans la structure HTML
        movies.forEach((movie) => {
            const movieCardHtml = `
                <div class="movie-card">
                    <img src="${movie.image_url}" alt="${movie.title}" onerror="this.onerror=null; this.src='${defaultImage}';">
                    <div class="movie-overlay">
                        <h5>${movie.title}</h5>
                        <button class="button-details open-modal-btn" data-movie-id="${movie.id}">Détails</button>
                    </div>
                </div>
            `;
            movieGrid.innerHTML += movieCardHtml;
        });

    } catch (error) {
        console.error('Erreur lors du chargement des films de la catégorie:', genre, error);
    }
}


document.querySelectorAll('.movie-grid').forEach(movieGrid => {
    movieGrid.addEventListener('click', function (event) {
        let target = event.target;

        // Monter dans le data-movie-id
        while (target != null && target != this && !target.dataset.movieId) {
            target = target.parentElement;
        }

        // Si un élément avec data-movie-id a été cliqué
        if (target && target.dataset.movieId) {
            const movieId = target.dataset.movieId;
            loadAndDisplayMovieDetails(movieId);
        }
    });
});



// Load ALL catégories
async function loadMoviesForAllCategories() {
    // Sélectionne toutes les sections 'movie-category' de l'HTML
    const categories = document.querySelectorAll('.movie-category');

    // Boucle sur chaque catégorie pour charger les films correspondants
    categories.forEach(async (categoryElement) => {
        // Obtien le genre de la catégorie à partir de l'attribut 'data-genre'
        const genre = categoryElement.getAttribute('data-genre');

        // Construis le sélecteur pour le conteneur de grille de films dans cette catégorie
        const gridSelector = '.movie-grid';

        // Charge les films pour cette catégorie et les inserts
        await loadMoviesByCategory(genre, categoryElement.querySelector(gridSelector));
    });
}





// Pour modal et détails
async function loadAndDisplayMovieDetails(movieId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/${movieId}`);
        const movieDetails = await response.json();

        // Afficher les détails du film dans le modal
        const modal = document.getElementById('Modaldetails');
        modal.querySelector('.modal-title').textContent = movieDetails.title;
        modal.querySelector('.modal-image').src = movieDetails.image_url;
        modal.querySelector('.modal-genre').textContent = movieDetails.genres.join(', ');
        modal.querySelector('.modal-date').textContent = movieDetails.date_published.split("-")[0];
        modal.querySelector('.modal-rated').textContent = `PG-${movieDetails.rated}`;
        modal.querySelector('.modal-imdb-score').textContent = `IMDB score: ${movieDetails.imdb_score}`;
        modal.querySelector('.modal-directors-list').textContent = movieDetails.directors.join(', ');
        modal.querySelector('.modal-description').textContent = movieDetails.description;
        modal.querySelector('.modal-actors').textContent = movieDetails.actors.join(', ');
        modal.querySelector('.modal-duration').textContent = `${movieDetails.duration} minutes`;
        modal.querySelector('.modal-country').textContent = `(${movieDetails.countries.join(', ')})`;
        modal.querySelector('.modal-box-office').textContent = `Recettes: ${movieDetails.worldwide_gross_income}`;

        const defaultModalImage = 'images/image_non_disponible3.png'; // Chemin de votre image par défaut
        const modalImage = modal.querySelector('.modal-image');
        // Utilise l'image par défaut si aucune image ne charge depuis l'API
        modalImage.src = movieDetails.image_url || defaultModalImage;
        modalImage.onerror = function () {
            this.src = defaultModalImage;
        };

        // Afficher le modal
        modal.style.display = "block";
    } catch (error) {
        console.log('Erreur lors du chargement des détails de ce film:', error);
    }
}


// Catégories libres / autres 
// Chargement des genres 
async function loadGenres() {
    try {
        let genres = [];
        let url = 'http://127.0.0.1:8000/api/v1/genres/';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            genres = genres.concat(data.results.map(result => result.name));
            url = data.next; // Si 'next' est null, la boucle s'arrêtera
        }
        // Sélectionne les deux listes déroulantes pour les deux champs 'autres'
        const select1 = document.getElementById('category-select1');
        const select2 = document.getElementById('category-select2');

        // Duplique le code de remplissage pour les deux listes
        genres.forEach(genre => {
            const option1 = document.createElement('option');
            option1.value = genre;
            option1.textContent = genre;
            select1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = genre;
            option2.textContent = genre;
            select2.appendChild(option2);
        });

        // Choisis un genre aléatoire par défaut pour chaque liste
        select1.value = genres[Math.floor(Math.random() * genres.length)];
        loadMoviesByCategory(select1.value, '.movie-category[data-genre="custom1"] .movie-grid');

        select2.value = genres[Math.floor(Math.random() * genres.length)];
        loadMoviesByCategory(select2.value, '.movie-category[data-genre="custom2"] .movie-grid');

    } catch (error) {
        console.error('Erreur lors du chargement des genres:', error);
    }
}


// Pour bouton "voir plus" et "voir moins" 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.movie-category').forEach(category => {
        const grid = category.querySelector('.movie-grid');
        const btn = document.createElement('button');
        btn.className = 'toggle-more-btn'; // Ajoute une classe pour le ciblage CSS
        btn.innerText = 'Voir plus';
        btn.style.backgroundColor = 'red';
        btn.style.color = 'white';
        btn.style.padding = '10px 40px';
        btn.style.margin = '20px auto';
        btn.style.display = 'block';
        btn.style.cursor = 'pointer';
        btn.style.borderRadius = '20px';
        btn.style.border = 'none';

        let isExpanded = false;
        btn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            btn.innerText = isExpanded ? 'Voir moins' : 'Voir plus';
            grid.querySelectorAll('.movie-card:nth-of-type(n+3)').forEach((card, index) => {
                card.style.display = isExpanded ? 'block' : 'none';
            });
        });

        // Initialement, cache tous sauf les deux premiers films
        grid.querySelectorAll('.movie-card:nth-of-type(n+3)').forEach(card => {
            card.style.display = 'none';
        });

        category.appendChild(btn);
    });
});





// Load content bas de page ...
document.getElementById('category-select1').addEventListener('change', function () {
    const genre = this.value;
    loadMoviesByCategory(genre, '.movie-category[data-genre="custom1"] .movie-grid');
});

document.getElementById('category-select2').addEventListener('change', function () {
    const genre = this.value;
    loadMoviesByCategory(genre, '.movie-category[data-genre="custom2"] .movie-grid');
});


document.querySelectorAll('.button-details').forEach(button => {
    button.addEventListener('click', function () {
        const movieId = this.getAttribute('data-movie-id');
        loadAndDisplayMovieDetails(movieId);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    loadMoviesForAllCategories();
});

document.addEventListener('DOMContentLoaded', function () {
    loadBestMovie();
    loadMoviesByCategory('Action', '.movie-category[data-genre="Action"] .movie-grid');
    loadMoviesByCategory('Animation', '.movie-category[data-genre="Animation"] .movie-grid');
    loadMoviesByCategory('Sci-Fi', '.movie-category[data-genre="Sci-Fi"] .movie-grid');
    loadGenres();
});