import { useApolloClient, useMutation } from "@apollo/client/react";
import { USER_EDIT_PROFILE } from "../api/UserEditProfileSchema";
import type { Fields, ProfileForm, UserResponce } from "../model/types";
import { useContext, useEffect, useState } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import { CombinedGraphQLErrors, gql } from "@apollo/client";
import { useUserMe, type User } from "@/entities/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileValidation } from "../model/validationSchema";
import type { ResponseError } from "@/shared/types/types";
import { validationMessages } from "../model/constants";
import { useImage } from "@/shared/lib";
import { USER_ME } from "@/entities/user/api/UserMeSchema";

const useEditUser = () => {
  const [prevAvatar, setPrevAvatar] = useState<FileList | string>("");
  const { saveImage, sendImage, deleteImage } = useImage();
  const client = useApolloClient();
  const { userData } = useUserMe();
  const toasterAction = useContext(ToasterActionContext);
  const {
    register,
    reset,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    watch,
    formState: { isDirty, errors, dirtyFields },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileValidation),
    mode: "onChange",
  });

  const [avatarImage, setAvatarImage] = useState(userData?.avatarUrl || "");
  const avatarField = watch("avatarUrl");

  useEffect(() => {
    if (
      avatarField &&
      avatarField instanceof FileList &&
      avatarField.length > 0
    ) {
      const image = URL.createObjectURL(avatarField[0]);
      setPrevAvatar(avatarField);
      setAvatarImage(image);
    }
  }, [avatarField]);

  const [
    mutate,
    { error: newUserError, data: newUserData, loading: newUserLoading },
  ] = useMutation<UserResponce>(USER_EDIT_PROFILE, {
    update(cache, { data }) {
      if (!data?.userEditProfile) return;
      const { user } = data.userEditProfile;
      if (user) {
        cache.writeQuery({
          query: USER_ME,
          data: { userMe: user },
        });
        cache.writeFragment({
          id: `UserModel:${user.id}`,
          fragment: gql`
            fragment UpdatedUser on UserModel {
              avatarUrl
              birthDate
              country
              email
              firstName
              gender
              lastName
              middleName
              phone
              id
            }
          `,
          data: user,
        });
      }
    },
  });
  const clearMeta = (data?: User) => {
    if (data) {
      const { __typename, avatarUrl, ...userInfo } = data;
      setAvatarImage(avatarUrl);
      return userInfo;
    }
  };
  const deleteAvatar = () => {
    const prev = getValues("avatarUrl");
    setValue("avatarUrl", "empty", { shouldDirty: true });
    setAvatarImage("");
    if (prev) setPrevAvatar(prev);
  };

  const sendChanges = async (newData: Partial<ProfileForm>) => {
    try {
      const editRes = await mutate({ variables: { input: newData } });
      if (!editRes) throw new Error("Ошибка редактирования профиля");
      toasterAction?.changeToaster({
        text: "Изменения успешно сохранены",
        success: true,
      });
    } catch (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось сохранить изменения",
        success: false,
      });
    }
  };

  const editUser = async (data: ProfileForm) => {
    const keys = Object.keys(dirtyFields);
    const changedValues: Record<string, unknown> = {
      email: data.email,
    };
    (keys as (keyof ProfileForm)[]).forEach((field) => {
      changedValues[field] = data[field];
    });
    let newData = changedValues;
    if (
      changedValues.avatarUrl instanceof FileList &&
      changedValues.avatarUrl.length > 0
    ) {
      const link = await sendImage(changedValues.avatarUrl[0], "AVATARS");
      if (!link) return;
      const saveRes = await saveImage(link, changedValues.avatarUrl[0]);
      if (!saveRes) return;
      const linkForBackend = link.split("?")[0];
      newData = {
        ...changedValues,
        avatarUrl: linkForBackend,
      };
    } else if (
      !avatarImage &&
      (newUserData?.userEditProfile.user?.avatarUrl || userData?.avatarUrl)
    ) {
      const url =
        newUserData?.userEditProfile.user?.avatarUrl || userData?.avatarUrl;
      if (url) await deleteImage(url, "AVATARS");
      newData = { ...changedValues, avatarUrl: null };
    }
    sendChanges(newData);
  };
  const resetForm = () => {
    let user = userData;
    if (newUserData && newUserData.userEditProfile.user) {
      user = newUserData.userEditProfile.user;
    }
    const clearUser = clearMeta(user);
    setAvatarImage(user?.avatarUrl || "");
    reset({ ...clearUser, avatarUrl: prevAvatar });
    client.cache.evict({ fieldName: "myPosts" });
    client.cache.gc();
  };

  useEffect(() => {
    if (newUserError && CombinedGraphQLErrors.is(newUserError)) {
      const extensions = newUserError.errors[0].extensions;
      const field: Fields = (extensions?.errors as ResponseError[])[0]
        .field as Fields;
      setError(field, { message: validationMessages[field] });
    }
    if (newUserData && newUserData.userEditProfile.problem) {
      const { __typename } = newUserData.userEditProfile.problem;
      if (__typename === "EmailAlreadyUsedProblem") {
        setError("email", { message: validationMessages["email"] });
      }
      if (__typename === "PhoneAlreadyUsedProblem") {
        setError("phone", { message: validationMessages["phone"] });
      }
    }
  }, [newUserError, newUserData]);

  useEffect(() => {
		if (!newUserData && !userData) return;
		if (newUserLoading || newUserError || newUserData?.userEditProfile.problem) {
			return;
		}
    resetForm();
  }, [newUserData, userData]);

  return {
		editUser,
		sendChanges,
    cancelChange: resetForm,
    deleteAvatar,
    register,
    control,
    handleSubmit,
    isDirty,
    getValues,
    avatarImage,
    errors,
		dirtyFields,
		newUserLoading,
  };
};

export default useEditUser;
