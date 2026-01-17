import { AvatarImage, useUserMe } from "@/entities/user";
import "./UserInfo.scss";
import DefaultAvatar from "@/shared/assets/images/user/avatar-default.svg?react";
import Arrow from "@/shared/assets/images/post/arrow.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from "@/shared/ui";
import Skeleton from "react-loading-skeleton";
import { useApolloClient } from "@apollo/client/react";

const UserInfo = () => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
	const { userData, userLoading } = useUserMe();
	const client = useApolloClient();
  const handleExit = () => {
		localStorage.removeItem("token");
		client.cache.evict({});
		client.cache.gc();
    navigate("/auth");
  };

  return (
    <div className="user-info">
      <div className="user-info__avatar">
        {(userData?.avatarUrl && (
          <AvatarImage avatarUrl={userData.avatarUrl} />
        )) ||
          (userLoading && (
            <Skeleton circle={true} height={38} width={38} />
          )) || <DefaultAvatar />}
      </div>
      <button
        className="user-info__btn"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <span className="user-info__name">
          {(userData && `${userData?.firstName} ${userData?.lastName}`) ||
            (userLoading && (
              <Skeleton width={123} height={20} borderRadius={20} />
            )) || "незнакомец"}
        </span>
        {(userData && (
          <Arrow className="desktop-only user-info__arrow icon_primary" />
        )) || <Skeleton width={20} height={20} />}
        {isOpenDropdown && (
          <div className="desktop-only">
            <Dropdown variant={"inline"}>
              <Link
                to={"/profile"}
                key={"Мой профиль"}
                className="dropdown__option user-info__option"
                role="option"
              >
                Мой профиль
              </Link>
              <div
                key={"Выйти"}
                className="dropdown__option user-info__option"
                role="option"
                onClick={handleExit}
              >
                Выйти
              </div>
            </Dropdown>
          </div>
        )}
      </button>
    </div>
  );
};

export default UserInfo;
