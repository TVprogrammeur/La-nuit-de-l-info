#!/bin/bash
./full_local_clone.sh "$1" "$1"
./remove-hyperlinks.sh "$1" 
./remove_all_scripts.sh "$1/index.html" "$1/index_clean.html"
mv "$1/index_clean.html" "$1/index.html"
