#!/bin/sh
set -xe

echo "Merging swagger json "
npx openapi-merge-cli --config ./openapi-merge.json
echo "Removing exist existed service "
rm -rf ../src/app/core/generated-service/*
echo "Generating service"
npx openapi-generator-cli generate -i ./output.swagger.json -g typescript-angular -o ../src/app/core/generated-service --additional-properties=apiModulePrefix=EcoCharge,fileNaming=kebab-case,ngVersion=19.0.0,configurationPrefix=EcoCharge,allowUnicodeIdentifiers=true
rm -rf ./output.swagger.json


