import { useState } from "react";
import { Copy } from "lucide-react";

interface CopyTextProps {
    code: string;
}

const CopyCode = ({ code }: CopyTextProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-sm text-pink-400 relative">
            <pre className="overflow-auto whitespace-pre-wrap break-words">
                <code>{code}</code>
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
    );
};

export default CopyCode;
