interface ModalProps {
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
  onClose: () => void;
}

export function Modal({ children, className, onClose }: ModalProps) {
  return (
    <div
      className="absolute w-screen h-screen inset-0 z-20 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="absolute z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div className="relative w-[35rem] h-[32rem] z-20 m-auto mt-24">
        <div
          className={`h-full  bg-special-gray rounded-lg  ${
            className ? className : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
