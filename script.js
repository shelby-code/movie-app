const API_URL = 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5fc66d40bc4b59be02ebfd3de3a15091&page=1'

const IMG_URL = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=5fc66d40bc4b59be02ebfd3de3a15091&query="'

const input = document.getElementById('input')
const form = document.getElementById('form')
const main = document.querySelector('#main')
updateMovies(API_URL)

async function updateMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie

        const createEl = document.createElement('div')
        createEl.classList.add('movie')

        createEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
            
        <div class="movie-title">
            <div class="name">${title}</div>
            <div class="${getClassByVote(vote_average)} rating">${vote_average}</div>
        </div>
        
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(createEl)
    })

    
}

function getClassByVote (vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else{
        return 'red'
    }
    
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const search = input.value

    if(search && search !== ""){
        updateMovies(SEARCH_URL + search)

        input.value = ''

    }else{
        window.location.reload()
    }
})