#!/bin/bash
while [ true ]
do
    read -p "Waiting for NFC tag: " tagId
    echo "Tag scanned: $tagId"

    jsonCommand='{"tagid": "'
    jsonCommand+="$tagId"
    jsonCommand+='", "command": "loadPlaylist","payload": "41o8ko4gsYRo00reQlvZdv"}'

    echo "Command: $jsonCommand"

    curl --location 'http://localhost:8000/commandextension' \
        --header 'Content-Type: application/json' \
        --data "$jsonCommand"
    echo ""
done