import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createStore } from "../../redux/actions";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./CreateStore.module.css";
<<<<<<< HEAD
const { getSession } = require("../../utils/getSession");
=======
import axios from "axios";
import { getSession } from "../../sessionUtils/jwtSession";
>>>>>>> upstream/development

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [us, setUs] = useState({});
<<<<<<< HEAD
=======

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
>>>>>>> upstream/development

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
  console.log(us);
  const id = us?.id;
  return (
    <div className={Styles.container1}>
      <h1 className={Styles.subtitle}>Crear una tienda</h1>
      <Formik
        initialValues={{
          storeName: "",
          banner: "",
          profilePicture: "",
          location: "",
        }}
        validate={(value) => {
          let errors = {};

          return errors;
        }}
        onSubmit={(data, { resetForm }) => {
          let { storeName, banner, profilePicture, location } = data;

          const a = {
            storeName,
            banner,
            profilePicture,
            location,
          };
          console.log(a);

<<<<<<< HEAD
          dispatch(createStore(id, a))
=======
          dispatch(createStore(us.id, a))
>>>>>>> upstream/development
            .then(function (res) {
              console.log(res);
              alert("Exitoso");
            })
            .catch(function (res) {
              console.log(res);
            });
          setTimeout(() => {
            resetForm();
            navigate("/home/profile");
          }, 2000);
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <form className={Styles.form} onSubmit={handleSubmit}>
            <div className={Styles.entry}>
              <div className={Styles.column}>
                <input
                  type="text"
                  id="storeName"
                  placeholder="Nombre de la Tienda"
                  name="storeName"
                  className={Styles.form1}
                  value={values.storeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />

                <input
                  type="text"
                  id="location"
                  placeholder="Localidad"
                  name="location"
                  className={Styles.form1}
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="off"
                />
                <label>Foto de perfil</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className={Styles.inputFile}
                  value={values.profilePicture}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                <>
                  <label>Banner</label>
                </>
                <input
                  type="file"
                  id="banner"
                  name="banner"
                  className={Styles.inputFile}
                  value={values.banner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />

                <div>
                  {!values.profilePicture ||
                  !values.location ||
                  !values.banner ||
                  !values.storeName ? (
                    <div>
                      <button className={Styles.btnDisabled2} disabled>
                        Crear tienda
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className={Styles.submit2}>
                        Crear tienda
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default CreateStore;
