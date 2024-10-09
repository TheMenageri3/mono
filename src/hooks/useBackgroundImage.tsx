import { useState } from "react";

export const useBackgroundImage = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isNewBackgroundImage, setIsNewBackgroundImage] =
    useState<boolean>(false);

  const handleEditClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBackgroundImage(e.target?.result as string);
          setIsNewBackgroundImage(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveClick = async () => {
    try {
      // TODO: Implement API call to save the background image
      setIsNewBackgroundImage(false);
      console.log("Background image saved successfully");
    } catch (error) {
      console.error("Failed to save background image:", error);
    }
  };

  return {
    backgroundImage,
    isNewBackgroundImage,
    handleEditClick,
    handleSaveClick,
  };
};
