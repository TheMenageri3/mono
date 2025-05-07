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
      className:
        "bg-background border-border text-foreground dark:bg-card dark:text-foreground",
    });
  },

  success: ({ title, description, action }: ToastProps) => {
    toast.success(title, {
      description,
      action,
      className:
        "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800/30 dark:text-green-300",
    });
  },

  error: ({ title, description, action }: ToastProps) => {
    toast.error(title, {
      description,
      action,
      className:
        "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/30 dark:text-red-300",
    });
  },

  warning: ({ title, description, action }: ToastProps) => {
    toast(title, {
      description,
      action,
      className:
        "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800/30 dark:text-yellow-300",
    });
  },
};
