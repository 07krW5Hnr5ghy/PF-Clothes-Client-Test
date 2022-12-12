import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getFavorites,
  deleteFavorite,
  clearFavorites,
} from "../../redux/actions/index.js";
import FavItem from "../FavItem/FavItem.jsx";
import Style from "./Favorites.module.css";
import NavBar from "../NavBar/NavBar";
import { validateUser } from "../../sessionUtils/jwtSession";
import { getUserData } from "../../Utils/useLocalStorage.js";

const Favorites = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const favorites = useSelector((state) => state?.favorites);

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data);
      }
    })();
    const id = user?.id;
    const token = validateUser();
    dispatch(getFavorites(id, token));
  }, [dispatch, user]);
  const profileId = user?.id;
  const token = validateUser();
  console.log(token);

  return (
    <>
      <NavBar />
      <div className={Style.containerFavorites}>
        <h2>Favoritos</h2>

        {favorites?.length ? (
          <div>
            <button
              className={Style.CleanButtons}
              onClick={() => dispatch(clearFavorites(profileId, token))}
            >
              Limpiar Favoritos
            </button>

            <article className={Style.FavCards}>
              {favorites
                ?.reduce((arr, el) => {
                  if (!arr.find((d) => d?.id === el?.id)) {
                    arr.push(el);
                  }
                  return arr;
                }, [])
                .map((cloth) => (
                  <FavItem
                    key={cloth?.id}
                    id={cloth?.id}
                    img={cloth?.image}
                    title={
                      cloth?.name[0].toUpperCase() + cloth?.name.substring(1)
                    }
                    price={cloth?.price}
                    deleteFavorite={() => {
                      dispatch(deleteFavorite(cloth?.id, profileId, token));
                    }}
                  />
                ))}
            </article>
          </div>
        ) : (
          <p className={Style.textFav}>
            Aun no tienes productos favoritos.{" "}
            <Link className={Style.FavLink} to="/home">
              Encontralos!
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default Favorites;
