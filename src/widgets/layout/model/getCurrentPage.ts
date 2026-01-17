export function getCurrentPage() {
	switch (location.pathname) {
    case "/":
      return "Главная";
      break;
    case "/profile":
      return "Мой профиль";
      break;
    case "/my-posts":
      return "Мои посты";
      break;
    case "/my-posts/create-post":
      return "Создание поста";
      break;
    case "/favourites":
      return "Избранное";
      break;
  }
}