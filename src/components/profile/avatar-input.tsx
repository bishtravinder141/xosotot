"use client";

import Upload from "@components/icon/bootstrap/upload";
import Check from "@components/icon/custom/check";
import { GENDERS } from "@config/profile";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";

type ProfileAvatarInputProps = {
  gender: string;
  avatar: string;
};

export default function ProfileAvatarInput(props: ProfileAvatarInputProps) {
  const gender = GENDERS.find((item) => item.code === props.gender);

  const input = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(props.avatar);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected === null) {
      return;
    }

    const controller = new AbortController();

    void fetch(selected).then(async (response) => {
      const data = new DataTransfer();
      data.items.add(new File([await response.blob()], "avatar"));

      if (input.current) {
        input.current.files = data.files;
      }
    });

    return function cancel() {
      controller.abort();
    };
  }, [selected]);

  return (
    <>
      <label className="relative cursor-pointer self-center rounded-full">
        <NextImage
          alt="Avatar"
          className="size-36 rounded-full object-cover"
          height={144}
          src={selected === null ? avatar : selected}
          width={144}
        />

        <input
          accept="image/svg+xml,image/gif,image/png,image/jpeg"
          hidden
          name="avatar"
          onChange={onChange}
          ref={input}
          type="file"
        />
        <div className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1.5 text-white">
          <Upload size={rem(16)} />
        </div>
      </label>

      {gender && (
        <div className="grid grid-cols-5 gap-2.5">
          {gender.avatars.map((image) => (
            <button
              className="group relative overflow-hidden rounded-lg ring-blue-500 data-[state=active]:ring-1"
              data-state={selected === image.src ? "active" : void 0}
              key={image.src}
              onClick={setSelected.bind(0, image.src)}
              type="button"
            >
              <NextImage alt="Avatar" className="object-cover" height={60} src={image} width={60} />

              <span className="absolute bottom-0 right-0 rounded-tl bg-green-800 p-0.5 text-white opacity-0 transition-opacity group-data-[state=active]:opacity-100">
                <Check size={rem(7)} />
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    setAvatar(URL.createObjectURL(event.target.files[0]));
  }
}
