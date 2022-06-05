import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import PokemonCard from "./PokemonCard";
import pokedex_logo from '../img/logo.svg'
import {useNavigate} from 'react-router-dom'
import Header2 from './Header2';
import salir from '../img/exit.png'



const Pokedex = () => {
    
    const user= useSelector(state => state.user)//accediendo al estado

    const [characters, setCharacters] = useState([]);
    const [pokemonSearch, setPokemonSearch] = useState("");
    const [searchTypes, setSearchTypes] = useState([]);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

   
   
    useEffect(()=>{
        axios
          .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
          .then(res=>setCharacters(res.data.results));

        axios
              .get(`https://pokeapi.co/api/v2/type/`)
              .then(res=>setSearchTypes(res.data.results));
          
    },[setCharacters])
    
   
    const search= () => {
      //console.log(pokemonSearch)
      navigate(`/pokedex/${pokemonSearch}`);
    }

    const filterPokemon = (e) =>{        
      axios
          .get(e.target.value)
          .then((res) => setCharacters(res.data.pokemon));
    };

   
      const pokemonNumbers = 5;
      const lastIndex = pokemonNumbers * page;
      const firstIndex = lastIndex - pokemonNumbers;  
      let pokemonPaginated = characters;
      pokemonPaginated = pokemonPaginated?.slice(firstIndex,lastIndex);
      const lastPage = Math.ceil( characters.length / pokemonNumbers);      
      const numbers  = [];

      for(let i=1; i<= lastPage; i++){
        numbers.push(i);
      }

      console.log(numbers)
      console.log(page)
  return (
    <div className='container'> 
        <div className='header_container_2'>
          <Header2 />           
          <img src={pokedex_logo} alt="" className='img_logo'/>
        </div>
        <div className="button_regresar"><a href="#/"><img src={salir} alt="" /></a></div> 
      <div className="pokedex_container">
        <p><span className='msg'>Bienvenid@ {user}, </span> aquí podrás encontrar tu pokemon favorito</p>
            <div className="container_search">
              <div className="search_pokemon">
                <input 
                  type="text" 
                  value={pokemonSearch} 
                  onChange={e=>setPokemonSearch(e.target.value)}
                  placeholder="buscar pokemon"
                />
                <button onClick={search}>Buscar</button>
               </div>
               <div className="search_type">

                <select onChange={filterPokemon}>
                  <option >Tipos de Pokemon</option>
                  {
                    searchTypes.map(searchType => (
                      <option 
                      key={searchType.url}
                        value={searchType.url}>{searchType.name}</option                      
                      >
                    ))
                  }
                </select>
              </div>              
            </div>              
                <div className='container_card_pokemon'>
                 {
                   pokemonPaginated?.map(character => (
                      <div                       
                        key={character.url} 
                        className="card_pokemon"                        
                      >
                        <PokemonCard                
                          characterUrl={character.url !== undefined ? character.url : character.pokemon.url}  
                          key= {character.url !== undefined ? character.url : character.pokemon.url}
                          />                                      
                      </div>
            ))}           
            </div>     
            <div className='buttons_pagination'>  
              <button
              onClick={()=>setPage(page-1)}
              disabled={page === 1}
              className="button_page"
            >Prev  
            </button>
            {numbers.map(number=>(
              <button className='button_page'  onClick={()=> setPage(number)}>{number}</button>
            ))}
            <button
              onClick={()=>setPage(page+1)}
              disabled={page === lastPage}
              className="button_page"
            >Next             
            </button>                
          </div>
      </div>         
    </div>
    );
};

export default Pokedex;
