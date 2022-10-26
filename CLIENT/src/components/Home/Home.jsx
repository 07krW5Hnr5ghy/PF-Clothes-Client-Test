import React from "react";
import Styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, emptyDetail } from "../../redux/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import { useLocalStorage } from "../../Utils/useLocalStorage";
//import Orders from "../Orders/Orders";

export default function Home() {
  const dispatch = useDispatch();
  const [price, setPrice] = useLocalStorage("price", "");
  const [size, setSize] = useLocalStorage("size", "");
  const [demographic, setDemographic] = useLocalStorage("demographic", "");
  const [color, setColor] = useLocalStorage("color", "");
  const [name, setName] = useLocalStorage("name", "");
  const [page, setPage] = useLocalStorage("page", 0);
  const [orderBy, setOrderBy] = useLocalStorage("orderBy", "ASC");
  const [sortBy, setSortBy] = useLocalStorage("sortBy", "name");

  useEffect(() => {
    dispatch(
      filterProducts(
        name,
        price,
        size,
        demographic,
        color,
        page,
        orderBy,
        sortBy
      )
    );
    dispatch(emptyDetail());
  }, [dispatch, name, price, size, demographic, color, page, orderBy, sortBy]);

  const allProducts = useSelector((state) => state.products);
  const results = useSelector((state) => state.productsStatus);

  //SEARCH
  const filterByName = (e) => {
    e.preventDefault();
    setPage(0);
    setName(e.target.value);
  };

  //FILTER PRICE
  const filterByPrice = (e) => {
    e.preventDefault();
    setPage(0);
    setPrice(e.target.value);
  };

  //FILTER SIZE
  const filterBySize = (e) => {
    e.preventDefault();
    setPage(0);
    setSize(e.target.value);
  };

  //FILTER DEMOGRAPHIC
  const filterByDemographic = (e) => {
    e.preventDefault();
    setPage(0);
    setDemographic(e.target.value);
  };

  //FILTER COLOR
  const filterByColor = (e) => {
    e.preventDefault();
    setPage(0);
    setColor(e.target.value);
  };

  //SORT
  const changeSort = (e) => {
    e.preventDefault();
    setPage(0);
    setSortBy(e.target.value);
  };

  //ORDER
  const changeOrder = (e) => {
    e.preventDefault();
    setPage(0);
    setOrderBy(e.target.value);
  };

  //SHOW ALL
  const handleClickShowAll = (e) => {
    e.preventDefault();
    setPage(0);
    setSortBy("name");
    setOrderBy("ASC");
    setPrice("");
    setSize("");
    setDemographic("");
    setColor("");
    setName("");
    dispatch(
      filterProducts(
        name,
        price,
        size,
        demographic,
        color,
        page,
        orderBy,
        sortBy
      )
    );
  };

  //PAGINATED
  const start = (e) => {
    e.preventDefault();
    setPage(0);
  };

  const prev = (e) => {
    e.preventDefault();
    setPage(page - 10);
  };

  const next = (e) => {
    e.preventDefault();
    setPage(page + 10);
  };

  //PAGINATED
  // const start = (e) => {
  //   e.preventDefault();
  //   setCant(0);
  // };

  // const prev = (e) => {
  //   e.preventDefault();
  //   setCant(cant - 1);
  // };

  // const next = (e) => {
  //   e.preventDefault();
  //   setCant(cant + 1);
  // };

  return (
    <div className={Styles.Home}>
      <NavBar />
      <div className={Styles.ProductsHomeContainer}>
        <div className={Styles.ProductsHome}>
          <div className={Styles.FilterProductsHome}>
            <select
              className={Styles.FilterProductsHomeSelect}
              value={size}
              onChange={(e) => filterBySize(e)}
            >
              <option value="">Filtrar por Talle</option>
              <option value="XXXL">XXXL</option>
              <option value="XXL">XXL</option>
              <option value="XL">XL</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XXS">XXS</option>
              <option value="XXXS">XXXS</option>
            </select>
            <select
              className={Styles.FilterProductsHomeSelect}
              value={demographic}
              onChange={(e) => filterByDemographic(e)}
            >
              <option value="">Filtrar por Género</option>
              <option value="adult male">Hombre</option>
              <option value="adult female">Mujer</option>
              <option value="teen male">Hombre adolescente</option>
              <option value="teen female">Mujer adolescente</option>
              <option value="little boy">Niño</option>
              <option value="little girl">Niña</option>
            </select>
            <select
              className={Styles.FilterProductsHomeSelect}
              value={price}
              onChange={(e) => filterByPrice(e)}
            >
              <option value="">Filtrar por Precio</option>
              <option value="25">hasta 25$</option>
              <option value="50">hasta 50$</option>
              <option value="75">hasta 75$</option>
              <option value="100">hasta 100$</option>
            </select>
            <select
              className={Styles.FilterProductsHomeSelect}
              value={color}
              onChange={(e) => filterByColor(e)}
            >
              <option value="">Filtrar por Color</option>
              <option value="Gris">Gris</option>
              <option value="Negro">Negro</option>
              <option value="Blanco">Blanco</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>{" "}
              <option value="Rojo">Rojo</option>{" "}
              <option value="Amarillo">Amarillo</option>
              <option value="Rosado">Rosado</option>{" "}
              <option value="Marron">Marron</option>
            </select>

            <input
              class={Styles.FilterProductsHomeSelect}
              id="text"
              type="text"
              value={name}
              placeholder="Buscar productos..."
              onChange={(e) => filterByName(e)}
            />
            {/* <Orders setOrder={setOrder} /> */}
            <b> ORDENAR POR:</b>
            <select name="sort" value={sortBy} onChange={(e) => changeSort(e)}>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>
            <select
              name="order"
              value={orderBy}
              onChange={(e) => changeOrder(e)}
            >
              <option value="ASC">Ascendente</option>
              <option value="DESC">Descendente</option>
            </select>
            <button
              class={Styles.FilterProductsHomeSelect}
              onClick={(e) => {
                handleClickShowAll(e);
              }}
            >
              Mostrar todo
            </button>
          </div>

          <div>
            <button
              onClick={(e) => {
                start(e);
              }}
              disabled={page <= 0}
            >
              {"Comienzo"}
            </button>
            <button
              value={page}
              onClick={(e) => {
                prev(e);
              }}
              disabled={page <= 0}
            >
              {"Anterior"}
            </button>
            <button class="paginated_num">{page / 10}</button>
            <button
              onClick={(e) => {
                next(e);
              }}
              disabled={allProducts.length < 10}
            >
              {"Siguiente"}
            </button>
          </div>

          <div className={Styles.ProductsHomeProductsCard}>
            {allProducts.length ? (
              allProducts.map((p) => (
                <Card
                  key={p.id}
                  id={p.id}
                  img={p.image}
                  title={p.name[0].toUpperCase() + p.name.substring(1)}
                  price={p.price}
                />
              ))
            ) : (
              <div>
                <p>{results}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
