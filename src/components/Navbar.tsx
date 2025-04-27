
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Plus, Users, Boxes, Search, MessageSquare, Bell, User, Menu, X, Archive, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="relative">
      <nav className="bg-primary px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? "/dashboard" : "/"} className="text-white text-xl font-bold">
          Lancini
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/post-project" className="nav-link">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Publier un projet</span>
          </Link>
          <Link to="/find-freelancers" className="nav-link">
            <Users className="w-4 h-4" />
            <span className="text-sm">Trouver des freelances</span>
          </Link>
          <Link to="/browse-projects" className="nav-link">
            <Boxes className="w-4 h-4" />
            <span className="text-sm">Parcourir les projets</span>
          </Link>
          
          {/* Additional links for authenticated users */}
          {user && (
            <>
              <Link to="/portfolio" className="nav-link">
                <Archive className="w-4 h-4" />
                <span className="text-sm">Mes réalisations</span>
              </Link>
              <Link to="/bids" className="nav-link">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm">Mes offres</span>
              </Link>
            </>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white hover:text-white/80"
          >
            <Search className="w-5 h-5" />
          </button>

          {user ? (
            <>
              {/* Messaging Icon */}
              <Link to="/messages" className="text-white hover:text-white/80">
                <MessageSquare className="w-5 h-5" />
              </Link>
              
              {/* Notification Icon */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-white hover:text-white/80">
                    <Bell className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-md">
                        <p className="text-sm">Vous avez reçu une nouvelle offre pour votre projet "Site Web E-commerce"</p>
                        <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-md">
                        <p className="text-sm">Votre proposition a été acceptée pour le projet "Application Mobile"</p>
                        <p className="text-xs text-muted-foreground mt-1">Hier</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center">
                    <Avatar className="w-8 h-8 border border-white/20">
                      <AvatarImage src={user.profilePicture} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Mon Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/payment" className="cursor-pointer">Paiement</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-button">
                S'inscrire
              </Link>
              <Link to="/login" className="nav-button">
                Se connecter
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Search Bar (conditionally rendered) */}
      {showSearch && (
        <div className="absolute w-full bg-white shadow-md py-3 px-4 animate-slide-down">
          <div className="max-w-4xl mx-auto flex items-center">
            <input
              type="text"
              placeholder="rechercher ..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
            <button className="ml-2 p-2 bg-primary text-white rounded-md">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-white/10 animate-slide-down">
          <div className="px-4 py-5 space-y-3">
            <Link 
              to="/post-project" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus className="w-4 h-4" />
              <span>Publier un projet</span>
            </Link>
            <Link 
              to="/find-freelancers" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="w-4 h-4" />
              <span>Trouver des freelances</span>
            </Link>
            <Link 
              to="/browse-projects" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <Boxes className="w-4 h-4" />
              <span>Parcourir les projets</span>
            </Link>
            
            {/* Additional mobile menu links for authenticated users */}
            {user && (
              <>
                <Link 
                  to="/portfolio" 
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Archive className="w-4 h-4" />
                  <span>Mes réalisations</span>
                </Link>
                <Link 
                  to="/bids" 
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Mes offres</span>
                </Link>
              </>
            )}
            
            {user ? (
              <>
                <div className="pt-3 border-t border-white/10">
                  <Link 
                    to="/messages" 
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Messagerie</span>
                  </Link>
                  <Link 
                    to="/notifications" 
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Mon Profil</span>
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left nav-link text-red-300"
                  >
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="bg-white text-primary font-medium py-2 px-4 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link 
                  to="/signup" 
                  className="border border-white text-white font-medium py-2 px-4 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
