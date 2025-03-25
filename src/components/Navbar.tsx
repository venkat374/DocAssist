
import React, { useState } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SearchBar } from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  // Get the user's name from metadata or use a default value
  const userName = user?.user_metadata?.name || "User";
  // Get initials for avatar
  const initials = userName
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <header className="sticky top-0 z-40 border-b bg-background backdrop-blur-lg">
      <div className="container px-4 sm:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mr-1"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-medical-blue flex items-center justify-center mr-2">
              <span className="text-white font-semibold text-lg">D</span>
            </div>
            <h1 className="font-semibold text-xl leading-tight tracking-tight">
              DocAssist
            </h1>
          </div>
        </div>

        {!isMobile && (
          <div className="hidden md:flex items-center justify-center flex-1 max-w-xl">
            <SearchBar />
          </div>
        )}

        <div className="flex items-center gap-3">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-medical-critical" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="border-b p-4">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-medical-lightBlue p-2">
                      <Bell className="h-4 w-4 text-medical-blue" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New lab results available</p>
                      <p className="text-sm text-muted-foreground">Robert Williams has new critical lab results.</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-medical-lightBlue p-2">
                      <Bell className="h-4 w-4 text-medical-blue" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Follow-up reminder</p>
                      <p className="text-sm text-muted-foreground">Emily Chen needs a follow-up appointment scheduled.</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-medical-blue text-white">{initials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-0">
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-medical-blue text-white">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">Doctor</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm" onClick={signOut}>
                  Sign out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobile && searchOpen && (
        <div className="fixed inset-0 z-50 bg-background p-4 pt-20">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4"
            onClick={() => setSearchOpen(false)}
          >
            <span className="text-lg">&times;</span>
          </Button>
          <SearchBar autoFocus onResultClick={() => setSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background pt-16">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-lg">&times;</span>
          </Button>
          <nav className="flex flex-col p-6 gap-4">
            <Button variant="ghost" className="justify-start" size="lg">
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start" size="lg">
              Patients
            </Button>
            <Button variant="ghost" className="justify-start" size="lg">
              Appointments
            </Button>
            <Button variant="ghost" className="justify-start" size="lg">
              Messages
            </Button>
            <Button variant="ghost" className="justify-start" size="lg">
              Analytics
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
