import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateColor from "./Color_card";


const PokemonCard = ({characterUrl}) => {

    const [pokemon,setPokemon] = useState({type:[]})  
    const [type, setType] = useState("") 
    

    const navigate = useNavigate();

    useEffect(() => {

      axios.get(characterUrl)
            .then(res=>setType(res.data.types[0].type.name))
      
      axios
        .get(characterUrl)
        .then((res) => {
              setPokemon({
                name: res.data.name,
                id: res.data.id,
                image: res.data.sprites?.other.dream_world.front_default,
                type: res.data.types,
                hp: res.data.stats[0].base_stat,
                attack: res.data.stats[1].base_stat,
                defense: res.data.stats[2].base_stat,
                speed: res.data.stats[5].base_stat
              })                          
            })       
    },[characterUrl]
    );
  
 console.log(pokemon.type)

    //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/35.svg"
    //console.log(pokemon.type.type?.[0].name)
   // console.log(pokemon)
    //console.log(type)
       
    return (
      <div 
          style={{background: ValidateColor(type)} }         
         className="card" 
          onClick={() => navigate (`/pokedex/${pokemon.id}`)}
         
      >
          {<img src={pokemon.image} alt="" className="card_img"></img>} 
          <div className="info">          
            <h3 style={{color: ValidateColor(type)}}>{pokemon.name}</h3>         
                      
            <p className="cloud">            
              {pokemon.type.map((value) => {
                return(
                  <span key={value.slot}> {value.type.name}/ </span>
                )
              })}
              <b>Type</b> {" "}
              <hr />
            </p>
            <div className="hp_grid">
              <p className="hp n1"> <b>Hp</b> <span style={{color: ValidateColor(type)}}>{pokemon.hp}</span></p>
              <p className="hp n2"><b>Attack</b><span style={{color: ValidateColor(type)}}>{pokemon.attack}</span></p>
              <p className="hp n3"><b>Defense</b><span style={{color: ValidateColor(type)}}>{pokemon.attack}</span></p>
              <p className="hp n4"><b>Speed</b><span style={{color: ValidateColor(type)}}>{pokemon.speed}</span> </p>
            </div>
           
          </div>        
      </div>
    );
  };
export default PokemonCard;
