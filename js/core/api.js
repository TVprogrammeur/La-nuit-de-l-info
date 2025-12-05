// js/core/api.js

const API_BASE_URL = "http://localhost:3001";

/**
 * Envoie une tentative vers le backend du Village Techno.
 *
 * @param {Object} params
 * @param {string} params.personName  Nom ou pseudo de la personne
 * @param {string} [params.personBio] Phrase de description
 * @param {string} [params.mainIslandId] ID de l'île principale
 * @param {Object} [params.mainIsland] Objet île principale (pour le nom)
 * @param {Array}  [params.topSkills]  Liste de compétences fortes calculées côté front
 */
export async function sendAttemptToServer({
    personName,
    personBio,
    mainIslandId,
    mainIsland,
    topSkills
}) {
    const islandName = mainIsland ? mainIsland.name : null;

    const payload = {
        personName: personName || null,
        personBio: personBio || null,
        islandName,
        mainIslandId: mainIslandId || null,
        topSkills: Array.isArray(topSkills) ? topSkills : []
    };

    console.log("[API] Envoi tentative :", payload);

    try {
        const res = await fetch(`${API_BASE_URL}/api/attempts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            console.error("[API] Erreur /api/attempts :", res.status);
            return null;
        }

        const data = await res.json();
        console.log("[API] Réponse serveur :", data);
        return data;
    } catch (err) {
        console.error("[API] Erreur réseau /api/attempts :", err);
        return null;
    }
}
