#!/bin/bash

INPUT="$1"
OUTPUT="$2"

if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
    echo "Usage : $0 <fichier_source.html> <fichier_sortie.html>"
    exit 1
fi

cp "$INPUT" "$OUTPUT"

# Supprime toutes les balises <script>...</script> (radical)
sed -i '/<script/,/<\/script>/d' "$OUTPUT"

# Supprime les scripts auto-fermés <script src=... >
sed -i '/<script.*>/d' "$OUTPUT"

echo "✔️ Tous les scripts supprimés → aucun popup possible."
echo "➡️ Fichier : $OUTPUT"
