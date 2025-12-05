#!/bin/bash

# Vérification argument
if [ -z "$1" ]; then
    echo "Usage: $0 <dossier_root_HTTrack>"
    exit 1
fi

ROOT="$1"

IMG_DIR="$ROOT/images"
CSS_DIR="$ROOT/css"
JS_DIR="$ROOT/js"
FONTS_DIR="$ROOT/fonts"

mkdir -p "$IMG_DIR" "$CSS_DIR" "$JS_DIR" "$FONTS_DIR"

echo "[*] Parcours des fichiers HTML dans $ROOT …"

# Fonction pour traiter une ressource
process_resource() {
    local html="$1"
    local attr="$2"       # src ou href
    local ext_pattern="$3"
    local target_dir="$4"

    grep -Eoi "$attr=[\"'][^\"']+$ext_pattern[\"']" "$html" \
        | sed -E "s/$attr=[\"']([^\"']+)[\"']/\1/" \
        | while read -r url; do
            [[ -z "$url" || "$url" == \#* ]] && continue

            fname=$(basename "$url")
            local_path="$target_dir/$fname"

            # Télécharger si inexistant
            if [[ ! -f "$local_path" ]]; then
                if [[ "$url" == http* ]]; then
                    full_url="$url"
                else
                    # URL relative → construire depuis le HTML
                    base_url=$(dirname "$html")
                    full_url="$base_url/$url"
                fi
                echo "Téléchargement : $full_url → $local_path"
                wget -q -O "$local_path" "$full_url"
            fi

            # Réécriture du lien dans le HTML
            sed -i "s#$url#${target_dir##*/}/$fname#g" "$html"
        done
}

# Parcourir tous les fichiers HTML
find "$ROOT" -type f -name "*.html" | while read -r html; do
    echo "Processing $html …"
    process_resource "$html" "src" "\.(jpg|jpeg|png|gif|svg|webp)" "$IMG_DIR"
    process_resource "$html" "href" "\.css" "$CSS_DIR"
    process_resource "$html" "src" "\.js" "$JS_DIR"
    process_resource "$html" "href" "\.(woff|woff2|ttf|otf|eot)" "$FONTS_DIR"
done

echo "[✔] Le site est maintenant 100% autonome dans $ROOT"
