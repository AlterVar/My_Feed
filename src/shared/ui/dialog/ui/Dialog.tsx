import "./Dialog.scss";
import { useEffect, useRef, type MouseEvent } from "react";
import Close from "@/shared/assets/images/close.svg?react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import type { Props } from "../model/types";

const Dialog = ({ variant, post, children, onClose }: Props) => {
  const dialogRoot = document.getElementById("dialog-root");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
  }, []);

  const closeDialog = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current?.close();
  };

  const dialog = (
    <dialog
      className={clsx("dialog open", post && "dialog_post")}
      ref={dialogRef}
      onClick={(event) => closeDialog(event)}
      onClose={onClose}
    >
      <div className={clsx("dialog__container", "dialog_" + variant)}>
        <div className="dialog__content content-container">
          <Close
            className="dialog__close icon_secondary"
            onClick={() => dialogRef.current?.close()}
          />
          {children}
        </div>
      </div>
    </dialog>
  );

  if (dialogRoot) return createPortal(dialog, dialogRoot);
};

export default Dialog;
