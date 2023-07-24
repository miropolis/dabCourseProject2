# What I did for kubernetes already

First: '$minikube status' and probably '$minikube start'

Continue with this guide to connect backend, frontend and everything:

https://kubernetes.io/docs/tasks/access-application-cluster/connecting-frontend-backend/
https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

## qa-api

1. Built the kubernetes image for qa-api with the command (In qa-api folder!)

    minikube image build -t qa-api -f ./Dockerfile .

Can see it with command: minikube image list

2. Created the qa-api-deployment.yaml file based on online course chapter 17.4

3. Deploy application with command: kubectl apply -f kubernetes/qa-api-deployment.yaml
Verify with kubectl get deployments

4. Created qa-api-service.yaml like in chapter 17.4
Deployed service with: kubectl apply -f kubernetes/qa-api-service.yaml
Verify with kubectl get service

5. Create tunnel to service with minkube: minikube service qa-api-service --url

6. Clean up with commands:
kubectl delete -f kubernetes/qa-api-service.yaml
kubectl delete -f kubernetes/qa-api-deployment.yaml

## qa-ui

1. Built the kubernetes image for qa-ui with the command (In qa-ui folder!)

    minikube image build -t qa-ui -f ./Dockerfile .

2. Deploy service and application
kubectl apply -f kubernetes/qa-ui-deployment.yaml,kubernetes/qa-ui-service.yaml


## Kubernetes Kompose

Translate docker-compose.yml to kuberentes configuration files
In directory with yml files run
kompose convert
or
kompose --file docker-compose.prod.yml convert

## Use Kubernets Kompose files

kubectl apply -f kubernetes-kompose/nginx-deployment.yaml,kubernetes-kompose/nginx-service.yaml,kubernetes-kompose/nginx-claim0-persistentvolumeclaim.yaml

did not work with nginx