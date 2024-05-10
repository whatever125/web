#!/bin/bash

# remove existing deployment
ssh -p 2222 s368328@se.ifmo.ru "rm -rf wildfly/wildfly-21.0.0.Final/standalone/deployments/lab2.war"
# add new deployment
scp -P 2222 ./target/lab2.war s368328@se.ifmo.ru:wildfly/wildfly-21.0.0.Final/standalone/deployments
