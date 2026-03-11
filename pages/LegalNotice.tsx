
import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const LegalNotice: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-pink-100 p-3 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-pink-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">Mentions Légales</h1>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-pink-600" /> 1. Édition du site
              </h2>
              <p>
                Le présent site internet est édité par le <strong>Collectif LAMUKA</strong>, association à but non lucratif régie par la loi du 1er Juillet 1901.
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>Siège social :</strong> 20, rue KIPOUANDZA, Mfilou-NGAMABA, Brazzaville, République du Congo.</li>
                <li><strong>Téléphone :</strong> +242 06 920 60 58 / 06 852 65 55</li>
                <li><strong>Email :</strong> collectiflamuka2025@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Direction de la publication</h2>
              <p>
                La directrice de la publication du site est <strong>Madame LOUZOLO Gustavine</strong>, en sa qualité de Présidente du Collectif LAMUKA.
                Le responsable de la rédaction est <strong>Monsieur Paul NDAMBA</strong>, Secrétaire Général.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Hébergement</h2>
              <p>
                Ce site est hébergé sur des infrastructures cloud sécurisées garantissant une disponibilité optimale et une protection des données.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive du Collectif LAMUKA, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
              </p>
              <p className="mt-4">
                Le logo de LAMUKA représentant une femme en situation de handicap au pilon est un symbole déposé et protégé.
              </p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <p className="text-sm italic">
                Dernière mise à jour : Mai 2024. Ces mentions sont susceptibles d'être modifiées à tout moment pour se conformer aux évolutions législatives.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
