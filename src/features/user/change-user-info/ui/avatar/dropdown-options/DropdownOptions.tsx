import clsx from "clsx";
import { useState } from "react";
import type { DropdownOptionsProps } from "../../../model/types";

const DropdownOptions = ({ deleteAvatar }: DropdownOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelect = (option = "") => {
    if (option === "Удалить фото") {
      setSelectedOption("Удалить");
      deleteAvatar();
    }
    if (option === "Загрузить фото") {
      setSelectedOption("Загрузить");
    }
  };

  return (
    <>
      <div className="avatar__dropdown-header mobile-only">
        <span>Аватар профиля</span>
      </div>
      <div
        key={"Удалить"}
        className={clsx(
          "dropdown__option",
          selectedOption === "Удалить" && "dropdown__option_selected"
        )}
        role="option"
        onClick={() => handleSelect("Удалить фото")}
      >
        Удалить фото
      </div>
      <label
        key={"Загрузить"}
        htmlFor="avatarUrl"
        className={clsx(
          "dropdown__option",
          selectedOption === "Загрузить" && "dropdown__option_selected"
        )}
        role="option"
        onClick={() => handleSelect("Загрузить фото")}
      >
        Загрузить фото
      </label>
    </>
  );
};

export default DropdownOptions;
