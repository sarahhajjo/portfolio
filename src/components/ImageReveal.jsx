import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ImageReveal.css';

const ImageReveal = () => {
    const gridRef = useRef(null);
    const rows = 12; // يمكنك تعديل عدد المربعات
    const cols = 12;

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        grid.innerHTML = '';
        const width = grid.offsetWidth;
        const height = grid.offsetHeight;
        const tileW = width / cols;
        const tileH = height / rows;

        const tiles = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');

                // إضافة 1 بكسل لمنع ظهور الخطوط الفاصلة
                tile.style.width = `${Math.ceil(tileW) + 1}px`;
                tile.style.height = `${Math.ceil(tileH) + 1}px`;
                tile.style.top = `${Math.floor(i * tileH)}px`;
                tile.style.left = `${Math.floor(j * tileW)}px`;

                tile.style.backgroundImage = `url('/image_2afcbc.jpg')`;

                // ✅ التعديل الصحيح: إجبار الصورة على أخذ حجم الشاشة الكلي وتقسيمها
                tile.style.backgroundSize = `${width}px ${height}px`;
                tile.style.backgroundPosition = `-${Math.floor(j * tileW)}px -${Math.floor(i * tileH)}px`;

                grid.appendChild(tile);
                tiles.push(tile);
            }
        }

        gsap.fromTo(
            tiles,
            {
                opacity: 0,
                z: () => gsap.utils.random(-600, 600),
                y: () => gsap.utils.random(-500, 500),
                x: () => gsap.utils.random(-500, 500),
                rotation: () => gsap.utils.random(-180, 180),
                scale: 0.1,
            },
            {
                opacity: 1,
                z: 0,
                y: 0,
                x: 0,
                rotation: 0,
                scale: 1.01,
                duration: 2.2,
                stagger: { amount: 1.8, grid: [rows, cols], from: "random" },
                ease: "expo.out",
            }
        );
    }, []);

    return <div className="image-grid-wrapper" ref={gridRef}></div>;
};

export default ImageReveal;