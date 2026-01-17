import { useContext } from "react";
import { ToasterActionContext } from "../providers/ToasterProvider";

const useImage = () => {
  const token = localStorage.getItem("token");
  const toasterAction = useContext(ToasterActionContext);
  const sendImage = async (file: File, type: "POSTS" | "AVATARS") => {
    try {
      const res = await fetch(
        `https://internship-social-media.purrweb.net/v1/aws/signed-url?fileName=${encodeURIComponent(
          file.name
        )}&fileCategory=${type}`,
        {
          method: "GET",
          headers: {
            "Content-type": "Application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Ошибка GET запроса s3");
      }
      const link = await res.text();
      return link;
    } catch (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось сохранить изменения",
        success: false,
      });
    }
  };

  const saveImage = async (link: string, file: File) => {
    try {
      const res = await fetch(link, {
        method: "PUT",
        headers: {
          "Content-type": file.type,
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: file,
      });
      if (!res.ok) {
        throw new Error("Ошибка PUT запроса s3");
      }
      return link;
    } catch (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось сохранить изменения",
        success: false,
      });
    }
  };

  const deleteImage = async (imagekey: string, type: "POSTS" | "AVATARS") => {
    try {
      const res = await fetch(
        `https://internship-social-media.purrweb.net/v1/aws/delete-s3-file?fileKey=${encodeURIComponent(
          imagekey
        )}&fileCategory=${type}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "Application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Ошибка удаления картинки с s3");
      }
      return true;
    } catch (error) {
      console.warn(error);
    }
  };

  return { sendImage, saveImage, deleteImage };
};

export default useImage;
