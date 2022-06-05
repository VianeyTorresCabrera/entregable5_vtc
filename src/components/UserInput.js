import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import {useDispatch} from 'react-redux';//
import logo from '../img/logo.svg';
import Header from './Header'

const UserInput = () => {

    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getName = () =>{       
        dispatch(changeUser(userName));
        navigate("/pokedex");
    };

    return (
        <div className='input_container'>
          <main>
            <div>
              <img src={logo} alt="" className='input_logo'/>
            </div>
            <h1 className='input_tittle1'>¡Hola Entrendador!</h1>
            <h2 className='input_tittle2'>Para poder comenzar, dime tu nombre</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input"
              placeholder='Tu nombre'
            />
            <button onClick={getName} className="input_button">Comenzar</button>
          </main>
          <footer>
            <Header />
          </footer>
         

    </div>
    );
};
export default UserInput;