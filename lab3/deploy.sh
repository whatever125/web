#!/bin/bash

echo "Deploying to Helios"

## Remove existing deployment
ssh -p 2222 s368328@se.ifmo.ru "rm -rf wildfly/wildfly-preview-26.1.3.Final/standalone/deployments/lab3-1.0-SNAPSHOT.war"
# add new deployment
scp -P 2222 ./target/lab3-1.0-SNAPSHOT.war s368328@se.ifmo.ru:wildfly/wildfly-preview-26.1.3.Final/standalone/deployments