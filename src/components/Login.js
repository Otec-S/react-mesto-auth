import Header from "./Header.js";
import WelcomeForm from "./WelcomeForm.js";

import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

export default function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          //изменяем стейт isLoggedIn на true
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch(console.error);
  }

  return (
    <>
      <Header buttonName="Регистрация" />
      <WelcomeForm
        title="Вход"
        buttonName="Войти"
        handleSubmit={handleSubmit}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}
