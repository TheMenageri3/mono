"use client";

import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
      document.body.classList.add("overflow-hidden");
    } else {
      dialogRef.current.close();
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      hide();
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-0 m-0 max-w-full max-h-full w-full h-full overflow-hidden"
      ref={dialogRef}
      onClick={handleBackdropClick}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-full max-w-md rounded-lg bg-card border border-border shadow-lg overflow-hidden float-in">
        <div className="flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={hide}
              className="rounded-full p-1 hover:bg-muted/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto flex-grow">{children}</div>

          {/* Footer */}
          {submit && (
            <div className="border-t border-border p-4 flex justify-end space-x-2">
              <button
                onClick={hide}
                className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={submitDisabled}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLabel || "Save"}
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
