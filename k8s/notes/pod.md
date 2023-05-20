# Pod

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

### Curl request from inside the pod.

We can make the curl request using the IP address of the Pod listed above.

```
➜  kubectl exec -it learn-k8s /bin/sh

# curl 10.42.0.66:3000
{"data":{"message":"Hello, World!"}}
```

### Curl request using Port forwarding

First we create a secure tunnel between our local machine and the pod in the Kubernetes cluster
using the `kubectl port-forward`.

```
➜ kubectl port-forward learn-k8s 3000:3000
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
```

Without closing the above terminal, we open a new terminal and make the curl request.

```
➜  curl localhost:3000
{"data":{"message":"Hello, World!"}}
```
