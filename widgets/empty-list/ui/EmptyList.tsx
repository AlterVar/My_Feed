import "./EmptyList.scss";
import { Button } from "@/shared/ui";
import Empty from "@/shared/assets/images/post/empty.svg?react";
import { useNavigate } from "react-router-dom";
import type { Props } from "../model/types";

const EmptyList = ({
  title,
  btn,
  navigation,
}: Props) => {
  const navigate = useNavigate();
  const hangleClick = () => {
    navigate(navigation);
  };

  return (
    <div className="empty-list">
      <div className="empty-list__image">
        <Empty width={450} height={450} />
      </div>
      <div className="empty-list__text">
        <h2 className="empty-list__title">{title}</h2>
        <Button
          type={"button"}
          variant={"primary"}
          size={"small"}
          text={btn}
          onClick={hangleClick}
        />
      </div>
    </div>
  );
};

export default EmptyList;
