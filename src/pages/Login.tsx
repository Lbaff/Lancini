
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Lancini",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Échec de la connexion",
        description: "Veuillez vérifier vos identifiants et réessayer",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Se connecter à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{" "}
          <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
            créez un nouveau compte
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.794-1.661-4.181-2.673-6.735-2.673-5.522 0-10 4.478-10 10s4.478 10 10 10c8.321 0 10-7.841 10-13c0-0.538-0.053-1.053-0.157-1.554z" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0.4c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6zM9.583 7.050c-0.333 0.153-0.7 0.228-1.092 0.228h-1.509v5.325h-1.695v-5.325h-0.814v-1.363h0.814v-0.881c0-0.676 0.162-1.184 0.483-1.527 0.322-0.343 0.851-0.514 1.591-0.514h1.509v1.363h-0.942c-0.351 0-0.587 0.059-0.705 0.173-0.119 0.116-0.176 0.301-0.176 0.569v0.815h1.823l-0.215 1.361h-1.606c0.406 0 0.754-0.085 1.054-0.254 0.349-0.197 0.631-0.494 0.84-0.891 0.21-0.398 0.316-0.87 0.316-1.416 0-0.763-0.254-1.369-0.765-1.816-0.509-0.446-1.193-0.67-2.046-0.67-0.891 0-1.588 0.26-2.089 0.777-0.504 0.519-0.754 1.218-0.754 2.094 0 0.872 0.23 1.565 0.691 2.077 0.461 0.513 1.105 0.769 1.927 0.769 0.982 0 1.704-0.39 2.162-1.169l0.672 1.006c-0.741 0.933-1.764 1.398-3.071 1.398-1.269 0-2.276-0.374-3.025-1.122-0.749-0.748-1.123-1.756-1.123-3.022 0-1.266 0.381-2.274 1.14-3.022 0.762-0.75 1.775-1.123 3.043-1.123 1.138 0 2.052 0.284 2.741 0.852 0.689 0.568 1.035 1.341 1.035 2.319 0 0.812-0.221 1.513-0.658 2.097-0.437 0.585-1.066 1.008-1.888 1.271zM15.115 8.402c0 0.788-0.182 1.45-0.549 1.988-0.368 0.539-0.857 0.95-1.471 1.234-0.613 0.285-1.314 0.426-2.106 0.426-0.34 0-0.658-0.024-0.953-0.071v-5.626h1.459v4.307c0.169 0.023 0.365 0.035 0.582 0.035 0.542 0 0.973-0.176 1.292-0.529 0.32-0.353 0.48-0.795 0.48-1.324 0-0.528-0.155-0.935-0.464-1.219-0.31-0.284-0.71-0.426-1.2-0.426-0.682 0-1.221 0.287-1.623 0.862l-1.183-0.932c0.646-0.92 1.586-1.381 2.823-1.381 0.946 0 1.68 0.235 2.205 0.706 0.524 0.469 0.786 1.148 0.786 2.031z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
