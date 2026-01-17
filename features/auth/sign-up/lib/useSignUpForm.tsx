import { useForm } from "react-hook-form";
import useSignUp from "./useSignUpRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldsWithServerValidation, SignUpForm } from "../model/types";
import { signUpSchema } from "../model/validationSchema";
import { useEffect } from "react";
import { CombinedGraphQLErrors } from "@apollo/client";
import { validationMessages } from "../model/constants";
import type { ResponseError } from "@/shared/types/types";

const useSignUpForm = () => {
  const {
    register,
    setError,
    trigger,
		watch,
		getValues,
    formState: { errors, dirtyFields, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const confirm = watch("password");

  useEffect(() => {
    if (dirtyFields.passwordConfirm) trigger("passwordConfirm");
  }, [trigger, confirm, dirtyFields.passwordConfirm]);

  const { signUp, saveUser, loading, error, data } = useSignUp();
  useEffect(() => {
    if (error && CombinedGraphQLErrors.is(error)) {
      const extensions = error.errors[0].extensions;
      const field: FieldsWithServerValidation = (
        extensions?.errors as ResponseError[]
      )[0].field as FieldsWithServerValidation;
      setError(field, { message: validationMessages[field] });
    }
  }, [error, setError]);

  return {
    signUp,
    saveUser,
    loading,
    data,
    register,
    getValues,
    errors,
    dirtyFields,
    isValid,
  };
};

export default useSignUpForm;
