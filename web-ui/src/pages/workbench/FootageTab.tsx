import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Check, ChevronDown, Plus, X } from "lucide-react";

type IngredientType = "frame" | "color" | "subject" | "background" | "texture" | "accent";

interface Ingredient {
    id: string;
    image: string;
    type: IngredientType;
    label: string;
}

export const FootageTab = () => {
    const [prompt, setPrompt] = useState("");
    const [model, setModel] = useState("AnimateDiff-v2");
    const [duration, setDuration] = useState("4");
    const [candidates, setCandidates] = useState("2");
    const [generatedVideos, setGeneratedVideos] = useState<Array<{ id: string; url: string; thumbnail: string }>>([]);
    const [currentPreview, setCurrentPreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
    const [videoHistory, setVideoHistory] = useState<Array<{ id: string; url: string; thumbnail: string }>>([]);
    const [expandModelSettings, setExpandModelSettings] = useState(false);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [expandIngredients, setExpandIngredients] = useState(true);
    const [motionVideo, setMotionVideo] = useState<string | null>(null);
    const [motionPrompt, setMotionPrompt] = useState("");
    const [expandMotionControl, setExpandMotionControl] = useState(false);
    const [showIngredientsDialog, setShowIngredientsDialog] = useState(false);

    // Placeholder ingredient images (placeholder colors and patterns)
    const placeholderIngredients = [
        "/community_placeholder.png",
        "/community_placeholder.png",
        "/community_placeholder.png",
        "/community_placeholder.png",
        "/community_placeholder.png",
        "/community_placeholder.png",
        "/community_placeholder.png",
        "/community_placeholder.png",
    ];

    // Simulated videos to pick from
    const mockVideos = [
        "/CommunityVideo/anime_girl_sunset.1280_720.mp4",
        "/CommunityVideo/blue_skirt_neo.704_1280.mp4",
        "/CommunityVideo/cyber_city.704_1280.mp4",
        "/CommunityVideo/electric_tiger.720_1280.mp4",
        "/CommunityVideo/emo_girl.1280_720.mp4",
        "/CommunityVideo/flight.1280_720.mp4",
    ];

    const handleGenerate = () => {
        setIsGenerating(true);
        setProgress(0);
        setSelectedCandidate(null);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return prev;
                }
                return prev + Math.random() * 30;
            });
        }, 500);

        // Simulate generation time
        setTimeout(() => {
            clearInterval(progressInterval);
            setProgress(100);

            // Create candidate videos
            const numCandidates = parseInt(candidates) || 2;
            const candidates_arr: Array<{ id: string; url: string; thumbnail: string }> = [];

            for (let i = 0; i < numCandidates; i++) {
                const randomVideo = mockVideos[Math.floor(Math.random() * mockVideos.length)];
                candidates_arr.push({
                    id: `${Date.now()}-${i}`,
                    url: randomVideo,
                    thumbnail: "/community_placeholder.png",
                });
            }

            setGeneratedVideos(candidates_arr);
            setCurrentPreview(candidates_arr[0]?.url || null);
            setSelectedCandidate(candidates_arr[0]?.id || null);
            setVideoHistory((prev) => [...candidates_arr, ...prev]);
            setIsGenerating(false);
            setProgress(0);
        }, 3000);
    };

    const handleSelectCandidate = (id: string, url: string) => {
        setSelectedCandidate(id);
        setCurrentPreview(url);
    };

    const handleDelete = (id: string) => {
        const filtered = generatedVideos.filter((v) => v.id !== id);
        setGeneratedVideos(filtered);
        if (currentPreview === generatedVideos.find((v) => v.id === id)?.url) {
            setCurrentPreview(filtered[0]?.url || null);
            setSelectedCandidate(filtered[0]?.id || null);
        }
    };

    const handleAddIngredient = (image: string, type: IngredientType = "subject") => {
        const newIngredient: Ingredient = {
            id: Date.now().toString(),
            image,
            type,
            label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
        };
        setIngredients([...ingredients, newIngredient]);
    };

    const handleRemoveIngredient = (id: string) => {
        setIngredients(ingredients.filter((ing) => ing.id !== id));
    };

    const handleUpdateIngredientType = (id: string, type: IngredientType) => {
        setIngredients(
            ingredients.map((ing) =>
                ing.id === id
                    ? { ...ing, type, label: `${type.charAt(0).toUpperCase() + type.slice(1)}` }
                    : ing
            )
        );
    };

    const handleAddIngredientImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleAddIngredient(reader.result as string, "subject");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-6">生成镜头</h2>

            <div className="flex gap-6 flex-1 overflow-hidden">
                {/* Left Panel - Controls */}
                <div className="w-80 flex flex-col gap-6 overflow-y-auto">
                    {/* Ingredients List */}
                    <div className="bg-black/20 rounded-lg border border-white/10 overflow-hidden">
                        <button
                            onClick={() => setExpandIngredients(!expandIngredients)}
                            className="w-full flex items-center justify-between p-4 hover:bg-black/30 transition-colors"
                        >
                            <h3 className="text-white font-semibold">素材 ({ingredients.length})</h3>
                            <ChevronDown
                                className={`h-5 w-5 text-white/70 transition-transform ${expandIngredients ? "rotate-180" : ""}`}
                            />
                        </button>
                        {expandIngredients && (
                            <div className="border-t border-white/10 p-4 bg-black/10">
                                <div className="space-y-3">
                                    {/* Add ingredient button */}
                                    <Button
                                        onClick={() => setShowIngredientsDialog(true)}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-2"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        从库中选择
                                    </Button>

                                    {/* Upload ingredient button */}
                                    <label className="block cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAddIngredientImage}
                                            className="hidden"
                                        />
                                        <div className="w-full h-10 bg-black/40 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center hover:border-white/50 transition-colors">
                                            <p className="text-xs text-white/70">或上传图片</p>
                                        </div>
                                    </label>

                                    {/* Ingredients list */}
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {ingredients.map((ingredient, idx) => (
                                            <div key={ingredient.id} className="flex gap-2 items-center bg-black/30 rounded p-2">
                                                <img
                                                    src={ingredient.image}
                                                    alt={`Ingredient ${idx + 1}`}
                                                    className="w-10 h-10 rounded object-cover border border-white/20"
                                                />
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
                                                        >
                                                            <span className="capitalize text-xs">
                                                                {ingredient.type === "subject" ? "Main Subject" :
                                                                    ingredient.type === "color" ? "Color Reference" :
                                                                        ingredient.type.charAt(0).toUpperCase() + ingredient.type.slice(1)}
                                                            </span>
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="bg-black/90 border-white/20">
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateIngredientType(ingredient.id, "frame")}
                                                            className="text-white hover:bg-white/10 cursor-pointer"
                                                        >
                                                            {ingredient.type === "frame" && <Check className="h-4 w-4 mr-2" />}
                                                            {ingredient.type !== "frame" && <span className="h-4 w-4 mr-2" />}
                                                            First Frame
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateIngredientType(ingredient.id, "color")}
                                                            className="text-white hover:bg-white/10 cursor-pointer"
                                                        >
                                                            {ingredient.type === "color" && <Check className="h-4 w-4 mr-2" />}
                                                            {ingredient.type !== "color" && <span className="h-4 w-4 mr-2" />}
                                                            Color Reference
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateIngredientType(ingredient.id, "subject")}
                                                            className="text-white hover:bg-white/10 cursor-pointer"
                                                        >
                                                            {ingredient.type === "subject" && <Check className="h-4 w-4 mr-2" />}
                                                            {ingredient.type !== "subject" && <span className="h-4 w-4 mr-2" />}
                                                            Main Subject
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateIngredientType(ingredient.id, "background")}
                                                            className="text-white hover:bg-white/10 cursor-pointer"
                                                        >
                                                            {ingredient.type === "background" && <Check className="h-4 w-4 mr-2" />}
                                                            {ingredient.type !== "background" && <span className="h-4 w-4 mr-2" />}
                                                            Background
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateIngredientType(ingredient.id, "texture")}
                                                            className="text-white hover:bg-white/10 cursor-pointer"
                                                        >
                                                            {ingredient.type === "texture" && <Check className="h-4 w-4 mr-2" />}
                                                            {ingredient.type !== "texture" && <span className="h-4 w-4 mr-2" />}
                                                            Texture
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateIngredientType(ingredient.id, "accent")}
                                                            className="text-white hover:bg-white/10 cursor-pointer"
                                                        >
                                                            {ingredient.type === "accent" && <Check className="h-4 w-4 mr-2" />}
                                                            {ingredient.type !== "accent" && <span className="h-4 w-4 mr-2" />}
                                                            Accent
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <button
                                                    onClick={() => handleRemoveIngredient(ingredient.id)}
                                                    className="text-red-500 hover:text-red-400 hover:bg-white/10 rounded p-1 transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Motion Control - Accordion */}
                    <div className="bg-black/20 rounded-lg border border-white/10 overflow-hidden">
                        <button
                            onClick={() => setExpandMotionControl(!expandMotionControl)}
                            className="w-full flex items-center justify-between p-4 hover:bg-black/30 transition-colors"
                        >
                            <h3 className="text-white font-semibold">Motion Control</h3>
                            <ChevronDown
                                className={`h-5 w-5 text-white/70 transition-transform ${expandMotionControl ? "rotate-180" : ""}`}
                            />
                        </button>
                        {expandMotionControl && (
                            <div className="border-t border-white/10 p-4 bg-black/10">
                                <div className="space-y-3">
                                    {/* Video Upload */}
                                    <div>
                                        <label className="text-sm text-white/70 block mb-2">Reference Video</label>
                                        <label className="block relative cursor-pointer">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setMotionVideo(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                            <div className="w-full h-20 bg-black/40 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center hover:border-white/50 transition-colors cursor-pointer">
                                                {motionVideo ? (
                                                    <span className="text-xs text-white/70">✓ Video selected</span>
                                                ) : (
                                                    <span className="text-xs text-white/70">Click to upload video</span>
                                                )}
                                            </div>
                                        </label>
                                    </div>

                                    {/* Motion Prompt */}
                                    <div>
                                        <label className="text-sm text-white/70 block mb-2">Motion Description</label>
                                        <textarea
                                            value={motionPrompt}
                                            onChange={(e) => setMotionPrompt(e.target.value)}
                                            placeholder="Describe the camera movement and motion (e.g., 'slow pan left with subtle zoom in')"
                                            className="w-full h-16 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Prompt */}
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                        <h3 className="text-white font-semibold mb-2">Prompt</h3>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the footage you want to generate..."
                            className="w-full h-20 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Model Parameters - Accordion */}
                    <div className="bg-black/20 rounded-lg border border-white/10 overflow-hidden">
                        <button
                            onClick={() => setExpandModelSettings(!expandModelSettings)}
                            className="w-full flex items-center justify-between p-4 hover:bg-black/30 transition-colors"
                        >
                            <h3 className="text-white font-semibold">Model Settings</h3>
                            <ChevronDown
                                className={`h-5 w-5 text-white/70 transition-transform ${expandModelSettings ? "rotate-180" : ""}`}
                            />
                        </button>
                        {expandModelSettings && (
                            <div className="border-t border-white/10 p-4 bg-black/10">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-white/70">Model</label>
                                        <select
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="AnimateDiff-v2">AnimateDiff-v2</option>
                                            <option value="ModelScope">ModelScope</option>
                                            <option value="SVD">Stable Video Diffusion</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/70">Duration (seconds)</label>
                                        <Input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            min="1"
                                            max="10"
                                            className="mt-1 bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/70">Candidates (variations)</label>
                                        <Input
                                            type="number"
                                            value={candidates}
                                            onChange={(e) => setCandidates(e.target.value)}
                                            min="1"
                                            max="8"
                                            className="mt-1 bg-white/5 border-white/10 text-white"
                                        />
                                        <p className="text-xs text-white/50 mt-1">Number of variations to generate (1-8)</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Preview & History */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                    {/* Video Preview */}
                    <div className="bg-black/30 rounded-lg border border-white/10 h-80 overflow-hidden flex flex-col flex-shrink-0">
                        <div className="p-4 border-b border-white/10">
                            <h3 className="text-white font-semibold">Preview</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-black/50 overflow-auto">
                            {isGenerating ? (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-6">
                                    <Skeleton className="w-full h-2/3 rounded-lg" />
                                    <div className="w-full max-w-xs">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs text-white/70">Generating...</span>
                                            <span className="text-xs text-white/70">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-600 to-emerald-600 transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : currentPreview ? (
                                <video
                                    src={currentPreview}
                                    controls
                                    muted
                                    className="w-full h-full object-contain"
                                    autoPlay
                                />
                            ) : (
                                <Button
                                    onClick={handleGenerate}
                                    className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700 font-semibold px-8 py-3"
                                >
                                    Generate Footage
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Generated Videos Carousel */}
                    {generatedVideos.length > 0 && (
                        <div className="bg-black/30 rounded-lg border border-white/10 p-6 flex-shrink-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-semibold">Select Best Result</h3>
                                <Button
                                    onClick={handleGenerate}
                                    className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700 font-semibold py-2 px-4 text-sm"
                                >
                                    Regenerate
                                </Button>
                            </div>
                            <div className="relative">
                                {/* Side by side candidates */}
                                <div className="grid grid-cols-2 gap-4">
                                    {generatedVideos.map((video, idx) => (
                                        <div
                                            key={video.id}
                                            className={`group cursor-pointer transition-all transform hover:scale-105 ${selectedCandidate === video.id ? "scale-105" : ""
                                                }`}
                                            onClick={() => handleSelectCandidate(video.id, video.url)}
                                        >
                                            <div
                                                className={`relative rounded-xl overflow-hidden border-3 transition-all ${selectedCandidate === video.id
                                                    ? "border-green-500 shadow-lg shadow-green-500/50"
                                                    : "border-white/20 hover:border-white/50"
                                                    }`}
                                            >
                                                {/* Video Thumbnail */}
                                                <div className="relative w-full h-48 bg-black/50 overflow-hidden">
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={`Candidate ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Play overlay */}
                                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 transition-all flex items-center justify-center backdrop-blur-sm">
                                                            <div className="w-0 h-0 border-l-6 border-l-white border-y-4 border-y-transparent ml-1"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Label & Selection */}
                                                <div className="bg-gradient-to-t from-black/80 to-transparent p-4 absolute bottom-0 left-0 right-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-white font-semibold">Prediction {idx + 1}</span>
                                                        {selectedCandidate === video.id && (
                                                            <div className="bg-green-600 rounded-full p-2">
                                                                <Check className="h-4 w-4 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Delete button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(video.id);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                                >
                                                    <Trash2 className="h-4 w-4 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation hints */}
                                <div className="mt-4 flex items-center justify-center gap-4">
                                    {generatedVideos.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectCandidate(generatedVideos[idx].id, generatedVideos[idx].url)}
                                            className={`h-2 rounded-full transition-all ${selectedCandidate === generatedVideos[idx].id
                                                ? "w-8 bg-gradient-to-r from-purple-600 to-emerald-600"
                                                : "w-2 bg-white/30 hover:bg-white/50"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Previously Generated Footage Library */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4 flex-shrink-0">
                        <h3 className="text-white font-semibold mb-3">My Footages</h3>
                        {videoHistory.length > 0 ? (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {videoHistory.map((video) => (
                                    <div
                                        key={video.id}
                                        className="relative flex-shrink-0 group cursor-pointer"
                                        onClick={() => {
                                            setCurrentPreview(video.url);
                                            setSelectedCandidate(null);
                                        }}
                                    >
                                        <div
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentPreview === video.url && selectedCandidate === null
                                                ? "border-blue-500 ring-2 ring-blue-500"
                                                : "border-white/20 hover:border-white/50"
                                                }`}
                                        >
                                            <img
                                                src={video.thumbnail}
                                                alt="History"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setVideoHistory((prev) => prev.filter((v) => v.id !== video.id));
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-600/80 hover:bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-3 w-3 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex gap-2 pb-2">
                                {[0, 1, 2, 3, 4].map((idx) => (
                                    <div
                                        key={`placeholder-${idx}`}
                                        className="w-20 h-20 rounded-lg bg-gradient-to-br from-white/5 to-white/2 border-2 border-dashed border-white/20 flex-shrink-0 flex items-center justify-center"
                                    >
                                        <div className="text-center">
                                            <div className="text-xs text-white/40">-</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ingredients Selection Dialog */}
            {showIngredientsDialog && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-black/80 border border-white/20 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
                        <div className="sticky top-0 bg-black/90 border-b border-white/20 p-4 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-lg">Select Ingredient</h2>
                            <button
                                onClick={() => setShowIngredientsDialog(false)}
                                className="text-white/70 hover:text-white"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-4 gap-4">
                                {placeholderIngredients.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            handleAddIngredient(img, "subject");
                                            setShowIngredientsDialog(false);
                                        }}
                                        className="relative group"
                                    >
                                        <div className="w-full h-32 rounded-lg border-2 border-white/20 hover:border-white/50 transition-colors overflow-hidden bg-gradient-to-br from-white/5 to-white/2">
                                            <img
                                                src={img}
                                                alt={`Ingredient ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Plus className="h-6 w-6 text-white" />
                                        </div>
                                        <p className="text-xs text-white/70 mt-2">Select</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FootageTab;
