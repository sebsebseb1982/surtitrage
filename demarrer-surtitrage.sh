#!/bin/bash
PORT=8000
pkill -f node
tsc && node src/surtitrage.js --port=$PORT &
sensible-browser http://localhost:$PORT/surtitrage http://localhost:$PORT/script