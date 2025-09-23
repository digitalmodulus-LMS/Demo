import React from 'react';
import { Role } from '../types';
import Button from '../components/common/Button';
import { modulusLogo } from '../assets/logo';

interface LoginPageProps {
  onLogin: (role: Role) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <img src={modulusLogo} alt="Modulus Academy Logo" className="h-40 w-auto mx-auto" />
          <p className="mt-4 text-lg text-gray-300">L'avenir de la formation, propulsé par l'IA.</p>
        </div>
        
        <div className="bg-gray-800 shadow-xl rounded-lg p-8 space-y-6">
          <h2 className="text-xl font-semibold text-center text-white">Sélectionnez votre rôle (Démo)</h2>
          <div className="flex flex-col space-y-4">
            <Button size="lg" onClick={() => onLogin(Role.Learner)}>
              Se connecter en tant qu'Apprenant
            </Button>
            <Button size="lg" onClick={() => onLogin(Role.Trainer)} variant="secondary">
              Se connecter en tant que Formateur
            </Button>
            <Button size="lg" onClick={() => onLogin(Role.Admin)} variant="secondary">
              Se connecter en tant qu'Admin
            </Button>
          </div>
          <p className="text-center text-xs text-gray-400 pt-4">Ceci est une connexion simulée pour la démonstration. Aucune information d'identification n'est requise.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
