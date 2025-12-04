// js/ui/quizView.js
import {
    getCurrentQuestion,
    getCurrentIndex,
    getQuestionsCount,
    getAnswerFor
} from "../core/state.js";

export function renderQuestion(container, { onNext }) {
    const question = getCurrentQuestion();
    if (!question) {
        container.innerHTML = "<p>Plus de questions.</p>";
        return;
    }

    const idx = getCurrentIndex();
    const total = getQuestionsCount();
    const savedChoice = getAnswerFor(question.id);

    container.innerHTML = `
    <div class="question-text">${question.text}</div>
    <div class="question-hint">Choisis la réponse qui te ressemble le plus.</div>
    <div class="choices">
      ${question.choices
            .map(
                (choice) => `
        <div class="choice">
          <input
            type="radio"
            class="choice-input"
            id="${question.id}_${choice.id}"
            name="${question.id}"
            value="${choice.id}"
            ${savedChoice === choice.id ? "checked" : ""}
          />
          <label class="choice-label" for="${question.id}_${choice.id}">
            <div class="choice-bullet">${choice.label}</div>
            <div class="choice-text">
              <div class="choice-text-strong">${choice.text}</div>
            </div>
          </label>
        </div>
      `
            )
            .join("")}
    </div>
    <div class="button-row">
      <button class="btn btn-primary">
        ${idx === total - 1 ? "Voir mon île" : "Question suivante →"}
      </button>
    </div>
    <div class="error-msg" id="quizError"></div>
  `;

    const btn = container.querySelector(".btn-primary");
    const errorEl = container.querySelector("#quizError");

    btn.addEventListener("click", () => {
        const selected = container.querySelector(
            `input[name="${question.id}"]:checked`
        );
        if (!selected) {
            errorEl.textContent = "Choisis une réponse pour continuer.";
            return;
        }
        errorEl.textContent = "";
        onNext(question.id, selected.value);
    });
}
