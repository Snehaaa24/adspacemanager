import { useState } from "react";
import Navigation from "@/components/Navigation";
import MapDashboard from "@/components/MapDashboard";
import StatsOverview from "@/components/StatsOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, BarChart3, Calendar, Target, Sparkles } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("map");

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
              <Button variant="outline" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                View Campaigns
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow">
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
                    <Button className="bg-gradient-to-r from-primary to-primary-glow">
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
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
