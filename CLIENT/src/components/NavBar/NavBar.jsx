import { React, useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../Searchbar/SearchBar";
import Styles from "./NavBar.module.css";
import Logo from "../images/express-fashion-stores.svg";
import Cart from "../images/cart.svg";
import ButtonFav from "../images/buttonFavNav.svg";
import Profile from "../images/profile.svg";
import { getSession } from "../../sessionUtils/jwtSession";


const NavBar = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {

      if (!user) {
        const data = await getSession();
        if(data){
          setUser(data);
        }
      }


    })();

  }, [user])
 
  const handleLogout = (e) => {

    setUser("");
    sessionStorage.removeItem("sessionData");
    navigate("/");
  };

  return (
    <nav className={Styles.NavbarHome}>
      <div className={Styles.NavbarHomeContainer}>
        <Link to="/">
          <img className={Styles.NavbarHomeLogo} src={Logo} alt="logo" />
        </Link>
        {/* <SearchBar /> */}

        {/* si el usuario no esta logueado mostrar login y signup
                en caso contrario mostrar el usuario logueado y boton de 
            cerrar sesion */}
        {!user  ? (
          <div className={Styles.NavbarHomeFormsButtonsContainer}>
            <Link to="/login">
              <button className={Styles.NavbarHomeButtons}>
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/register">
              <button className={Styles.NavbarHomeButtons}>Registrarse</button>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/home/ShoppingCart">
              <img className={Styles.CartIcon} src={Cart}></img>
            </Link>
            <Link to="/home/Favorites">
              <img className={Styles.FavIcon} src={ButtonFav} />
            </Link>
            <Link to="/home/profile">
              <img className={Styles.ProfileFav} src={Profile}></img>
            </Link>
            <Link to="/home/stadistics">
              <p>Estadísticas</p>
            </Link>
            <div>
              {/* username */}
              <p>{user.username}</p>
              <button
                className={Styles.NavbarHomeButtons2}
                onClick={(e) => {
                  handleLogout(e);
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
