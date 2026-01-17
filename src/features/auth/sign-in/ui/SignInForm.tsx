import { Button, InputField } from "@/shared/ui";
import "./SignInForm.scss";
import useSignInForm from "../lib/useSignInForm";
import { validationMessages } from "../model/constants";

const SignInForm = () => {
  const { signIn, loading, data, register, handleSubmit, errors, dirtyFields } =
    useSignInForm();

  return (
    <form className="signin-form" onSubmit={handleSubmit(signIn)}>
      <div className="singin-form__header">
        <h2 className="signin-form__title">
          Введите Ваш Email и пароль, чтобы войти в аккаунт.
        </h2>
      </div>
      <div className="signin-form__step">
        <InputField
          label="Email"
          type="text"
          name="email"
          placeholder="Введите email"
          register={register}
          dirty={dirtyFields.email}
          validationError={errors?.email}
          {...(data?.userSignIn.problem && {
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
          {...(data?.userSignIn.problem && {
            requestError: true,
            requestErrorMessage: validationMessages.password,
          })}
        ></InputField>

        <Button
          type="submit"
          variant="primary"
          size="large"
          text="Войти"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default SignInForm;
