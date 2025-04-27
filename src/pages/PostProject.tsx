
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  { id: "programming", name: "Programmation", subcategories: [
    "Développement Web", "Développement Mobile", "Développement Logiciel", "WordPress", "E-commerce", "Bases de données"
  ]},
  { id: "design", name: "Design", subcategories: [
    "Design Graphique", "UI/UX Design", "Logo & Identité", "Design de Produit", "Animation", "Illustration"
  ]},
  { id: "writing", name: "Rédaction", subcategories: [
    "Rédaction Web", "Copywriting", "Traduction", "Relecture", "SEO", "Transcription"
  ]},
  { id: "marketing", name: "Marketing", subcategories: [
    "Marketing Digital", "SEO/SEM", "Réseaux Sociaux", "Publicité", "Marketing de Contenu", "Email Marketing"
  ]},
  { id: "business", name: "Services et conseils", subcategories: [
    "Conseil Financier", "Conseil Juridique", "Ressources Humaines", "Stratégie d'Entreprise", "Analyse de Données", "Comptabilité"
  ]},
  { id: "engineering", name: "Ingénierie", subcategories: [
    "Ingénierie Mécanique", "Ingénierie Civile", "Ingénierie Électrique", "Architecture", "Modélisation 3D", "CAO"
  ]},
];

const skills = [
  "HTML/CSS", "JavaScript", "React", "Angular", "Vue.js", "Node.js", "Python", "Django", "PHP", "Laravel", 
  "Ruby on Rails", "Java", "C#", ".NET", "Swift", "Kotlin", "WordPress", "Shopify", "Figma", "Adobe XD", 
  "Adobe Photoshop", "Adobe Illustrator", "SEO", "Google Ads", "Facebook Ads", "Content Marketing", "Email Marketing",
  "UX Design", "UI Design", "Rédaction web", "Traduction", "Copywriting", "Data Analysis", "Machine Learning"
];

const PostProject = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const selectedCategory = categories.find(c => c.id === category);
    return selectedCategory ? selectedCategory.subcategories : [];
  };

  // Handle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      if (selectedSkills.length < 10) {
        setSelectedSkills([...selectedSkills, skill]);
      } else {
        toast({
          title: "Maximum 10 compétences",
          description: "Vous ne pouvez sélectionner que 10 compétences maximum.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length <= 5) {
        setAttachments([...attachments, ...newFiles]);
      } else {
        toast({
          title: "Maximum 5 fichiers",
          description: "Vous ne pouvez télécharger que 5 fichiers maximum.",
          variant: "destructive",
        });
      }
    }
  };

  // Remove a file
  const removeFile = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !subcategory || selectedSkills.length === 0 || !budgetMin || !budgetMax || !deadline) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // This is where you would typically make an API call to save the project
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Projet publié !",
        description: "Votre projet a été publié avec succès.",
      });

      // Redirect to projects page or dashboard
      navigate("/browse-projects");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la publication du projet. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Publier un nouveau projet</h1>
        <p className="text-gray-600 mt-2">
          Décrivez votre projet en détail pour attirer les freelances les plus qualifiés
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Titre du projet <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              placeholder="Ex: Développement d'un site e-commerce responsive"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="text-base p-3"
            />
            <p className="text-sm text-gray-500">Choisissez un titre clair et descriptif (100 caractères max.)</p>
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Description du projet <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités, résultats attendus..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="text-base p-3 resize-y"
            />
            <p className="text-sm text-gray-500">Soyez précis et détaillé pour attirer les freelances adaptés à votre projet.</p>
          </div>

          {/* Project Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base">Catégorie <span className="text-red-500">*</span></Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcategory" className="text-base">Sous-catégorie <span className="text-red-500">*</span></Label>
              <Select
                value={subcategory}
                onValueChange={setSubcategory}
                disabled={!category}
              >
                <SelectTrigger id="subcategory">
                  <SelectValue placeholder={category ? "Sélectionner une sous-catégorie" : "Sélectionnez d'abord une catégorie"} />
                </SelectTrigger>
                <SelectContent>
                  {getSubcategories().map((subcat) => (
                    <SelectItem key={subcat} value={subcat}>
                      {subcat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <Label className="text-base">Compétences requises <span className="text-red-500">*</span></Label>
            <p className="text-sm text-gray-500 mb-2">Sélectionnez jusqu'à 10 compétences pertinentes pour votre projet</p>
            
            <div className="border rounded-md p-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="ml-1.5 text-primary hover:text-primary-dark focus:outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
                {selectedSkills.length === 0 && (
                  <div className="text-sm text-gray-500 italic">Aucune compétence sélectionnée</div>
                )}
              </div>
              
              <div className="border-t pt-3">
                <div className="text-sm font-medium mb-2">Compétences disponibles</div>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(skill => !selectedSkills.includes(skill)).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="text-base">Budget estimé (€) <span className="text-red-500">*</span></Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  placeholder="Minimum"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  className="text-base p-3"
                  min="0"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Maximum"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  className="text-base p-3"
                  min={budgetMin || "0"}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">Définissez une fourchette de budget réaliste pour votre projet</p>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-base">Délai de livraison estimé <span className="text-red-500">*</span></Label>
            <Select value={deadline} onValueChange={setDeadline}>
              <SelectTrigger id="deadline">
                <SelectValue placeholder="Sélectionner un délai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Moins de 24 heures</SelectItem>
                <SelectItem value="3d">1-3 jours</SelectItem>
                <SelectItem value="1w">3-7 jours</SelectItem>
                <SelectItem value="2w">1-2 semaines</SelectItem>
                <SelectItem value="1m">2-4 semaines</SelectItem>
                <SelectItem value="3m">1-3 mois</SelectItem>
                <SelectItem value="more">Plus de 3 mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label className="text-base">Pièces jointes (optionnel)</Label>
            <div className="border rounded-md p-3">
              <div className="mb-3">
                <Input
                  type="file"
                  id="attachments"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="attachments"
                  className="flex items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      Cliquez pour télécharger des fichiers ou glissez-déposez
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, PDF jusqu'à 10MB (max. 5 fichiers)
                    </p>
                  </div>
                </Label>
              </div>
              
              {attachments.length > 0 && (
                <div className="border-t pt-3">
                  <div className="text-sm font-medium mb-2">Fichiers téléchargés ({attachments.length}/5)</div>
                  <ul className="space-y-2">
                    {attachments.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          <span className="text-sm truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">Téléchargez des fichiers pertinents pour aider les freelances à comprendre votre projet</p>
          </div>

          {/* Project Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Confidentialité du projet</CardTitle>
              <CardDescription>Déterminez qui peut voir et postuler à votre projet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="public"
                      checked={!isPrivate}
                      onChange={() => setIsPrivate(false)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="public" className="ml-2 block text-sm font-medium text-gray-700">
                      Projet public
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 ml-6">
                    Tous les freelances peuvent voir votre projet et y postuler
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="private"
                      checked={isPrivate}
                      onChange={() => setIsPrivate(true)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="private" className="ml-2 block text-sm font-medium text-gray-700">
                      Projet privé
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 ml-6">
                    Seuls les freelances que vous invitez peuvent voir et postuler
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
              <Button 
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publication en cours...
                  </>
                ) : (
                  "Publier le projet"
                )}
              </Button>
            </div>

            {!user && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Vous n'êtes pas connecté. Vous serez redirigé vers la page de connexion après avoir soumis ce formulaire.
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostProject;
