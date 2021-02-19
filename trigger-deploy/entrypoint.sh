#!/bin/sh
set -e

kinto init $INPUT_CORE_HOST
kinto deploy $INPUT_ENVIRONMENT_ID $INPUT_SERVICE_NAME