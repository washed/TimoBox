#!/bin/bash
while [ true ]
do
    read -p "Waiting for NFC tag: " tagId
    echo "Tag scanned: $tagId"

    jsonCommand='{"command": "loadPlaylist","payload": "'
    jsonCommand+="$tagId"
    jsonCommand+='"}'

    echo "Command: $jsonCommand"

    curl --location 'http://localhost:8000/commandextension' \
        --header 'Content-Type: application/json' \
        --data "$jsonCommand"
    echo ""
done