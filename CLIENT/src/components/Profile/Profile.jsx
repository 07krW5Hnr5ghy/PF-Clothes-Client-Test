import { useEffect, useState } from "react";
import Style from "./Profile.module.css";
import { Link } from "react-router-dom";
import { getUserData } from "../../Utils/useLocalStorage";

export default function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data);
      }
    })();
  }, [user, user.id]);

  return (
    <>
      <div className={Style.profileContainer}>
        <div className={Style.sectionProfile}>
          <div className={Style.sectionContainer}>
            <div>
              {!user.storeName ? (
                <Link to="/home/createStore">
                  <button className={Style.buttonProfile}>Crear Tienda</button>
                </Link>
              ) : (
                <>
                  <Link to="/home/editUser">
                    <button className={Style.buttonProfile}>Editar</button>
                  </Link>
                  <Link to="/home/createProduct">
                    <button className={Style.buttonProfile}>
                      Crear Producto
                    </button>
                  </Link>
                </>
              )}
            </div>
            <img
              className={Style.pictureProfile}
              src={user.profilePicture}
              alt={user.username}
            />
            <h1 className={Style.titleusername}>{user.username}</h1>
          </div>
          <div className={Style.profileInformation}>
            <h1>Datos: </h1>
            <p>Nombre: {user.name}</p>
            {user.storeName ? <p>Tienda: {user.storeName}</p> : null}
            <p>Correo: {user.mail}</p>
            <p>Telefono: {user.phone}</p>
            <p>Localidad: {user.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
