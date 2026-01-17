import "./DateInput.scss";
import "react-datepicker/dist/react-datepicker.css";
import type { DateInputProps } from "../../model/types";
import { Calendar } from "@/shared/ui";

const DateInput = ({
  control,
  name,
}: DateInputProps) => {
  return (
    <>
      <div className="input date-input">
        <label className="input__label" htmlFor="birthDate">
          Дата рождения
        </label>
        <Calendar control={control} name={name} />
      </div>
    </>
  );
};

export default DateInput;
