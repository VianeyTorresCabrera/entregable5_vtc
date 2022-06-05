import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from './Header2';
import pokedex_logo from '../img/logo.svg'
import ValidateColor from "./Color_card"; 
import flecha from '../img/flecha.png'
import pokebola from '../img/pokebola.png'
import regresar from '../img/regresar.png'

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon]= useState({type:[], abilities:[], moves:[]})
  const [type,setType] =useState("")
 

  useEffect(() => {
     axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => {
                    setPokemon({
                    id: res.data.id,
                    name: res.data.name,
                    image: res.data.sprites?.other.dream_world.front_default,
                    type: res.data.types,
                    height: res.data.height,
                    weight: res.data.weight,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[5].base_stat,
                    abilities: res.data.abilities,
                    moves: res.data.moves,
                });
                setType(res.data.types[0].type.name)          
    });
  }, [id]);

 //console.log(pokemon)
 //console.log(type)
 //console.log(abilities)
 //console.log(moves)

  return (
    <div><div className="container_details">
      <div className='header_container_2'>
        <Header2 />
        <img src={pokedex_logo} alt="" className='img_logo' />
      </div>
       <div className="button_regresar"><a href="#/pokedex"><img src={regresar} alt="" /></a></div> 
      <div className="img_details">{<img src={pokemon.image} alt=""></img>} </div>

      <div className="pokedex_detail">

        <div className="color_poke" style={{ background: ValidateColor(type) }}>
        </div>

        <h3 style={{ color: ValidateColor(type) }} className="number_details">#{pokemon.id}</h3>
        
        <div className="content_tittle_details">
        <div className="line_gray"></div><h3 style={{ color: ValidateColor(type) }} className="tittle_details">{pokemon.name}</h3><div className="line_gray2"></div>
        </div>

        <div className="hw_detail">
          <p className="hw_items"><b>Peso</b><span>{pokemon.weight}</span></p>
          <p className="hw_items"><b>Altura</b><span>{pokemon.height}</span></p>
        </div>

        <div className="th_details">
          <div className="t_details">
            <div className="type_details">Tipo
              <div className="typee">
                {pokemon.type.map((value) => {
                  return (
                    <div key={value.slot} className="th_text">{value.type.name} </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h_details">
            <div className="abilities_details">Habilidades
              <div className="typee">
                {pokemon.abilities.map((value) => {
                  return (
                    <div key={value.slot} className="th_text">{value.ability.name} </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stats_container">
        <div className="tittle_stats">
          <h3>Stats</h3><div className="line_gray2 stats_lin"></div><img src={pokebola} alt=""></img>      
        </div>  
          <div className="stats_tittle"><div>Hp:</div><div>{pokemon.hp}</div></div>
        
        <div className="progress_bar">
          <div className="progress" style={{width:`${pokemon.hp}%`,backgroundColor:"#00f5d4"}}><img src={flecha} alt=""></img></div>
        </div>
        
        <div className="stats_tittle"><div>Attack:</div><div>{pokemon.attack}</div></div>
        <div className="progress_bar">
          <div className="progress" style={{width:`${pokemon.attack}%`,backgroundColor:"#ffc300"}}><img src={flecha} alt=""></img></div>
        </div>

        <div className="stats_tittle"><div>Defense:</div><div>{pokemon.defense}</div></div>
        <div className="progress_bar">          
          <div className="progress"  style={{width:`${pokemon.defense}%`,backgroundColor:"#70d6ff"}}><img src={flecha} alt=""></img></div>                   
        </div>       

        <div className="stats_tittle"><div>Speed:</div><div>{pokemon.speed}</div></div>
        <div className="progress_bar">
          <div className="progress" style={{width:`${pokemon.speed}%`,backgroundColor:"#ff7b00"}}><img src={flecha} alt=""></img></div>
        </div>
      </div>

    </div>
    <div className="moves_container">            
      <div className="tittle_stats">        
        <h3 >Moves</h3><div className="line_gray2 stats_lin"></div><img src={pokebola} alt=""></img> 
        </div>
      <div className="moves_container2">        
        {pokemon.moves.map((value) => {
          return (
            <div key={value.move.url} className="move" style={{ backgroundColor: ValidateColor(type) }}>{value.move.name} </div>
          );
        })}
      </div>
      </div>     
      </div>  
    
  );
};

export default PokemonDetails;
