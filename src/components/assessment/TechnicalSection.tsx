import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Code, Lightbulb } from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface TechnicalSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
  canGoNext: boolean;
  canGoPrevious?: boolean;
  assessmentData: AssessmentData;
  updateAssessmentData: (section: keyof AssessmentData, data: any) => void;
}

const aptitudeQuestions = [
  {
    question: "Which pattern comes next in this sequence: A, C, F, J, ?",
    options: ["M", "O", "P", "Q"],
    correct: 1,
    type: "logical"
  },
  {
    question: "If a webpage needs to be 1200px wide and you want 3 equal columns with 20px gaps, how wide should each column be?",
    options: ["380px", "390px", "400px", "360px"],
    correct: 0,
    type: "mathematical"
  },
  {
    question: "Which layout principle creates the most visual harmony?",
    options: ["Random placement", "Rule of thirds", "Center everything", "Use only straight lines"],
    correct: 1,
    type: "visual"
  },
  {
    question: "What's the best way to make a website accessible?",
    options: ["Use bright colors", "Add alt text to images", "Make text very small", "Use complex animations"],
    correct: 1,
    type: "logical"
  }
];

const knowledgeQuestions = [
  {
    question: "HTML stands for:",
    options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Management Language", "I don't know"],
    correct: 0,
    type: "knowledge"
  },
  {
    question: "CSS is primarily used for:",
    options: ["Database management", "Styling web pages", "Server programming", "I'm not familiar with CSS"],
    correct: 1,
    type: "knowledge"
  },
  {
    question: "What does UX stand for?",
    options: ["User Experience", "Universal Export", "User Extension", "I'm not sure"],
    correct: 0,
    type: "knowledge"
  },
  {
    question: "Figma is a tool for:",
    options: ["Web hosting", "Design and prototyping", "Database design", "I haven't heard of Figma"],
    correct: 1,
    type: "knowledge"
  },
  {
    question: "Responsive design means:",
    options: ["Fast loading websites", "Websites that adapt to different screen sizes", "Interactive animations", "I'm not familiar with this term"],
    correct: 1,
    type: "knowledge"
  }
];

export const TechnicalSection = ({ 
  onNext, 
  canGoNext, 
  assessmentData, 
  updateAssessmentData 
}: TechnicalSectionProps) => {
  const [currentSection, setCurrentSection] = useState(0); // 0 = aptitude, 1 = knowledge
  const [aptitudeResponses, setAptitudeResponses] = useState<Record<number, number>>({});
  const [knowledgeResponses, setKnowledgeResponses] = useState<Record<number, number>>({});

  const isAptitudeSection = currentSection === 0;
  const currentQuestions = isAptitudeSection ? aptitudeQuestions : knowledgeQuestions;
  const currentResponses = isAptitudeSection ? aptitudeResponses : knowledgeResponses;
  const setCurrentResponses = isAptitudeSection ? setAptitudeResponses : setKnowledgeResponses;

  const progress = ((currentSection + 1) / 2) * 100;

  const handleResponse = (questionIndex: number, optionIndex: number) => {
    setCurrentResponses(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const isCurrentSectionComplete = () => {
    return currentQuestions.every((_, index) => currentResponses[index] !== undefined);
  };

  const handleNext = () => {
    if (currentSection === 0) {
      setCurrentSection(1);
    } else {
      // Calculate scores
      const aptitudeScore = aptitudeQuestions.reduce((correct, question, index) => {
        return aptitudeResponses[index] === question.correct ? correct + 1 : correct;
      }, 0);

      const knowledgeScore = knowledgeQuestions.reduce((correct, question, index) => {
        return knowledgeResponses[index] === question.correct ? correct + 1 : correct;
      }, 0);

      const scores = {
        aptitude: Math.round((aptitudeScore / aptitudeQuestions.length) * 100),
        domainKnowledge: Math.round((knowledgeScore / knowledgeQuestions.length) * 100)
      };

      updateAssessmentData('technical', scores);
      onNext();
    }
  };

  const getQuestionTypeIcon = (type?: string) => {
    if (type === "logical") return <Lightbulb className="w-4 h-4" />;
    if (type === "mathematical") return <Code className="w-4 h-4" />;
    return <Lightbulb className="w-4 h-4" />;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Technical & Aptitude Assessment</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {isAptitudeSection ? "General Aptitude" : "Domain Knowledge"}
            </span>
            <span className="text-sm text-muted-foreground">
              Section {currentSection + 1} of 2
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-secondary-soft rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center">
            {isAptitudeSection ? (
              <>
                <Lightbulb className="w-5 h-5 mr-2" />
                General Aptitude
              </>
            ) : (
              <>
                <Code className="w-5 h-5 mr-2" />
                Domain Knowledge
              </>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isAptitudeSection 
              ? "Test your logical reasoning, visual thinking, and problem-solving abilities"
              : "Assess your current familiarity with web design concepts and tools"
            }
          </p>
        </div>

        <div className="space-y-6">
          {currentQuestions.map((question, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                {isAptitudeSection && (
                  <Badge variant="outline" className="mt-1">
                    {getQuestionTypeIcon(question.type)}
                  </Badge>
                )}
                <div className="flex-1">
                  <p className="font-medium mb-3">{question.question}</p>
                  <RadioGroup 
                    value={currentResponses[index]?.toString() || ""}
                    onValueChange={(value) => handleResponse(index, parseInt(value))}
                  >
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={optionIndex.toString()} 
                            id={`q${index}_${optionIndex}`} 
                          />
                          <Label 
                            htmlFor={`q${index}_${optionIndex}`}
                            className="cursor-pointer flex-1"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button 
            onClick={handleNext}
            disabled={!isCurrentSectionComplete()}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {currentSection === 0 ? "Next: Domain Knowledge" : "Complete Technical Assessment"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </>
  );
};