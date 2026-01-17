import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPostSchema } from "../model/createPostSchema";
import { useMutation } from "@apollo/client/react";
import { CREATE_POST } from "../api/createPost";
import type { CreateFormRequest, CreateFormValues } from "../model/types";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import { useImage } from "@/shared/lib";

const useCreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
  });
  const { saveImage, sendImage } = useImage();
  const location = useLocation();
  const navigate = useNavigate();
  const toasterAction = useContext(ToasterActionContext);

  useEffect(() => {
    if (location.state?.title) setValue("title", location.state?.title);
    if (location.state)
      navigate(location.pathname, { replace: true, state: null });
  }, [setValue, location.state?.title, location, navigate]);

  const [mutate, { loading }] =
    useMutation<CreateFormRequest>(CREATE_POST);

	const createPostRequest = async (data: CreateFormValues) => {
		try {
			const link = await sendImage(data.mediaUrl[0], "POSTS")
			if (!link) return;
			const saved = await saveImage(link, data.mediaUrl[0]);
			if (!saved) return;
			const linkForBackend = link.split("?")[0];
			const newData = {
				title: data.title,
				description: data.description,
				mediaUrl: linkForBackend,
			};
			const result = await mutate({ variables: { input: newData } });
			if (!result) throw new Error("Ошибка при сохранении поста")
			toasterAction?.changeToaster({
				text: "Пост успешно создан",
				success: true,
			});
			navigate("/my-posts");
		} catch (error) {
			console.warn(error);
			toasterAction?.changeToaster({
				text: "Не удалось создать пост, попробуйте позже",
				success: false,
			});
		};
	}

  return {
    register,
    handleSubmit,
    isValid,
    createPostRequest,
    loading,
    setValue,
    reset,
    watch,
  };
};

export default useCreatePost;
