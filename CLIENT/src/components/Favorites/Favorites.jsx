import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FavItem from "../FavItem/FavItem.jsx";
import {
  getFavorites,
  deleteFavorite,
  deleteOneFavorite,
} from "../../redux/actions/index.js";
import Style from "./Favorites.module.css";
import NavBar from "../NavBar/NavBar";
import { getSession } from "../../sessionUtils/jwtSession";
const Favorites = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const [us, setUs] = useState({});

  const url = "http://localhost:3001/user/get";
  useEffect(() => {
    (async () => {
      if (!info) {
        const data = await getSession();
        setInfo(data);
      }

      if (info) {
        console.log("info before request", info);
        await axios
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${info.token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setUs(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
    const id = us?.id;
    dispatch(getFavorites(id));
  }, [info, dispatch, us.id]);
  console.log(us);

  const favorites = useSelector((state) => state?.favorites);

  return (
    <>
      <NavBar />
      <div className={Style.Container__Fav}>
        <div className={Style.containerFavorites}>
          {favorites?.length ? (
            favorites?.map((cloth) => (
              <FavItem
                key={cloth?.id}
                id={cloth?.id}
                img={cloth?.image}
                title={cloth?.name[0].toUpperCase() + cloth?.name.substring(1)}
                price={cloth?.price}
                deleteFavorite={() => {
                  dispatch(deleteFavorite(cloth?.id, us?.id))
                }}
              />
            ))
          ) : (
            <h1 className={Style.textFav}>
              Aun no tienes productos favoritos.{" "}
              <Link to="/home">Encontralos!</Link>
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
