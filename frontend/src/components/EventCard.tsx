import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  attendees: number;
  maxAttendees: number;
  image: string;
  organizer: string;
}

interface EventCardProps {
  event: Event;
  onViewDetails?: (eventId: string) => void;
  onBookNow?: (eventId: string) => void;
}

export const EventCard = ({ event, onViewDetails, onBookNow }: EventCardProps) => {
  const handleViewDetails = () => {
    onViewDetails?.(event.id);
  };

  const handleBookNow = () => {
    onBookNow?.(event.id);
  };

  const spotsLeft = event.maxAttendees - event.attendees;
  const isAlmostFull = spotsLeft <= 10 && spotsLeft > 0;
  const isFull = spotsLeft <= 0;

  return (
    <Card className="group hover-lift transition-smooth cursor-pointer bg-card hover:bg-card-hover border-border-light">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {event.category}
          </Badge>
        </div>
        {isAlmostFull && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="bg-warning text-warning-foreground">
              Almost Full
            </Badge>
          </div>
        )}
        {isFull && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-smooth line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-accent font-bold">
            <DollarSign className="w-4 h-4" />
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{event.attendees} / {event.maxAttendees} attendees</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        <Button 
          variant={isFull ? "secondary" : "accent"} 
          className="flex-1"
          onClick={handleBookNow}
          disabled={isFull}
        >
          {isFull ? "Sold Out" : "Book Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};