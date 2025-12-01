"use client";

import { customImageLoader } from "@/lib/image";
import Image from "next/image";
import { useState } from "react";

const SKYLINE_IMAGES = [
    {
        key: "sunrise",
        src: "landing-sunrise.webp",
        alt: "Sunrise",
        color: "#FF6B6B",
    },
    {
        key: "day",
        src: "landing-day.webp",
        alt: "Day",
        color: "#4ECDC4",
    },
    {
        key: "sunset",
        src: "landing-sunset.webp",
        alt: "Sunset",
        color: "#FFE66D",
    },
    {
        key: "night",
        src: "landing-night.webp",
        alt: "Night",
        color: "#95E1D3",
    },
];

export function SkylineAlignmentTest() {
    const [opacities, setOpacities] = useState([1, 0.5, 0.5, 0.5]);
    const [offsets, setOffsets] = useState([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: -10, y: -5 },
        { x: 0, y: 0 },
    ]);

    const updateOpacity = (index: number, value: number) => {
        const newOpacities = [...opacities];
        newOpacities[index] = value;
        setOpacities(newOpacities);
    };

    const updateOffset = (index: number, axis: "x" | "y", value: number) => {
        const newOffsets = [...offsets];
        newOffsets[index] = { ...newOffsets[index], [axis]: value };
        setOffsets(newOffsets);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-white text-3xl font-bold mb-6">
                    Skyline Image Alignment Testing
                </h1>

                {/* Main overlay view */}
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-8">
                    {SKYLINE_IMAGES.map((image, index) => (
                        <div
                            key={image.key}
                            className="absolute inset-0"
                            style={{
                                opacity: opacities[index],
                                pointerEvents: "none",
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    transform: `translateX(${offsets[index].x}px) translateY(${offsets[index].y}px)`,
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    loader={customImageLoader}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SKYLINE_IMAGES.map((image, index) => (
                        <div
                            key={image.key}
                            className="bg-gray-800 rounded-lg p-6 border-2"
                            style={{ borderColor: image.color }}
                        >
                            <h3
                                className="text-xl font-semibold mb-4 capitalize"
                                style={{ color: image.color }}
                            >
                                {image.key}
                            </h3>

                            {/* Opacity slider */}
                            <div className="mb-4">
                                <label className="text-white text-sm block mb-2">
                                    Opacity: {opacities[index].toFixed(2)}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={opacities[index]}
                                    onChange={(e) =>
                                        updateOpacity(index, parseFloat(e.target.value))
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* X offset */}
                            <div className="mb-4">
                                <label className="text-white text-sm block mb-2">
                                    X Offset: {offsets[index].x}px
                                </label>
                                <input
                                    type="range"
                                    min="-50"
                                    max="50"
                                    step="1"
                                    value={offsets[index].x}
                                    onChange={(e) =>
                                        updateOffset(index, "x", parseInt(e.target.value))
                                    }
                                    className="w-full"
                                />
                                <input
                                    type="number"
                                    value={offsets[index].x}
                                    onChange={(e) =>
                                        updateOffset(index, "x", parseInt(e.target.value) || 0)
                                    }
                                    className="w-full mt-2 bg-gray-700 text-white px-3 py-1 rounded"
                                />
                            </div>

                            {/* Y offset */}
                            <div className="mb-4">
                                <label className="text-white text-sm block mb-2">
                                    Y Offset: {offsets[index].y}px
                                </label>
                                <input
                                    type="range"
                                    min="-50"
                                    max="50"
                                    step="1"
                                    value={offsets[index].y}
                                    onChange={(e) =>
                                        updateOffset(index, "y", parseInt(e.target.value))
                                    }
                                    className="w-full"
                                />
                                <input
                                    type="number"
                                    value={offsets[index].y}
                                    onChange={(e) =>
                                        updateOffset(index, "y", parseInt(e.target.value) || 0)
                                    }
                                    className="w-full mt-2 bg-gray-700 text-white px-3 py-1 rounded"
                                />
                            </div>

                            {/* Copy code button */}
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        `offset: { x: ${offsets[index].x}, y: ${offsets[index].y} },`
                                    );
                                }}
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                            >
                                Copy offset code
                            </button>
                        </div>
                    ))}
                </div>

                {/* Export all offsets */}
                <div className="mt-8 bg-gray-800 rounded-lg p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">
                        Export All Offsets
                    </h3>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                        {SKYLINE_IMAGES.map((image, index) => {
                            return `    {\n        key: "${image.key}",\n        // ... other properties\n        offset: { x: ${offsets[index].x}, y: ${offsets[index].y} },\n    },\n`;
                        }).join("")}
                    </pre>
                    <button
                        onClick={() => {
                            const code = SKYLINE_IMAGES.map(
                                (image, index) =>
                                    `offset: { x: ${offsets[index].x}, y: ${offsets[index].y} },`
                            ).join("\n");
                            navigator.clipboard.writeText(code);
                        }}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                    >
                        Copy all offset code
                    </button>
                </div>

                <div className="mt-6 text-gray-400 text-sm">
                    <p>
                        <strong>How to use:</strong>
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>
                            Adjust opacity sliders to overlay images and check alignment
                        </li>
                        <li>
                            Use X/Y offset controls to shift each image into perfect alignment
                        </li>
                        <li>
                            Look for landmarks (windows, plants, desk edges) that should match
                        </li>
                        <li>
                            Copy individual offset codes or export all at once
                        </li>
                        <li>
                            Paste the offset values into skyline-hero.tsx SKYLINE_IMAGES array
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
