// js/ui/resultView.js
import { islands } from "../data/quizData.js";

export function renderResult(container, { scores, mainIsland, personName }) {
    // Sécurité : si pas de scores ou pas d'îles, on évite de tout casser
    if (!scores || !Array.isArray(islands)) {
        container.innerHTML = "<p>Impossible d'afficher le résultat.</p>";
        return;
    }

    const scoreRows = islands
        .map((island) => {
            const val = scores[island.id] || 0;
            return `
        <div class="score-row">
          <span class="score-name">${island.name}</span>
          <span class="score-value">${val}</span>
        </div>
      `;
        })
        .join("");

    // Bloc visuel pour l'île principale
    const islandCard = mainIsland
        ? `
      <div class="island-card">
        <div class="island-chip">Île principale</div>
        <div class="island-name-main">${mainIsland.name}</div>
        <div class="island-short">${mainIsland.short || ""}</div>
      </div>
    `
        : "";

    container.innerHTML = `
    <div class="result">
      <div class="result-eyebrow">Profil de durabilité numérique</div>
      <div class="result-title">
        ${personName
            ? `Bonjour, ${personName}`
            : mainIsland
                ? mainIsland.name
                : "Habitant du Village Techno"}
        <span class="result-pill">Carte des talents</span>
      </div>

      ${islandCard}

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
        <button class="btn btn-secondary" id="restartBtn">Rejouer le test</button>
      </div>
    </div>
  `;
}
