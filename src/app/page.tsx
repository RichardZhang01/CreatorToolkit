"use client";

import { useState } from "react";
import {
    Palette,
    Upload,
    Droplets,
    Volume2,
    Copy,
    ChevronsRight,
    MoveHorizontal,
} from "lucide-react";

import PaletteExtractor from "@/components/PaletteExtractor";

export default function Home() {
    type ToolKey = "palette" | "gradient" | "glassMorphism" | "tts";
    const [activeTool, setActiveTool] = useState<ToolKey>("palette");

    const tools: Record<
        ToolKey,
        {
            id: string;
            name: string;
            icon: typeof Palette;
            component: React.ComponentType;
        }
    > = {
        palette: {
            id: "palette",
            name: "Palette Extractor",
            icon: Palette,
            component: PaletteExtractor,
        },
    };

    const ActiveComponent = tools[activeTool].component;

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans antialiased">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-2">
                        Creator&#39;s Toolkit
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        A collection of tools for creators, designers, and
                        developers.
                    </p>
                </header>

                <main className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-1/4">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sticky top-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-200">
                                Tools
                            </h2>
                            <nav className="space-y-2">
                                {Object.values(tools).map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() =>
                                            setActiveTool(tool.id as ToolKey)
                                        }
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 ease-in-out focus:outline-none focus:rung-2 focus:ring-purple-500 ${
                                            activeTool === tool.id
                                                ? "bg-purple-600/80 text-white shadow-lg"
                                                : "hover:bg-gray-700/70 text-gray-300"
                                        }`}
                                    >
                                        <tool.icon className="w-5 h-5" />
                                        <span>{tool.name}</span>
                                        {activeTool === tool.id && (
                                            <ChevronsRight className="w-5 h-5 ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <section className="lg:w-3/4">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 min-h-[500px]">
                            <ActiveComponent />
                        </div>
                    </section>
                </main>

                <footer className="text-center mt-16 text-gray-500">
                    <p>Created using Next.js</p>
                </footer>
            </div>
        </div>
    );
}
