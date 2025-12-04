// backend/server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// fichier où on stocke les réponses
const attemptsFilePath = path.join(__dirname, "attempts.json");

// Middleware
app.use(express.json());

// CORS basique (frontend sur http://localhost:8000 par ex)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // tu peux restreindre plus tard
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

// Helper : lire les tentatives
function readAttempts() {
    try {
        if (!fs.existsSync(attemptsFilePath)) {
            return [];
        }
        const raw = fs.readFileSync(attemptsFilePath, "utf-8");
        if (!raw.trim()) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error("Erreur lecture attempts.json :", e);
        return [];
    }
}

// Helper : écrire les tentatives
function writeAttempts(attempts) {
    try {
        fs.writeFileSync(
            attemptsFilePath,
            JSON.stringify(attempts, null, 2),
            "utf-8"
        );
    } catch (e) {
        console.error("Erreur écriture attempts.json :", e);
    }
}

// POST /api/attempts : enregistrer une nouvelle tentative
app.post("/api/attempts", (req, res) => {
    const { userId, answers, scores, mainIslandId } = req.body;

    if (!answers || typeof answers !== "object") {
        return res.status(400).json({ error: "answers manquant ou invalide" });
    }

    const attempts = readAttempts();

    const attempt = {
        id: `attempt_${Date.now()}`,
        userId: userId || null,
        answers,
        scores,
        mainIslandId,
        createdAt: new Date().toISOString()
    };

    attempts.push(attempt);
    writeAttempts(attempts);

    res.status(201).json({ status: "ok", attemptId: attempt.id });
});

// GET /api/attempts : récupérer toutes les tentatives
app.get("/api/attempts", (req, res) => {
    const attempts = readAttempts();
    res.json(attempts);
});

// (optionnel) GET /api/stats : stats par île
app.get("/api/stats", (req, res) => {
    const attempts = readAttempts();
    const stats = {};

    attempts.forEach(a => {
        if (!a.mainIslandId) return;
        stats[a.mainIslandId] = (stats[a.mainIslandId] || 0) + 1;
    });

    res.json(stats);
});

app.listen(PORT, () => {
    console.log(`Backend NIRD en écoute sur http://localhost:${PORT}`);
});
