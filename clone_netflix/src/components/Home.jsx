import Tmdb from "../Tmdb";
import React, {useEffect, useState} from "react";
import MovieRow from "./MovieRow";
import './Home.css';
import FeaturedMovie from "./FeaturedMovie";
import Header from "./Header/Header";
import MovieModal from "./MovieModal";

const Home = () => {
  
    const [moviesList, setMoviesList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    useEffect(() => {
      const loadDefaultItems = async () => {
        let list = await Tmdb.getHomeList();      
        setMoviesList(list);

        //Código para pegar o filme em destaque, que só irá ser carregado
        //após possuir a lista de filmes.
        let originals = list.filter(i => i.slug === 'originals');
        let randomChosenMovie = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosenMovie];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
      }

      loadDefaultItems();
    }, []);

    useEffect(() => {
      const scrollListener = () => {
        if(window.scrollY > 15){
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
      }
      window.addEventListener('scroll', scrollListener);

      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
    }, []);

    const handleModalClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    };

    return (        
        <div className="page">
            <Header black={blackHeader}/>
            {featuredData &&
                <FeaturedMovie item={featuredData}/>
            }
        <section className="lists">
          {moviesList.map((item, key) => (
            <div key={key}>
              <MovieRow title={item.title} items={item.items} 
              onClick={(movie) => handleModalClick(movie)}/>
            </div>
          ))}
        </section>

        <footer>
          Feito com carinho por Rafaella Santos <br />
          Direitos de Imagem para <span>&copy;</span>Netflix <br />
          Dados pegos do site Themoviedb.org
        </footer>

        {moviesList.length <= 0 &&
          <div className="loading-gif">
            <img src="/img/8Etj.gif" alt="Carregando" />
          </div>
        }

        {selectedMovie && 
          <MovieModal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            movie={selectedMovie} 
           />
        }
      </div>
    )
}  

export default Home;