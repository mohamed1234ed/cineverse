// 🎬 CineVerse - Movie Database (Internet movie images)
const moviesData = [
  {
    id: 1,
    title: "Inception",
    rating: "8.8",
    genre: "Sci-Fi",
    image: "https://images-na.ssl-images-amazon.com/images/I/51zUbui+gbL.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    description: "A skilled thief navigates a dreamworld to steal secrets from a corporate executive.",
    year: 2010,
    duration: "148 min",
    featured: true
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: "9.0",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
    year: 2008,
    duration: "152 min",
    featured: true
  },
  {
    id: 3,
    title: "Interstellar",
    rating: "8.6",
    genre: "Sci-Fi",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description: "A team of astronauts travel through a wormhole near Saturn in search of a new home.",
    year: 2014,
    duration: "169 min",
    featured: true
  },
  {
    id: 4,
    title: "Pulp Fiction",
    rating: "8.9",
    genre: "Drama",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    description: "Multiple interconnected stories of Los Angeles criminals unfold.",
    year: 1994,
    duration: "154 min",
    featured: false
  },
  {
    id: 5,
    title: "The Matrix",
    rating: "8.7",
    genre: "Sci-Fi",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
    description: "A hacker learns the truth about reality and embraces his role in the war.",
    year: 1999,
    duration: "136 min",
    featured: true
  },
  {
    id: 6,
    title: "Tenet",
    rating: "7.4",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    description: "An agent must save the world using only a mysterious concept called inversion.",
    year: 2020,
    duration: "150 min",
    featured: false
  },
  {
    id: 7,
    title: "Shutter Island",
    rating: "8.2",
    genre: "Horror",
    image: "https://media.themoviedb.org/t/p/w500/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg",
    backdrop: "https://media.themoviedb.org/t/p/w780/rbZvGN1A1QyZuoKzhCw8QPmf2q0.jpg",
    description: "A U.S. Marshal investigates disappearances at a hospital for the criminally insane.",
    year: 2010,
    duration: "138 min",
    featured: false
  },
  {
    id: 8,
    title: "The Avengers",
    rating: "8.0",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    description: "A team of superheroes must stop an alien invasion of Earth.",
    year: 2012,
    duration: "143 min",
    featured: false
  },
  {
    id: 9,
    title: "Spirited Away",
    rating: "8.6",
    genre: "Anime",
    image: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    description: "A young girl enters a magical world and must save her parents.",
    year: 2001,
    duration: "125 min",
    featured: false
  },
  {
    id: 10,
    title: "Fight Club",
    rating: "8.8",
    genre: "Drama",
    image: "https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
    description: "An insomniac and a soap maker form an underground fight club.",
    year: 1999,
    duration: "139 min",
    featured: true
  }
];

const seriesData = [
  {
    id: 101,
    title: "Breaking Bad",
    rating: "9.5",
    genre: "Drama",
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    description: "A chemistry teacher turns into a methamphetamine manufacturer.",
    seasons: 5,
    featured: true
  },
  {
    id: 102,
    title: "Stranger Things",
    rating: "8.7",
    genre: "Sci-Fi",
    image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    description: "In a mysterious town, kids encounter strange supernatural forces.",
    seasons: 4,
    featured: true
  },
  {
    id: 103,
    title: "Game of Thrones",
    rating: "9.2",
    genre: "Fantasy",
    image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdrop: "https://image.tmdb.org/t/p/w780/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    description: "Noble families battle for control of the Iron Throne.",
    seasons: 8,
    featured: true
  }
];

const categories = ["Action", "Horror", "Sci-Fi", "Anime", "Comedy", "Drama", "Fantasy"];
