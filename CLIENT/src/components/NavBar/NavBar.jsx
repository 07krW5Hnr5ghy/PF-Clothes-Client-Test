import { React,useEffect,useState } from 'react';
import { Link } from "react-router-dom"
import SearchBar from "../Searchbar/SearchBar";
import "./NavBar.css"
import Logo from "../images/express-fashion-stores.svg"
import Cart from "./cart.svg"

const NavBar = () => {
    const [user,setUser] = useState("");

    useEffect(() => {  
        const session = JSON.parse(sessionStorage.getItem('sessionData'));
        setUser(session);
    },[])
    
    const handleLogout = (e) => {
        setUser("");
    }

    return (
        <nav className='NavbarHome'>
            <div className='NavbarHomeContainer'>
                <img className='NavbarHomeLogo' src={Logo} alt="logo" />
                <SearchBar/>
                <Link className="" to="/home/ShoppingCart" >
                <img  src={Cart}></img>
                </Link>
                {/* si el usuario no esta logueado mostrar login y signup
                en caso contrario mostrar el usuario logueado y boton de 
                cerrar sesion */}
               {!user ? 
                <div className='NavbarHomeFormsButtonsContainer'>
                
                    <Link to="/login">
                        <button className='NavbarHomeButtons' >Iniciar Sesión</button>
                    </Link>
                    <Link to="/home/signup">
                        <button className='NavbarHomeButtons'>Registrarse</button>
                    </Link>
                </div> : <div>
                    {/* username */}
                    <p>{user.username}</p>
                    <button className='NavbarHomeButtons' onClick={(e)=>{handleLogout(e)}}>Cerrar Sesión</button>
                </div>}
            </div>
        </nav>
    );
};

export default NavBar;