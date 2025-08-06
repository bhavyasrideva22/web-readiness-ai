import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface PsychometricSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
  canGoNext: boolean;
  canGoPrevious?: boolean;
  assessmentData: AssessmentData;
  updateAssessmentData: (section: keyof AssessmentData, data: any) => void;
}

const questions = [
  {
    category: "interests",
    items: [
      "I enjoy working on visual layouts and digital designs",
      "I often notice bad website design when browsing",
      "I prefer creative work over analytical tasks",
      "I find myself critiquing the aesthetics of apps and websites",
      "I enjoy experimenting with colors and typography"
    ]
  },
  {
    category: "personality",
    items: [
      "I pay close attention to small details in my work",
      "I enjoy solving complex visual problems",
      "I am comfortable working independently for long periods",
      "I adapt well when project requirements change",
      "I enjoy collaborating with others on creative projects"
    ]
  },
  {
    category: "cognitive",
    items: [
      "I prefer visual information over text-heavy content",
      "I can easily imagine how different layouts would look",
      "I enjoy organizing information in logical structures",
      "I think about user experience when using digital products",
      "I can break down complex problems into smaller parts"
    ]
  },
  {
    category: "motivation",
    items: [
      "I am passionate about creating beautiful digital experiences",
      "I want to help make the internet more user-friendly",
      "I am motivated by seeing users enjoy my designs",
      "I enjoy learning new design tools and techniques",
      "I find satisfaction in bringing ideas to life visually"
    ]
  }
];

export const PsychometricSection = ({ 
  onNext, 
  canGoNext, 
  assessmentData, 
  updateAssessmentData 
}: PsychometricSectionProps) => {
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const currentSet = questions[currentQuestionSet];
  const progress = ((currentQuestionSet + 1) / questions.length) * 100;

  const handleResponse = (questionIndex: number, value: string) => {
    const key = `${currentSet.category}_${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleNextSet = () => {
    if (currentQuestionSet < questions.length - 1) {
      setCurrentQuestionSet(currentQuestionSet + 1);
    } else {
      // Calculate scores and update assessment data
      const scores = questions.reduce((acc, set) => {
        const setResponses = Object.entries(responses)
          .filter(([key]) => key.startsWith(set.category))
          .map(([, value]) => value);
        
        const average = setResponses.length > 0 
          ? setResponses.reduce((sum, val) => sum + val, 0) / setResponses.length 
          : 0;
        
        acc[set.category as keyof typeof acc] = Math.round((average / 5) * 100);
        return acc;
      }, { interests: 0, personality: 0, cognitive: 0, motivation: 0 });

      updateAssessmentData('psychometric', scores);
      onNext();
    }
  };

  const isSetComplete = () => {
    return currentSet.items.every((_, index) => {
      const key = `${currentSet.category}_${index}`;
      return responses[key] !== undefined;
    });
  };

  const getCategoryTitle = (category: string) => {
    const titles = {
      interests: "Interest Scale",
      personality: "Personality Fit", 
      cognitive: "Cognitive Preferences",
      motivation: "Motivation Assessment"
    };
    return titles[category as keyof typeof titles] || category;
  };

  const getCategoryDescription = (category: string) => {
    const descriptions = {
      interests: "How much do you naturally gravitate toward design-related activities?",
      personality: "Do your personality traits align with successful web designers?",
      cognitive: "How do you prefer to process and work with information?",
      motivation: "What drives your interest in pursuing web design?"
    };
    return descriptions[category as keyof typeof descriptions] || "";
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Psychometric Assessment</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{getCategoryTitle(currentSet.category)}</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestionSet + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-primary-soft rounded-lg p-4">
          <h3 className="font-semibold mb-2">{getCategoryTitle(currentSet.category)}</h3>
          <p className="text-sm text-muted-foreground">
            {getCategoryDescription(currentSet.category)}
          </p>
        </div>

        <div className="space-y-6">
          {currentSet.items.map((question, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium">{question}</p>
              <RadioGroup 
                value={responses[`${currentSet.category}_${index}`]?.toString() || ""}
                onValueChange={(value) => handleResponse(index, value)}
              >
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value={value.toString()} id={`q${index}_${value}`} />
                      <Label 
                        htmlFor={`q${index}_${value}`} 
                        className="text-xs text-center cursor-pointer"
                      >
                        {value === 1 && "Strongly Disagree"}
                        {value === 2 && "Disagree"}
                        {value === 3 && "Neutral"}
                        {value === 4 && "Agree"}
                        {value === 5 && "Strongly Agree"}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button 
            onClick={handleNextSet}
            disabled={!isSetComplete()}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {currentQuestionSet < questions.length - 1 ? "Next Section" : "Complete Assessment"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </>
  );
};