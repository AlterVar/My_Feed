import { useApolloClient, useMutation } from "@apollo/client/react";
import { DELETE_POST } from "../api/deletePostSchema";
import { useContext } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import { useImage } from "@/shared/lib";

const useDeletePostRequest = () => {
	const toasterAction = useContext(ToasterActionContext);
	const client = useApolloClient();
  const [mutate] = useMutation<{
    postDelete: { ok: boolean };
  }>(DELETE_POST);
  const { deleteImage } = useImage();

  const deletePost = async (id: string, key: string) => {
    try {
      await deleteImage(key, "POSTS");
      const mutateRes = await mutate({
        variables: { input: { id } },
      });
			if (!mutateRes.data?.postDelete.ok) throw new Error("Ошибка удаления поста");
			client.cache.evict({ id: `PostModel:${id}` });
			client.cache.gc();
      toasterAction?.changeToaster({
        text: "Пост успешно удален",
        success: true,
      });
    } catch (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось удалить пост",
        success: false,
      });
    }
  };

  return { deletePost };
};

export default useDeletePostRequest;
