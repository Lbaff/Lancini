
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle, X, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample projects data
const recentProjects = [
  {
    id: 1,
    title: "Développement d'un site e-commerce",
    budget: "1500€ - 3000€",
    postedAt: "Il y a 2 heures",
    bids: 4
  },
  {
    id: 2,
    title: "Création d'une identité visuelle",
    budget: "800€ - 1200€",
    postedAt: "Il y a 5 heures",
    bids: 7
  },
  {
    id: 3,
    title: "Rédaction de contenu pour blog tech",
    budget: "500€ - 800€",
    postedAt: "Il y a 1 jour",
    bids: 12
  },
  {
    id: 4,
    title: "Intégration de système de paiement",
    budget: "2000€ - 2500€",
    postedAt: "Il y a 2 jours",
    bids: 3
  }
];

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Accès non autorisé</h2>
          <p className="mb-4">Vous devez être connecté pour accéder au tableau de bord.</p>
          <Link to="/login" className="text-primary hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Accueil</h1>
        <h2 className="text-3xl font-bold">Tableau de bord</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile & Actions */}
        <div className="space-y-6">
          {/* Quick Profile */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/150"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <Link
                  to="/profile"
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  Modifier le profil
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statut de vérification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profil complété</span>
                  <div className="flex items-center">
                    <Progress value={75} className="w-24 mr-2" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Téléphone</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs">Vérifié</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compétences ajoutées</span>
                    {user.skills.length > 0 ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">Complété</span>
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <X className="w-4 h-4 mr-1" />
                        <span className="text-xs">À compléter</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Travaux de portfolio</span>
                    {user.portfolioCount > 0 ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">{user.portfolioCount} ajouté(s)</span>
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <X className="w-4 h-4 mr-1" />
                        <span className="text-xs">À compléter</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Identité</span>
                    <span className="flex items-center text-red-500">
                      <X className="w-4 h-4 mr-1" />
                      <span className="text-xs">Non vérifié</span>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messaging */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">Vous avez 3 nouveaux messages</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/messages">Consulter la messagerie</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">
                  {user.portfolioCount > 0
                    ? `${user.portfolioCount} travaux dans le portfolio`
                    : "Aucun travail dans votre portfolio"}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/portfolio/add">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Ajouter un travail
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tableau des paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Solde disponible</p>
                  <p className="text-2xl font-bold">0.00€</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">En attente</p>
                  <p className="text-2xl font-bold">0.00€</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Gains totaux</p>
                  <p className="text-2xl font-bold">0.00€</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mises à jour de la plateforme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-md">
                <p className="text-sm">
                  Nous sommes heureux d'annoncer la réduction de la commission de la plateforme Lancini de 20% à 15% ainsi que le lancement d'un nouveau système d'adhésion.
                </p>
                <Link to="/announcements" className="text-primary hover:text-primary-dark text-sm font-medium mt-2 inline-block">
                  Découvrez plus d'informations sur les mises à jour de Lancini
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Offers/Bids Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Résumé des offres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-500">Offres disponibles</p>
                  <p className="text-xl font-bold">42</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-500">En attente</p>
                  <p className="text-xl font-bold">3</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-500">En cours</p>
                  <p className="text-xl font-bold">2</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-500">Complétées</p>
                  <p className="text-xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Available Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Dernières offres de projets</span>
                <Link to="/browse-projects" className="text-sm text-primary hover:text-primary-dark font-medium">
                  Voir tout
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {recentProjects.map((project) => (
                  <div key={project.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <Link to={`/projects/${project.id}`} className="font-medium hover:text-primary">
                        {project.title}
                      </Link>
                      <span className="text-sm font-medium">{project.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{project.postedAt}</span>
                      <span>{project.bids} offres</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
              <Link to="/post-project">
                Publier un projet
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/find-freelancers">
                Trouver des freelances
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
