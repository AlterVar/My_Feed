import Picture from "@/shared/assets/images/forms/picture.svg?react";
import "./FileInput.scss";
import type { FieldValues} from "react-hook-form";
import { useEffect, useRef, useState, type DragEvent } from "react";
import clsx from "clsx";
import type { Props } from "../../model/types";

const FileInput = <T extends FieldValues>({
  register,
  name,
  isLoading,
  progress,
  savedImage,
  setValue,
}: Props<T>) => {
  const [imageUrl, setImageUrl] = useState(savedImage);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `translateX(${progress - 100}%)`;
    }
  }, [progress]);

  useEffect(() => {
    setImageUrl(savedImage);
  }, [savedImage]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
	};
	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      setValue("mediaUrl", files);
    }
  };

  return (
    <>
      <input
        className="visually-hidden"
        type="file"
        id="mediaUrl"
        accept="image/png, image/jpeg"
        {...register(name)}
      />
      <div
        className="file"
        onDragOver={(event) => handleDragOver(event)}
        onDragLeave={(event) => handleDragLeave(event)}
        onDrop={(event) => handleDrop(event)}
      >
        {imageUrl && !isLoading && (
          <label htmlFor={name}>
            <img src={imageUrl} alt="" />
            <div className="file__label-hint">
              <span>Загрузить другое изображение</span>
            </div>
          </label>
        )}
        {(!imageUrl || isLoading) && (
          <div
            className={clsx(
              "file__content",
              isLoading && "file__content_loading"
            )}
          >
            <Picture />
            <div className="file__description desktop-only">
              <p>Перетащите фото сюда</p>
              <span>или </span>
              <label className="file__label" htmlFor={name}>
                выберите фото с вашего компьютера
              </label>
            </div>
            <label className="file__label mobile-only" htmlFor={name}>
              загрузите или сделайте фото
            </label>
          </div>
        )}
      </div>
      {isLoading && !!progress && (
        <div className="progress">
          <p className="progress__percents">{progress}%</p>
          <div className="progress__container">
            <div className="progress__filler" ref={progressBarRef}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileInput;
