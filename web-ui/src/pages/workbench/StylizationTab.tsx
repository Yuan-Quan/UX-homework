import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Check } from "lucide-react";
import { useIngredientLibrary } from "../../contexts/IngredientLibraryContext";

export const StylizationTab = () => {
    const { libraryIngredients } = useIngredientLibrary();
    const [stylePrompt, setStylePrompt] = useState("");
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [styledVideoUrl, setStyledVideoUrl] = useState<string | null>(null);

    const handleStylize = async () => {
        setIsGenerating(true);
        // Simulate generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hardcode the result to styled video placeholder
        setStyledVideoUrl("/CompleteVideoPlaceHolder.mp4");
        setIsGenerating(false);
    };

    return (
        <div className="h-full flex flex-col bg-black/10 p-4 gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">风格化</h2>
                <div className="text-xs text-white/60">为您的完整时间轴应用风格</div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Left: Input Controls */}
                <div className="w-96 flex flex-col gap-4">
                    {/* Original Timeline Preview */}
                    <div className="bg-black/30 rounded-lg border border-white/10 flex flex-col">
                        <div className="p-3 border-b border-white/10">
                            <h3 className="text-white font-semibold text-sm">原始时间轴</h3>
                        </div>
                        <div className="aspect-video bg-black/50 flex items-center justify-center p-3">
                            <video
                                src="/CompleteVideoPlaceHolder.mp4"
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-contain rounded"
                                controls={false}
                                autoPlay
                            />
                        </div>
                    </div>

                    {/* Style Input */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4 flex-1 flex flex-col">
                        <h3 className="text-white font-semibold mb-3">风格设置</h3>

                        {/* Text Prompt */}
                        <div className="mb-4">
                            <label className="text-white/70 text-sm mb-2 block">
                                风格描述（可选）
                            </label>
                            <textarea
                                placeholder="描述您想应用的风格...（例如：'电影黑色风格'、'水彩画'、'动漫风格'）"
                                value={stylePrompt}
                                onChange={(e) => setStylePrompt(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/40 min-h-[100px] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={isGenerating}
                            />
                        </div>

                        {/* Ingredient Selection */}
                        <div className="flex-1 flex flex-col">
                            <label className="text-white/70 text-sm mb-2 block">
                                参考图像（可选）
                            </label>
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-2">
                                    {libraryIngredients.map((ingredient) => (
                                        <div
                                            key={ingredient.id}
                                            onClick={() => setSelectedIngredient(ingredient.id)}
                                            className={`relative group cursor-pointer rounded-lg border-2 transition-all ${selectedIngredient === ingredient.id
                                                ? "border-purple-500 shadow-lg shadow-purple-500/50"
                                                : "border-white/20 hover:border-white/50"
                                                }`}
                                        >
                                            <div className="aspect-square bg-black/50 rounded overflow-hidden">
                                                <img
                                                    src={ingredient.image}
                                                    alt={ingredient.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {selectedIngredient === ingredient.id && (
                                                <div className="absolute top-1 right-1 bg-purple-600 rounded-full p-1">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                                                <p className="text-xs text-white truncate">{ingredient.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleStylize}
                            disabled={isGenerating || (!stylePrompt && !selectedIngredient)}
                            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white"
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                    正在生成风格化视频...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    应用风格
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Right: Styled Result Preview */}
                <div className="flex-1 bg-black/30 rounded-lg border border-white/10 flex flex-col">
                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-white font-semibold">风格化结果</h3>
                        {styledVideoUrl && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                            >
                                <Play className="mr-2 h-3 w-3" />
                                预览
                            </Button>
                        )}
                    </div>
                    <div className="flex-1 bg-black/50 flex items-center justify-center p-6">
                        {styledVideoUrl ? (
                            <video
                                src={styledVideoUrl}
                                muted
                                loop
                                playsInline
                                className="max-w-full max-h-full rounded shadow-2xl"
                                controls
                                autoPlay
                            />
                        ) : (
                            <div className="text-center">
                                <Sparkles className="h-16 w-16 text-white/20 mx-auto mb-4" />
                                <p className="text-white/40 text-sm">
                                    {stylePrompt || selectedIngredient
                                        ? '点击"应用风格"生成您的风格化视频'
                                        : "输入风格描述或选择参考图像以开始"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StylizationTab;
