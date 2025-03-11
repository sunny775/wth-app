import { X } from "lucide-react";
import { memo, useEffect, useRef } from "react";

interface ModalProps {
  header: React.ReactNode;
  closeModal(): void;
  children?: React.ReactNode;
  open?: boolean;
  isDefaultOpen?: boolean;
}

const Modal = memo(
  ({ open, closeModal, isDefaultOpen, header, children }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
      if (open || isDefaultOpen) {
        dialogRef.current?.showModal();
        console.log("dialog opened");
      } else {
        dialogRef.current?.close();
        console.log("dialog closed");
      }
    }, [open, isDefaultOpen]);

    return (
      <dialog
        ref={dialogRef}
        className="fixed top-20 left-1/2 -translate-x-1/2 bg-white dark:bg-white/5 backdrop:bg-black/5 p-2 rounded-lg shadow-lg backdrop:backdrop-blur-sm w-full max-w-3xl h-[calc(100vh-100px)] overflow-hidden"
        onClose={closeModal}
      >
        <div className="flex flex-col w-full p-4 h-full overflow-auto">
          <div className="flex w-full h-auto justify-center items-center">
            {header}
            <button className="w-8 h-8 bg-gray-400 dark:bg-white/20 rounded-full flex justify-center items-center text-gray-100 dark:text-black/50 cursor-pointer fixed top-3 right-3">
              <X onClick={closeModal} />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    );
  }
);

export default Modal;
