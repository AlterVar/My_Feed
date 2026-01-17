import type { DialogType } from "@/shared/types/types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const useDialog = () => {
  const navigate = useNavigate();
  const [dialogType, setDialogType] = useState<DialogType | null>(null);

  const isOpenDialog = useCallback(
    (type: DialogType) => {
      if (dialogType === type) return true;
      return false;
    },
    [dialogType]
  );
  const openDialog = useCallback(
    (type: DialogType, id?: string) => {
      if (id) navigate(location.pathname + `?id=${id}`);
      if (dialogType !== type) setDialogType(type);
    },
    [dialogType, navigate]
  );
  const closeDialog = useCallback(() => {
    setDialogType(null);
  }, []);

  return { isOpenDialog, openDialog, closeDialog };
};

export default useDialog;
