import "./Button.scss";
import Loading from "@/shared/assets/images/forms/loading.svg?react";
import clsx from "clsx";
import type { Props } from "../model/types";

const Button = ({
  type,
  size,
  variant,
  text,
  icon,
  isLiked,
  onClick,
  loading,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      className={clsx(
        "btn",
        "btn_" + variant,
        size && "btn_" + size,
        isLiked && "btn_liked"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {variant === "icon" && icon && icon}
      {loading ? <Loading className={clsx("btn__icon_" + variant)} /> : text}
    </button>
  );
};

export default Button;
