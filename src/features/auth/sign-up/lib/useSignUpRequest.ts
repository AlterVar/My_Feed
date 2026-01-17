import { useMutation } from "@apollo/client/react";
import { SIGN_UP } from "../api/signUp";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { SignUpResponse } from "../model/types";
import { useContext, useEffect } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import { gql } from "@apollo/client";
import { useEditUser } from "@/features/user/change-user-info";

const useSignUp = () => {
  const toasterAction = useContext(ToasterActionContext);
  const { sendChanges } = useEditUser();
  const [mutate, { loading, error, data }] = useMutation<SignUpResponse>(
    SIGN_UP,
    {
      update(cache, { data }) {
        if (!data?.userSignUp) return;
        const { user } = data.userSignUp;
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
            data: { currentUser: user },
          });
        }
      },
    }
  );

  const signUp = (data: FieldValues) => {
    const { passwordConfirm, password, email } = data;
    const user = {
      email,
      password,
      passwordConfirm,
    };
    mutate({
      variables: { input: user },
    }).then((res) => {
      if (res.data?.userSignUp.token)
        localStorage.setItem("token", res.data?.userSignUp.token);
    });
  };

  const navigate = useNavigate();
  const saveUser = async (data: FieldValues) => {
    const { firstName, middleName, lastName, email } = data;
    await sendChanges({
      firstName,
      middleName,
      lastName,
      email,
    });
    navigate("/");
  };
  useEffect(() => {
    if (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось зарегистрироваться, сопробуйте позже",
        success: false,
      });
    }
  }, [error]);

  return {
    signUp,
    saveUser,
    loading,
    error,
    data,
  };
};

export default useSignUp;
