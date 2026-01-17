import "./Sort.scss";
import Arrow from "@/shared/assets/images/post/arrow.svg?react";
import { useState } from "react";
import clsx from "clsx";
import { Dropdown } from "@/shared/ui";
import type { Props } from "../model/types";

const Sort = ({ handleSortChange }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Новое");

  const handleSelect = (option: string) => {
    setOpen(false);
    setSelectedOption(option);
    if (option === "Новое") handleSortChange("NEW");
    if (option === "Лучшее") handleSortChange("TOP");
  };

  return (
    <div
      className="sort content-container"
      role="combobox"
      aria-expanded="false"
      aria-haspopup="listbox"
    >
      <div
        className="sort__btn"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sort__selected-value">{selectedOption}</span>
        <Arrow
          className="sort__selected-icon icon_primary"
          width={24}
          height={24}
        />
        {isOpen && (
          <Dropdown variant={"inline"}>
            <div
              key={"Новое"}
              className={clsx(
                "dropdown__option",
                selectedOption === "Новое" && "dropdown__option_selected"
              )}
              role="option"
              onClick={() => handleSelect("Новое")}
            >
              Новое
            </div>
            <div
              key={"Лучшее"}
              className={clsx(
                "dropdown__option",
                selectedOption === "Лучшее" && "dropdown__option_selected"
              )}
              role="option"
              onClick={() => handleSelect("Лучшее")}
            >
              Лучшее
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Sort;
