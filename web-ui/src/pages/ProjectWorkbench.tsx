import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { IngredientsTab } from "@/pages/workbench/IngredientsTab";
import { FootageTab } from "@/pages/workbench/FootageTab";
import { ArrangeTab } from "@/pages/workbench/ArrangeTab";
import { StylizationTab } from "@/pages/workbench/StylizationTab";
import { AudioTab } from "@/pages/workbench/AudioTab";
import { DeliverTab } from "@/pages/workbench/DeliverTab";
import { IngredientLibraryProvider } from "@/contexts/IngredientLibraryContext";

type TabType = "ingredients" | "footage" | "arrange" | "stylization" | "audio" | "deliver";

interface Tab {
    id: TabType;
    label: string;
}

const tabs: Tab[] = [
    { id: "ingredients", label: "素材" },
    { id: "footage", label: "镜头" },
    { id: "arrange", label: "编排" },
    { id: "stylization", label: "风格化" },
    { id: "audio", label: "音频" },
    { id: "deliver", label: "输出" },
];

const renderContent = (tab: TabType) => {
    switch (tab) {
        case "ingredients":
            return <IngredientsTab />;
        case "footage":
            return <FootageTab />;
        case "arrange":
            return <ArrangeTab />;
        case "stylization":
            return <StylizationTab />;
        case "audio":
            return <AudioTab />;
        case "deliver":
            return <DeliverTab />;
        default:
            return null;
    }
};

const ProjectWorkbench = () => {
    const { projectName, tab: urlTab } = useParams<{ projectName: string; tab?: string }>();
    const navigate = useNavigate();

    // Validate tab param and default to "ingredients"
    const isValidTab = (tab?: string): tab is TabType => {
        return tab !== undefined && ["ingredients", "footage", "arrange", "stylization", "audio", "deliver"].includes(tab);
    };

    const [activeTab, setActiveTab] = useState<TabType>(isValidTab(urlTab) ? urlTab : "ingredients");

    return (
        <IngredientLibraryProvider>
            <div className="min-h-screen bg-background flex">
                {/* Left sidebar - tabs */}
                <div className="w-48 bg-black/30 border-r border-white/10 flex flex-col">
                    {/* Header with back button and project name */}
                    <div className="p-4 border-b border-white/10">
                        <Button
                            onClick={() => navigate("/")}
                            variant="ghost"
                            size="sm"
                            className="mb-4 text-white/70 hover:text-white hover:bg-white/10 w-full justify-start"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            返回
                        </Button>
                        <h3 className="text-lg font-semibold text-white truncate">
                            {projectName || "Project"}
                        </h3>
                    </div>

                    {/* Tabs */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    navigate(`/workbench/${projectName}/${tab.id}`);
                                }}
                                variant={activeTab === tab.id ? "default" : "ghost"}
                                className={`justify-start text-left ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Right side - content area */}
                <div className="flex-1 overflow-y-auto">
                    {renderContent(activeTab)}
                </div>
            </div>
        </IngredientLibraryProvider>
    );
};

export default ProjectWorkbench;
