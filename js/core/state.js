// js/core/state.js
import { questions } from "../data/quizData.js";

const STORAGE_KEY = "nird_quiz_answers_v1";

let currentIndex = 0;
let answers = {}; // { questionId: choiceId }

export function getCurrentIndex() {
    return currentIndex;
}

export function setCurrentIndex(idx) {
    currentIndex = idx;
}

export function getCurrentQuestion() {
    return questions[currentIndex] || null;
}

export function getQuestionsCount() {
    return questions.length;
}

export function saveAnswer(questionId, choiceId) {
    answers[questionId] = choiceId;
    persist();
}

export function getAnswers() {
    return { ...answers };
}

export function getAnswerFor(questionId) {
    return answers[questionId] || null;
}

export function resetState() {
    currentIndex = 0;
    answers = {};
    persist();
}

export function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed.answers && typeof parsed.answers === "object") {
            answers = parsed.answers;
        }
    } catch (e) {
        console.warn("Impossible de charger l'état du quiz :", e);
    }
}

function persist() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ answers })
        );
    } catch (e) {
        console.warn("Impossible de sauvegarder l'état du quiz :", e);
    }
}
