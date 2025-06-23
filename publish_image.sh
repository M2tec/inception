#!/bin/bash

docker build -t m2tec/inception:latest .
docker login
docker push m2tec/inception:latest