import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../Utils/useLocalStorage";
import {
  getProductDetail,
  addToCart,
  getProductDetailReviews,
  addToFavorites,
  deleteFavorite,
} from "../../redux/actions";
import Style from "./ProductDetail.module.css";
import Comments from "../Comments/Comments";
import { getSession } from "../../sessionUtils/jwtSession";
import buttonCart from "../images/cart.svg";
import buttonFav from "../images/buttonFav.svg";
import buttonDeleteFav from "../images/buttonDeleteFav.svg";
import CreateReview from "../CreateReviews/CreateReview";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = (text, color="#32CD32") => Toastify({
    text: text,
    duration: 1500,
    position: "center",
    className: Style.toast,
    backgroundColor: color
    }).showToast();

  const detail = useSelector((state) => state.productDetail);
  const reviews = useSelector((state) => state.productReviews);
  const favorites = useSelector((state) => state.favorites);

  const [info, setInfo] = useState("");
  const [us, setUs] = useState(null);
  const [filterBySize, setFilterBySize] = useLocalStorage("filterBySize", "");
  const [filterByColor, setFilterByColor] = useLocalStorage(
    "filterByColor",
    ""
  );

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
    dispatch(getProductDetail(id));
    dispatch(getProductDetailReviews(id));
  }, [info, dispatch, id]);
  const profileId = us?.id;

  const handleFav = () => {
    if (!us) {
      toast("Logueate para seguir tus productos favoritos!");
      return navigate("/login");
    } else {
      dispatch(addToFavorites(id, profileId, info.token));
      toast("Producto agregado a favoritos!");
    }
  };
  const handleDelFav = () => {
    dispatch(deleteFavorite(id, profileId));
    toast("Producto eliminado de favoritos", "yellow");
  };
  const handleAddCart = () => {
    if (!us) {
      toast("Logueate para seguir tus productos favoritos!");
      return navigate("/login");
    } else {
      dispatch(addToCart(id, profileId, info.token));
      toast("Producto agregado al carrito!");
    }
  };
  //FILTER ACTIVITY
  const handleSize = (e) => {
    e.preventDefault();
    setFilterBySize(e.target.value);
  };

  //FILTER COLOR
  const handleColor = (e) => {
    e.preventDefault();
    setFilterByColor(e.target.value);
  };

  return (
    <div className={Style.ProductContainer}>
      <div className={Style.sectionDetails}>
        <div className={Style.sectionDetailsButtons}>
          <button className={Style.backButton} onClick={() => navigate("/home")}>
            Atrás
          </button>
          <button
            className={Style.buttonCartDetail}
            onClick={() => handleAddCart()}
            disabled={
              filterBySize === "" ||
              filterByColor === "" ||
              detail.variants
                ?.map(
                  (v) =>
                    v.size === filterBySize &&
                    v.color === filterByColor &&
                    v.stock
                )
                .reduce((a, b) => a + b) === 0
            }
          >
            <img className={Style.buttonImage} src={buttonCart} alt="img not found"></img>
          </button>

          {!favorites.find((f) => f?.id === id) ? (
            <button className={Style.buttonfavDetail} onClick={() => handleFav()}>
              <img className={Style.buttonImage} src={buttonFav} alt="img not found"></img>
            </button>
          ) : (
            <button
              className={Style.buttonDeletefavDetail}
              onClick={() => handleDelFav()}
            >
              <img className={Style.buttonImage} src={buttonDeleteFav} alt="img not found"></img>
            </button>
          )}
        </div>
        <br />
        <div className={Style.article__details}>
          <div className={Style.articleDetailsImageContainer}>
            <img className={Style.articleDetailsImage} src={detail.image} alt="img not found" />
          </div>
          <div className={Style.article_details_container}>
            <h1 className={Style.detailsTitle}>
              {detail.name?.charAt(0).toUpperCase() + detail.name?.slice(1)}
            </h1>
            <label id={Style.article_price} className={Style.article_label} htmlFor="">Precio: ${detail.price}</label>
            <label className={Style.article_label} htmlFor="">Seleccionar Talle:</label>
            <select
              id={Style.FilterProductsSelectTalle}
              className={Style.FilterProductsSelect}
              value={filterBySize}
              onChange={(e) => handleSize(e)}
            >
              {[...new Set(detail.variants?.map((e) => e.size))].length >
              1 ? (
                <option value="">Todos</option>
              ) : (
                <p></p>
              )}
              {[...new Set(detail.variants?.map((e) => e.size))]?.map(
                (el) => {
                  return <option value={el}>{el}</option>;
                }
              )}
            </select>
            <label className={Style.article_label} htmlFor="">Seleccionar Color:</label>
            <select
              id={Style.FilterProductsSelectColor}
              className={Style.FilterProductsSelect}
              value={filterByColor}
              onChange={(e) => handleColor(e)}
            >
              {[...new Set(detail.variants?.map((e) => e.color))].length >
              1 ? (
                <option value="">Todos</option>
              ) : (
                <p></p>
              )}
              {[...new Set(detail.variants?.map((e) => e.color))]?.map(
                (el) => {
                  return <option value={el}>{el}</option>;
                }
              )}
            </select>
            {detail.brand ? <label className={Style.article_label}>Marca: {detail.brand}</label> : null}
            {detail.materials ? <label className={Style.article_label}>Material: {detail.materials}</label> : null}
            <div className={Style.article__detail_stock}>
              <label id={Style.article_labelStock} className={Style.article_label} htmlFor=""> Stock: 
                {filterByColor && filterBySize ? (
                  <label id={Style.article_labelStock} className={Style.article_label}>
                    {detail.variants
                      ?.map(
                        (v) =>
                          v.size === filterBySize &&
                          v.color === filterByColor &&
                          v.stock
                      )
                      .reduce((a, b) => a + b)}{" "}
                    unidades
                  </label>
                ) : filterBySize ? (
                  <label id={Style.article_labelStock} className={Style.article_label}>
                    {detail.variants
                      ?.map((v) => v.size === filterBySize && v.stock)
                      .reduce((a, b) => a + b)}{" "}
                    unidades
                  </label>
                ) : filterByColor ? (
                  <label id={Style.article_labelStock} className={Style.article_label}>
                    {detail.variants
                      ?.map((v) => v.color === filterByColor && v.stock)
                      .reduce((a, b) => a + b)}{" "}
                    unidades
                  </label>
                ) : (
                  <label id={Style.article_labelStock} className={Style.article_label}>
                    {detail.variants?.map((v) => v.stock).reduce((a, b) => a + b)}{" "}
                    unidades
                  </label>
                )}
              </label>
            </div>            
          </div>
        </div>
        <div>
            {!us ? (<></>) : (<CreateReview id={id}/>)}
            <h1 className={Style.ProductDetailReviews}>Reseñas</h1>
            {reviews.length ? (
              reviews.map((r) => (
                <Comments score={r.score} reviews={r.reviews} />
              ))
            ) : (
              <h3>No hay reseñas</h3>
            )}
          </div>
      </div>
    </div>
  );
};

export default ProductDetail;