import { useDispatch } from "react-redux";
import { createStore } from "../../redux/actions";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./CreateStore.module.css";

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

          dispatch(createStore(a))
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
                  id="username"
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
                  id="name"
                  placeholder="Localidad"
                  name="location"
                  className={Styles.form1}
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="off"
                />

                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className={Styles.form1}
                  value={values.profilePicture}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />

                <input
                  type="file"
                  id="banner"
                  name="banner"
                  className={Styles.form1}
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
