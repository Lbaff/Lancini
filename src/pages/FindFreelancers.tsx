
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

// Sample freelancers data
const freelancers = [
  {
    id: 1,
    name: "Nicolas Dupont",
    title: "Développeur Full Stack",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "45€/h",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    location: "Paris, France",
    bio: "Développeur full stack avec 8 ans d'expérience dans la création d'applications web et mobiles. Spécialisé dans React, Node.js et les architectures cloud. Approche orientée solution pour délivrer des produits de qualité."
  },
  {
    id: 2,
    name: "Julie Martin",
    title: "Designer UI/UX",
    rating: 4.8,
    reviews: 32,
    hourlyRate: "40€/h",
    skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping"],
    location: "Lyon, France",
    bio: "Designer UI/UX créative avec une passion pour la création d'expériences utilisateur intuitives et esthétiques. Experte en design d'interfaces, wireframing et prototypage."
  },
  {
    id: 3,
    name: "Thomas Leroy",
    title: "Expert en Marketing Digital",
    rating: 4.7,
    reviews: 29,
    hourlyRate: "55€/h",
    skills: ["SEO", "Google Ads", "Analytics", "Content Marketing"],
    location: "Bordeaux, France",
    bio: "Stratège marketing digital avec plus de 10 ans d'expérience. Spécialiste en SEO, publicité en ligne et analytique. Approche basée sur les données pour maximiser le ROI."
  },
  {
    id: 4,
    name: "Sophie Dubois",
    title: "Rédactrice Web SEO",
    rating: 4.9,
    reviews: 51,
    hourlyRate: "35€/h",
    skills: ["Copywriting", "SEO", "Content Strategy", "Blog Writing"],
    location: "Nantes, France",
    bio: "Rédactrice web avec une expertise en SEO et stratégie de contenu. Création de contenus engageants et optimisés pour le web. Plus de 1000 articles publiés pour divers secteurs."
  },
  {
    id: 5,
    name: "Alexandre Moreau",
    title: "Développeur Mobile",
    rating: 4.8,
    reviews: 24,
    hourlyRate: "50€/h",
    skills: ["iOS", "Android", "React Native", "Flutter"],
    location: "Lille, France",
    bio: "Développeur mobile passionné avec une expertise en développement iOS et Android. Création d'applications mobiles performantes et intuitives pour startups et grandes entreprises."
  },
  {
    id: 6,
    name: "Camille Petit",
    title: "Spécialiste WordPress",
    rating: 4.6,
    reviews: 38,
    hourlyRate: "38€/h",
    skills: ["WordPress", "PHP", "CSS", "WooCommerce"],
    location: "Toulouse, France",
    bio: "Experte WordPress avec une spécialisation dans la création de sites e-commerce et de blogs. Personnalisation avancée, développement de thèmes et plugins."
  }
];

// Categories and skills for filters
const domains = [
  { id: "programming", name: "Programmation", count: 234 },
  { id: "design", name: "Design", count: 156 },
  { id: "writing", name: "Rédaction", count: 112 },
  { id: "marketing", name: "Marketing", count: 98 },
  { id: "business", name: "Services et conseils", count: 76 },
  { id: "engineering", name: "Ingénierie", count: 54 },
  { id: "support", name: "Support", count: 47 },
  { id: "training", name: "Formation", count: 29 },
];

const skills = [
  { id: "react", name: "React", count: 124 },
  { id: "node", name: "Node.js", count: 109 },
  { id: "javascript", name: "JavaScript", count: 186 },
  { id: "python", name: "Python", count: 134 },
  { id: "design", name: "Design UI/UX", count: 96 },
  { id: "php", name: "PHP", count: 85 },
  { id: "wordpress", name: "WordPress", count: 79 },
  { id: "seo", name: "SEO", count: 73 },
  { id: "writing", name: "Rédaction web", count: 68 },
  { id: "mobile", name: "Développement mobile", count: 62 },
];

const languages = [
  { id: "french", name: "Français", count: 378 },
  { id: "english", name: "Anglais", count: 312 },
  { id: "spanish", name: "Espagnol", count: 87 },
  { id: "german", name: "Allemand", count: 56 },
  { id: "italian", name: "Italien", count: 41 },
  { id: "portuguese", name: "Portugais", count: 32 },
  { id: "arabic", name: "Arabe", count: 23 },
  { id: "chinese", name: "Chinois", count: 18 },
];

const FindFreelancers = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleDomain = (domainId: string) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter(id => id !== domainId));
    } else {
      setSelectedDomains([...selectedDomains, domainId]);
    }
  };

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const toggleLanguage = (languageId: string) => {
    if (selectedLanguages.includes(languageId)) {
      setSelectedLanguages(selectedLanguages.filter(id => id !== languageId));
    } else {
      setSelectedLanguages([...selectedLanguages, languageId]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Trouver des freelances</h1>
        <p className="text-gray-600 mt-2">
          Découvrez des professionnels talentueux pour vous aider dans vos projets
        </p>
      </header>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Rechercher des freelances par compétence ou titre..."
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
              <Select defaultValue="rating">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Évaluation</SelectItem>
                  <SelectItem value="reviews">Nombre d'avis</SelectItem>
                  <SelectItem value="rate-low">Tarif (bas-élevé)</SelectItem>
                  <SelectItem value="rate-high">Tarif (élevé-bas)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Domains Filter */}
            <Accordion type="multiple" defaultValue={["domains"]}>
              <AccordionItem value="domains">
                <AccordionTrigger className="text-lg font-semibold py-2">Domaines</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {domains.map((domain) => (
                      <div key={domain.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`domain-${domain.id}`}
                          checked={selectedDomains.includes(domain.id)}
                          onChange={() => toggleDomain(domain.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`domain-${domain.id}`} className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>{domain.name}</span>
                          <span className="text-gray-500">({domain.count})</span>
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

            {/* Rate Range Filter */}
            <Accordion type="multiple" defaultValue={["rate"]}>
              <AccordionItem value="rate">
                <AccordionTrigger className="text-lg font-semibold py-2">Tarif horaire</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="min-rate" className="block text-sm font-medium text-gray-700 mb-1">
                          Min (€/h)
                        </label>
                        <Input
                          type="number"
                          id="min-rate"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div>
                        <label htmlFor="max-rate" className="block text-sm font-medium text-gray-700 mb-1">
                          Max (€/h)
                        </label>
                        <Input
                          type="number"
                          id="max-rate"
                          placeholder="200"
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

            {/* Languages Filter */}
            <Accordion type="multiple">
              <AccordionItem value="languages">
                <AccordionTrigger className="text-lg font-semibold py-2">Langues</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {languages.map((language) => (
                      <div key={language.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`language-${language.id}`}
                          checked={selectedLanguages.includes(language.id)}
                          onChange={() => toggleLanguage(language.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`language-${language.id}`} className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>{language.name}</span>
                          <span className="text-gray-500">({language.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Location Filter */}
            <Accordion type="multiple">
              <AccordionItem value="location">
                <AccordionTrigger className="text-lg font-semibold py-2">Localisation</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Rechercher une ville ou un pays"
                      className="w-full"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="location-france"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-france" className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>France</span>
                          <span className="text-gray-500">(243)</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="location-belgium"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-belgium" className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>Belgique</span>
                          <span className="text-gray-500">(78)</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="location-switzerland"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-switzerland" className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>Suisse</span>
                          <span className="text-gray-500">(56)</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="location-canada"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-canada" className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>Canada</span>
                          <span className="text-gray-500">(42)</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="location-remote"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-remote" className="ml-2 flex items-center justify-between w-full text-sm">
                          <span>Télétravail uniquement</span>
                          <span className="text-gray-500">(165)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button className="w-full">Appliquer les filtres</Button>
          </div>
        </div>

        {/* Freelancer Listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">Affichage de {freelancers.length} freelances</p>
            <Select defaultValue="rating">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="rating">Évaluation</SelectItem>
                <SelectItem value="rate-low">Tarif (bas-élevé)</SelectItem>
                <SelectItem value="rate-high">Tarif (élevé-bas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Freelancers List */}
          <div className="space-y-6">
            {freelancers.map((freelancer) => (
              <div key={freelancer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="sm:flex items-start">
                    <div className="mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?u=${freelancer.id}`}
                          alt={freelancer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <Link to={`/freelancers/${freelancer.id}`} className="text-xl font-bold hover:text-primary transition-colors">
                          {freelancer.name}
                        </Link>
                        <div className="text-lg font-semibold text-primary mt-1 sm:mt-0">
                          {freelancer.hourlyRate}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <h3 className="text-gray-700 font-medium">{freelancer.title}</h3>
                        <div className="flex items-center text-sm mt-1">
                          <div className="flex items-center text-amber-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                            <span className="ml-1 font-medium">{freelancer.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500">{freelancer.reviews} avis</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500">{freelancer.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{freelancer.bio}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link to={`/freelancers/${freelancer.id}`}>
                        Voir le profil
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

export default FindFreelancers;
