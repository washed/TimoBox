#!/bin/bash
while [ true ]
do
    read -p "Waiting for NFC tag: " tagId
    echo "Tag scanned: $tagId"

    curl --location "http://localhost:8000/tag/$tagId/execute"
    echo ""
done