import { useState } from "react";

interface UseModalProps {
  callback?: (...args: any[]) => void;
}

export const useModal = ({ callback }: UseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    callback?.();
  };

  return { isOpen, openModal, closeModal, callback };
};
