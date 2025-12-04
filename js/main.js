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
import { computeScores } from "./core/scoring.js";
import { renderQuestion } from "./ui/quizView.js";
import { renderResult } from "./ui/resultView.js";
import { sendAttemptToServer } from "./core/api.js";

const app = document.getElementById("app");

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
                renderResultScreen();
            } else {
                setCurrentIndex(idx + 1);
                renderQuizScreen();
            }
        }
    });
}

async function renderResultScreen() {
    console.log("[QUIZ] Affichage du résultat");
    const wrapper = document.createElement("div");
    wrapper.className = "card-inner";
    app.innerHTML = "";
    app.appendChild(wrapper);

    const answers = getAnswers();
    const { scores, mainIsland, mainIslandId } = (() => {
        const res = computeScores(answers);
        return { ...res, mainIslandId: res.mainIslandId };
    })();

    // Envoi au backend
    sendAttemptToServer({
        userId: null, // tu peux ajouter un pseudo plus tard
        answers,
        scores,
        mainIslandId: mainIsland ? mainIsland.id : null
    });

    renderResult(wrapper, { scores, mainIsland });

    const restartBtn = wrapper.querySelector("#restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            resetState();
            setCurrentIndex(0);
            renderQuizScreen();
        });
    }
}

// Init
loadState();
setCurrentIndex(0);
console.log("[QUIZ] Nombre de questions:", getQuestionsCount());
renderQuizScreen();
