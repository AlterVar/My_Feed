import { useMutation } from "@apollo/client/react";
import { SIGN_IN } from "../api/signIn";
import type { SignInResponse } from "../model/types";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import { gql } from "@apollo/client";

const useSignInRequest = () => {
  const toasterAction = useContext(ToasterActionContext);
  const [mutate, { data, loading, error }] =
		useMutation<SignInResponse>(SIGN_IN, {
			update(cache, { data }) {
				if (!data?.userSignIn) return;
				const { user } = data.userSignIn;
				if (user) {
					cache.writeQuery({
						query: gql`
          query GetCurrentUser {
            currentUser {
              avatarUrl
              birthDate
              country
              email
              firstName
              gender
              lastName
              middleName
              phone
            }
          }
        `,
						data: { currentUser: user }
					});
				}
			}
		});
	const navigate = useNavigate();

  const signIn = (data: FieldValues) => {
    mutate({
      variables: { input: data },
    }).then((res) => {
      if (res.data?.userSignIn.token) {
        localStorage.setItem("token", res.data.userSignIn.token);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось авторизоваться",
        success: false,
      });
    }
  }, [error]);

  return {
    signIn,
    loading,
    data,
    error,
  };
};

export default useSignInRequest;
