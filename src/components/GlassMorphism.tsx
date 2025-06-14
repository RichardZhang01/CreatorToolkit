import { useState } from "react";
import { Palette, Copy } from "lucide-react";

const GlassMorphism = () => {
    const [blur, setBlur] = useState(10);
    const [transparency, setTransparency] = useState(0.2);
    const [copied, setCopied] = useState(false);

    const cssCode = `background: rgba(255, 255, 255, ${transparency});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(255, 255, 255, 0.3);`;

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
                Interactive Glassmorphism
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3 h-72 flex justify-center items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
                    <div
                        className="w-full max-w-sm h-56 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ease-in-out"
                        style={{
                            background: `rgba(255, 255, 255, ${transparency})`,
                            backdropFilter: `blur(${blur}px)`,
                            WebkitBackdropFilter: `blur(${blur}px)`,
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/30 rounded-lg">
                                <Palette className="w-7 h-7 text-white" />
                            </div>
                            <span className="font-mono text-sm text-white/70">
                                Glassmorphism
                            </span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-2xl">
                                Glass UI
                            </h4>
                            <p className="text-white/80 text-sm">
                                A modern UI trend.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 space-y-6">
                    <div>
                        <label
                            htmlFor="blur-slider"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Blur: {blur}px
                        </label>
                        <input
                            id="blur-slider"
                            type="range"
                            min="0"
                            max="50"
                            value={blur}
                            onChange={(e) => setBlur(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="transparency-slider"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Transparency: {transparency}
                        </label>
                        <input
                            id="transparency-slider"
                            type="range"
                            min="0.1"
                            max="0.5"
                            step="0.05"
                            value={transparency}
                            onChange={(e) =>
                                setTransparency(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">Generated CSS</h4>
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
    );
};

export default GlassMorphism;
