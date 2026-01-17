import { useNavigate } from "react-router-dom";
import Arrow from "@/shared/assets/images/arrow.svg?react";
import "./BackLink.scss";
import type { Props } from "../model/types";

const BackLink = ({text, path}: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <a className="back-link" onClick={() => navigate(path)}>
        <Arrow width={24} height={24} className="icon_text-secondary"/>
        <span className="back-link__text">{text}</span>
      </a>
    </div>
  );
};

export default BackLink;
