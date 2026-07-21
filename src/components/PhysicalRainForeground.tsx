import React, { useEffect, useRef } from 'react';

interface PhysicalRainForegroundProps {
  isRaining: boolean;
  activeTab: string;
}

export const PhysicalRainForeground: React.FC<PhysicalRainForegroundProps> = ({ isRaining, activeTab }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isRaining) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    interface RainDrop {
      x: number;
      y: number;
      z: number;
      vy: number;
      len: number;
    }

    interface Splatter {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      size: number;
    }

    const drops: RainDrop[] = [];
    const droplets: Splatter[] = [];
    const MAX_DROPS = 400;
    let wind = -1.5;
    let targetWind = -1.5;

    for (let i = 0; i < MAX_DROPS; i++) {
      drops.push({
        x: Math.random() * canvas.width * 2 - canvas.width * 0.5,
        y: Math.random() * -canvas.height,
        z: Math.random() * 0.8 + 0.2,
        vy: Math.random() * 15 + 25,
        len: Math.random() * 40 + 20
      });
    }

    const explodeDrop = (x: number, y: number, z: number) => {
      const dropCount = Math.floor(Math.random() * 4) + 3;
      for (let i = 0; i < dropCount; i++) {
        droplets.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6 + (wind * 0.4),
          vy: -Math.random() * 5 - 2,
          life: 1.0,
          decay: Math.random() * 0.05 + 0.02,
          size: z * (Math.random() * 1.5 + 0.5)
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      wind += (targetWind - wind) * 0.02;
      if (Math.random() < 0.02) targetWind = (Math.random() - 0.5) * 5 - 1;

      if (Math.random() < 0.005) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const floorY = canvas.height * 0.88;
      const cardTopY = canvas.height * 0.13;
      const timelineTopY = canvas.height * 0.46;

      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        let d = drops[i];

        d.x += wind * d.z;
        d.y += d.vy * d.z;

        let splattered = false;

        if (d.y > floorY) {
          splattered = true;
        } else if (activeTab === 'home' && d.z > 0.6) {
          if (d.y > cardTopY && d.y < cardTopY + 25 && Math.random() > 0.7) splattered = true;
          if (d.y > timelineTopY && d.y < timelineTopY + 25 && Math.random() > 0.7) splattered = true;
        }

        if (splattered) {
          explodeDrop(d.x, d.y, d.z);
          d.y = Math.random() * -100 - 50;
          d.x = Math.random() * canvas.width * 2 - canvas.width * 0.5;
        }

        const tailX = d.x - wind * (d.len / d.vy);
        const tailY = d.y - d.len;

        const grad = ctx.createLinearGradient(tailX, tailY, d.x, d.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(255,255,255, ${d.z * 0.7 + 0.1})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.z * 2.5 + 0.5;
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = droplets.length - 1; i >= 0; i--) {
        let dr = droplets[i];

        dr.vy += 0.4;
        dr.x += dr.vx;
        dr.y += dr.vy;
        dr.life -= dr.decay;

        if (dr.life <= 0) {
          droplets.splice(i, 1);
        } else {
          ctx.globalAlpha = dr.life;
          ctx.beginPath();
          ctx.arc(dr.x, dr.y, dr.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      const mistGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 150);
      mistGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
      mistGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRaining, activeTab]);

  if (!isRaining) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[90]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
