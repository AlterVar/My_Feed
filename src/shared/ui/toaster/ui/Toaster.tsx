import "./Toaster.scss";
import { useContext, useEffect, useRef } from "react"
import Success from "@/shared/assets/images/forms/valid.svg?react";
import Fail from "@/shared/assets/images/forms/invalid.svg?react";
import { createPortal } from "react-dom";
import { ToasterActionContext, ToasterValueContext } from "@/shared/lib/providers/ToasterProvider";

const Toaster = () => {
  const toasterRoot = document.getElementById("toaster-root");
	const toasterRef = useRef<HTMLDialogElement | null>(null);
	const toacterAction = useContext(ToasterActionContext);
	const toasterValue = useContext(ToasterValueContext);
	
	useEffect(() => {
    toasterRef.current?.show();
    const timeout = setTimeout(() => {
      toasterRef.current?.close();
      toacterAction?.changeToaster(null);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [toasterValue]);
	
	if (!toasterValue) return null;
  const toasterBlock = (
    <dialog className="toaster" ref={toasterRef}>
      <div className="toaster__icon">{toasterValue.success ? <Success /> : <Fail />}</div>
      <p className="toaster__text">{toasterValue.text}</p>
    </dialog>
  );
  if (toasterRoot) return createPortal(toasterBlock, toasterRoot);
};

export default Toaster