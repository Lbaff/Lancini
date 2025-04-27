
import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample projects data
const projects = [
  {
    id: 1,
    title: "Développement d'un site e-commerce responsive",
    category: "Programmation",
    subcategory: "Développement Web",
    publisher: {
      name: "Sophie Martin",
      rating: 4.8,
      reviews: 27
    },
    publishedAt: "Il y a 3 heures",
    offerCount: 12,
    budget: "1500€ - 3000€",
    description: "Recherche développeur expérimenté pour créer un site e-commerce complet avec panier, paiement et gestion des produits. Connaissances en React, Node.js et base de données requises."
  },
  {
    id: 2,
    title: "Création d'une identité visuelle pour startup fintech",
    category: "Design",
    subcategory: "Design Graphique",
    publisher: {
      name: "Thomas Dubois",
      rating: 4.5,
      reviews: 19
    },
    publishedAt: "Il y a 5 heures",
    offerCount: 8,
    budget: "800€ - 1500€",
    description: "Startup fintech cherche designer pour créer logo, charte graphique complète et éléments visuels pour site web et réseaux sociaux. Style moderne et professionnel exigé."
  },
  {
    id: 3,
    title: "Rédaction d'articles SEO pour blog tech",
    category: "Rédaction",
    subcategory: "Contenu Web",
    publisher: {
      name: "Marie Leroy",
      rating: 4.9,
      reviews: 42
    },
    publishedAt: "Il y a 1 jour",
    offerCount: 23,
    budget: "500€ - 800€",
    description: "Rédacteur SEO recherché pour créer 10 articles de blog de 1500 mots sur les thèmes de l'IA, la cybersécurité et le cloud computing. Optimisation pour mots-clés fournis."
  },
  {
    id: 4,
    title: "Intégration de système de paiement Stripe",
    category: "Programmation",
    subcategory: "Développement Backend",
    publisher: {
      name: "Lucas Bernard",
      rating: 4.7,
      reviews: 31
    },
    publishedAt: "Il y a 2 jours",
    offerCount: 7,
    budget: "2000€ - 2500€",
    description: "Intégration complète de Stripe à notre plateforme SaaS existante. Gestion des paiements récurrents, factures et remboursements. Stack technique: Node.js, MongoDB, React."
  },
  {
    id: 5,
    title: "Application mobile de suivi fitness",
    category: "Programmation",
    subcategory: "Développement Mobile",
    publisher: {
      name: "Emma Petit",
      rating: 4.6,
      reviews: 15
    },
    publishedAt: "Il y a 3 jours",
    offerCount: 19,
    budget: "3000€ - 5000€",
    description: "Création d'une application mobile de suivi fitness avec fonctionnalités de coaching, programmes d'entraînement, et suivi des progrès. Versions iOS et Android requises."
  },
  {
    id: 6,
    title: "Traduction de site web e-commerce en 5 langues",
    category: "Rédaction",
    subcategory: "Traduction",
    publisher: {
      name: "Pierre Moreau",
      rating: 4.8,
      reviews: 24
    },
    publishedAt: "Il y a 4 jours",
    offerCount: 15,
    budget: "1200€ - 2000€",
    description: "Traduction de notre site e-commerce (environ 50 pages) du français vers l'anglais, l'espagnol, l'allemand, l'italien et le néerlandais. Connaissance du secteur de la mode souhaitée."
  }
];

// Categories and skills for filters
const categories = [
  { id: "programming", name: "Programmation", count: 152 },
  { id: "design", name: "Design", count: 98 },
  { id: "writing", name: "Rédaction", count: 76 },
  { id: "marketing", name: "Marketing", count: 64 },
  { id: "business", name: "Services et conseils", count: 42 },
  { id: "engineering", name: "Ingénierie", count: 37 },
  { id: "support", name: "Support", count: 29 },
  { id: "training", name: "Formation", count: 18 },
];

const skills = [
  { id: "react", name: "React", count: 86 },
  { id: "node", name: "Node.js", count: 73 },
  { id: "javascript", name: "JavaScript", count: 124 },
  { id: "python", name: "Python", count: 92 },
  { id: "design", name: "Design UI/UX", count: 68 },
  { id: "php", name: "PHP", count: 61 },
  { id: "wordpress", name: "WordPress", count: 57 },
  { id: "seo", name: "SEO", count: 49 },
  { id: "writing", name: "Rédaction web", count: 43 },
  { id: "mobile", name: "Développement mobile", count: 38 },
];

const BrowseProjects = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Parcourir les projets</h1>
        <p className="text-gray-600 mt-2">
          Trouvez des projets qui correspondent à vos compétences et à vos intérêts
        </p>
      </header>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Rechercher des projets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 gap-8">
        {/* Mobile filters toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? "transform rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Filters - Left Sidebar */}
        <div className={`lg:block ${showMobileFilters ? "block" : "hidden"} mb-6 lg:mb-0`}>
          <div className="space-y-6 sticky top-4">
            {/* Sort By */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Trier par</h3>
              <Select defaultValue="recent">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="budget-high">Budget (élevé-bas)</SelectItem>
                  <SelectItem value="budget-low">Budget (bas-élevé)</SelectItem>
                  <SelectItem value="offers">Nombre d'offres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categories Filter */}
            <Accordion type="multiple" defaultValue={["categories"]}>
              <AccordionItem value="categories">
                <AccordionTrigger className="text-lg font-semibold py-2">Catégories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>{category.name}</span>
                          <span className="text-gray-500">({category.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Skills Filter */}
            <Accordion type="multiple" defaultValue={["skills"]}>
              <AccordionItem value="skills">
                <AccordionTrigger className="text-lg font-semibold py-2">Compétences</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skill-${skill.id}`}
                          checked={selectedSkills.includes(skill.id)}
                          onChange={() => toggleSkill(skill.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`skill-${skill.id}`} className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>{skill.name}</span>
                          <span className="text-gray-500">({skill.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Budget Range Filter */}
            <Accordion type="multiple" defaultValue={["budget"]}>
              <AccordionItem value="budget">
                <AccordionTrigger className="text-lg font-semibold py-2">Budget</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="min-budget" className="block text-sm font-medium text-gray-700 mb-1">
                          Min (€)
                        </label>
                        <Input
                          type="number"
                          id="min-budget"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div>
                        <label htmlFor="max-budget" className="block text-sm font-medium text-gray-700 mb-1">
                          Max (€)
                        </label>
                        <Input
                          type="number"
                          id="max-budget"
                          placeholder="10000"
                          min="0"
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Appliquer
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Delivery Time Filter */}
            <Accordion type="multiple">
              <AccordionItem value="delivery">
                <AccordionTrigger className="text-lg font-semibold py-2">Délai de livraison</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="delivery-24h"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="delivery-24h" className="ml-2 text-sm">
                        Moins de 24 heures
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="delivery-3d"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="delivery-3d" className="ml-2 text-sm">
                        1-3 jours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="delivery-1w"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="delivery-1w" className="ml-2 text-sm">
                        3-7 jours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="delivery-2w"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="delivery-2w" className="ml-2 text-sm">
                        1-2 semaines
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="delivery-1m"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="delivery-1m" className="ml-2 text-sm">
                        Plus de 2 semaines
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button className="w-full">Appliquer les filtres</Button>
          </div>
        </div>

        {/* Project Listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">Affichage de {projects.length} projets</p>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="budget-high">Budget (élevé-bas)</SelectItem>
                <SelectItem value="budget-low">Budget (bas-élevé)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <Link to={`/projects/${project.id}`} className="text-xl font-bold hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                    <div className="text-lg font-semibold text-gray-700 mt-2 sm:mt-0">
                      {project.budget}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {project.subcategory}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <div className="font-medium mr-2">{project.publisher.name}</div>
                        <div className="flex items-center text-amber-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </svg>
                          <span className="ml-1">{project.publisher.rating}</span>
                          <span className="ml-1 text-gray-400">({project.publisher.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
                      <div className="text-gray-500">{project.publishedAt}</div>
                      <div className="sm:ml-4 text-gray-500">{project.offerCount} offres</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link to={`/projects/${project.id}`}>
                        Voir le projet
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProjects;
