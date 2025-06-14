import { useState, useRef } from "react";
import { getColors } from "@/utils/colorExtractor";
import { Upload, Copy } from "lucide-react";

const PaletteExtractor = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [colors, setColors] = useState([] as string[]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === "string") {
                    setImageUrl(e.target.result);
                    setError("");
                    extractColors(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const extractColors = (imgSrc: string) => {
        setLoading(true);
        setColors([]);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imgSrc;
        img.onload = () => {
            const colors = getColors(img);
            if (colors.length === 0) {
                setError(
                    "Could not extract colors. Please try a different image."
                );
            }
            setColors(colors);
            setLoading(false);
        };

        img.onerror = () => {
            setLoading(false);
            setError("Could not load image. Please try a different image.");
        };
    };

    const handleCopy = (color: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = color;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        const colorElement = document.getElementById(`color-${color.slice(1)}`);
        if (colorElement) {
            const originalText = colorElement.innerText;
            colorElement.innerText = "Copied!";
            setTimeout(() => {
                colorElement.innerText = originalText;
            }, 1500);
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-100">
                Palette Extractor
            </h3>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                }
                className="w-full flex justify-center items-center gap-3 p-4 mb-6 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-all shadow-lg"
            >
                <Upload className="w-6 h-6" />
                <span>Upload an Image</span>
            </button>
            {error && <p className="text-red-400 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center bg-gray-900/50 rounded-lg min-h-[200px] p-4">
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="max-w-full max-h-64 rounded-lg shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500">Image preview here.</p>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    {loading && (
                        <p className="text-gray-400">Extracting colors...</p>
                    )}
                    {colors.length > 0 && (
                        <div className="space-y-3">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg"
                                >
                                    <div
                                        style={{ backgroundColor: color }}
                                        className="w-10 h-10 rounded-full shadow-md"
                                    ></div>
                                    <span
                                        id={`color-${color.slice(1)}`}
                                        className="font-mono text-lg text-gray-200"
                                    >
                                        {color}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(color)}
                                        className="ml-auto p-2 rounded-md hover:bg-gray-600 transition"
                                    >
                                        <Copy className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {!loading && colors.length === 0 && (
                        <p className="text-gray-500 text-center md:text-left">
                            Color palette here.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaletteExtractor;
