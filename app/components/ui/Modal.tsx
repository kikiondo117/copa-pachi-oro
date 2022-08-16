interface ModalProps {
  className?: string;
  modalClassName?: string;
  children: JSX.Element | JSX.Element[] | string;
  onClose: () => void;
}

export function Modal({
  children,
  className,
  modalClassName,
  onClose,
}: ModalProps) {
  return (
    <div
      className="absolute inset-0 z-20 h-screen w-screen"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
        className={`relative z-20 m-auto mt-24 ${
          modalClassName ? modalClassName : "h-[32rem] w-[35rem]"
        }`}
      >
        <div
          className={`h-full  rounded-lg bg-special-gray  ${
            className ? className : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
