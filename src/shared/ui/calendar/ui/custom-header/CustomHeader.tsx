import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "./CustomHeader.scss";
import ArrowLeft from "@/shared/assets/images/forms/arrow-left.svg?react";
import ArrowRight from "@/shared/assets/images/forms/arrow-right.svg?react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
const range = (start: number, end: number, step: number) =>
  Array.from({ length: (end - start) / step }, (_, i) => start + i * step);
const years = range(1990, getYear(new Date()) + 1, 1) as number[];

export const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <div className="custom-header">
      <div className="month-container">
        <button
          type="button"
          className="custom-header__arrow"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        >
          <ArrowLeft className="icon_primary" />
        </button>
        <select
          className="custom-header__select"
          value={MONTHS[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(MONTHS.indexOf(value as (typeof MONTHS)[number]))
          }
        >
          {MONTHS.map((option) => (
            <option
              className="custom-header__option"
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="custom-header__arrow"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <ArrowRight className="icon_primary" />
        </button>
      </div>

      <div className="year-container">
        <button
          type="button"
          className="custom-header__arrow"
          onClick={decreaseYear}
          disabled={prevYearButtonDisabled}
        >
          <ArrowLeft className="icon_primary" />
        </button>
        <select
          className="custom-header__select"
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(+value)}
        >
          {years.map((option) => (
            <option
              className="custom-header__option"
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="custom-header__arrow"
          onClick={increaseYear}
          disabled={nextYearButtonDisabled}
        >
          <ArrowRight className="icon_primary" />
        </button>
      </div>
    </div>
  );
};
