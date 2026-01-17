import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import "./ShareDialog.scss";
import { Button, Dialog, InputField } from "@/shared/ui";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Props } from "../model/types";

const ShareDialog = ({ closeDialog }: Props) => {
	const toacterAction = useContext(ToasterActionContext);
	const id = location.search;
  const url = location.origin + id;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      link: url,
    },
  });
  const navigate = useNavigate();
  const copyLink = () => {
    try {
      navigator.clipboard.writeText(url);
      toacterAction?.changeToaster({ text: "Ссылка успешно скопирована.", success: true });
    } catch (err) {
      toacterAction?.changeToaster({
        text: "Не удалось скопировать ссылку.",
        success: false,
      });
      console.warn(err);
    } finally {
			clearSearch();
    }
	};
	const clearSearch = () => {
		closeDialog();
    navigate(location.pathname);
	}
	
  return (
    <Dialog variant="sticky" onClose={clearSearch}>
      <div className="share">
        <h2 className="share__title">Поделиться этим постом</h2>
        <form className="share__form" onSubmit={handleSubmit(copyLink)}>
          <InputField
            label={"Ссылка"}
            type={"text"}
            name={"link"}
            placeholder={""}
            register={register}
            readOnly
          />
          <Button
            type="submit"
            variant="primary"
            size="large"
            text="Скопировать ссылку"
          />
        </form>
      </div>
    </Dialog>
  );
};

export default ShareDialog;
