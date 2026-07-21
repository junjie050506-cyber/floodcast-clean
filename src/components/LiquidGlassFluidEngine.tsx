import React, { useEffect, useRef } from 'react';

interface LiquidGlassFluidEngineProps {
  value: number;
  maxValue: number;
  color: string;
}

export const LiquidGlassFluidEngine: React.FC<LiquidGlassFluidEngineProps> = ({ value, maxValue, color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    const fillPercentage = Math.min(100, Math.max(10, (value / maxValue) * 100));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetHeight = canvas.height * (1 - fillPercentage / 100);
      angle += 0.04;

      ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.15)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.15)' : 'rgba(255, 69, 58, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.sin(x * 0.02 + angle) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.25)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.25)' : 'rgba(255, 69, 58, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.cos(x * 0.015 + angle + 1.5) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, maxValue, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};
