// js/data/quizData.js

export const islands = [
    {
        id: "hardware_reuse",
        name: "Île du Matériel Réincarné",
        description: "Tu es du genre à ouvrir, réparer, réutiliser. Pour toi, un vieux PC est une opportunité, pas un déchet."
    },
    {
        id: "free_software_autonomy",
        name: "Île du Libre & de l’Autonomie",
        description: "Tu vois dans les logiciels libres un moyen de reprendre la main sur le numérique et d’échapper aux Big Tech."
    },
    {
        id: "digital_sobriety",
        name: "Île de la Sobriété Numérique",
        description: "Tu penses usage raisonné : stockage, streaming, ressources. Tu optimises plutôt que tu ne gaspilles."
    },
    {
        id: "education_community",
        name: "Île des Passeurs & Pédagogues",
        description: "Tu aimes expliquer, simplifier, embarquer les autres. Sans toi, pas de culture NIRD qui diffuse."
    },
    {
        id: "nird_projects_lead",
        name: "Île des Bâtisseurs de Projets NIRD",
        description: "Tu vois en projets, en plans et en étapes. Tu aimes transformer des idées en actions concrètes."
    }
];

export const questions = [
    {
        id: "q1",
        text: "Un vieux PC de 2015 traîne au fond d’un placard. Tu fais quoi ?",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Je le rallume, je vois ce qui cloche et j’essaie de le remettre en état.",
                weights: { hardware_reuse: 2 }
            },
            {
                id: "b",
                label: "B",
                text: "Je lui colle un Linux léger et je le recycle en machine fonctionnelle.",
                weights: { hardware_reuse: 1, free_software_autonomy: 2 }
            },
            {
                id: "c",
                label: "C",
                text: "S’il rame, tant pis, il finira à la déchetterie.",
                weights: { hardware_reuse: 0 }
            },
            {
                id: "d",
                label: "D",
                text: "On pourrait en faire un projet collectif au sein de l’établissement.",
                weights: { hardware_reuse: 1, nird_projects_lead: 2, education_community: 1 }
            }
        ]
    },
    {
        id: "q2",
        text: "On te propose un projet : “Remplacer un logiciel propriétaire par une alternative libre”. Ta réaction ?",
        choices: [
            {
                id: "a",
                label: "A",
                text: "On commence quand ? J’adore ce genre de mission.",
                weights: { free_software_autonomy: 3 }
            },
            {
                id: "b",
                label: "B",
                text: "Je veux bien aider à expliquer aux autres comment l’utiliser.",
                weights: { free_software_autonomy: 1, education_community: 2 }
            },
            {
                id: "c",
                label: "C",
                text: "Si ça ne change pas trop mes habitudes, pourquoi pas.",
                weights: { digital_sobriety: 1 }
            },
            {
                id: "d",
                label: "D",
                text: "Je peux gérer le plan : qui forme qui, quels postes, quel planning.",
                weights: { free_software_autonomy: 1, nird_projects_lead: 3 }
            }
        ]
    },
    {
        id: "q3",
        text: "Tes habitudes de stockage (fichiers, cloud…) ressemblent plutôt à :",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Je garde tout, on sait jamais.",
                weights: { digital_sobriety: 0 }
            },
            {
                id: "b",
                label: "B",
                text: "Je nettoie de temps en temps à l’instinct.",
                weights: { digital_sobriety: 1 }
            },
            {
                id: "c",
                label: "C",
                text: "J’ai une vraie routine de tri, d’archivage et de suppression.",
                weights: { digital_sobriety: 3 }
            },
            {
                id: "d",
                label: "D",
                text: "J’aide d’autres personnes à organiser/optimiser leurs données.",
                weights: { digital_sobriety: 2, education_community: 2 }
            }
        ]
    },
    {
        id: "q4",
        text: "Tu veux montrer une vidéo à une classe. Comment tu t’organises ?",
        choices: [
            {
                id: "a",
                label: "A",
                text: "YouTube direct en 4K, on ne vit qu’une fois.",
                weights: { digital_sobriety: 0 }
            },
            {
                id: "b",
                label: "B",
                text: "Je télécharge avant, en qualité raisonnable, pour éviter le streaming inutile.",
                weights: { digital_sobriety: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "Je teste d’abord le matos, et j’improvise selon ce qui marche.",
                weights: { digital_sobriety: 1, nird_projects_lead: 1 }
            },
            {
                id: "d",
                label: "D",
                text: "Je prépare aussi un support écrit ou interactif pour garder une trace.",
                weights: { education_community: 2, digital_sobriety: 1 }
            }
        ]
    },
    {
        id: "q5",
        text: "As-tu déjà ouvert un PC / laptop pour le démonter un minimum ?",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Jamais, ça me fait un peu peur.",
                weights: { hardware_reuse: 0 }
            },
            {
                id: "b",
                label: "B",
                text: "Oui, pour changer RAM, disque, batterie ou nettoyer.",
                weights: { hardware_reuse: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "Oui, avec un tuto à côté et quelqu’un pas loin au cas où.",
                weights: { hardware_reuse: 2 }
            },
            {
                id: "d",
                label: "D",
                text: "Oui, et j’aimerais en faire un “repair café” dans l’établissement.",
                weights: { hardware_reuse: 2, education_community: 2, nird_projects_lead: 1 }
            }
        ]
    },
    {
        id: "q6",
        text: "Quel rôle te ressemble le plus dans un projet NIRD ?",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Le/la tech qui installe, configure, bidouille.",
                weights: { hardware_reuse: 1, free_software_autonomy: 2 }
            },
            {
                id: "b",
                label: "B",
                text: "Le/la pédagogue qui explique, vulgarise, rassure.",
                weights: { education_community: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "Le/la stratège qui planifie, coordonne, discute avec l’admin.",
                weights: { nird_projects_lead: 3 }
            },
            {
                id: "d",
                label: "D",
                text: "Le/la pragmatique qui veille à l’usage concret au quotidien.",
                weights: { digital_sobriety: 2 }
            }
        ]
    },
    {
        id: "q7",
        text: "On te propose un Défi : sauver 10 vieux PC de la poubelle. Tu t’inscris pour…",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Diagnostiquer et vérifier ce qui est réparable.",
                weights: { hardware_reuse: 3 }
            },
            {
                id: "b",
                label: "B",
                text: "Installer des OS libres adaptés et des logiciels utiles.",
                weights: { hardware_reuse: 1, free_software_autonomy: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "Organiser la logistique, répartir les tâches, gérer le timing.",
                weights: { nird_projects_lead: 3 }
            },
            {
                id: "d",
                label: "D",
                text: "Documenter l’expérience, en faire un tuto ou une présentation.",
                weights: { education_community: 3 }
            }
        ]
    },
    {
        id: "q8",
        text: "Quand tu expliques un truc technique à quelqu’un…",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Je vais droit au but, quitte à être un peu technique.",
                weights: { free_software_autonomy: 1 }
            },
            {
                id: "b",
                label: "B",
                text: "J’adapte mon vocabulaire et je cherche des analogies simples.",
                weights: { education_community: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "J’aime bien préparer un support (schéma, tuto, slides).",
                weights: { education_community: 2, nird_projects_lead: 1 }
            },
            {
                id: "d",
                label: "D",
                text: "Je préfère rester en coulisse et laisser d’autres présenter.",
                weights: { digital_sobriety: 1 }
            }
        ]
    },
    {
        id: "q9",
        text: "Tu as 1h pour faire avancer la durabilité numérique dans un établissement. Tu choisis :",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Nettoyer / optimiser un petit parc de machines existantes.",
                weights: { hardware_reuse: 2, digital_sobriety: 1 }
            },
            {
                id: "b",
                label: "B",
                text: "Installer/configurer un service libre utile (Nextcloud, Moodle…).",
                weights: { free_software_autonomy: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "Animer un mini atelier ou une séance de sensibilisation.",
                weights: { education_community: 3 }
            },
            {
                id: "d",
                label: "D",
                text: "Écrire un mini plan d’action sur 3 mois (objectifs, étapes, personnes).",
                weights: { nird_projects_lead: 3 }
            }
        ]
    },
    {
        id: "q10",
        text: "Si le Village Numérique Résistant était un jeu vidéo, ta “classe” serait…",
        choices: [
            {
                id: "a",
                label: "A",
                text: "Artisan·e du Matériel – tu donnes une seconde vie aux machines.",
                weights: { hardware_reuse: 3 }
            },
            {
                id: "b",
                label: "B",
                text: "Mage du Libre – tu invoques Linux & co pour libérer le village.",
                weights: { free_software_autonomy: 3 }
            },
            {
                id: "c",
                label: "C",
                text: "Moine de la Sobriété – tu optimises les ressources et l’usage.",
                weights: { digital_sobriety: 3 }
            },
            {
                id: "d",
                label: "D",
                text: "Barde-Passeur – tu inspires et embarques tout le monde.",
                weights: { education_community: 3 }
            }
        ]
    }
];
