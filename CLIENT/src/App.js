import { Route, Routes } from "react-router-dom";
import CreateStore from "./components/CreateStore/CreateStore";
import CreateUser from "./components/CreateUser/CreateUser";
import Favorites from "./components/Favorites/Favorites";
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import LandingHome from "./components/LandingHome/LandingHome";
import Login from "./components/Login/Login";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Profile from "./components/Profile/Profile";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Stadistics from "./components/Stadistics/Stadistics";
import { getSession } from "./sessionUtils/jwtSession";
import { useLocalStorage } from "./Utils/useLocalStorage";
import {
  ProtectedRoute,
  ProtectedRoutes,
} from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [info, setInfo] = useLocalStorage("");
  const [us, setUs] = useLocalStorage(null);

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
  }, [info]);
  return (
    <Routes>
      <Route index element={<LandingHome />} />
      <Route exact path="/" element={<LandingHome />} />
      <Route exact path="/home" element={<Home />} />
      <Route element={<ProtectedRoutes us={us} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
      </Route>

      <Route element={<ProtectedRoute us={us} />}>
        <Route path="/home/Favorites" element={<Favorites />} />
        <Route path="/home/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/stadistics" element={<Stadistics />} />
        <Route path="/home/createStore" element={<CreateStore />} />
      </Route>
      <Route path="/home/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
