import Logo from "@/shared/assets/images/logo.svg?react";
import Burger from "@/shared/assets/images/burger.svg?react";
import Close from "@/shared/assets/images/close.svg?react";
import "./Header.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import MainMenu from "./main-menu/MainMenu";
import Theme from "./theme/Theme";
import { getCurrentPage } from "../../model/getCurrentPage";
import UserInfo from "./user-info/UserInfo";
import { useLocation } from "react-router-dom";
import type { PageName } from "../../model/types";

const Header = () => {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageName>("Главная");
  const location = useLocation();

  useEffect(() => {
    const pageName = getCurrentPage();
    if (pageName) {
      setCurrentPage(pageName);
      document.title = pageName;
    }
  }, [location]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__mobile-bar mobile-only">
          <Burger
            className="header__burger icon_control"
            onClick={() => setBurgerOpen((prev) => !prev)}
          />
          <span className="header__page-title">{currentPage}</span>
        </div>
        <div
          className={clsx(
            "header__nav-panel",
            isBurgerOpen && "header__nav-panel_open open"
          )}
        >
          <div className="header__nav-header">
            <Close
              className="header__close mobile-only icon_secondary"
              onClick={() => setBurgerOpen((prev) => !prev)}
            />
            <Logo className="header__logo icon_logo" />
          </div>
          <div className="header__main-menu">
            <MainMenu setBurgerOpen={setBurgerOpen} />
          </div>
          <div className="header__theme">
            <Theme />
          </div>
          <div className="header__user-info">
            <UserInfo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
