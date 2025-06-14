import { useState } from "react";
import CopyCode from "./CopyCode";

const GradientGenerator = () => {
    const [color1, setColor1] = useState("#8A2BE2");
    const [color2, setColor2] = useState("#4158D0");
    const [angle, setAngle] = useState("to right");

    const gradient = `linear-gradient(${angle}, ${color1}, ${color2})`;
    const cssCode = `background: ${gradient};`;

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-100">
                Gradient Generator
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 space-y-6">
                    <div>
                        <label className="block mb-2 font-medium text-gray-300">
                            Color 1
                        </label>
                        <div className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                            <input
                                type="color"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                                className="w-10 h-10 rounded border-none bg-transparent cursor-pointer"
                            />
                            <input
                                type="text"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                                className="w-full bg-transparent p-2 rounded text-white focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-300">
                            Color 2
                        </label>
                        <div className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                            <input
                                type="color"
                                value={color2}
                                onChange={(e) => setColor2(e.target.value)}
                                className="w-10 h-10 rounded border-none bg-transparent cursor-pointer"
                            />
                            <input
                                type="text"
                                value={color2}
                                onChange={(e) => setColor2(e.target.value)}
                                className="w-full bg-transparent p-2 rounded text-white focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="angle-select"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Direction
                        </label>
                        <select
                            id="angle-select"
                            value={angle}
                            onChange={(e) => setAngle(e.target.value)}
                            className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="to right">to right</option>
                            <option value="to left">to left</option>
                            <option value="to top">to top</option>
                            <option value="to bottom">to bottom</option>
                            <option value="to top right">to top right</option>
                            <option value="45deg">45deg</option>
                            <option value="90deg">90deg</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 flex flex-col">
                    <div
                        style={{ background: gradient }}
                        className="w-full h-48 rounded-xl shadow-lg transition-all duration-300"
                    ></div>
                    <CopyCode code={cssCode} />
                </div>
            </div>
        </div>
    );
};

export default GradientGenerator;
