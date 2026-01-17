import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Fields, SignInForm } from "../model/types";
import { useEffect } from "react";
import useSignInRequest from "./useSignInRequest";
import { CombinedGraphQLErrors } from "@apollo/client";
import { validationMessages } from "../model/constants";
import { signInSchema } from "../model/validationSchema";
import type { ResponseError } from "@/shared/types/types";

const useSignInForm = () => {
  const { signIn, loading, data, error } = useSignInRequest();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (error && CombinedGraphQLErrors.is(error)) {
      const extensions = error.errors[0].extensions;
      const field: Fields = (extensions?.errors as ResponseError[])[0]
        .field as Fields;
      setError(field, { message: validationMessages[field] });
    }
  }, [error, setError]);

  return {
    signIn,
    loading,
    data,
    register,
    handleSubmit,
    errors,
    dirtyFields,
  };
};

export default useSignInForm;
