// js/core/api.js

const API_BASE_URL = "http://localhost:3001";

export async function sendAttemptToServer({ userId, answers, scores, mainIslandId }) {
    const payload = {
        userId: userId || null,
        answers,
        scores,
        mainIslandId
    };

    console.log("[API] Envoi attempt:", payload);

    try {
        const res = await fetch(`${API_BASE_URL}/api/attempts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            console.error("Erreur API attempts:", res.status);
            return null;
        }

        const data = await res.json();
        console.log("[API] Réponse serveur:", data);
        return data;
    } catch (e) {
        console.error("Erreur réseau API attempts:", e);
        return null;
    }
}
