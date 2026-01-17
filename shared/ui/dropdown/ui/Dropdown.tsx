import clsx from "clsx";
import "./Dropdown.scss";
import type { Props } from "../model/types";

const Dropdown = ({
  children,
  variant,
}: Props) => {
  return (
    <div
      className={clsx("dropdown dropdown_open", "dropdown_" + variant)}
      role="listbox"
    >
      {children}
    </div>
  );
};

export default Dropdown;
