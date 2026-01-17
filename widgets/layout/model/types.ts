import type { Dispatch, SetStateAction } from "react";

export type PageName =
	| "Главная"
	| "Мой профиль"
	| "Мои посты"
	| "Создание поста"
	| "Избранное";

export interface MainMenuProps {
	setBurgerOpen: Dispatch<SetStateAction<boolean>>;
}