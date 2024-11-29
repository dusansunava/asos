import { useState } from "react";
import { Logo } from "@/components/ui/logo";

export const ExerciseLogo = ({ logo }: { logo: string }) => {
  const [showImage, setShowImage] = useState(true);

  const onImageLoadError = () => {
    setShowImage(false);
  };

  return (
    <>
      {showImage ? (
        <img
          className="h-12 w-12"
          src={`https://cryptofonts.com/img/icons/${logo.toLowerCase()}.svg`}
          alt="Icon"
          onError={onImageLoadError}
        />
      ) : (
        <Logo className="h-12 w-12" />
      )}
    </>
  );
};
