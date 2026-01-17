import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import "./ErrorBlock.scss";
import Error from "@/shared/assets/images/error.svg?react";
import type { Props } from "../model/types";

const ErrorBlock = ({ errorCode }: Props) => {
  const navigate = useNavigate();
	const goHome = () => {
		if (location.pathname === "/") navigate(0);
		navigate("/");
  };
  return (
    <div className="page-container error">
      <div className="error__image">
        <span className="error__code">{errorCode}</span>
        <Error />
      </div>
      <p className="error__description">Произошла непредвиденная ошибка</p>
      <Button
        type={"button"}
        variant={"primary"}
        text={"На главную"}
        onClick={goHome}
      />
    </div>
  );
};

export default ErrorBlock;