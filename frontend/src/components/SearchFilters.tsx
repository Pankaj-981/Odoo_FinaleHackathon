import { useState } from "react";
import { Filter, Calendar, MapPin, DollarSign, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FilterOptions {
  category: string;
  dateRange: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

interface SearchFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  resultCount?: number;
}

const categories = [
  "All Categories",
  "Conference",
  "Workshop",
  "Concert",
  "Sports",
  "Networking",
  "Hackathon",
  "Seminar",
  "Festival",
];

const dateRanges = [
  { value: "all", label: "All Dates" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this-week", label: "This Week" },
  { value: "next-week", label: "Next Week" },
  { value: "this-month", label: "This Month" },
  { value: "next-month", label: "Next Month" },
];

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "price", label: "Price" },
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
];

export const SearchFilters = ({ filters, onFiltersChange, resultCount }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "All Categories",
      dateRange: "all",
      location: "",
      priceRange: [0, 500],
      sortBy: "date",
    });
  };

  const activeFiltersCount = [
    filters.category !== "All Categories",
    filters.dateRange !== "all",
    filters.location !== "",
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <FiltersContent 
                  filters={filters} 
                  updateFilter={updateFilter} 
                  clearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                />
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </div>
              {resultCount !== undefined && (
                <span className="text-sm font-normal text-muted-foreground">
                  {resultCount} events found
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersContent 
              filters={filters} 
              updateFilter={updateFilter} 
              clearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface FiltersContentProps {
  filters: FilterOptions;
  updateFilter: (key: keyof FilterOptions, value: any) => void;
  clearFilters: () => void;
  activeFiltersCount: number;
}

const FiltersContent = ({ filters, updateFilter, clearFilters, activeFiltersCount }: FiltersContentProps) => {
  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      )}

      {/* Category */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Category
        </Label>
        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Date
        </Label>
        <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </Label>
        <Input
          placeholder="City or venue..."
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Price Range
        </Label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};