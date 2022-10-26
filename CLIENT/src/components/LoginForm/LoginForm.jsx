import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, flushError } from "../../redux/actions";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./LoginForm.module.css";
import axios from "axios";
import GoogleButton from "react-google-button";
import { setSession } from "../../sessionUtils/jwtSession";
import { useLocalStorage } from "../../Utils/useLocalStorage";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const LoginForm = () => {
  const [showPwd, setShowPwd] = useLocalStorage(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "red",
    }).showToast();
  const toastCorrect = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "green",
    }).showToast();

  /* login with user and password */
  const handleLogin = async (userInfo) => {
    try {
      const res = await axios.post(`http://localhost:3001/login`, userInfo);
      sessionStorage.setItem("sessionData", JSON.stringify(res.data));
      if (res.data) {
        toastCorrect("Credenciales correctas");
        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.log("incorrect");
      toast("Credenciales incorrectas");
    }
  };

  /* loging with google */
  const redirectToGoogleSSO = async () => {
    const googleLoginURL = `http://localhost:3001/login/google`;
    window.open(googleLoginURL, "_self");
    fetchAuthUser();
  };

  const fetchAuthUser = async () => {
    await axios
      .get(`http://localhost:3001/auth/user`, { withCredentials: true })
      .then(
        (res) => {
          if (res.data) {
            console.log(res.data);
            setSession(res.data);
          }
        },
        (err) => {
          console.log("no google user data");
          console.log(err);
        }
      );
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.header}></div>
        <div className={Styles.subtitle}>
          <h2>Bienvenido devuelta.</h2>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(value) => {
            let errors = {};

            if (!/^[a-zA-Z0-9_]+$/.test(value.username)) {
              errors.username = "Ingrese un usuario";
            } else if (!value.password) {
              errors.password = "Ingrese contraseña";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            handleLogin(values);
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
            <form className={Styles.formulario} onSubmit={handleSubmit}>
              <div className={Styles.eye2} onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? (
                  <svg
                    className={Styles.pwdicon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#595959"
                    width="24"
                    height="24"
                  >
                    <path d="M 19.815 16.34 c 0.28 0.27 0.707 0.288 0.987 0 a 0.686 0.686 0 0 0 0 -0.987 L 5.989 0.549 a 0.704 0.704 0 0 0 -0.995 0 a 0.707 0.707 0 0 0 0 0.979 l 14.82 14.812 Z M 12.933 1.047 c -1.529 0 -2.909 0.262 -4.193 0.69 l 1.415 1.415 c 0.882 -0.244 1.79 -0.393 2.778 -0.393 c 5.554 0 9.965 4.83 9.965 5.852 c 0 0.69 -1.398 2.462 -3.625 3.86 l 1.31 1.319 c 2.743 -1.8 4.34 -4.149 4.34 -5.18 c 0 -1.79 -4.82 -7.563 -11.99 -7.563 Z m 0 15.136 c 1.607 0 3.082 -0.28 4.419 -0.743 l -1.415 -1.415 c -0.943 0.28 -1.939 0.446 -3.004 0.446 c -5.572 0 -9.983 -4.638 -9.983 -5.86 c 0 -0.586 1.476 -2.463 3.843 -3.93 L 5.457 3.343 C 2.609 5.161 0.924 7.571 0.924 8.611 c 0 1.79 4.926 7.572 12.009 7.572 Z m 4.34 -5.904 c 0.227 -0.507 0.35 -1.083 0.35 -1.668 a 4.661 4.661 0 0 0 -4.69 -4.682 c -0.603 0 -1.162 0.123 -1.677 0.332 l 6.017 6.018 Z m -4.34 3.022 c 0.663 0 1.292 -0.158 1.86 -0.428 l -6.14 -6.14 a 4.245 4.245 0 0 0 -0.428 1.886 c 0.009 2.542 2.088 4.682 4.708 4.682 Z" />
                    <path d="M 19.815 16.34 c 0.28 0.27 0.707 0.288 0.987 0 a 0.686 0.686 0 0 0 0 -0.987 L 5.989 0.549 a 0.704 0.704 0 0 0 -0.995 0 a 0.707 0.707 0 0 0 0 0.979 l 14.82 14.812 Z M 12.933 1.047 c -1.529 0 -2.909 0.262 -4.193 0.69 l 1.415 1.415 c 0.882 -0.244 1.79 -0.393 2.778 -0.393 c 5.554 0 9.965 4.83 9.965 5.852 c 0 0.69 -1.398 2.462 -3.625 3.86 l 1.31 1.319 c 2.743 -1.8 4.34 -4.149 4.34 -5.18 c 0 -1.79 -4.82 -7.563 -11.99 -7.563 Z m 0 15.136 c 1.607 0 3.082 -0.28 4.419 -0.743 l -1.415 -1.415 c -0.943 0.28 -1.939 0.446 -3.004 0.446 c -5.572 0 -9.983 -4.638 -9.983 -5.86 c 0 -0.586 1.476 -2.463 3.843 -3.93 L 5.457 3.343 C 2.609 5.161 0.924 7.571 0.924 8.611 c 0 1.79 4.926 7.572 12.009 7.572 Z m 4.34 -5.904 c 0.227 -0.507 0.35 -1.083 0.35 -1.668 a 4.661 4.661 0 0 0 -4.69 -4.682 c -0.603 0 -1.162 0.123 -1.677 0.332 l 6.017 6.018 Z m -4.34 3.022 c 0.663 0 1.292 -0.158 1.86 -0.428 l -6.14 -6.14 a 4.245 4.245 0 0 0 -0.428 1.886 c 0.009 2.542 2.088 4.682 4.708 4.682 Z" />
                    <path d="M 19.815 16.34 c 0.28 0.27 0.707 0.288 0.987 0 a 0.686 0.686 0 0 0 0 -0.987 L 5.989 0.549 a 0.704 0.704 0 0 0 -0.995 0 a 0.707 0.707 0 0 0 0 0.979 l 14.82 14.812 Z M 12.933 1.047 c -1.529 0 -2.909 0.262 -4.193 0.69 l 1.415 1.415 c 0.882 -0.244 1.79 -0.393 2.778 -0.393 c 5.554 0 9.965 4.83 9.965 5.852 c 0 0.69 -1.398 2.462 -3.625 3.86 l 1.31 1.319 c 2.743 -1.8 4.34 -4.149 4.34 -5.18 c 0 -1.79 -4.82 -7.563 -11.99 -7.563 Z m 0 15.136 c 1.607 0 3.082 -0.28 4.419 -0.743 l -1.415 -1.415 c -0.943 0.28 -1.939 0.446 -3.004 0.446 c -5.572 0 -9.983 -4.638 -9.983 -5.86 c 0 -0.586 1.476 -2.463 3.843 -3.93 L 5.457 3.343 C 2.609 5.161 0.924 7.571 0.924 8.611 c 0 1.79 4.926 7.572 12.009 7.572 Z m 4.34 -5.904 c 0.227 -0.507 0.35 -1.083 0.35 -1.668 a 4.661 4.661 0 0 0 -4.69 -4.682 c -0.603 0 -1.162 0.123 -1.677 0.332 l 6.017 6.018 Z m -4.34 3.022 c 0.663 0 1.292 -0.158 1.86 -0.428 l -6.14 -6.14 a 4.245 4.245 0 0 0 -0.428 1.886 c 0.009 2.542 2.088 4.682 4.708 4.682 Z" />
                  </svg>
                ) : (
                  <svg
                    className={Styles.pwdicon}
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#595959"
                  >
                    <path
                      fillRule="evenodd"
                      d="M 12.933 15.187 c 7.17 0 11.99 -5.782 11.99 -7.572 S 20.086 0.052 12.934 0.052 C 5.867 0.052 0.923 5.825 0.923 7.615 s 4.927 7.572 12.01 7.572 Z m 0 -1.712 c -5.572 0 -9.983 -4.637 -9.983 -5.86 c 0 -1.022 4.41 -5.851 9.983 -5.851 c 5.545 0 9.965 4.83 9.965 5.851 c 0 1.223 -4.42 5.86 -9.965 5.86 Z m 0 -1.17 c 2.602 0 4.69 -2.14 4.69 -4.69 a 4.661 4.661 0 0 0 -4.69 -4.681 c -2.62 0 -4.717 2.07 -4.708 4.681 c 0.018 2.55 2.088 4.69 4.708 4.69 Z m -0.01 -3.179 c -0.838 0 -1.519 -0.681 -1.519 -1.51 c 0 -0.83 0.681 -1.512 1.52 -1.512 c 0.838 0 1.52 0.681 1.52 1.511 c 0 0.83 -0.682 1.511 -1.52 1.511 Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className={Styles.entry}>
                <input
                  type="text"
                  id="username"
                  placeholder="Usuario"
                  name="username"
                  className={Styles.form1}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="off"
                />

                {touched.username && errors.username && (
                  <div className={Styles.errors}>
                    {" "}
                    <span>{errors.username}</span>{" "}
                  </div>
                )}

                <div>
                  <div>
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Contraseña"
                      className={Styles.form2}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onKeyUp={handleBlur}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                      <div className={Styles.errors}>
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Link to="/#" className={Styles.fp}>
                    Olvido su contraseña?
                  </Link>
                </div>
                <div className={Styles.remember}>
                  <input type="checkbox" className={Styles.checkbox} />
                  <label className={Styles.label}>Recordarme.</label>
                </div>
              </div>
              {/* VALIDATIONS */}
              {!/^[a-zA-Z0-9_]+$/.test(
                values.email || !values.phone || !values.username
              ) || !values.password ? (
                <button className={Styles.btnDisabled} disabled>
                  Iniciar sesión
                </button>
              ) : (
                <button type="submit" className={Styles.submit}>
                  Iniciar sesión
                </button>
              )}
            </form>
          )}
        </Formik>
        <GoogleButton onClick={redirectToGoogleSSO} />
        <p className={Styles.LoginFormsFooter}>
          No tiene cuenta?{" "}
          <Link className={Styles.register} to="/register">
            Crear cuenta.
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
