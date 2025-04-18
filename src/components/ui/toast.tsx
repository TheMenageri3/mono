"use client";

import { toast } from "sonner";

interface ToastProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const showToast = {
  default: ({ title, description, action }: ToastProps) => {
    toast(title, {
      description,
      action,
      className: "bg-background border-border text-foreground",
    });
  },

  success: ({ title, description, action }: ToastProps) => {
    toast.success(title, {
      description,
      action,
      className:
        "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
    });
  },

  error: ({ title, description, action }: ToastProps) => {
    toast.error(title, {
      description,
      action,
      className:
        "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
    });
  },

  warning: ({ title, description, action }: ToastProps) => {
    toast(title, {
      description,
      action,
      className:
        "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
    });
  },
};
