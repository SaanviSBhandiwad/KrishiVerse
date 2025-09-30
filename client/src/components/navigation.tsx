import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { LanguageCode, speakText, t } from "@/lib/i18n";
import {
  FileText,
  Home,
  Sprout,
  Target,
  Trophy,
  User,
  Volume2
} from "lucide-react";
import { useLocation } from "wouter";
import krishiverseLogo from "../krishiverselogo.jpeg"; // Adjust path if needed

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const { user, language, setLanguage } = useUser();

  if (!user && location !== "/" && location !== "/onboarding") {
    return null;
  }

  // NOTE: TrendingUp was replaced with Trophy for Leaderboard to match the final screenshot logic (Trophy is used in the desktopNavItems).
  const navItems = [
    { path: "/dashboard", icon: Home, label: t("KrishiPlay", language as LanguageCode) },
    { path: "/quests", icon: Target, label: t("KrishiGrow", language as LanguageCode) },
    // Changed TrendingUp to Trophy/Leaderboard to match typical sidebar naming
    { path: "/leaderboard", icon: Trophy, label: t("KrishiKnow", language as LanguageCode) }, 
    { path: "/market", icon: Home, label: t("KrishiMart", language as LanguageCode) }, // Re-using Home icon as TrendingUp was not used in the desktop list
    { path: "/krishima", icon: Sprout, label: t("KrishiMa", language as LanguageCode) }, 
    { path: "/profile", icon: User, label: t("profile", language as LanguageCode) },
  ];

  const desktopNavItems = [
    ...navItems.slice(0, 2),
    { path: "/schemes", icon: FileText, label: "Govt Schemes" },
    ...navItems.slice(2),
  ];

  const handleSpeak = (text: string) => {
    speakText(text, language as LanguageCode);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden mobile-bottom-nav bg-card border-t border-border" data-testid="mobile-navigation">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => setLocation(item.path)}
                className={`flex flex-col items-center p-2 h-auto space-y-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`nav-${item.path.slice(1)}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar (Corrected Structure) */}
      <div 
        className="hidden md:block fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50" 
        data-testid="desktop-sidebar"
      >
        <div className="p-4 flex flex-col h-full"> {/* Adjusted padding to p-4 for tighter fit */}
          
          {/* Logo, Title, and Language Selector Group */}
          <div className="mb-6">
            <div className="flex flex-col items-start space-y-1 mb-4"> {/* Adjusted logo area to match screenshot look */}
                {/* Logo and Title */}
                <div className="flex items-center space-x-2">
                    <img src={krishiverseLogo} alt="Krishiverse Logo" className="h-8 w-auto" /> {/* Smaller logo */}
                    <span className="text-xl font-bold text-primary">KrishiVerse</span> {/* Adjusted name/style */}
                </div>
                
                {/* Subtitle and Speak Button */}
                <div className="flex items-center justify-between w-full mt-1">
                    <p className="text-xs text-muted-foreground">
                        {t("sustainableFarming", language as LanguageCode)}
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeak("KrishiVerse - Sustainable Farming Platform")}
                        className="p-1 h-auto"
                        data-testid="speak-title"
                    >
                        <Volume2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
              data-testid="language-selector"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1"> {/* Adjusted space-y to space-y-1 for closer links */}
            {desktopNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => setLocation(item.path)}
                  className="w-full justify-start h-10" // Ensured consistent height
                  data-testid={`nav-${item.path.slice(1)}`}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}