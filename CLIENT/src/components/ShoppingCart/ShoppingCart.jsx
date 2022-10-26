import { useSelector, useDispatch } from "react-redux";
import {
  getCartProducts,
  clearCart,
  delFromCart,
  delProductCart,
} from "../../redux/actions";
import axios from "axios";
import { useState, useEffect } from "react";
import CartItem from "../CartItem/CartItem";
import { getSession } from "../../sessionUtils/jwtSession";
import Style from "./ShoppingCart.module.css";
import NavBar from "../NavBar/NavBar";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const [us, setUs] = useState(null);

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
            setUs(res?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
    const id = us?.id;
    dispatch(getCartProducts(id));
  }, [info, dispatch, us?.id]);
  console.log(us);
  const cartList = useSelector((state) => state?.cart);
  console.log(cartList);

  return (
    <>
      <NavBar />
      <div className={Style.containerShopping}>
        <h2>Carrito de Compras</h2>
        <h3>Productos</h3>

        <article className="box">
          <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button>

          {cartList?.map((e) => (
            <CartItem
              key={e?.id + 1}
              name={e?.name}
              price={e?.price}
              quantity="1"
              image={e?.image}
              delOneFromCart={() =>
                dispatch(delProductCart(e?.id, us?.id)).then(
                  dispatch(delFromCart(e.id))
                )
              }
              delAllFromCart={() => dispatch(delFromCart(e.id, true))}
            />
          ))}
        </article>
      </div>
    </>
  );
};

export default ShoppingCart;
