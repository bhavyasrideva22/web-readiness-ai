import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Palette, Monitor, Users, Lightbulb, ChevronRight } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
  onPrevious?: () => void;
  canGoNext: boolean;
  canGoPrevious?: boolean;
  assessmentData?: any;
  updateAssessmentData?: any;
}

export const AssessmentIntro = ({ onNext, canGoNext }: AssessmentIntroProps) => {
  const careers = [
    { title: "Web Designer", icon: Palette },
    { title: "UI/UX Designer", icon: Users },
    { title: "Front-End Developer", icon: Monitor },
    { title: "Product Designer", icon: Lightbulb },
    { title: "Interaction Designer", icon: Brain }
  ];

  const traits = [
    "Visual and spatial intelligence",
    "Attention to detail",
    "Problem-solving and creativity",
    "Empathy (user-first thinking)",
    "Balance aesthetics and function"
  ];

  return (
    <>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl font-bold mb-2">
          Welcome to Your Web Design Career Assessment
        </CardTitle>
        <p className="text-lg text-muted-foreground">
          A modular career & learning readiness diagnostic for aspiring web designers
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Purpose */}
        <div className="bg-primary-soft rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            Purpose of This Assessment
          </h3>
          <p className="text-muted-foreground">
            To evaluate whether you are psychologically, cognitively, and technically ready to pursue 
            a career or education path in Web Design, and to provide a personalized, actionable 
            learning and career plan.
          </p>
        </div>

        {/* What is Web Design */}
        <div>
          <h3 className="text-xl font-semibold mb-3">What is Web Design?</h3>
          <p className="text-muted-foreground mb-4">
            Web Design involves creating the layout, visual appearance, and usability of websites. 
            It balances aesthetic design, UX/UI principles, and sometimes light frontend development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map((career, index) => {
              const Icon = career.icon;
              return (
                <div key={index} className="flex items-center p-3 bg-card border rounded-lg">
                  <Icon className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">{career.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Traits */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Traits That Succeed in Web Design</h3>
          <div className="space-y-2">
            {traits.map((trait, index) => (
              <div key={index} className="flex items-center">
                <Badge variant="secondary" className="mr-3">✓</Badge>
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Info */}
        <div className="bg-secondary-soft rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Total Time:</strong> 20-30 minutes
            </div>
            <div>
              <strong>Sections:</strong> 4 comprehensive assessments
            </div>
            <div>
              <strong>Output:</strong> Personalized career roadmap
            </div>
            <div>
              <strong>Based on:</strong> Psychometric science
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center pt-4">
          <Button 
            onClick={onNext} 
            disabled={!canGoNext}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Begin Assessment
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </>
  );
};