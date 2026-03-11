
import React from 'react';
import { Lock, Eye, Database, UserCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-pink-100 p-3 rounded-2xl">
              <Lock className="w-8 h-8 text-pink-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">Politique de Confidentialité</h1>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed">
            <p className="text-lg">
              Le Collectif LAMUKA accorde une importance primordiale à la protection de votre vie privée et de vos données personnelles. Cette politique détaille comment nous traitons les informations collectées sur notre site.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-pink-600" /> 1. Données collectées
              </h2>
              <p>
                Nous collectons des informations lorsque vous utilisez notre formulaire de contact :
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Contenu de votre message</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-pink-600" /> 2. Utilisation des données
              </h2>
              <p>
                Les informations que nous recueillons sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Répondre à vos demandes de soutien ou de renseignements.</li>
                <li>Améliorer l'expérience utilisateur sur notre site.</li>
              </ul>
              <p className="mt-4 font-semibold text-pink-700">
                Vos données ne sont jamais vendues, louées ou cédées à des tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-pink-600" /> 3. Vos droits
              </h2>
              <p>
                Conformément aux principes de protection des données, vous disposez des droits suivants concernant vos informations :
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li><strong>Droit d'accès :</strong> vous pouvez demander une copie de vos données.</li>
                <li><strong>Droit de rectification :</strong> vous pouvez demander la correction de données inexactes.</li>
                <li><strong>Droit à l'effacement :</strong> vous pouvez demander la suppression de vos informations de nos fichiers.</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à l'adresse : <strong>collectiflamuka2025@gmail.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cookies</h2>
              <p>
                Notre site utilise des cookies techniques essentiels au bon fonctionnement de la navigation. Ces cookies ne collectent aucune donnée à votre insu.
              </p>
            </section>

            <section className="pt-10 border-t border-slate-100 text-center">
              <p className="text-sm font-medium">
                En utilisant ce site, vous acceptez la présente politique de confidentialité.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
