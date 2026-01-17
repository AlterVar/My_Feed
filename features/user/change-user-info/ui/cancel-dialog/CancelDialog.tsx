import { Button, Dialog } from "@/shared/ui";
import "./CancelDialog.scss";
import type { CancelDialogProps } from "../../model/types";

const CancelDialog = ({
  cancelChange,
  editUser,
  getValues,
  setOpenCancelDialog,
}: CancelDialogProps) => {
	const handleSave = () => {
		editUser(getValues());
		setOpenCancelDialog(false);
	};
	const handleCancel = () => {
    cancelChange();
    setOpenCancelDialog(false);
  };
  return (
    <Dialog variant={"sticky"} onClose={() => setOpenCancelDialog(false)}>
      <div className="cancel-change">
        <div className="cancel-change__text-container">
          <h2 className="cancel-change__title">
            Выйти без сохранения изменений?
          </h2>
          <p className="cancel-change__description">
            Внесенные изменения не будут сохранены.
          </p>
        </div>
        <div className="cancel-change__actions">
          <Button
            type="button"
            variant="secondary"
            size="small"
            text="Не сохранять"
            onClick={handleCancel}
          />
          <Button
            type="button"
            variant="primary"
            size="small"
            text="Сохранить"
            onClick={handleSave}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default CancelDialog;
