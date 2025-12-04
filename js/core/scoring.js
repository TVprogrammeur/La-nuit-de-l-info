// js/core/scoring.js
import { islands, questions } from "../data/quizData.js";

export function computeScores(answers) {
    const scores = {};
    islands.forEach(island => {
        scores[island.id] = 0;
    });

    questions.forEach(q => {
        const choiceId = answers[q.id];
        if (!choiceId) return;

        const choice = q.choices.find(c => c.id === choiceId);
        if (!choice || !choice.weights) return;

        Object.entries(choice.weights).forEach(([islandId, weight]) => {
            if (scores[islandId] == null) scores[islandId] = 0;
            scores[islandId] += weight;
        });
    });

    let mainIslandId = null;
    let maxScore = -Infinity;
    Object.entries(scores).forEach(([islandId, score]) => {
        if (score > maxScore) {
            maxScore = score;
            mainIslandId = islandId;
        }
    });

    const mainIsland = islands.find(i => i.id === mainIslandId) || null;

    return { scores, mainIslandId, mainIsland };
}
