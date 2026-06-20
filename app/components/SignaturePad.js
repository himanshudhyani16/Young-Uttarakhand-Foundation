"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function SignaturePad({ onSignatureChange }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const getCoordinates = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) { 
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1A1A2E";
    ctx.lineWidth = 2;
  }, []);

  const startDrawing = useCallback(
    (e) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { x, y } = getCoordinates(e, canvas);
      ctx.beginPath();
      ctx.moveTo(
        x / (window.devicePixelRatio || 1),
        y / (window.devicePixelRatio || 1)
      );
      setIsDrawing(true);
    },
    [getCoordinates]
  );

  const draw = useCallback(
    (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { x, y } = getCoordinates(e, canvas);
      ctx.lineTo(
        x / (window.devicePixelRatio || 1),
        y / (window.devicePixelRatio || 1)
      );
      ctx.stroke();
      if (!hasSignature) {
        setHasSignature(true);
        onSignatureChange?.(true);
      }
    },
    [isDrawing, hasSignature, getCoordinates, onSignatureChange]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange?.(false);
  }, [onSignatureChange]);

  return (
    <div
      className={`
        relative w-full h-[120px] bg-white rounded-[10px] cursor-crosshair touch-none
        border-[1.5px] transition-all duration-250 ease-in-out
        ${isDrawing
          ? "border-gold shadow-[0_0_0_4px_rgba(212,168,67,0.12)]"
          : "border-border-custom hover:border-gold-light"
        }
      `}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* Placeholder */}
      <span
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-sm text-text-muted pointer-events-none transition-opacity duration-150
          ${hasSignature ? "opacity-0" : "opacity-100"}
        `}
      >
        ✍️ Draw your signature here
      </span>

      {/* Clear Button */}
      <button
        type="button"
        onClick={clearSignature}
        className={`
          absolute top-2 right-2 px-2.5 py-1
          bg-white/90 border border-border-custom rounded-md
          text-[0.7rem] font-semibold text-text-muted uppercase tracking-wider
          cursor-pointer transition-all duration-150
          hover:border-crimson hover:text-crimson
          ${hasSignature ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        Clear
      </button>
    </div>
  );
}
