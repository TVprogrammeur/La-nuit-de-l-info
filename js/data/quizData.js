// js/data/quizData.js

// Îles du Village Techno Durable
export const islands = [
    {
        id: "hardware_reuse",
        name: "Île du Matériel Réincarné",
        short: "Réparer, réutiliser, prolonger la vie des machines.",
        description:
            "Tu vois dans chaque machine un potentiel caché. Tu sais diagnostiquer, réparer ou réemployer du matériel pour éviter qu’il finisse à la poubelle."
    },
    {
        id: "free_software_autonomy",
        name: "Île du Libre & de l’Autonomie",
        short: "Logiciels libres, souveraineté numérique, échapper aux Big Tech.",
        description:
            "Tu cherches des alternatives libres, ouvertes et auto-hébergeables pour redonner du contrôle aux personnes et aux établissements sur leurs outils."
    },
    {
        id: "digital_sobriety",
        name: "Île de la Sobriété Numérique",
        short: "Usage raisonné des ressources numériques.",
        description:
            "Tu optimises stockage, bande passante et puissance de calcul. Tu veux un numérique qui consomme moins, mais sert mieux les besoins réels."
    },
    {
        id: "education_community",
        name: "Île des Passeurs & Pédagogues",
        short: "Transmission, vulgarisation, animation.",
        description:
            "Tu aimes expliquer, rassurer, embarquer les autres. Pour toi, un projet n’a de sens que s’il fait grandir une communauté."
    }
];

// Compétences du Village Techno
export const competences = [
    {
        id: "repair_hardware",
        label: "Réparer / remettre en état du matériel (PC, laptop, etc.)",
        weightsPerLevel: {
            1: { hardware_reuse: 0 },
            2: { hardware_reuse: 1 },
            3: { hardware_reuse: 2 },
            4: { hardware_reuse: 3 },
            5: { hardware_reuse: 4 }
        }
    },
    {
        id: "install_free_software",
        label: "Installer / configurer des logiciels libres (Linux, services open source…)",
        weightsPerLevel: {
            1: { free_software_autonomy: 0 },
            2: { free_software_autonomy: 1 },
            3: { free_software_autonomy: 2 },
            4: { free_software_autonomy: 3 },
            5: { free_software_autonomy: 4 }
        }
    },
    {
        id: "optimize_storage_bandwidth",
        label: "Optimiser stockage, sauvegardes, bande passante, streaming, etc.",
        weightsPerLevel: {
            1: { digital_sobriety: 0 },
            2: { digital_sobriety: 1 },
            3: { digital_sobriety: 2 },
            4: { digital_sobriety: 3 },
            5: { digital_sobriety: 4 }
        }
    },
    {
        id: "animate_workshops",
        label: "Animer / co-animer un atelier ou une séance de sensibilisation",
        weightsPerLevel: {
            1: { education_community: 0 },
            2: { education_community: 1 },
            3: { education_community: 2 },
            4: { education_community: 3 },
            5: { education_community: 4 }
        }
    },
    {
        id: "explain_to_non_tech",
        label: "Expliquer des notions techniques à des publics non techniques",
        weightsPerLevel: {
            1: { education_community: 0 },
            2: { education_community: 1 },
            3: { education_community: 2 },
            4: { education_community: 3 },
            5: { education_community: 4 }
        }
    },

    // Anciennement orienté “pilotage de projets”, rattaché maintenant aux passeurs / pédagogues
    {
        id: "project_planning",
        label: "Planifier un projet (objectifs, étapes, responsabilités, planning)",
        weightsPerLevel: {
            1: { education_community: 0 },
            2: { education_community: 1 },
            3: { education_community: 2 },
            4: { education_community: 3 },
            5: { education_community: 4 }
        }
    },
    {
        id: "coordinate_team",
        label: "Coordonner une petite équipe (répartition des tâches, suivi)",
        weightsPerLevel: {
            1: { education_community: 0 },
            2: { education_community: 1 },
            3: { education_community: 2 },
            4: { education_community: 3 },
            5: { education_community: 4 }
        }
    },

    {
        id: "reuse_old_devices",
        label: "Imaginer des réemplois de vieux appareils (PC, tablettes…) dans l’établissement",
        weightsPerLevel: {
            1: { hardware_reuse: 0 },
            2: { hardware_reuse: 1, digital_sobriety: 1 },
            3: { hardware_reuse: 2, digital_sobriety: 1 },
            4: { hardware_reuse: 3, digital_sobriety: 2 },
            5: { hardware_reuse: 4, digital_sobriety: 3 }
        }
    },

    // Ancien promote_nird → même id (pour ne rien casser), texte Village Techno
    {
        id: "promote_nird",
        label: "Communiquer / présenter la démarche du Village Techno (affiches, posts, présentations…)",
        weightsPerLevel: {
            1: { education_community: 0 },
            2: { education_community: 1 },
            3: { education_community: 2 },
            4: { education_community: 3 },
            5: { education_community: 4 }
        }
    },

    // Orientation politique numérique → rattachée à la sobriété
    {
        id: "design_digital_policy",
        label: "Participer à la réflexion sur une politique numérique durable de l'établissement",
        weightsPerLevel: {
            1: { digital_sobriety: 0 },
            2: { digital_sobriety: 1 },
            3: { digital_sobriety: 1 },
            4: { digital_sobriety: 2 },
            5: { digital_sobriety: 3 }
        }
    }
];

// Conversion des compétences en questions (1..5)
export const questions = competences.map((comp) => ({
    id: comp.id,
    text: comp.label,
    choices: [
        { id: 1, label: "1", text: "Pas du tout" },
        { id: 2, label: "2", text: "Un peu" },
        { id: 3, label: "3", text: "Moyennement" },
        { id: 4, label: "4", text: "Plutôt beaucoup" },
        { id: 5, label: "5", text: "Totalement" }
    ]
}));
