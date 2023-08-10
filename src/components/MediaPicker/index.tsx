"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const MediaPicker = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const onMediaSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  return (
    <>
      <input
        onChange={onMediaSelected}
        id="file"
        name="file"
        type="file"
        className="invisible h-0 w-0"
        accept="image/*"
      />
      {preview && (
        <Image
          src={preview}
          width={100}
          height={100}
          alt="image/preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
};
