import Image from "next/image";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import { UploadImageIcon } from "./Icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function UploadButton({
  type,
  multiple,
  hidden,
  accept,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const supabase = createClientComponentClient();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const reader = new FileReader();

      // Preview
      reader.addEventListener("load", () => {
        setPreviewImage(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {previewImage ? (
        <Button
          className={`relative mt-4 h-[193px] w-[193px] overflow-hidden px-0 py-0 text-white tablet:px-0`}
          onClick={() => fileRef.current?.click()}
          type="button"
        >
          <div className="z-10 flex h-full w-[193px] flex-col items-center justify-center bg-black/50 py-[60px]">
            <UploadImageIcon className="fill-white" />
            <span>Change Image</span>
          </div>
          <Image
            src={previewImage}
            fill
            alt="Uploaded preview"
            className="object-cover"
          />
        </Button>
      ) : (
        <Button
          className="mt-4 h-[193px] w-[193px] flex-col bg-purple-light px-10 py-[60px] text-purple"
          onClick={() => fileRef.current?.click()}
          type="button"
        >
          <UploadImageIcon className="fill-purple" />
          <span className="text-body-s">+ Upload Image</span>
        </Button>
      )}
      <input
        type="file"
        ref={fileRef}
        multiple={false}
        hidden
        onChange={handleUpload}
        accept="image/png, image/jpeg, image/jpg"
        {...props}
      />
    </>
  );
}
