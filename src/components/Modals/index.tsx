import { ModalProps } from "@/types";
import { useEffect, useState } from "react";

export function Modal(props: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.isVisible) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // match the duration of the CSS transition
    }
  }, [props.isVisible]);

  if (!isVisible && !props.isVisible) return null;

  return (
    <div
      className={`modal ${props.isVisible ? "show" : ""}`}
      onClick={props.onClose}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
