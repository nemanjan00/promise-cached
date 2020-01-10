#!/bin/zsh

export PATH=$PATH:$(pwd)/node_modules/.bin

for SCRIPT in $(cat package.json | jq -r ".scripts | keys[]" | grep -v test); do
	COMMAND=`cat package.json | jq --arg script "$SCRIPT" -r '.scripts[ $script ]'`

	autostash alias $SCRIPT="$COMMAND"
done

echo "Entered virtualenv"

