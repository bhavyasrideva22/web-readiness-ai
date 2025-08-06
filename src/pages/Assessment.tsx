import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalSection } from "@/components/assessment/TechnicalSection";
import { WiscarSection } from "@/components/assessment/WiscarSection";
import { ResultsSection } from "@/components/assessment/ResultsSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type AssessmentData = {
  psychometric: {
    interests: number;
    personality: number;
    cognitive: number;
    motivation: number;
  };
  technical: {
    aptitude: number;
    domainKnowledge: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
};

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: { interests: 0, personality: 0, cognitive: 0, motivation: 0 },
    technical: { aptitude: 0, domainKnowledge: 0 },
    wiscar: { will: 0, interest: 0, skill: 0, cognitive: 0, ability: 0, realWorld: 0 }
  });

  const sections = [
    { title: "Introduction", component: AssessmentIntro },
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical Assessment", component: TechnicalSection },
    { title: "WISCAR Framework", component: WiscarSection },
    { title: "Your Results", component: ResultsSection }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const updateAssessmentData = (section: keyof AssessmentData, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const CurrentComponent = sections[currentSection].component;
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-secondary-soft to-background p-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            CareerFit Assessment
          </h1>
          <p className="text-xl text-muted-foreground">Web Design Edition</p>
          <Badge variant="secondary" className="mt-2">
            Section {currentSection + 1} of {sections.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{sections[currentSection].title}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Assessment Content */}
        <Card className="shadow-medium">
          <CurrentComponent 
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={currentSection < sections.length - 1}
            canGoPrevious={currentSection > 0}
            assessmentData={assessmentData}
            updateAssessmentData={updateAssessmentData}
          />
        </Card>

        {/* Navigation */}
        {currentSection > 0 && currentSection < sections.length - 1 && (
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentSection === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={currentSection === sections.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;