import { useQuery } from "@apollo/client/react";
import type { User } from "../model/types";
import { USER_ME } from "../api/UserMeSchema";
import { useContext, useEffect } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";

const useUserMe = () => {
  const token = localStorage.getItem("token");
  const toasterAction = useContext(ToasterActionContext);
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery<{ userMe: User }>(USER_ME, {
    fetchPolicy: "cache-first",
    skip: !token,
  });

  useEffect(() => {
    if (userError) {
      console.warn(userError);
      toasterAction?.changeToaster({
        text: "Не удалось загрузить данные пользователя",
        success: false,
      });
    }
  }, [userError]);

  return { userData: userData?.userMe, userLoading };
};

export default useUserMe;
