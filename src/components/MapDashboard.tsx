import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Filter, 
  Eye, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Users,
  Clock,
  Star,
  Navigation2
} from "lucide-react";

// Mock data for hoardings
const mockHoardings = [
  {
    id: 1,
    name: "Times Square Billboard",
    location: "New York, NY",
    type: "Digital",
    size: "14x48",
    price: 5000,
    availability: "Available",
    traffic: 95000,
    conversionScore: 4.8,
    coordinates: [-74.0060, 40.7128]
  },
  {
    id: 2,
    name: "Downtown Metro Station",
    location: "Los Angeles, CA",
    type: "Static",
    size: "12x24",
    price: 2500,
    availability: "Booked",
    traffic: 67000,
    conversionScore: 4.2,
    coordinates: [-118.2437, 34.0522]
  },
  {
    id: 3,
    name: "Airport Highway Display",
    location: "Chicago, IL",
    type: "Digital",
    size: "20x60",
    price: 3500,
    availability: "Available",
    traffic: 82000,
    conversionScore: 4.6,
    coordinates: [-87.6298, 41.8781]
  }
];

const MapDashboard = () => {
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedHoarding, setSelectedHoarding] = useState<any>(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    hoardingType: 'all',
    showTrafficHeat: true,
    availableOnly: false
  });

  const handleRecenter = () => {
    toast({
      title: "Map Recentered",
      description: "View has been reset to show all locations",
    });
  };

  const handleARPreview = () => {
    toast({
      title: "AR Preview",
      description: "Opening augmented reality preview mode...",
    });
  };

  const handleBooking = (hoarding: any) => {
    if (hoarding.availability === 'Available') {
      toast({
        title: "Booking Started",
        description: `Initiating booking process for ${hoarding.name}`,
      });
    } else {
      toast({
        title: "Location Details",
        description: `Viewing details for ${hoarding.name}`,
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Note: In a real implementation, you would use your Mapbox API key
    // For now, we'll create a placeholder map interface
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden';
    mapPlaceholder.innerHTML = `
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e0e7ff" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')] opacity-30"></div>
      <div class="text-center z-10">
        <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Interactive Map View</h3>
        <p class="text-sm text-gray-500 max-w-xs">Connect your Mapbox API key to enable the interactive map with real hoarding locations</p>
      </div>
    `;

    // Add mock markers
    const markers = [
      { x: '25%', y: '30%', id: 1 },
      { x: '60%', y: '45%', id: 2 },
      { x: '40%', y: '70%', id: 3 }
    ];

    markers.forEach(marker => {
      const markerElement = document.createElement('div');
      markerElement.className = 'absolute w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform z-20';
      markerElement.style.left = marker.x;
      markerElement.style.top = marker.y;
      markerElement.onclick = () => {
        const hoarding = mockHoardings.find(h => h.id === marker.id);
        setSelectedHoarding(hoarding);
      };
      mapPlaceholder.appendChild(markerElement);
    });

    mapContainer.current.appendChild(mapPlaceholder);

    return () => {
      if (mapContainer.current) {
        mapContainer.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex h-full">
      {/* Filters Sidebar */}
      <div className="w-80 bg-card border-r p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h3>
          
          <div className="space-y-4">
            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium">Price Range ($/month)</Label>
              <div className="mt-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Hoarding Type */}
            <div>
              <Label className="text-sm font-medium">Hoarding Type</Label>
              <Select value={filters.hoardingType} onValueChange={(value) => setFilters(prev => ({ ...prev, hoardingType: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="led">LED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="traffic-heat" 
                  checked={filters.showTrafficHeat}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showTrafficHeat: checked }))}
                />
                <Label htmlFor="traffic-heat" className="text-sm">Show Traffic Heatmap</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="available-only" 
                  checked={filters.availableOnly}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, availableOnly: checked }))}
                />
                <Label htmlFor="available-only" className="text-sm">Available Only</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="text-sm text-muted-foreground">Available</div>
              <div className="text-2xl font-bold text-success">1,247</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm text-muted-foreground">Booked</div>
              <div className="text-2xl font-bold text-warning">634</div>
            </Card>
          </div>
        </div>

        {/* Featured Locations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Featured Locations</h3>
          <div className="space-y-3">
            {mockHoardings.map((hoarding) => (
              <Card 
                key={hoarding.id}
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedHoarding(hoarding)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{hoarding.name}</h4>
                  <Badge variant={hoarding.availability === 'Available' ? 'default' : 'secondary'}>
                    {hoarding.availability}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{hoarding.location}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">${hoarding.price}/mo</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                    {hoarding.conversionScore}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full" />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm" onClick={handleRecenter}>
            <Navigation2 className="w-4 h-4 mr-2" />
            Recenter
          </Button>
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm" onClick={handleARPreview}>
            <Eye className="w-4 h-4 mr-2" />
            AR Preview
          </Button>
        </div>

        {/* Selected Hoarding Details */}
        {selectedHoarding && (
          <Card className="absolute bottom-4 left-4 w-80 bg-background/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{selectedHoarding.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedHoarding(null)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{selectedHoarding.location}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Type</div>
                  <div className="font-medium">{selectedHoarding.type}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-medium">{selectedHoarding.size}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Traffic/Day</div>
                  <div className="font-medium flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {selectedHoarding.traffic.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Score</div>
                  <div className="font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                    {selectedHoarding.conversionScore}/5
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <div className="text-lg font-bold">${selectedHoarding.price}/month</div>
                  <div className="text-xs text-muted-foreground">Starting price</div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  disabled={selectedHoarding.availability !== 'Available'}
                  onClick={() => handleBooking(selectedHoarding)}
                >
                  {selectedHoarding.availability === 'Available' ? 'Book Now' : 'View Details'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MapDashboard;