import React from "react";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";

import Style from "./favItem.module.css";
import buttonDelete from "../images/Delete.svg";
const FavItem = ({ img, title, price, deleteFavorite, id }) => {
  const dispatch = useDispatch();

  return (
    <div className={Style.artilce_FavItem}>
      <div className={Style.FavItem}>
        <Card img={img} title={title} price={price} id={id} />
      </div>
      <button
        className={Style.buttonDeleteFav}
        onClick={() => deleteFavorite(id)}
      >
        <img src={buttonDelete}></img>
      </button>
    </div>
  );
};

export default FavItem;
