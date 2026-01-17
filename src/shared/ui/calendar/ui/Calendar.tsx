import DatePicker from "react-datepicker";
import CalendarIcon from "@/shared/assets/images/forms/calender.svg?react";
import "./Calendar.scss";
import { CustomHeader } from "./custom-header/CustomHeader";
import { format, getMonth } from "date-fns";
import { Controller } from "react-hook-form";
import type { CalendarProps } from "../model/types";

const Calendar = ({
  control,
  name,
}: CalendarProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          className="input__field"
          id={name}
          calendarClassName="input__calendar"
          dayClassName={(date: Date) => {
            const currentDate = new Date();
            const currentMonth = getMonth(currentDate);
            const dateMonth = getMonth(date);
            if (dateMonth < currentMonth || dateMonth > currentMonth) {
              return "input__not-current-month";
            }
            return "input__current-month";
          }}
          renderCustomHeader={CustomHeader}
          showIcon
          dateFormat="dd.MM.yyyy"
          selected={field.value ? new Date(field.value) : undefined}
          onChange={(date: Date | null) => {
            const stringValue = date ? format(date, "yyyy-MM-dd") : "";
            field.onChange(stringValue);
          }}
          icon={<CalendarIcon className="input__icon icon_secondary" />}
        />
      )}
    />
  );
};

export default Calendar;
