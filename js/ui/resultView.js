// js/ui/resultView.js
import { islands } from "../data/quizData.js";

export function renderResult(container, { scores, mainIsland }) {
    const scoreRows = islands.map(island => {
        const val = scores[island.id] || 0;
        return `
      <div class="score-row">
        <span class="score-name">${island.name}</span>
        <span class="score-value">${val}</span>
      </div>
    `;
    }).join("");

    container.innerHTML = `
    <div class="result">
      <div class="result-eyebrow">Profil de durabilité numérique</div>
      <div class="result-title">
        ${mainIsland ? mainIsland.name : "Habitant du Village Numérique"}
        <span class="result-pill">Île principale</span>
      </div>
      <div class="result-desc">
        ${mainIsland ? mainIsland.description : ""}
      </div>
      <div class="result-scores">
        <div style="margin-bottom: 6px; font-weight: 500;">
          Répartition de tes talents :
        </div>
        ${scoreRows}
      </div>
      <div class="button-row" style="margin-top: 14px;">
        <button class="btn btn-secondary" id="restartBtn">Rejouer le quiz</button>
      </div>
    </div>
  `;
}
