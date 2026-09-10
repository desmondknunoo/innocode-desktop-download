"use client";

import { useState } from "react";
import CodeModal from "@/components/CodeModal";

export default function InnoCodeButton({ className, label = "Visit InnoCode" }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open && <CodeModal onClose={() => setOpen(false)} />}
    </>
  );
}