import Edit from "@/shared/assets/images/user/edit.svg?react";
import DefaultAvatar from "@/shared/assets/images/user/avatar-default.svg?react";
import "./Avatar.scss";
import { useEffect, useState } from "react";
import { Dialog, Dropdown } from "@/shared/ui";
import { AvatarImage } from "@/entities/user";
import DropdownOptions from "./dropdown-options/DropdownOptions";
import type { AvatarProps } from "../../model/types";

const Avatar = ({ register, avatarImage, deleteAvatar }: AvatarProps) => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(false);
    setOpenDropdown(false);
  }, [avatarImage]);

  return (
    <div className="avatar">
      <div className="mobile-only">
        <button
          type="button"
          className="avatar__btn"
          onClick={() => setOpenDialog((prev) => !prev)}
        >
          <div className="avatar__image">
            {(avatarImage && <AvatarImage avatarUrl={avatarImage} />) || (
              <DefaultAvatar />
            )}
          </div>
        </button>
        {isOpenDialog && (
          <Dialog variant={"center"} onClose={() => setOpenDialog(false)}>
            <div className="avatar__dropdown_mobile">
              <Dropdown variant={"modal"}>
                <DropdownOptions deleteAvatar={deleteAvatar} />
              </Dropdown>
            </div>
          </Dialog>
        )}
      </div>
      <div className="desktop-only">
        <div className="avatar__image">
          {(avatarImage && <AvatarImage avatarUrl={avatarImage} />) || (
            <DefaultAvatar />
          )}
        </div>
        <button
          type="button"
          className="avatar__edit-btn"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          <Edit width={20} height={20} className="icon_secondary" />
        </button>
        {isOpenDropdown && (
          <Dropdown variant={"inline"}>
            <DropdownOptions deleteAvatar={deleteAvatar} />
          </Dropdown>
        )}
      </div>
      <input
        className="visually-hidden"
        type="file"
        accept="image/png, image/jpeg"
        id="avatarUrl"
        {...register("avatarUrl")}
      />
    </div>
  );
};

export default Avatar;
