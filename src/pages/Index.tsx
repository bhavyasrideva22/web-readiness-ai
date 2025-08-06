import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, Clock, Users, ArrowRight, Palette, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Psychometric Assessment",
      description: "Scientifically-backed personality and cognitive fit analysis"
    },
    {
      icon: CheckCircle,
      title: "Technical Evaluation",
      description: "Test your current skills and learning potential"
    },
    {
      icon: Users,
      title: "WISCAR Framework",
      description: "Comprehensive career readiness evaluation"
    },
    {
      icon: Palette,
      title: "Personalized Results",
      description: "Get tailored career advice and learning paths"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-secondary-soft to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Powered by Psychometric Science
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Should I Learn Web Design?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover if web design is your perfect career match with our comprehensive assessment. 
            Get personalized insights, career recommendations, and a learning roadmap tailored just for you.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              20-30 minutes
            </div>
            <div className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Scientifically validated
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Instant results
            </div>
          </div>
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6">
              Take the Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-primary-soft rounded-lg w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* What You'll Discover */}
        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You'll Discover</CardTitle>
            <CardDescription>Our assessment evaluates multiple dimensions of career fit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Psychological Fit</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Interest and passion assessment</li>
                  <li>• Personality compatibility</li>
                  <li>• Cognitive preferences</li>
                  <li>• Motivation analysis</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Career Readiness</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Technical aptitude evaluation</li>
                  <li>• Learning ability assessment</li>
                  <li>• Real-world skill mapping</li>
                  <li>• Personalized learning path</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Footer */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Path?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands who've found clarity about their web design career potential
          </p>
          <Link to="/assessment">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
