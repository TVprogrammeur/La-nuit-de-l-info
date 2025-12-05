// js/main.js
import {
    loadState,
    resetState,
    saveAnswer,
    setCurrentIndex,
    getCurrentIndex,
    getQuestionsCount,
    getAnswers
} from "./core/state.js";

import { computeScoresMatrix } from "./core/scoring.js";
import { renderQuestion } from "./ui/quizView.js";
import { renderResult } from "./ui/resultView.js";
import { sendAttemptToServer } from "./core/api.js";
import { islands, competences } from "./data/quizData.js";

const app = document.getElementById("app");

// Petit profil en mémoire (nom + description)
const profile = {
    name: null,
    bio: null
};

/**
 * 1) ÉCRAN D’INTRO (début)
 * Explication + îles + bouton "Commencer le test"
 */
function renderIntroScreen() {
    console.log("[QUIZ] Affichage de l'intro");

    const wrapper = document.createElement("div");
    wrapper.className = "card-inner";
    app.innerHTML = "";
    app.appendChild(wrapper);

    wrapper.innerHTML = `
    <div class="intro">
      <div class="intro-block">
        <div class="result-eyebrow">Atlas des Compétences Numériques</div>
        <div class="result-title">
           Voyage au cœur des Îles Technologiques
        </div>
        <div class="intro-text" style="margin-top: 6px;">
          Ce test te permet de situer tes talents dans l'Atlas des Compétences Numériques :
          chaque île représente une façon différente de contribuer à un numérique
          plus sobre, plus libre et plus collectif.
        </div>
      </div>

      <div class="intro-block">
        <div style="font-weight: 500; margin-bottom: 6px;">Les îles du Village :</div>
        <div class="intro-islands">
          ${islands
            .map(
                (island) => `
            <div class="intro-island">
              <div class="intro-island-name">${island.name}</div>
              <div class="intro-island-short">${island.short}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="intro-block">
        <div class="intro-text" style="margin-bottom: 8px;">
          Tu verras ensuite une série de compétences. Pour chacune, tu indiqueras
          à quel point elle te correspond (de 1 = « pas du tout moi » à 5 = « c’est complètement moi »).
        </div>
        <div class="intro-text" style="margin-bottom: 10px;">
          À la fin, on te demandera ton nom ou pseudo pour placer ton profil
          sur la carte des talents du Village Techno.
        </div>
        <div class="button-row">
          <button class="btn btn-primary" id="startQuizBtn">
            Commencer le test →
          </button>
        </div>
      </div>
    </div>
  `;

    const startBtn = wrapper.querySelector("#startQuizBtn");

    startBtn.addEventListener("click", () => {
        setCurrentIndex(0);
        renderQuizScreen();
    });
}

/**
 * 2) ÉCRAN DU QUIZ
 */
function renderQuizScreen() {
    console.log("[QUIZ] renderQuizScreen, index =", getCurrentIndex());

    const wrapper = document.createElement("div");
    wrapper.className = "card-inner";
    app.innerHTML = "";
    app.appendChild(wrapper);

    renderQuestion(wrapper, {
        onNext: (questionId, choiceId) => {
            console.log("[QUIZ] Réponse:", questionId, "->", choiceId);
            saveAnswer(questionId, choiceId);

            const idx = getCurrentIndex();
            const total = getQuestionsCount();

            if (idx === total - 1) {
                renderProfileScreen();
            } else {
                setCurrentIndex(idx + 1);
                renderQuizScreen();
            }
        }
    });
}

/**
 * 3) ÉCRAN NOM / BIO (juste avant le résultat)
 */
function renderProfileScreen() {
    console.log("[QUIZ] Affichage de l'écran profil (nom/bio)");

    const wrapper = document.createElement("div");
    wrapper.className = "card-inner";
    app.innerHTML = "";
    app.appendChild(wrapper);

    wrapper.innerHTML = `
    <div class="intro">
      <div class="intro-block">
        <div class="result-eyebrow">Dernière étape</div>
        <div class="result-title">
          Qui est derrière cette carte de talents ?
        </div>
        <div class="intro-text" style="margin-top: 6px;">
          Indique ton nom (ou pseudo) et une phrase qui décrit ton rôle ou ta relation
          au numérique. Cela permet d’associer ton profil à une île principale
          dans la carte des talents du Village Techno.
        </div>
      </div>

      <div class="intro-block">
        <div class="person-block">
          <label class="person-label">
            Nom / Pseudo :
            <input type="text" id="personName" class="person-input" placeholder="Ex. Camille, prof de maths, admin ENT…" />
          </label>
          <label class="person-label">
            Une phrase pour te décrire :
            <input type="text" id="personBio" class="person-input" placeholder="Ex. Je m’occupe du parc info et j’anime des ateliers Linux." />
          </label>
        </div>
        <div class="button-row" style="margin-top: 16px;">
          <button class="btn btn-primary" id="finishProfileBtn">
            Découvrir mon île →
          </button>
        </div>
        <div class="error-msg" id="profileError"></div>
      </div>
    </div>
  `;

    const finishBtn = wrapper.querySelector("#finishProfileBtn");
    const errorEl = wrapper.querySelector("#profileError");
    const nameInput = wrapper.querySelector("#personName");
    const bioInput = wrapper.querySelector("#personBio");

    finishBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const bio = bioInput.value.trim();

        if (!name) {
            errorEl.textContent = "Merci d’indiquer au moins un nom ou pseudo.";
            return;
        }

        profile.name = name;
        profile.bio = bio || null;

        renderResultScreen();
    });
}

// Sélectionne jusqu'à 3 compétences fortes en lien avec l'île principale
function computeTopSkills(answers, mainIslandId) {
    if (!mainIslandId) return [];

    const scoredCompetences = competences
        .map((comp) => {
            const level = Number(answers[comp.id] || 0);
            if (!level || level < 3) {
                return null;
            }

            const weightsForLevel = comp.weightsPerLevel?.[level] || {};
            const impactOnMainIsland = Number(
                weightsForLevel[mainIslandId] || 0
            );

            return {
                id: comp.id,
                label: comp.label,
                level,
                impactOnMainIsland
            };
        })
        .filter(Boolean);

    scoredCompetences.sort((a, b) => {
        if (b.impactOnMainIsland !== a.impactOnMainIsland) {
            return b.impactOnMainIsland - a.impactOnMainIsland;
        }
        return b.level - a.level;
    });

    return scoredCompetences.slice(0, 3);
}

async function renderResultScreen() {
    console.log("[QUIZ] Affichage du résultat");

    const wrapper = document.createElement("div");
    wrapper.className = "card-inner";
    app.innerHTML = "";
    app.appendChild(wrapper);

    const answers = getAnswers(); // { competenceId -> niveau (1..5) }
    const { scores, mainIsland } = computeScoresMatrix(answers);

    const topSkills = computeTopSkills(
        answers,
        mainIsland ? mainIsland.id : null
    );

    await sendAttemptToServer({
        personName: profile.name,
        personBio: profile.bio,
        mainIslandId: mainIsland ? mainIsland.id : null,
        mainIsland,
        topSkills
    });

    renderResult(wrapper, {
        scores,
        mainIsland,
        personName: profile.name
    });

    const restartBtn = wrapper.querySelector("#restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            resetState();
            setCurrentIndex(0);
            profile.name = null;
            profile.bio = null;
            renderIntroScreen();
        });
    }
}

// Init
loadState();
console.log("[QUIZ] Initialisation – nombre d'items :", getQuestionsCount());
console.log("[QUIZ] app container:", app);
renderIntroScreen();
console.log("[QUIZ] HTML rendered, length:", app.innerHTML.length);
