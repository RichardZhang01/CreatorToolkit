import { useState } from "react";
import { Copy } from "lucide-react";

const ClipPath = () => {
    const [shape, setShape] = useState(
        "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
    );
    const [copied, setCopied] = useState(false);

    const shapes = [
        {
            name: "Diamond",
            value: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        },
        { name: "Triangle", value: "polygon(50% 0%, 0% 100%, 100% 100%)" },
        {
            name: "Arrow",
            value: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
        },
        {
            name: "Star",
            value: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        },
        { name: "Circle", value: "circle(50% at 50% 50%)" },
        { name: "Ellipse", value: "ellipse(25% 40% at 50% 50%)" },
    ];

    const cssCode = `clip-path: ${shape};`;

    const handleCopy = () => {
        const textarea = document.createElement("textarea");
        textarea.value = cssCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-100">
                CSS Clip-Path Generator
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div
                        className="w-64 h-64 bg-gradient-to-br from-pink-500 to-yellow-500 transition-all duration-300 ease-in-out"
                        style={{ clipPath: shape }}
                    ></div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="shape-select"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Choose a Preset Shape
                        </label>
                        <select
                            id="shape-select"
                            value={shape}
                            onChange={(e) => setShape(e.target.value)}
                            className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {shapes.map((s) => (
                                <option key={s.name} value={s.value}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* FIX: Add a textarea to allow custom clip-path values */}
                    <div className="mb-4">
                        <label
                            htmlFor="custom-shape"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Custom clip-path Value
                        </label>
                        <textarea
                            id="custom-shape"
                            rows={4}
                            value={shape}
                            onChange={(e) => setShape(e.target.value)}
                            className="w-full p-3 bg-gray-900 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g., polygon(...)"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">
                            Generated CSS
                        </h4>
                        <div className="p-4 bg-gray-900 rounded-lg font-mono text-sm text-pink-400 relative">
                            <pre className="overflow-auto whitespace-pre-wrap break-words">
                                <code>{cssCode}</code>
                            </pre>
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
                            >
                                <Copy className="w-5 h-5" />
                                {copied && (
                                    <span className="absolute -top-8 -left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        Copied!
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClipPath;
