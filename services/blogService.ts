
import { supabase } from './supabaseClient';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image_url: string;
  category: string;
  read_time: string;
  created_at: string;
}

export const STATIC_REPORTS: BlogPost[] = [
  {
    id: 301,
    title: "Les Fondements de LAMUKA : Statuts et Règlement Intérieur",
    excerpt: "Adoptés en mai 2024, ces documents définissent notre cadre d'action pour la défense des droits des femmes handicapées.",
    content: `
      <h3>Une Structure Solide pour un Impact Réel</h3>
      <p>Le 4 mai 2024, lors de l'Assemblée Générale Constitutive à Brazzaville, le Collectif LAMUKA a officiellement adopté ses textes fondamentaux. Ces documents régissent notre fonctionnement et garantissent la transparence de nos actions.</p>
      
      <h4>Organisation et Gouvernance</h4>
      <p>Le Collectif est structuré autour de quatre organes clés :</p>
      <ul>
        <li><b>L'Assemblée Générale (AG) :</b> Instance suprême de décision.</li>
        <li><b>Le Conseil National (CN) :</b> Organe de décision entre les sessions de l'AG.</li>
        <li><b>Le Bureau Exécutif National (BEN) :</b> Organe d'exécution dirigé par la Présidente LOUZLO MASSANGHA Gustavine.</li>
        <li><b>La Commission de Suivi et Évaluation (CSE) :</b> Chargée du contrôle et de la transparence.</li>
      </ul>

      <h3>Nos Engagements Statutaires</h3>
      <p>Conformément à l'Article 4 de nos statuts, nos objectifs sont centrés sur trois piliers :</p>
      <ul>
        <li>Promouvoir l’inclusion sociale et économique de la femme vivant avec handicap.</li>
        <li>Promouvoir la lutte contre les violences basées sur le genre (VBG).</li>
        <li>Œuvrer pour l’éducation et la sensibilisation sur la santé sexuelle et de la reproduction (SS/SR).</li>
      </ul>
      <p>Notre devise, « Solidarité – Justice et Développement », guide chaque membre dans son devoir de respecter le patrimoine et les documents fondamentaux de l'organisation.</p>
    `,
    date: "04 Mai 2024",
    author: "NDAMBA Paul",
    image_url: "https://images2.imgbox.com/0f/ef/WaPp5wTw_o.jpg",
    category: "Institutionnel",
    read_time: "5 min",
    created_at: "2024-05-04T09:00:00Z"
  },
  {
    id: 201,
    title: "Rapport d'activités du 4ème Trimestre 2025 : Brazzaville en Action",
    excerpt: "Bilan des mois d'octobre à décembre 2025 : Plaidoyer international, santé reproductive et clôture annuelle.",
    content: `
      <h3>Octobre 2025 : Plaidoyer et Inclusion</h3>
      <p>Le trimestre a débuté le 1er octobre par une participation à la causerie débat de l'Association Congolaise de Droit et Santé au siège de l'UNFPA. La Présidente a plaidé pour l'inclusion des jeunes filles handicapées dans les programmes de santé reproductive.</p>
      
      <h4>Décembre 2025 : Visibilité et Action Sociale</h4>
      <p>Le 3 décembre, lors de la Journée Internationale des Personnes Handicapées, le collectif a participé à l'émission « Mwasi ya nsomi » (DRTV).</p>
      <p>La revue annuelle du programme EPAD 2025 (UNICEF-Gouvernement) a permis d'évaluer le Plan de Travail Conjoint 2025-2026. Monsieur N’KOMBO Adlon Maurose, Secrétaire Général, y a représenté LAMUKA.</p>
    `,
    date: "31 Déc. 2025",
    author: "NDAMBA Paul",
    image_url: "https://images2.imgbox.com/58/64/spiZWNSY_o.jpeg",
    category: "Rapport",
    read_time: "12 min",
    created_at: "2025-12-31T18:00:00Z"
  },
  {
    id: 203,
    title: "Résilience Collective : Rapport du 3ème Trimestre 2025",
    excerpt: "Juillet à Septembre 2025 : Dialogue intergénérationnel, Mbongui de la femme africaine et diagnostic organisationnel.",
    content: `
      <h3>Juillet 2025 : Résilience et Formation</h3>
      <p>Le 12 juillet, participation au dialogue intergénérationnel entre féministes pour définir une stratégie contre les VBG. Fin juillet, participation au Mbongui de la Femme Africaine avec une inclusion inédite : des interprètes en langue des signes.</p>
      
      <h3>Septembre 2025 : Plaidoyer et Justice</h3>
      <p>Le 6 septembre, participation à la simulation de procès sur les VBG à l'université Henri Lopes. Monsieur N’KOMBO Adlon Maurose (SG) et Monsieur NDAMBA Paul (Études) ont assuré le suivi technique de ces dossiers.</p>
    `,
    date: "30 Sept. 2025",
    author: "NDAMBA Paul",
    image_url: "https://images2.imgbox.com/53/e9/ktmKlPmB_o.jpg",
    category: "Plaidoyer",
    read_time: "10 min",
    created_at: "2025-09-30T10:00:00Z"
  }
];

export const fetchAllPosts = async (): Promise<BlogPost[]> => {
  let dbPosts: BlogPost[] = [];
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      dbPosts = data.map((post: any) => ({
        ...post,
        date: new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
      }));
    }
  } catch (e) {
    console.warn("Supabase fetch error, blending with static data", e);
  }
  
  const combined = [...dbPosts, ...STATIC_REPORTS];
  return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};
