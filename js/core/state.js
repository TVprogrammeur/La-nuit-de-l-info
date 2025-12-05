// js/core/state.js
import { questions } from "../data/quizData.js";

// Clé de stockage locale (spécifique au Village Techno)
const STORAGE_KEY = "village_techno_quiz_v1";

let currentIndex = 0;
/**
 * answers : { questionId: choiceId }
 */
let answers = {};
/**
 * Informations de la personne (si tu veux les réutiliser côté front plus tard)
 */
let person = { name: null, bio: null };

/* Index de question */

export function getCurrentIndex() {
    return currentIndex;
}

export function setCurrentIndex(idx) {
    currentIndex = idx;
}

/* Questions */

export function getCurrentQuestion() {
    return questions[currentIndex] || null;
}

export function getQuestionsCount() {
    return questions.length;
}

/* Réponses */

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

/* Infos personne (actuellement pas utilisées dans ton main, mais prêtes) */

export function setPersonInfo({ name, bio }) {
    person.name = name || null;
    person.bio = bio || null;
    persist();
}

export function getPersonInfo() {
    return { ...person };
}

/* Reset & persistance */

export function resetState() {
    currentIndex = 0;
    answers = {};
    // on garde person tel quel pour l’instant
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

        if (parsed.person && typeof parsed.person === "object") {
            person = {
                name: parsed.person.name || null,
                bio: parsed.person.bio || null
            };
        }
    } catch (err) {
        console.warn("[STATE] Impossible de charger l'état du quiz :", err);
    }
}

function persist() {
    try {
        const payload = {
            answers,
            person
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
        console.warn("[STATE] Impossible de sauvegarder l'état du quiz :", err);
    }
}
