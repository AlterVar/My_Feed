import Eye from "@/shared/assets/images/forms/eye.svg?react";
import CrossedEye from "@/shared/assets/images/forms/eyeCrossed.svg?react";
import Valid from "@/shared/assets/images/forms/valid.svg?react";
import Invalid from "@/shared/assets/images/forms/invalid.svg?react";
import { useEffect, useState } from "react";
import "./InputField.scss";
import type { FieldValues } from "react-hook-form";
import clsx from "clsx";
import type { Props } from "../model/types";

const InputField = <T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  readOnly,
  register,
  dirty,
  validationError,
  requestError,
  requestErrorMessage,
}: Props<T>) => {
  const [isPasswordShown, setPasswordShown] = useState(false);
  const [isRequestError, setRequestError] = useState(requestError);

  useEffect(() => {
    if (requestError) setRequestError(requestError);
  }, [requestError]);

  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={clsx(
          "input__field",
          (validationError || isRequestError) && "input__field_invalid"
        )}
        type={type === "password" && isPasswordShown ? "text" : type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        {...(readOnly !== undefined && { readOnly })}
        onFocus={() => setRequestError(false)}
      />
      {type === "password" && (
        <>
          {!dirty && (
            <span
              className="input__icon"
              onClick={() => setPasswordShown((prev) => !prev)}
            >
              {isPasswordShown ? (
                <Eye className="icon_text-tertiary" />
              ) : (
                <CrossedEye className="icon_text-tertiary" />
              )}
            </span>
          )}
          {dirty && (validationError || isRequestError) && (
            <span
              className="input__icon"
              onClick={() => setPasswordShown((prev) => !prev)}
            >
              {isPasswordShown ? (
                <Eye className="input__icon_invalid" />
              ) : (
                <CrossedEye className="input__icon_invalid" />
              )}
            </span>
          )}
          {dirty && !validationError && !isRequestError && (
            <span className="input__icon">
              <Valid />
            </span>
          )}
        </>
      )}
      {type !== "password" && dirty && (
        <span className="input__icon">
          {validationError || isRequestError ? <Invalid /> : <Valid />}
        </span>
      )}
      {isRequestError && (
        <span className="input__error">{requestErrorMessage}</span>
      )}
      {validationError && dirty && (
        <span className="input__error">{validationError.message}</span>
      )}
    </div>
  );
};

export default InputField;
