// backend/server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Les IDs d’îles connues (doivent matcher quizData.js)
const ISLAND_IDS = [
    "hardware_reuse",
    "free_software_autonomy",
    "digital_sobriety",
    "education_community"
];

// Helper : nom de fichier pour une île
function getAttemptsFilePathForIsland(islandId) {
    const safeId = islandId && ISLAND_IDS.includes(islandId)
        ? islandId
        : "unknown";
    return path.join(__dirname, `attempts_${safeId}.json`);
}

// Lecture d’un fichier de tentatives
function readAttemptsFromFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const raw = fs.readFileSync(filePath, "utf-8");
        if (!raw.trim()) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error("Erreur lecture fichier tentatives :", filePath, e);
        return [];
    }
}

// Écriture d’un fichier de tentatives
function writeAttemptsToFile(filePath, attempts) {
    try {
        fs.writeFileSync(
            filePath,
            JSON.stringify(attempts, null, 2),
            "utf-8"
        );
    } catch (e) {
        console.error("Erreur écriture fichier tentatives :", filePath, e);
    }
}

// Lire toutes les tentatives, toutes îles confondues
function readAllAttempts() {
    const attempts = [];

    // Tous les fichiers attempts_<id>.json
    const files = fs.readdirSync(__dirname).filter((f) =>
        f.startsWith("attempts_") && f.endsWith(".json")
    );

    files.forEach((file) => {
        const full = path.join(__dirname, file);
        const fileAttempts = readAttemptsFromFile(full);
        attempts.push(...fileAttempts);
    });

    return attempts;
}

// Middleware
app.use(express.json());

// CORS basique (frontend sur http://localhost:8000 par ex)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
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

app.post("/api/attempts", (req, res) => {
    console.log("POST /api/attempts payload =", req.body);

    const { personName, personBio, mainIslandId, islandName, topSkills } = req.body;

    // Validation simple : au moins le nom
    if (!personName || typeof personName !== "string") {
        return res.status(400).json({ error: "personName manquant ou invalide" });
    }

    // Fichier ciblé pour cette île
    const filePath = getAttemptsFilePathForIsland(mainIslandId);
    console.log("[SERVER] Fichier utilisé pour cette tentative :", filePath);

    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const attempts = readAttemptsFromFile(filePath);

    // Bloquer plusieurs entrées par IP pour CETTE île
    const already = attempts.find((a) => a.ip === ip);
    if (already) {
        return res
            .status(409)
            .json({ error: "Une participation a déjà été enregistrée depuis cette adresse pour cette île." });
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
    writeAttemptsToFile(filePath, attempts);

    res.status(201).json({ status: "ok", attemptId: attempt.id });
});

// GET /api/attempts :
// - si ?islandId=xxx → renvoie uniquement ce JSON
// - sinon → merge tous les JSON
app.get("/api/attempts", (req, res) => {
    const { islandId } = req.query;

    if (islandId) {
        const filePath = getAttemptsFilePathForIsland(islandId);
        const attempts = readAttemptsFromFile(filePath);
        return res.json(attempts);
    }

    // Toutes les îles
    const attempts = readAllAttempts();
    res.json(attempts);
});

// GET /api/stats : stats par île, toutes îles confondues
app.get("/api/stats", (req, res) => {
    const attempts = readAllAttempts();
    const stats = {};

    attempts.forEach((a) => {
        if (!a.mainIslandId) return;
        stats[a.mainIslandId] = (stats[a.mainIslandId] || 0) + 1;
    });

    res.json(stats);
});

app.listen(PORT, () => {
    console.log(`Backend Village Techno en écoute sur http://localhost:${PORT}`);
});
