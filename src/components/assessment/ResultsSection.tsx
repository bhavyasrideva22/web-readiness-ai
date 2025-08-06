import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Brain, 
  Heart, 
  Cog, 
  Lightbulb, 
  TrendingUp, 
  Globe,
  ArrowRight,
  BookOpen,
  Briefcase,
  Users,
  Monitor,
  Palette
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface ResultsSectionProps {
  onNext?: () => void;
  onPrevious?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  assessmentData: AssessmentData;
  updateAssessmentData?: any;
}

export const ResultsSection = ({ assessmentData }: ResultsSectionProps) => {
  // Calculate overall scores
  const psychometricAvg = Math.round(
    Object.values(assessmentData.psychometric).reduce((a, b) => a + b, 0) / 
    Object.values(assessmentData.psychometric).length
  );
  
  const technicalAvg = Math.round(
    Object.values(assessmentData.technical).reduce((a, b) => a + b, 0) / 
    Object.values(assessmentData.technical).length
  );
  
  const wiscarAvg = Math.round(
    Object.values(assessmentData.wiscar).reduce((a, b) => a + b, 0) / 
    Object.values(assessmentData.wiscar).length
  );

  const overallScore = Math.round((psychometricAvg + technicalAvg + wiscarAvg) / 3);

  // Determine recommendation
  const getRecommendation = () => {
    if (overallScore >= 75) return { status: "yes", color: "success", icon: CheckCircle };
    if (overallScore >= 50) return { status: "maybe", color: "warning", icon: AlertCircle };
    return { status: "no", color: "destructive", icon: XCircle };
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  const getQuadrant = () => {
    if (overallScore >= 75 && technicalAvg >= 60) return "Ready Now";
    if (overallScore >= 60) return "Ready with Prep";
    if (psychometricAvg >= 60) return "Curious Explorer";
    return "Misaligned";
  };

  const wiscarDimensions = [
    { key: "will", title: "Will", icon: Heart, color: "chart-1" },
    { key: "interest", title: "Interest", icon: Brain, color: "chart-2" },
    { key: "skill", title: "Skill", icon: Cog, color: "chart-3" },
    { key: "cognitive", title: "Cognitive", icon: Lightbulb, color: "chart-4" },
    { key: "ability", title: "Ability", icon: TrendingUp, color: "chart-5" },
    { key: "realWorld", title: "Real-World", icon: Globe, color: "chart-6" }
  ];

  const careers = [
    { title: "Web Designer", match: psychometricAvg, icon: Palette, description: "Visual layout + responsive sites" },
    { title: "UI/UX Designer", match: wiscarAvg, icon: Users, description: "User flow, interaction, empathy" },
    { title: "Front-End Developer", match: technicalAvg, icon: Monitor, description: "HTML/CSS/JS-heavy, functional UI" },
    { title: "Product Designer", match: Math.round((psychometricAvg + wiscarAvg) / 2), icon: Briefcase, description: "Mix of UX, research, and business" }
  ].sort((a, b) => b.match - a.match);

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getRecommendationText = () => {
    if (recommendation.status === "yes") {
      return {
        title: "Yes - Pursue Web Design!",
        description: "You show strong alignment with web design. Your psychological profile, aptitude, and motivation suggest you'd thrive in this field."
      };
    }
    if (recommendation.status === "maybe") {
      return {
        title: "Maybe - With Preparation",
        description: "You have potential for web design success. Focus on building skills in areas where you scored lower, and consider starting with foundational courses."
      };
    }
    return {
      title: "Consider Alternatives",
      description: "Based on your assessment, you might find more success in related fields. Explore the alternative career paths below."
    };
  };

  const recText = getRecommendationText();

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold mb-2">Your Web Design Career Assessment Results</CardTitle>
        <p className="text-muted-foreground">Personalized insights and recommendations based on your responses</p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Overall Recommendation */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary-soft to-secondary-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-3 rounded-full bg-${recommendation.color}/20 mr-4`}>
                <RecommendationIcon className={`w-8 h-8 text-${recommendation.color}`} />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{recText.title}</h3>
                <p className="text-muted-foreground mt-1">{recText.description}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <span className={getScoreColor(overallScore)}>{overallScore}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Overall Readiness Score</p>
              <Badge variant="secondary" className="mt-2">{getQuadrant()}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Psychological Fit</h4>
                <div className={`text-2xl font-bold ${getScoreColor(psychometricAvg)}`}>
                  {psychometricAvg}%
                </div>
                <Progress value={psychometricAvg} className="mt-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Technical Readiness</h4>
                <div className={`text-2xl font-bold ${getScoreColor(technicalAvg)}`}>
                  {technicalAvg}%
                </div>
                <Progress value={technicalAvg} className="mt-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">WISCAR Average</h4>
                <div className={`text-2xl font-bold ${getScoreColor(wiscarAvg)}`}>
                  {wiscarAvg}%
                </div>
                <Progress value={wiscarAvg} className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>WISCAR Framework Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wiscarDimensions.map((dimension) => {
                const Icon = dimension.icon;
                const score = assessmentData.wiscar[dimension.key as keyof typeof assessmentData.wiscar];
                return (
                  <div key={dimension.key} className="text-center">
                    <div className="p-3 bg-primary-soft rounded-lg mb-2 inline-block">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h5 className="font-semibold text-sm">{dimension.title}</h5>
                    <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                      {score}%
                    </div>
                    <Progress value={score} className="mt-1 h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Career Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Top Career Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careers.map((career, index) => {
                const Icon = career.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-soft rounded-lg mr-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{career.title}</h4>
                        <p className="text-sm text-muted-foreground">{career.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(career.match)}`}>
                        {career.match}%
                      </div>
                      <p className="text-xs text-muted-foreground">Match</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendation.status === "yes" ? (
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-success-soft rounded-lg">
                  <BookOpen className="w-5 h-5 text-success mr-3" />
                  <div>
                    <h4 className="font-semibold">Start Learning</h4>
                    <p className="text-sm text-muted-foreground">Begin with HTML/CSS basics, then move to Figma for design practice</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-primary-soft rounded-lg">
                  <Palette className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <h4 className="font-semibold">Build Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Create 5-10 projects showcasing your design and coding skills</p>
                  </div>
                </div>
              </div>
            ) : recommendation.status === "maybe" ? (
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-warning-soft rounded-lg">
                  <TrendingUp className="w-5 h-5 text-warning mr-3" />
                  <div>
                    <h4 className="font-semibold">Skill Development</h4>
                    <p className="text-sm text-muted-foreground">Focus on areas where you scored lower than 60%</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-secondary-soft rounded-lg">
                  <Users className="w-5 h-5 text-secondary mr-3" />
                  <div>
                    <h4 className="font-semibold">Get Exposure</h4>
                    <p className="text-sm text-muted-foreground">Try a beginner course or join design communities</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Briefcase className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <h4 className="font-semibold">Explore Alternatives</h4>
                    <p className="text-sm text-muted-foreground">Consider Graphic Design, Product Marketing, or UI Copywriting</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => window.print()}
          >
            Save Results (Print/PDF)
          </Button>
          <div>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Retake Assessment
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};