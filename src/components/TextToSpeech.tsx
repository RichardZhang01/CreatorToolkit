import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";

const TextToSpeech = () => {
    const [text, setText] = useState(
        "Generate speech from text using the Web Speech API. Choose from a variety of different voices, and adjust the rate and pitch below."
    );
    const [voices, setVoices] = useState([] as SpeechSynthesisVoice[]);
    const [selectedVoice, setSelectedVoice] =
        useState<SpeechSynthesisVoice | null>(null);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const synth = window.speechSynthesis;

    useEffect(() => {
        const getVoices = () => {
            const voiceList = synth.getVoices();
            setVoices(voiceList);
            if (voiceList.length > 0 && !selectedVoice) {
                const defaultVoice =
                    voiceList.find((v) => v.lang.includes("en") && v.default) ||
                    voiceList.find((v) => v.lang.includes("en")) ||
                    voiceList[0];
                setSelectedVoice(defaultVoice);
            }
        };

        getVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = getVoices;
        }
    }, [synth, selectedVoice]);

    const handleSpeak = () => {
        if (synth.speaking) {
            synth.cancel();
        }
        if (text !== "" && selectedVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            utterance.pitch = pitch;
            utterance.rate = rate;
            synth.speak(utterance);
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-100">
                Text-to-Speech Engine
            </h3>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                placeholder="Enter text here..."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label
                        htmlFor="voice-select"
                        className="block mb-2 font-medium text-gray-300"
                    >
                        Voice
                    </label>
                    <select
                        id="voice-select"
                        value={selectedVoice ? selectedVoice.name : ""}
                        onChange={(e) =>
                            setSelectedVoice(
                                voices.find((v) => v.name === e.target.value) ||
                                    null
                            )
                        }
                        className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {voices.map((voice) => (
                            <option key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="rate-slider"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Rate: {rate}
                        </label>
                        <input
                            id="rate-slider"
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="pitch-slider"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Pitch: {pitch}
                        </label>
                        <input
                            id="pitch-slider"
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(Number(e.target.value))}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleSpeak}
                className="w-full flex justify-center items-center gap-3 p-4 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition-all shadow-lg"
            >
                <Volume2 className="w-6 h-6" />
                <span>Speak</span>
            </button>
        </div>
    );
};

export default TextToSpeech;
