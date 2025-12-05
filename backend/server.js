// backend/server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Fichier où on stocke les réponses
const ATTEMPTS_FILE_PATH = path.join(__dirname, "attempts.json");
console.log("[SERVER] Fichier de réponses :", ATTEMPTS_FILE_PATH);

// Middleware JSON
app.use(express.json());

// CORS basique (frontend sur http://localhost:8000 par ex)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // à restreindre au besoin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Lecture des tentatives depuis le fichier JSON
function readAttempts() {
    try {
        if (!fs.existsSync(ATTEMPTS_FILE_PATH)) {
            return [];
        }
        const raw = fs.readFileSync(ATTEMPTS_FILE_PATH, "utf-8");
        if (!raw.trim()) return [];
        return JSON.parse(raw);
    } catch (err) {
        console.error("[SERVER] Erreur lecture attempts.json :", err);
        return [];
    }
}

// Écriture des tentatives dans le fichier JSON
function writeAttempts(attempts) {
    try {
        fs.writeFileSync(
            ATTEMPTS_FILE_PATH,
            JSON.stringify(attempts, null, 2),
            "utf-8"
        );
    } catch (err) {
        console.error("[SERVER] Erreur écriture attempts.json :", err);
    }
}

// Enregistrement d'une nouvelle participation
app.post("/api/attempts", (req, res) => {
    console.log("POST /api/attempts payload =", req.body);

    const {
        personName,
        personBio,
        mainIslandId,
        islandName,
        topSkills
    } = req.body;

    // Validation minimale : au moins un nom
    if (!personName || typeof personName !== "string") {
        return res
            .status(400)
            .json({ error: "personName manquant ou invalide" });
    }

    const ip =
        req.ip ||
        req.headers["x-forwarded-for"] ||
        "unknown";

    const attempts = readAttempts();

    // En production, on pourrait garder le blocage par IP.
    // Ici on le laisse actif pour éviter les doublons basiques.
    const already = attempts.find((a) => a.ip === ip);
    if (already) {
        return res
            .status(409)
            .json({
                error:
                    "Une participation a déjà été enregistrée depuis cette adresse."
            });
    }

    const attempt = {
        id: `attempt_${Date.now()}`,
        ip,
        personName: personName.trim(),
        personBio: personBio ? personBio.trim() : null,
        islandName: islandName || null,
        mainIslandId: mainIslandId || null,
        topSkills: Array.isArray(topSkills) ? topSkills : [],
        createdAt: new Date().toISOString()
    };

    attempts.push(attempt);
    writeAttempts(attempts);

    return res
        .status(201)
        .json({ status: "ok", attemptId: attempt.id });
});

// GET /api/attempts : récupérer toutes les tentatives brutes
app.get("/api/attempts", (req, res) => {
    const attempts = readAttempts();
    res.json(attempts);
});

// GET /api/stats : stats par île principale
app.get("/api/stats", (req, res) => {
    const attempts = readAttempts();
    const stats = {};

    attempts.forEach((a) => {
        if (!a.mainIslandId) return;
        stats[a.mainIslandId] = (stats[a.mainIslandId] || 0) + 1;
    });

    res.json(stats);
});

app.listen(PORT, () => {
    console.log(
        `Backend Village Techno en écoute sur http://localhost:${PORT}`
    );
});
