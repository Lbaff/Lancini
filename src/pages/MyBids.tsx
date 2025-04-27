
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock bids data
const initialBids = [
  {
    id: 1,
    projectId: 101,
    projectTitle: "Développement d'un site e-commerce sous WordPress",
    bidAmount: 1500,
    status: "pending",
    createdAt: "2025-04-22T10:30:00Z",
    deadline: "2025-05-15T23:59:59Z",
  },
  {
    id: 2,
    projectId: 102,
    projectTitle: "Création d'une identité visuelle pour une startup",
    bidAmount: 800,
    status: "accepted",
    createdAt: "2025-04-20T14:15:00Z",
    deadline: "2025-05-05T23:59:59Z",
  },
  {
    id: 3,
    projectId: 103,
    projectTitle: "Développement d'une application mobile de livraison",
    bidAmount: 3000,
    status: "rejected",
    createdAt: "2025-04-15T09:45:00Z",
    deadline: "2025-05-20T23:59:59Z",
  },
  {
    id: 4,
    projectId: 104,
    projectTitle: "Intégration d'une API de paiement",
    bidAmount: 500,
    status: "in_progress",
    createdAt: "2025-04-10T16:20:00Z",
    deadline: "2025-04-30T23:59:59Z",
  },
  {
    id: 5,
    projectId: 105,
    projectTitle: "Rédaction de contenu pour un blog",
    bidAmount: 350,
    status: "completed",
    createdAt: "2025-04-05T11:00:00Z",
    deadline: "2025-04-15T23:59:59Z",
  },
];

interface Bid {
  id: number;
  projectId: number;
  projectTitle: string;
  bidAmount: number;
  status: "pending" | "accepted" | "rejected" | "in_progress" | "completed";
  createdAt: string;
  deadline: string;
}

const statusLabels = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  accepted: { label: "Acceptée", color: "bg-green-100 text-green-800" },
  rejected: { label: "Refusée", color: "bg-red-100 text-red-800" },
  in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Terminée", color: "bg-gray-100 text-gray-800" },
};

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getTimeRemaining = (deadlineString: string) => {
    const now = new Date();
    const deadline = new Date(deadlineString);
    const diffTime = deadline.getTime() - now.getTime();
    
    if (diffTime <= 0) {
      return "Expiré";
    }
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    }
    
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return `${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  };

  const filteredBids = statusFilter === "all" 
    ? bids 
    : bids.filter(bid => bid.status === statusFilter);

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
        <h1 className="text-2xl font-bold mb-2">Offres</h1>
        <h2 className="text-3xl font-bold">Mes offres</h2>
        <p className="mt-2 text-gray-600">
          Suivez l'état de toutes vos offres sur des projets
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="accepted">Acceptées</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminées</SelectItem>
              <SelectItem value="rejected">Refusées</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" asChild>
          <Link to="/browse-projects">Parcourir les projets</Link>
        </Button>
      </div>

      {/* Bids Table */}
      {filteredBids.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Aucune offre trouvée</h3>
          <p className="text-gray-600 mb-4">
            {statusFilter === "all" 
              ? "Vous n'avez pas encore fait d'offre sur des projets." 
              : `Vous n'avez aucune offre avec le statut "${
                  statusLabels[statusFilter as keyof typeof statusLabels]?.label || statusFilter
                }".`}
          </p>
          {statusFilter !== "all" && (
            <Button variant="outline" onClick={() => setStatusFilter("all")}>
              Afficher toutes les offres
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden md:table-cell">Délai restant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/project/${bid.projectId}`} 
                      className="hover:text-primary transition-colors"
                    >
                      {bid.projectTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {formatDate(bid.createdAt)}
                  </TableCell>
                  <TableCell>{bid.bidAmount} €</TableCell>
                  <TableCell>
                    <Badge className={statusLabels[bid.status].color}>
                      {statusLabels[bid.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {getTimeRemaining(bid.deadline)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyBids;
