"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(progress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-muted">
      <div
        className="h-full bg-primary transition-[width] duration-150"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}