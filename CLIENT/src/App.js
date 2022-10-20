import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser/CreateUser";
import Favorites from "./components/Favorites/Favorites";
import Home from "./components/Home/Home";
import LandingHome from "./components/LandingHome/LandingHome";
import Login from "./components/Login/Login";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route exact path="/" element={<LandingHome />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/signup" element={<CreateUser />} />
        <Route path="/home/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<CreateUser />} />
        <Route exact path="/home/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/home/Favorites" element={<Favorites />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
