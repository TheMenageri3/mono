/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { ProfileFormData } from "~/lib/validation";
import CustomFormItem from "../CustomForm";

import { Form, FormField } from "~/_components/final/ui/form";
import { Textarea } from "~/_components/ui/textarea";
import { Camera, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/_components/ui/button";

type ProfileFormProps = {
  initialData: ProfileFormData & { isVerified: boolean; id: string };
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  // const [isEditing, setIsEditing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileFormData>>({
    resolver: zodResolver(ProfileFormData),
    defaultValues: initialData,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: ProfileFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Profile created:", values);
      // setIsEditing(false);
      router.push(`/profile/${initialData.id}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return <></>;
}
