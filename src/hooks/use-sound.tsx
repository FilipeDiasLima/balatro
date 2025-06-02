import { useRef } from "react";

export function useSound(url: string, volume: number = 1) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.volume = volume;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.volume = volume;
    audioRef.current.play().catch((err) => {
      console.warn("Som não pode ser reproduzido:", err);
    });
  };

  return play;
}
