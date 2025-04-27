
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock portfolio data
const initialPortfolio = [
  {
    id: 1,
    title: "Site e-commerce pour une boutique de mode",
    description: "Conception et développement d'un site e-commerce complet avec panier, paiement et gestion des commandes.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=350&fit=crop",
  },
  {
    id: 2,
    title: "Application mobile de livraison",
    description: "Développement d'une application de livraison de repas avec géolocalisation et suivi en temps réel.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=350&fit=crop",
  },
];

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const MyPortfolio = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<PortfolioItem, "id">>({
    title: "",
    description: "",
    image: "",
  });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const newId = portfolio.length > 0 ? Math.max(...portfolio.map(item => item.id)) + 1 : 1;
    
    setPortfolio([
      ...portfolio,
      { ...newItem, id: newId }
    ]);
    
    // Reset form
    setNewItem({
      title: "",
      description: "",
      image: "",
    });
    
    toast({
      title: "Succès",
      description: "Votre réalisation a été ajoutée avec succès",
    });
  };

  const handleEditItem = (item: PortfolioItem) => {
    setCurrentItem(item);
  };

  const handleUpdateItem = () => {
    if (!currentItem) return;
    
    setPortfolio(
      portfolio.map(item => 
        item.id === currentItem.id ? currentItem : item
      )
    );
    
    setCurrentItem(null);
    
    toast({
      title: "Succès",
      description: "Votre réalisation a été mise à jour avec succès",
    });
  };

  const handleDeleteItem = (id: number) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
    
    toast({
      title: "Succès",
      description: "Votre réalisation a été supprimée avec succès",
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
        <h1 className="text-2xl font-bold mb-2">Profil</h1>
        <h2 className="text-3xl font-bold">Mes réalisations</h2>
        <p className="mt-2 text-gray-600">
          Ajoutez vos projets pour montrer vos compétences et attirer plus de clients
        </p>
      </header>

      {/* Add New Portfolio Item */}
      <div className="mb-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une réalisation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Ajouter une réalisation</DialogTitle>
              <DialogDescription>
                Ajoutez les détails de votre projet pour le présenter dans votre portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  placeholder="Titre de votre projet"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="https://exemple.com/image.jpg"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre projet en détail"
                  rows={4}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAddItem}>Ajouter</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid */}
      {portfolio.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Aucune réalisation</h3>
          <p className="text-gray-600 mb-4">
            Commencez à ajouter vos projets à votre portfolio pour attirer plus de clients.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Aucune image</span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 line-clamp-3">{item.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between p-4 pt-0">
                {/* Edit Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditItem(item)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Button>
                  </DialogTrigger>
                  {currentItem && (
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Modifier la réalisation</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-title">Titre</Label>
                          <Input
                            id="edit-title"
                            value={currentItem.title}
                            onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-image">Image URL</Label>
                          <Input
                            id="edit-image"
                            value={currentItem.image}
                            onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            rows={4}
                            value={currentItem.description}
                            onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleUpdateItem}>Enregistrer</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
                
                {/* Delete Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible et supprimera définitivement votre réalisation de votre portfolio.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-destructive text-destructive-foreground">
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPortfolio;
