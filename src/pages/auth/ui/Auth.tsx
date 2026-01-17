import Logo from "@/shared/assets/images/logo.svg?react";
import "./Auth.scss";
import { useEffect, useState } from "react";
import { SignInForm } from "@/features/auth/sign-in";
import { SignUpForm } from "@/features/auth/sign-up";
import clsx from "clsx";

const Auth = () => {
  const [isSignIn, setSignIn] = useState(true);
  useEffect(() => {
    document.title = "Авторизация";
  }, []);
  return (
    <main className="auth">
      <div className="auth__container">
        <Logo className="auth__logo icon_logo" />
        <div className="auth__tabs tabs">
          <button
            className={clsx("tabs__btn", isSignIn && "tabs__btn_active")}
            onClick={() => setSignIn(true)}
          >
            Авторизация
          </button>
          <button
            className={clsx("tabs__btn", !isSignIn && "tabs__btn_active")}
            onClick={() => setSignIn(false)}
          >
            Регистрация
          </button>
        </div>
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
    </main>
  );
};

export default Auth;
