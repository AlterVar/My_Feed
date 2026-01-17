import { Link, useLocation } from "react-router-dom";
import "./MainMenu.scss";
import clsx from "clsx";
import type { MainMenuProps } from "@/widgets/layout/model/types";

const MainMenu = ({
  setBurgerOpen,
}: MainMenuProps) => {
  const location = useLocation();

  return (
    <nav className="main-menu">
      <ul className="main-menu__list">
        <li
          className={clsx(
            "main-menu__item",
            "mobile-only",
            location.pathname === "/profile" && "main-menu__item_active"
          )}
        >
          <Link
            to="/profile"
            className="main-menu__link"
            onClick={() => setBurgerOpen(false)}
          >
            Мой профиль
          </Link>
        </li>
        <li
          className={clsx(
            "main-menu__item",
            location.pathname === "/" && "main-menu__item_active"
          )}
        >
          <Link
            to="/"
            className="main-menu__link"
            onClick={() => setBurgerOpen(false)}
          >
            Главная
          </Link>
        </li>
        <li
          className={clsx(
            "main-menu__item",
            location.pathname.includes("/my-posts") && "main-menu__item_active"
          )}
        >
          <Link
            to="/my-posts"
            className="main-menu__link"
            onClick={() => setBurgerOpen(false)}
          >
            Мои посты
          </Link>
        </li>
        <li
          className={clsx(
            "main-menu__item",
            location.pathname === "/favourites" && "main-menu__item_active"
          )}
        >
          <Link
            to="/favourites"
            className="main-menu__link"
            onClick={() => setBurgerOpen(false)}
          >
            Избранное
          </Link>
        </li>
        <li className={clsx("main-menu__item", "mobile-only")}>
          <Link
            to="/auth"
            className="main-menu__link"
            onClick={() => localStorage.clear()}
          >
            Выйти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
