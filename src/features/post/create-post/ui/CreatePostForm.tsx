import "./CreatePostForm.scss";
import { Button, InputField } from "@/shared/ui";
import FileInput from "./file-input/FileInput";
import useCreatePost from "../lib/useCreatePost";
import { useEffect, useState } from "react";

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    isValid,
    createPostRequest,
    setValue,
		reset,
		watch
  } = useCreatePost();
	const imageField = watch("mediaUrl");
  const [isLoading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [savedImage, setSavedImage] = useState("");

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev === 90) setLoading(false);
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
	}, [isLoading]);
	useEffect(() => {
		if (imageField && imageField.length > 0) {
			setLoading(true);
			setProgress(0);
			const image = URL.createObjectURL(imageField[0]);
			setSavedImage(image);
		}
	}, [imageField]);
	
  const clearForm = () => {
    reset();
    setSavedImage("");
	};

  return (
    <form className="create-form" onSubmit={handleSubmit(createPostRequest)}>
      <div className="create-form__fields">
        <InputField
          label={"Заголовок"}
          type={"text"}
          name={"title"}
          placeholder={"Придумайте заголовок для своего поста"}
          register={register}
        />
        <FileInput
          register={register}
          name="mediaUrl"
          progress={progress}
          isLoading={isLoading}
          setValue={setValue}
          savedImage={savedImage}
        />
        <div className="input">
          <label className="input__label" htmlFor="description">
            Описание
          </label>
          <textarea
            className="input__field"
            id="description"
            {...register("description")}
            placeholder={"Придумайте описание для своего поста"}
          />
        </div>
      </div>
      <div className="create-form__actions">
        <Button
          type={"button"}
          variant={"secondary"}
          size={"small"}
          text={"Отменить"}
          onClick={clearForm}
          {...(!isValid && { disabled: true })}
        />
        <Button
          type={"submit"}
          variant={"primary"}
          size={"small"}
          text={"Сохранить"}
          {...(!isValid && { disabled: true })}
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
