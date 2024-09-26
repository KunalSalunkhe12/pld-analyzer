import React, { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Overview } from "./overview";
import { FutureProjections } from "./future-projections";
import { RateAnalysis } from "./rate-analysis";
import { data as initialData } from "./utils";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2 } from "lucide-react";
import FileUpload from "./file-upload";

const PldDataAnalyzer = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Handle file upload here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleAnalyze = () => {
    setIsLoading(true);
    // Simulate API call or file processing
    setTimeout(() => {
      setData(initialData);
      setIsLoading(false);
    }, 2000); // 2 seconds delay to simulate processing
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        PLD Data Analyzer
      </h1>

      {!data && (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <FileUpload onFileUpload={handleAnalyze} isLoading={isLoading} />
          {/* <Button
            onClick={handleAnalyze}
            className="mt-8 bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze PLD File"
            )}
          </Button> */}
        </div>
      )}

      {data && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="future-projections"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white"
            >
              Future Projections
            </TabsTrigger>
            <TabsTrigger
              value="rate-analysis"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white"
            >
              Rate Analysis
            </TabsTrigger>
          </TabsList>

          {activeTab === "overview" && <Overview data={data} />}
          {activeTab === "future-projections" && (
            <FutureProjections data={data} />
          )}

          {activeTab === "rate-analysis" && <RateAnalysis data={data} />}
        </Tabs>
      )}
    </div>
  );
};

export default PldDataAnalyzer;
