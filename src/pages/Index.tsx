import { useState } from "react";
import Navigation from "@/components/Navigation";
import MapDashboard from "@/components/MapDashboard";
import StatsOverview from "@/components/StatsOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, BarChart3, Calendar, Target, Sparkles, Plus, FileText, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [activeTab, setActiveTab] = useState("map");
  const { toast } = useToast();
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    budget: "",
    duration: "",
    targetAudience: "",
    description: ""
  });

  const handleViewCampaigns = () => {
    setActiveTab("campaigns");
    toast({
      title: "Viewing Campaigns",
      description: "Switched to campaigns dashboard",
    });
  };

  const handleAIRecommendations = () => {
    toast({
      title: "AI Recommendations Loading",
      description: "Analyzing traffic patterns and generating personalized suggestions...",
    });
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "AI Recommendations Ready",
        description: "Found 12 high-performance locations matching your criteria",
      });
    }, 2000);
  };

  const handleCreateCampaign = () => {
    if (!campaignForm.name || !campaignForm.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in campaign name and budget",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Campaign Created Successfully",
      description: `Campaign "${campaignForm.name}" has been created with budget $${campaignForm.budget}`,
    });
    
    setCampaignDialogOpen(false);
    setCampaignForm({ name: "", budget: "", duration: "", targetAudience: "", description: "" });
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "schedule":
        toast({
          title: "Campaign Scheduler",
          description: "Opening campaign scheduling interface...",
        });
        break;
      case "reports":
        toast({
          title: "Generating Reports",
          description: "Compiling performance data and analytics...",
        });
        break;
      case "bulk":
        toast({
          title: "Bulk Booking",
          description: "Opening bulk location booking interface...",
        });
        break;
      default:
        toast({
          title: "Feature Coming Soon",
          description: "This feature will be available in the next update",
        });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                Discover Premium Ad Spaces
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Find, analyze, and book the perfect advertising locations with our AI-powered platform. 
                Access real-time traffic data, conversion analytics, and smart recommendations.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={handleViewCampaigns}>
                <Calendar className="w-4 h-4 mr-2" />
                View Campaigns
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow" onClick={handleAIRecommendations}>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Recommendations
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <Card className="h-[600px] overflow-hidden">
              <MapDashboard />
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <StatsOverview />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Campaign Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Campaign Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Create, manage, and track your advertising campaigns
                    </p>
                    <Dialog open={campaignDialogOpen} onOpenChange={setCampaignDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-primary-glow">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Campaign
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create New Campaign</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Campaign Name</Label>
                            <Input 
                              id="name" 
                              value={campaignForm.name}
                              onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter campaign name"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="budget">Budget ($)</Label>
                            <Input 
                              id="budget" 
                              type="number"
                              value={campaignForm.budget}
                              onChange={(e) => setCampaignForm(prev => ({ ...prev, budget: e.target.value }))}
                              placeholder="Campaign budget"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Select value={campaignForm.duration} onValueChange={(value) => setCampaignForm(prev => ({ ...prev, duration: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1week">1 Week</SelectItem>
                                <SelectItem value="2weeks">2 Weeks</SelectItem>
                                <SelectItem value="1month">1 Month</SelectItem>
                                <SelectItem value="3months">3 Months</SelectItem>
                                <SelectItem value="6months">6 Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="audience">Target Audience</Label>
                            <Select value={campaignForm.targetAudience} onValueChange={(value) => setCampaignForm(prev => ({ ...prev, targetAudience: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select target audience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="18-25">18-25 years</SelectItem>
                                <SelectItem value="26-35">26-35 years</SelectItem>
                                <SelectItem value="36-45">36-45 years</SelectItem>
                                <SelectItem value="46-55">46-55 years</SelectItem>
                                <SelectItem value="55+">55+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description"
                              value={campaignForm.description}
                              onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Campaign description and goals"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={() => setCampaignDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateCampaign} className="bg-gradient-to-r from-primary to-primary-glow">
                            Create Campaign
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("schedule")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("reports")}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("bulk")}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Bulk Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
