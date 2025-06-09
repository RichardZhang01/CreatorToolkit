const getColors = (img: HTMLImageElement, _numColors = 5) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get canvas context");
        return [];
    }

    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);

    let imageData;
    try {
        imageData = ctx.getImageData(0, 0, width, height).data;
    } catch (e) {
        console.error("Error getting image data:", e);
        return [];
    }

    const colorCount: { [key: string]: number } = {};
    for (let i = 0; i < imageData.length; i += 4) {
        const r = Math.round(imageData[i] / 32) * 32;
        const g = Math.round(imageData[i + 1] / 32) * 32;
        const b = Math.round(imageData[i + 2] / 32) * 32;
        const rgb = `rgb(${r}, ${g}, ${b})`;

        if (colorCount[rgb]) {
            colorCount[rgb]++;
        } else {
            colorCount[rgb] = 1;
        }
    }

    const sortedColors = Object.keys(colorCount).sort(
        (a, b) => colorCount[b] - colorCount[a]
    );
    return sortedColors.slice(0, _numColors).map(rgbToHex);
};

const rgbToHex = (rgb: string): string => {
    const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

export { getColors, rgbToHex };