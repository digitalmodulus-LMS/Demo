import React, { useState } from 'react';
import { generateAdvancedCourseContent } from '../../services/geminiService';
import type { NeedsAssessment, ContentParameters, GeneratedContent } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Spinner from '../common/Spinner';
import { SparklesIcon, ExportIcon } from '../icons/IconComponents';

type WizardStep = 'NEEDS_ASSESSMENT' | 'CONTENT_PARAMS' | 'GENERATING' | 'REVIEW';

const CourseCreatorWizard: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [step, setStep] = useState<WizardStep>('NEEDS_ASSESSMENT');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [needs, setNeeds] = useState<NeedsAssessment>({
        targetAudience: { age: '', sector: '', experience: 'Débutant' },
        learningObjectives: '',
        perceivedDifficulties: '',
    });

    const [params, setParams] = useState<ContentParameters>({
        contentType: 'text',
        courseType: 'one-shot',
        refinementPrompt: '',
    });

    const [generatedContent, setGeneratedContent] = useState<Omit<GeneratedContent, 'id' | 'generatedOn'> | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setStep('GENERATING');
        try {
            const result = await generateAdvancedCourseContent(needs, params);
            setGeneratedContent(result);
            setStep('REVIEW');
        } catch (e: any) {
            setError(e.message);
            setStep('CONTENT_PARAMS'); // Go back to the form on error
        } finally {
            setIsLoading(false);
        }
    };

    const renderNeedsStep = () => (
        <Card title="Étape 1: Analyse des Besoins Pédagogiques">
            <p className="text-gray-400 mb-6">Définissez précisément votre public et vos objectifs pour un contenu sur-mesure.</p>
            <div className="space-y-4">
                <Input label="Secteur d'activité" value={needs.targetAudience.sector} onChange={e => setNeeds({...needs, targetAudience: {...needs.targetAudience, sector: e.target.value}})} placeholder="Ex: Commerce, Santé, IT..." />
                <Input label="Tranche d'âge" value={needs.targetAudience.age} onChange={e => setNeeds({...needs, targetAudience: {...needs.targetAudience, age: e.target.value}})} placeholder="Ex: 25-35 ans" />
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Niveau d'expérience</label>
                    <select value={needs.targetAudience.experience} onChange={e => setNeeds({...needs, targetAudience: {...needs.targetAudience, experience: e.target.value}})} className="block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white">
                        <option>Débutant</option>
                        <option>Intermédiaire</option>
                        <option>Confirmé</option>
                        <option>Expert</option>
                    </select>
                </div>
                <Input label="Objectifs Pédagogiques" value={needs.learningObjectives} onChange={e => setNeeds({...needs, learningObjectives: e.target.value})} placeholder="À la fin, l'apprenant sera capable de..." />
                <Input label="Difficultés perçues" value={needs.perceivedDifficulties} onChange={e => setNeeds({...needs, perceivedDifficulties: e.target.value})} placeholder="Ex: Jargon technique, concepts abstraits..." />
                <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep('CONTENT_PARAMS')}>Étape Suivante &rarr;</Button>
                </div>
            </div>
        </Card>
    );

    const renderParamsStep = () => (
         <Card title="Étape 2: Paramètres du Contenu">
            <p className="text-gray-400 mb-6">Choisissez le format final et ajoutez une touche personnelle pour guider l'IA.</p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type de contenu final</label>
                    <select value={params.contentType} onChange={e => setParams({...params, contentType: e.target.value as ContentParameters['contentType']})} className="block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white">
                        <option value="text">Texte Pédagogique</option>
                        <option value="quiz">Quiz Interactif</option>
                        <option value="storytelling">Storytelling / Scénario</option>
                        <option value="roleplay">Jeu de Rôle / Simulation</option>
                        <option value="video_script">Script de Capsule Vidéo</option>
                        <option value="ppt_outline">Plan de présentation (PPT)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type de parcours</label>
                    <select value={params.courseType} onChange={e => setParams({...params, courseType: e.target.value as ContentParameters['courseType']})} className="block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white">
                        <option value="one-shot">Session unique (One-shot)</option>
                        <option value="multi-session">Plan de formation multi-sessions</option>
                    </select>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Champ libre "Finition" (Optionnel)</label>
                    <textarea value={params.refinementPrompt} onChange={e => setParams({...params, refinementPrompt: e.target.value})} rows={4} className="block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white" placeholder="Insister sur un ton humoristique, ajouter des exemples concrets, etc." />
                </div>
                 {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="flex justify-between items-center pt-4">
                    <Button variant="secondary" onClick={() => setStep('NEEDS_ASSESSMENT')}>&larr; Précédent</Button>
                    <Button onClick={handleGenerate} isLoading={isLoading}>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Générer le Contenu
                    </Button>
                </div>
            </div>
        </Card>
    );
    
    const renderGeneratingStep = () => (
        <div className="text-center py-20">
            <Spinner message="L'IA pédagogique est en pleine création..." />
            <p className="mt-4 text-gray-400">Cela peut prendre quelques instants.</p>
        </div>
    );

    const renderReviewStep = () => (
        <Card title="Étape 3: Vérification et Export">
             <div className="prose prose-invert max-w-none bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h2 className="text-neon-green">{generatedContent?.title}</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{generatedContent?.content}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-between items-center">
                 <div className="flex gap-4">
                    <Button variant="secondary"><ExportIcon className="w-5 h-5 mr-2"/>Exporter en PDF</Button>
                    <Button variant="secondary">Exporter en PPT</Button>
                </div>
                <Button onClick={onFinish}>Terminer & Sauvegarder</Button>
            </div>
        </Card>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Assistant de Création Pédagogique IA</h1>
            <p className="text-gray-400 mb-8">Créez des formations percutantes en quelques clics.</p>
            {step === 'NEEDS_ASSESSMENT' && renderNeedsStep()}
            {step === 'CONTENT_PARAMS' && renderParamsStep()}
            {step === 'GENERATING' && renderGeneratingStep()}
            {step === 'REVIEW' && renderReviewStep()}
        </div>
    );
};

export default CourseCreatorWizard;
