#!/bin/bash

# Dossier à traiter (par défaut le dossier courant)
DIR=${1:-.}

echo "Suppression des hyperliens dans : $DIR"

# Parcourt tous les fichiers HTML du dossier
find "$DIR" -type f -name "*.html" | while read file; do
    echo "Traitement : $file"
    
    # 1) Supprime l'attribut href (ex: <a href="...">)
    sed -i 's/<a[^>]*>//g' "$file"

    # 2) Supprime les balises </a>
    sed -i 's/<\/a>//g' "$file"
done

echo "✔️ Tous les hyperliens ont été supprimés."
