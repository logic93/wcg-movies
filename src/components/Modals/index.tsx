import { ModalProps } from "@/types";

export function Modal(props: ModalProps) {
  return (
    <div
      className={`modal ${props.isVisible ? "show" : "hide"}`}
      onClick={props.onClose}
    >
      <div className="modal-content-wrapper">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
