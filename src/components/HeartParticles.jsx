import React, { useEffect, useRef } from 'react';

export default function HeartParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm, festive party palette: Mint emerald, soft champagne gold, warm amber, and pastel blush
    const colors = [
      '#34d399', // Mint emerald
      '#6ee7b7', // Bright mint
      '#a7f3d0', // Pastel sage
      '#fde047', // Champagne yellow
      '#facc15', // Warm gold
      '#f472b6', // Soft party pink
      '#ffffff', // Diamond twinkle
    ];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 65;
    const particles = [];

    // Helper to draw a heart
    function drawHeart(ctx, x, y, size, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 1.8;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size * 1.25);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Helper to draw a soft fairy light bokeh orb
    function drawBokehOrb(ctx, x, y, radius, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Helper to draw a diamond sparkle star
    function drawSparkleStar(ctx, x, y, size, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.quadraticCurveTo(x, y, x + size, y);
      ctx.quadraticCurveTo(x, y, x, y + size);
      ctx.quadraticCurveTo(x, y, x - size, y);
      ctx.quadraticCurveTo(x, y, x, y - size);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      let type = 'heart';
      let size = Math.random() * 8 + 6;
      let alpha = Math.random() * 0.65 + 0.25;

      if (typeRand < 0.4) {
        type = 'heart';
      } else if (typeRand < 0.7) {
        type = 'sparkle';
        size = Math.random() * 5 + 3;
      } else {
        type = 'bokeh';
        size = Math.random() * 22 + 14; // Large soft fairy light orb
        alpha = Math.random() * 0.35 + 0.12;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedY: Math.random() * 0.55 + 0.25,
        speedX: (Math.random() - 0.5) * 0.35,
        alpha,
        alphaSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.8) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < -40) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, Math.max(0.1, p.alpha));
        } else if (p.type === 'bokeh') {
          drawBokehOrb(ctx, p.x, p.y, p.size, p.color, Math.max(0.08, p.alpha));
        } else {
          drawSparkleStar(ctx, p.x, p.y, p.size, p.color, Math.max(0.15, p.alpha));
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
