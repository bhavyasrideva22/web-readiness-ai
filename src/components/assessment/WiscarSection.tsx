import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Brain, Heart, Cog, Lightbulb, TrendingUp, Globe } from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface WiscarSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
  canGoNext: boolean;
  canGoPrevious?: boolean;
  assessmentData: AssessmentData;
  updateAssessmentData: (section: keyof AssessmentData, data: any) => void;
}

const wiscarDimensions = [
  {
    key: "will",
    title: "Will (Drive & Persistence)",
    icon: Heart,
    description: "Your motivation and determination to succeed",
    questions: [
      "I persist through challenges even when things get difficult",
      "I have a strong internal drive to learn and improve",
      "I stay committed to projects until completion",
      "I bounce back quickly from setbacks",
      "I am passionate about pursuing web design"
    ]
  },
  {
    key: "interest",
    title: "Interest",
    icon: Brain,
    description: "Your genuine fascination with web design",
    questions: [
      "I find myself naturally drawn to design-related content",
      "I enjoy analyzing and critiquing digital interfaces",
      "I spend free time exploring design inspiration",
      "I get excited when I see well-designed websites",
      "I often think about improving digital experiences"
    ]
  },
  {
    key: "skill",
    title: "Skill (Current Abilities)",
    icon: Cog,
    description: "Your existing technical and design capabilities",
    questions: [
      "I can create visually appealing layouts",
      "I understand basic design principles",
      "I am comfortable learning new software tools",
      "I can solve design problems creatively",
      "I have experience with digital design tools"
    ]
  },
  {
    key: "cognitive",
    title: "Cognitive Fit",
    icon: Lightbulb,
    description: "How your thinking style matches web design work",
    questions: [
      "I enjoy breaking down complex problems into smaller parts",
      "I can hold multiple design constraints in mind simultaneously",
      "I think systematically about user needs",
      "I can balance creative and logical thinking",
      "I enjoy organizing information clearly"
    ]
  },
  {
    key: "ability",
    title: "Ability to Learn",
    icon: TrendingUp,
    description: "Your capacity for growth and adaptation",
    questions: [
      "I actively seek feedback to improve my work",
      "I embrace new challenges as learning opportunities",
      "I adapt quickly to changing requirements",
      "I learn effectively from online resources",
      "I believe my abilities can be developed through effort"
    ]
  },
  {
    key: "realWorld",
    title: "Real-World Fit",
    icon: Globe,
    description: "How well you match actual web design roles",
    questions: [
      "I work well independently on long projects",
      "I enjoy collaborating with team members",
      "I can handle criticism of my creative work",
      "I am comfortable with iterative design processes",
      "I understand client and business needs in design"
    ]
  }
];

export const WiscarSection = ({ 
  onNext, 
  canGoNext, 
  assessmentData, 
  updateAssessmentData 
}: WiscarSectionProps) => {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const currentDim = wiscarDimensions[currentDimension];
  const progress = ((currentDimension + 1) / wiscarDimensions.length) * 100;

  const handleResponse = (questionIndex: number, value: string) => {
    const key = `${currentDim.key}_${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const isDimensionComplete = () => {
    return currentDim.questions.every((_, index) => {
      const key = `${currentDim.key}_${index}`;
      return responses[key] !== undefined;
    });
  };

  const handleNext = () => {
    if (currentDimension < wiscarDimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
    } else {
      // Calculate WISCAR scores
      const scores = wiscarDimensions.reduce((acc, dimension) => {
        const dimResponses = Object.entries(responses)
          .filter(([key]) => key.startsWith(dimension.key))
          .map(([, value]) => value);
        
        const average = dimResponses.length > 0 
          ? dimResponses.reduce((sum, val) => sum + val, 0) / dimResponses.length 
          : 0;
        
        acc[dimension.key as keyof typeof acc] = Math.round((average / 5) * 100);
        return acc;
      }, { will: 0, interest: 0, skill: 0, cognitive: 0, ability: 0, realWorld: 0 });

      updateAssessmentData('wiscar', scores);
      onNext();
    }
  };

  const Icon = currentDim.icon;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">WISCAR Framework Assessment</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{currentDim.title}</span>
            <span className="text-sm text-muted-foreground">
              {currentDimension + 1} of {wiscarDimensions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-chart-1/10 rounded-lg p-4 border border-chart-1/20">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-chart-1/20 rounded-lg mr-3">
              <Icon className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <h3 className="font-semibold">{currentDim.title}</h3>
              <p className="text-sm text-muted-foreground">{currentDim.description}</p>
            </div>
          </div>
        </div>

        {/* WISCAR Overview */}
        {currentDimension === 0 && (
          <div className="bg-primary-soft rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">About WISCAR</h4>
            <p className="text-sm text-muted-foreground mb-3">
              WISCAR evaluates six key dimensions that predict success in web design careers:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {wiscarDimensions.map((dim, index) => {
                const DimIcon = dim.icon;
                return (
                  <div key={index} className="flex items-center">
                    <DimIcon className="w-3 h-3 mr-1" />
                    <span>{dim.title.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {currentDim.questions.map((question, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium">{question}</p>
              <RadioGroup 
                value={responses[`${currentDim.key}_${index}`]?.toString() || ""}
                onValueChange={(value) => handleResponse(index, value)}
              >
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value={value.toString()} id={`${currentDim.key}_q${index}_${value}`} />
                      <Label 
                        htmlFor={`${currentDim.key}_q${index}_${value}`} 
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
            onClick={handleNext}
            disabled={!isDimensionComplete()}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {currentDimension < wiscarDimensions.length - 1 
              ? `Next: ${wiscarDimensions[currentDimension + 1].title.split(' ')[0]}`
              : "Complete WISCAR Assessment"
            }
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </>
  );
};