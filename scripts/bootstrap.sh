#!/usr/bin/env bash

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

RED="\033[0;31m"
GREEN="\033[0;32m"
NC="\033[0m" # No Color

# **************************************************************************************
# Check Node Installation
# **************************************************************************************
MIN_NODE_VERSION="14.19.2"

# note: 2> /dev/null suppresses stderr (the error message)
CURRENT_NODE_VERSION=$(node -v 2> /dev/null)
if [ -z "$CURRENT_NODE_VERSION" ]
    then echo -e "${RED}Node installation not found" \
        "(minimum: ${MIN_NODE_VERSION}).${NC}"
    exit 1
fi

CURRENT_NODE_VERSION="${CURRENT_NODE_VERSION/v /""}"
if $(dpkg --compare-versions "${CURRENT_NODE_VERSION}" "lt" "${MIN_NODE_VERSION}")
    then echo -e "${RED}Current Node version not supported" \
        "(found: ${CURRENT_NODE_VERSION}; " \
        "minimum: ${MIN_NODE_VERSION}).${NC}"
    exit 1
fi

echo -e "${GREEN}Node installation found: ${CURRENT_NODE_VERSION}" \
    "(minimum: ${MIN_NODE_VERSION}).${NC}" 

# **************************************************************************************
# Check NPM Installation
# **************************************************************************************
MIN_NPM_VERSION="6.14.17"

# note: 2> /dev/null suppresses stderr (the error message)
CURRENT_NPM_VERSION=$(npm -v 2> /dev/null)
if [ -z "$CURRENT_NPM_VERSION" ]
    then echo -e "${RED}NPM installation not found" \
        "(minimum: ${MIN_NPM_VERSION}).${NC}"
    exit 1
fi

if $(dpkg --compare-versions "${CURRENT_NPM_VERSION}" "lt" "${MIN_NPM_VERSION}")
    then echo -e "${RED}Current NPM version not supported" \
        "(found: ${CURRENT_NPM_VERSION}; " \
        "minimum: ${MIN_NPM_VERSION}).${NC}"
    exit 1
fi

echo -e "${GREEN}NPM installation found: ${CURRENT_NPM_VERSION}" \
    "(minimum: ${MIN_NPM_VERSION}).${NC}" 