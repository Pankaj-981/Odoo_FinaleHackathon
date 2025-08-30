import { useState, useMemo } from "react";
import { Sparkles, Calendar, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { EventCard } from "@/components/EventCard";
import { SearchFilters, FilterOptions } from "@/components/SearchFilters";
import heroImage from "@/assets/hero-image.jpg";
import spandan from "@/assets/spandan.jpg";
import aws from "@/assets/aws.png";
import hackathon from "@/assets/hackathon.jpg";

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "Odoo x CGC Hackathon",
    description: "Join & dive into real world challenges & collobarte with peers.",
    date: "Aug 30, 2025",
    time: "10:00 AM",
    location: "CGC Mohali, Punjab, India",
    category: "Hackathon",
    price: 0,
    attendees: 0,
    maxAttendees: 300,
    image: hackathon,
    organizer: "Odoo"
  },
  {
    id: "2",
    title: "Spandan",
    description: "Three days of amazing music with top artists from around the world. Food, drinks, and unforgettable memories.",
    date: "Sept 5 , 2025",
    time: "11:30 AM",
    location: "Multipurpose Hall DU",
    category: "Festival",
    price: 0,
    attendees: 0,
    maxAttendees: 1000,
    image: spandan,
    organizer: "FoT DU"
  },
  {
    id: "3",
    title: "AWS Club",
    description: "AWS Club offers resources and a collaborative environment to foster growth, innovation, and leadership in cloud-based solutions",
    date: "Sept 20 , 2025",
    time: "10:00 AM",
    location: "Block 1/3rd Floor CGC",
    category: "Workshop",
    price: 49,
    attendees: 0,
    maxAttendees: 30,
    image: aws,
    organizer: "CGC Mohali"
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All Categories",
    dateRange: "all",
    location: "",
    priceRange: [0, 500],
    sortBy: "date",
  });

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let events = mockEvents.filter((event) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== "All Categories" && event.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (event.price < filters.priceRange[0] || event.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort events
    switch (filters.sortBy) {
      case "price":
        events.sort((a, b) => a.price - b.price);
        break;
      case "popularity":
        events.sort((a, b) => b.attendees - a.attendees);
        break;
      case "newest":
        events.sort((a, b) => a.id.localeCompare(b.id));
        break;
      default: // date
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return events;
  }, [searchQuery, filters]);

  const handleViewDetails = (eventId: string) => {
    console.log("View details for event:", eventId);
    // TODO: Navigate to event details page
  };

  const handleBookNow = (eventId: string) => {
    console.log("Book event:", eventId);
    // TODO: Navigate to booking page
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="EventHive Hero"
            className="w-full h-full object-cover opacity-65"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-3xl font-medium pt-12">Welcome to EventHive</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Where Events Come Alive
            </h1>
          
            <div className="flex flex-col sm:flex-row gap-4 justify-center p-20">
              <Button variant="secondary" size="xl" className="group">
                Browse Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-foreground">12,000+</span>
              </div>
              <p className="text-muted-foreground">Events Created</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="w-8 h-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-foreground">500K+</span>
              </div>
              <p className="text-muted-foreground">Happy Attendees</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Star className="w-8 h-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-foreground">4.9</span>
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover events that match your interests and connect with like-minded people in your community.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                resultCount={filteredEvents.length}
              />
            </div>

            {/* Events Grid */}
            <div className="flex-1">
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onViewDetails={handleViewDetails}
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">
                      No Events Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or explore different categories.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setFilters({
                        category: "All Categories",
                        dateRange: "all",
                        location: "",
                        priceRange: [0, 500],
                        sortBy: "date",
                      });
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;