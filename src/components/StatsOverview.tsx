import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  Target,
  Eye
} from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      title: "Active Campaigns",
      value: "12",
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Total Spend",
      value: "$45,670",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Impressions",
      value: "2.4M",
      change: "+15.3%",
      trend: "up",
      icon: Eye,
      color: "text-warning"
    },
    {
      title: "Available Spots",
      value: "1,247",
      change: "-3.1%",
      trend: "down",
      icon: MapPin,
      color: "text-primary"
    }
  ];

  const campaignPerformance = [
    { name: "Summer Sale 2024", impressions: 850000, spend: 12500, roi: 3.2 },
    { name: "Brand Awareness Q1", impressions: 920000, spend: 15600, roi: 2.8 },
    { name: "Product Launch", impressions: 680000, spend: 9800, roi: 4.1 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
                )}
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{campaign.name}</h4>
                  <div className="text-right">
                    <div className="font-semibold text-sm">ROI: {campaign.roi}x</div>
                    <div className="text-xs text-muted-foreground">${campaign.spend.toLocaleString()}</div>
                  </div>
                </div>
                <Progress value={(campaign.impressions / 1000000) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{(campaign.impressions / 1000000).toFixed(1)}M impressions</span>
                  <span>{((campaign.impressions / 1000000) * 100).toFixed(0)}% of target</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Top Performing Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { location: "Times Square, NYC", impressions: "45K/day", score: 4.9 },
                { location: "Sunset Strip, LA", impressions: "32K/day", score: 4.7 },
                { location: "Downtown Chicago", impressions: "28K/day", score: 4.5 },
                { location: "Miami Beach", impressions: "25K/day", score: 4.3 }
              ].map((location, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{location.location}</div>
                    <div className="text-xs text-muted-foreground">{location.impressions}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{location.score}/5.0</div>
                    <div className="text-xs text-muted-foreground">Conv. Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsOverview;