// js/core/scoring.js
import { islands, competences } from "../data/quizData.js";

/**
 * Calcule les scores par île à partir des réponses.
 *
 * @param {Object} answers  { competenceId: niveau(1..5), ... }
 * @returns {{scores: Object, mainIslandId: string|null, mainIsland: Object|null}}
 */
export function computeScoresMatrix(answers) {
    // Initialiser tous les scores d'île à 0
    const scores = {};
    islands.forEach((island) => {
        scores[island.id] = 0;
    });

    // Parcourir toutes les compétences et appliquer les poids
    competences.forEach((comp) => {
        const level = Number(answers[comp.id] || 0);
        if (!level || !comp.weightsPerLevel) {
            return;
        }

        const weights = comp.weightsPerLevel[level];
        if (!weights) {
            return;
        }

        Object.entries(weights).forEach(([islandId, weight]) => {
            if (scores[islandId] == null) {
                scores[islandId] = 0;
            }
            scores[islandId] += weight;
        });
    });

    // Déterminer l'île principale (score max)
    let mainIslandId = null;
    let maxScore = -Infinity;

    Object.entries(scores).forEach(([islandId, score]) => {
        if (score > maxScore) {
            maxScore = score;
            mainIslandId = islandId;
        }
    });

    const mainIsland =
        islands.find((island) => island.id === mainIslandId) || null;

    return { scores, mainIslandId, mainIsland };
}
