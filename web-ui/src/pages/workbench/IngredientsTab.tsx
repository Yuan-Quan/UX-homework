import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Upload, X, Wand2, RefreshCw, Sparkles, Check } from "lucide-react";
import { useIngredientLibrary, type Ingredient } from "@/contexts/IngredientLibraryContext";

interface GeneratedImage {
    id: string;
    url: string;
    prompt: string;
    timestamp: Date;
    candidateIndex: number;
}

const promptExamples = [
    "A serene landscape with mountains at sunset, vibrant colors, ultra detailed",
    "Cyberpunk city street at night, neon lights, rain reflections, cinematic",
    "Fantasy forest with magical creatures, ethereal lighting, mystical atmosphere",
    "Modern minimalist interior design, natural light, clean lines, Scandinavian style"
];

export const IngredientsTab = () => {
    const { libraryIngredients, addIngredient } = useIngredientLibrary();
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
    const [prompt, setPrompt] = useState("");
    const [negativePrompt, setNegativePrompt] = useState("blurry, low quality, distorted, ugly, bad anatomy");
    const [aspectRatio, setAspectRatio] = useState("1:1");
    const [model, setModel] = useState("ByteDance Seedream 4");
    const [numImages, setNumImages] = useState(4);
    const [steps, setSteps] = useState(30);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

    const handleAddIngredient = (ingredient: Ingredient) => {
        if (!selectedIngredients.find(i => i.id === ingredient.id)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
            // Add ingredient prompt to main prompt
            if (ingredient.prompt) {
                setPrompt(prev => prev ? `${prev}, ${ingredient.prompt}` : ingredient.prompt || '');
            }
        }
    };

    const handleRemoveIngredient = (id: string) => {
        const ingredient = selectedIngredients.find(i => i.id === id);
        setSelectedIngredients(selectedIngredients.filter(i => i.id !== id));
        // Remove ingredient prompt from main prompt
        if (ingredient?.prompt) {
            setPrompt(prev => prev.replace(new RegExp(`,?\\s*${ingredient.prompt}\\s*,?`, 'g'), '').trim());
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt");
            return;
        }

        setIsGenerating(true);
        setSelectedCandidates([]);
        // Use the actual candidate images
        setTimeout(() => {
            const newImages: GeneratedImage[] = Array.from({ length: 4 }, (_, i) => ({
                id: `${Date.now()}-${i}`,
                url: `/IngredientGenerationCandidates/${i + 1}.jpg`,
                prompt: prompt,
                timestamp: new Date(),
                candidateIndex: i + 1
            }));
            setGeneratedImages(newImages);
            setIsGenerating(false);
        }, 3000);
    };

    const applyExample = (example: string) => {
        setPrompt(example);
    };

    const toggleCandidateSelection = (candidateIndex: number) => {
        setSelectedCandidates(prev =>
            prev.includes(candidateIndex)
                ? prev.filter(i => i !== candidateIndex)
                : [...prev, candidateIndex]
        );
    };

    const addSelectedToLibrary = () => {
        if (selectedCandidates.length === 0) {
            alert("Please select at least one candidate");
            return;
        }

        // Hardcoded: Only candidate 4 will actually be added to library
        const candidate4 = generatedImages.find(img => img.candidateIndex === 4);

        if (candidate4 && selectedCandidates.includes(4)) {
            const newIngredient: Ingredient = {
                id: `generated-${Date.now()}`,
                name: `Generated ${libraryIngredients.length + 1}`,
                image: candidate4.url,
                prompt: candidate4.prompt
            };

            addIngredient(newIngredient);
            // alert(`Added candidate 4 to library! (Only candidate 4 can be added)`);
        } else if (selectedCandidates.length > 0) {
            //alert(`Only candidate 4 can be added to the library. Please select candidate 4.`);
            return;
        }

        // Clear selections and generated images
        setSelectedCandidates([]);
        setGeneratedImages([]);
    };

    return (
        <div className="h-full flex">
            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto ">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-2">文字生成图像</h2>
                    <p className="text-white/60 mb-8">使用AI从文字描述创建精美图像</p>

                    {/* Generated Images Display */}
                    {generatedImages.length > 0 && (
                        <div className="mb-6" >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="text-base font-semibold text-white">生成候选</h3>
                                    <p className="text-xs text-white/60">选择图像添加到您的素材库</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addSelectedToLibrary}
                                        disabled={selectedCandidates.length === 0}
                                        className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                    >
                                        <Plus className="h-3 w-3 mr-1" />
                                        添加到素材库 ({selectedCandidates.length})
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setGeneratedImages([]);
                                            setSelectedCandidates([]);
                                        }}
                                        className="bg-white/5 hover:bg-white/10 text-white/70 border-white/10 text-xs"
                                    >
                                        清除全部
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3 p-4 bg-black/20 rounded-lg border border-white/10">
                                {generatedImages.map((img) => {
                                    const isSelected = selectedCandidates.includes(img.candidateIndex);
                                    return (
                                        <div
                                            key={img.id}
                                            className="group relative aspect-square rounded-lg overflow-hidden border-2 bg-black/40 cursor-pointer transition-all"
                                            style={{ borderColor: isSelected ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.2)' }}
                                            onClick={() => toggleCandidateSelection(img.candidateIndex)}
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.prompt}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Selection Checkbox */}
                                            <div className="absolute top-2 right-2">
                                                <div
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected
                                                        ? 'bg-purple-600 border-purple-600'
                                                        : 'bg-black/40 border-white/40 group-hover:border-white/60'
                                                        }`}
                                                >
                                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                                </div>
                                            </div>

                                            {/* Candidate Number */}
                                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-semibold text-white">
                                                #{img.candidateIndex}
                                            </div>

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <div className="absolute bottom-0 left-0 right-0 p-2">
                                                    <p className="text-[10px] text-white/80 line-clamp-2">{img.prompt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {selectedCandidates.length > 0 && !selectedCandidates.includes(4) && (
                                <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                                    <p className="text-xs text-yellow-200/90">
                                        <strong>提示：</strong>只有候选 #4 可以实际添加到素材库。
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Prompt Input Section */}
                    <div className="bg-black/20 rounded-lg border border-white/10 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-purple-400" />
                            <label className="text-base font-semibold text-white">提示词</label>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                            placeholder='详细描述您的图像...（例如："宁静的日本庭院，樱花盛开，锦鲤池塘，传统木桥，柔和的晨光，高度细节，4K"）'
                            className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-md text-white placeholder:text-white/40 resize-none p-4 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                        />

                        {/* Example Prompts */}
                        <div className="mt-4">
                            <p className="text-xs text-white/50 mb-2">快速示例：</p>
                            <div className="flex flex-wrap gap-2">
                                {promptExamples.map((example, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => applyExample(example)}
                                        className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                                    >
                                        {example.slice(0, 40)}...
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Ingredients Display */}
                        {selectedIngredients.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-xs text-white/50 mb-2">参考素材：</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedIngredients.map((ingredient) => (
                                        <div key={ingredient.id} className="relative group">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/20 bg-black/40">
                                                <img
                                                    src={ingredient.image}
                                                    alt={ingredient.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleRemoveIngredient(ingredient.id)}
                                                className="absolute -top-1 -right-1 bg-red-500/90 hover:bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3 text-white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Negative Prompt */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-white/80 mb-3 block">反向提示词（可选）</label>
                        <textarea
                            value={negativePrompt}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNegativePrompt(e.target.value)}
                            placeholder="您不希望在图像中出现的内容..."
                            className="w-full min-h-[70px] bg-black/20 border border-white/10 rounded-md text-white placeholder:text-white/40 resize-none p-3 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                        />
                    </div>

                    {/* Generation Settings */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="text-sm font-medium text-white/80 mb-2 block">模型</label>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full h-10 bg-black/20 border border-white/10 rounded-md text-white px-3 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                            >
                                <option>ByteDance Seedream 4</option>
                                <option>DALL·E 3</option>
                                <option>Stable Diffusion XL</option>
                                <option>Midjourney v6</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white/80 mb-2 block">宽高比</label>
                            <select
                                value={aspectRatio}
                                onChange={(e) => setAspectRatio(e.target.value)}
                                className="w-full h-10 bg-black/20 border border-white/10 rounded-md text-white px-3 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                            >
                                <option>16:9</option>
                                <option>1:1</option>
                                <option>9:16</option>
                                <option>4:3</option>
                                <option>3:4</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white/80 mb-2 block">图像数量</label>
                            <select
                                value={numImages}
                                onChange={(e) => setNumImages(Number(e.target.value))}
                                className="w-full h-10 bg-black/20 border border-white/10 rounded-md text-white px-3 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white/80 mb-2 block">步数</label>
                            <select
                                value={steps}
                                onChange={(e) => setSteps(Number(e.target.value))}
                                className="w-full h-10 bg-black/20 border border-white/10 rounded-md text-white px-3 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                            >
                                <option value={20}>20（快速）</option>
                                <option value={30}>30（均衡）</option>
                                <option value={50}>50（高质量）</option>
                                <option value={100}>100（最大）</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-white/80">引导强度</label>
                            <span className="text-sm text-white/60">{guidanceScale}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="0.5"
                            value={guidanceScale}
                            onChange={(e) => setGuidanceScale(Number(e.target.value))}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between mt-1">
                            <span className="text-xs text-white/40">较宽松</span>
                            <span className="text-xs text-white/40">较严格</span>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full h-14 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold text-lg gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="h-5 w-5 animate-spin" />
                                生成中...
                            </>
                        ) : (
                            <>
                                <Wand2 className="h-5 w-5" />
                                生成图像
                            </>
                        )}
                    </Button>

                    {isGenerating && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-white/60">这可能需要一些时间...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Sidebar - Ingredient Library */}
            <div className="w-80 border-l border-white/10 bg-black/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                    <Button
                        className="w-full gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        variant="outline"
                    >
                        <Upload className="h-4 w-4" />
                        上传新素材
                    </Button>
                </div>

                <div className="p-4">
                    <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">素材库</h3>
                    <Input
                        placeholder="搜索素材..."
                        className="mb-4 bg-black/20 border-white/10 text-white placeholder:text-white/40 h-9 text-sm"
                    />
                </div>

                <ScrollArea className="flex-1 px-4">
                    <div className="grid grid-cols-2 gap-3 pb-4">
                        {libraryIngredients
                            .filter((ingredient) => !ingredient.hideInIngredientsTab)
                            .map((ingredient) => (
                                <div
                                    key={ingredient.id}
                                    onClick={() => handleAddIngredient(ingredient)}
                                    className="cursor-pointer group"
                                >
                                    <div className="relative aspect-square rounded-lg overflow-hidden border border-white/20 bg-black/40 hover:border-purple-500/50 transition-colors">
                                        <img
                                            src={ingredient.image}
                                            alt={ingredient.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                            <Plus className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/70 mt-2 text-center truncate">{ingredient.name}</p>
                                </div>
                            ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default IngredientsTab;
