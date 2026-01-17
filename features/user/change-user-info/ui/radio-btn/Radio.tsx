import "./Radio.scss";
import type { RadioProps } from "../../model/types";

const Radio = ({ label, register, name, value }: RadioProps) => {
  return (
    <div className="radio">
      <input
        className="radio__input visually-hidden"
        type="radio"
        id={value}
        value={value}
        {...register(name)}
      />
      <label className="radio__label" htmlFor={value}>
        <span className="radio__custom-input"></span>
        <span className="radio__label-text">{label}</span>
      </label>
    </div>
  );
};

export default Radio