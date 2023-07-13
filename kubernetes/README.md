# What I did for kubernetes already

First: '$minikube status' and probably '$minikube start'

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

    minikube image build -t qa-api -f ./Dockerfile .


