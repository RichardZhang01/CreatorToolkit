export default function PaletteExtractor() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Palette Extractor</h1>
            <p className="text-gray-600 mb-6">Upload an image to extract its color palette.</p>
            <input
                type="file"
                accept="image/*"
                className="mb-4"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        // Handle file upload and color extraction logic here
                    }
                }}
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Extract Colors
            </button>
        </div>
    );
}