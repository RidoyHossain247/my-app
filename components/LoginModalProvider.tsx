"use client";

import LoginModal from "./LoginModal";
import { useLoginModalStore } from "@/app/src/store/useLoginModalStore";

export default function LoginModalProvider() {
  const { isOpen, closeModal } = useLoginModalStore();

  return (
    <LoginModal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    />
  );
}

