import { useState } from "react";
import { Search, Menu, Plus, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const Header = ({ onSearch, searchQuery = "" }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2"><img src="/logo.png" alt="EventHive Logo" className="w-12 h-12" 
            />
            <span className="font-bold text-3xl mgradient-primary bg-clip-text text-transparent">
              EventHive
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-surface border-border-light focus:border-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Browse Events
            </Button>
            <Button variant="ghost" size="sm">
              My Tickets
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through EventHive</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button variant="ghost" className="justify-start">
                  Browse Events
                </Button>
                <Button variant="ghost" className="justify-start">
                  My Tickets
                </Button>
                <Button variant="outline" className="justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
                <Button variant="ghost" className="justify-start">
                  Profile
                </Button>
                <Button variant="ghost" className="justify-start">
                  Settings
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
