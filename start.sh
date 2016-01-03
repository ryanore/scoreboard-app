#!/bin/sh
_app="$(pwd)"
_api="$_app/../scoreboard-api"

mongod &

newtab eval "ls $_api; grunt server; exit"

newtab eval "ls $_app; npm run server:start; exit"


