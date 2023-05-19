# k8s

## Requirement

We can create and test out the image on our machine using any of the following.

* Docker Desktop
* Rancher Desktop

## Create pod

```
➜ kubectl apply -f pod.yml
pod/learn-k8s created
```

### Pod detail

```
➜ kubectl get pods -o wide
NAME        READY   STATUS    RESTARTS   AGE     IP           NODE                   NOMINATED NODE   READINESS GATES
learn-k8s   1/1     Running   0          4m55s   10.42.0.66   lima-rancher-desktop   <none>           <none>
```