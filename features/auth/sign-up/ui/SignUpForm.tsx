import { Button, InputField } from "@/shared/ui";
import useSignUpForm from "../lib/useSignUpForm";
import { validationMessages } from "../model/constants";
import "./SignUpForm.scss";
import { useEffect, useState } from "react";

const SignUpForm = () => {
  const {
    signUp,
    saveUser,
    loading,
    register,
    getValues,
    errors,
    data,
    dirtyFields,
    isValid,
  } = useSignUpForm();
  const [isFirstStep, setFirstStep] = useState(true);

  useEffect(() => {
    if (data?.userSignUp.problem) setFirstStep(true);
	}, [data?.userSignUp.problem]);
	
	const registerUser = () => {
		const data = getValues();
		signUp(data);
		setFirstStep(false);
	}

  return (
    <form className="signup-form">
      {isFirstStep && (
        <>
          <div className="signup-form__header">
            <p className="signup-form__step-label">Шаг 1 из 2</p>
            <h2 className="signup-form__title">
              Чтобы создать аккаунт введите Ваш Email и придумайте пароль.
            </h2>
          </div>
          <div className="signup-form__step">
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Введите email"
              register={register}
              dirty={dirtyFields.email}
              validationError={errors?.email}
              {...(data?.userSignUp.problem && {
                requestError: true,
                requestErrorMessage: validationMessages.email,
              })}
            ></InputField>
            <InputField
              label="Пароль"
              type="password"
              name="password"
              placeholder="Введите пароль"
              register={register}
              dirty={dirtyFields.password}
              validationError={errors?.password}
            ></InputField>
            <InputField
              label="Введите пароль еще раз"
              type="password"
              name="passwordConfirm"
              placeholder="Введите пароль"
              register={register}
              dirty={dirtyFields.passwordConfirm}
              validationError={errors?.passwordConfirm}
            ></InputField>
            <Button
              type="button"
              variant="primary"
              size="large"
              text="Далее"
              onClick={registerUser}
              disabled={!isValid}
            />
          </div>
        </>
      )}
      {!isFirstStep && (
        <>
          <div className="signup-form__header">
            <p className="signup-form__step-label">Шаг 2 из 2</p>
            <h2 className="signup-form__title">
              Дополните свой профиль личной информацией.
            </h2>
          </div>
          <div className="signup-form__step">
            <InputField
              label="Имя"
              type="text"
              name="firstName"
              placeholder="Введите имя"
              register={register}
              dirty={dirtyFields.firstName}
              validationError={errors?.firstName}
            ></InputField>
            <InputField
              label="Фамилия"
              type="text"
              name="lastName"
              placeholder="Введите фамилию"
              register={register}
              dirty={dirtyFields.lastName}
              validationError={errors?.lastName}
            ></InputField>
            <InputField
              label="Отчество"
              type="text"
              name="middleName"
              placeholder="Введите отчество"
              register={register}
              dirty={dirtyFields.middleName}
              validationError={errors?.middleName}
            ></InputField>
            <Button
              type="button"
              variant="primary"
              size="large"
              text="Создать аккаунт"
							loading={loading}
							onClick={() => saveUser(getValues())}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default SignUpForm;
