
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, X } from "lucide-react";

interface UserProfile {
  name: string;
  profilePicture: string;
  headline: string;
  bio: string;
  phone: string;
  phoneVerified: boolean;
  identityVerified: boolean;
  skills: string[];
  hourlyRate: number;
  availability: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock initial profile data
  const initialProfile: UserProfile = {
    name: user?.name || "",
    profilePicture: user?.profilePicture || "",
    headline: "Développeur Web Freelance",
    bio: "Je suis un développeur web passionné avec plus de 5 ans d'expérience dans la création d'applications web modernes et performantes.",
    phone: "+33 6 12 34 56 78",
    phoneVerified: true,
    identityVerified: false,
    skills: ["React", "TypeScript", "Node.js", "UI/UX"],
    hourlyRate: 50,
    availability: "Disponible 20h/semaine",
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [newSkill, setNewSkill] = useState("");

  const handleSaveProfile = () => {
    // In a real app, you would save this to the server
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (profile.skills.includes(newSkill.trim())) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Cette compétence existe déjà dans votre profil.",
      });
      return;
    }
    
    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill.trim()],
    });
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove),
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Accès non autorisé</h2>
          <p>Veuillez vous connecter pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Paramètres</h1>
        <h2 className="text-3xl font-bold">Mon profil</h2>
        <p className="mt-2 text-gray-600">
          Gérez vos informations personnelles et vos préférences
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar with Avatar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-4">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.profilePicture} alt={profile.name} />
                  <AvatarFallback className="text-3xl">
                    {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="w-full space-y-4">
                <div>
                  <Label htmlFor="avatar-url">URL de l'image de profil</Label>
                  <Input
                    id="avatar-url"
                    value={profile.profilePicture}
                    onChange={(e) => setProfile({ ...profile, profilePicture: e.target.value })}
                    placeholder="https://example.com/avatar.jpg"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Téléphone</span>
                    {profile.phoneVerified ? (
                      <span className="flex items-center text-green-500 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Vérifié
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 text-xs">
                        <X className="w-3 h-3 mr-1" />
                        Non vérifié
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Identité</span>
                    {profile.identityVerified ? (
                      <span className="flex items-center text-green-500 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Vérifié
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 text-xs">
                        <X className="w-3 h-3 mr-1" />
                        <Button variant="link" className="p-0 h-auto text-xs">
                          Vérifier maintenant
                        </Button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="headline">Titre professionnel</Label>
                <Input
                  id="headline"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="ex: Développeur Web Freelance"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Compétences et expertise</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="skills">Compétences</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-primary/50 hover:text-primary"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    id="new-skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Ajouter une compétence"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>
                    Ajouter
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="hourly-rate">Taux horaire (€)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({ ...profile, hourlyRate: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="availability">Disponibilité</Label>
                <Input
                  id="availability"
                  value={profile.availability}
                  onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                  placeholder="ex: Disponible 20h/semaine"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile}>
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
