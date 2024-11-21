"use client";

import VolumeFill from "@components/icon/mingcute/volume-fill";
import VolumeMuteFill from "@components/icon/mingcute/volume-mute-fill";
import useLocalStorage from "@hooks/local-storage";
import { rem } from "@lib/utils";

export default function SoundToggle() {
  const [value, setVolume] = useLocalStorage("volume");
  const volume = parseFloat(value ?? "1");

  return (
    <button className="rounded-full bg-red-200" onClick={toggle} type="button">
      {volume > 0 ? <VolumeFill size={rem(20)} /> : <VolumeMuteFill size={rem(20)} />}
    </button>
  );

  function toggle() {
    setVolume(volume > 0 ? "0" : "1");
  }
}
