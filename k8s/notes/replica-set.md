# Replica Set

Create the replica set.

```
➜ kubectl apply -f k8s/replica-set.yml
replicaset.apps/learn-k8s-replica-set created
```

Now we fetch all the objects.

```
➜  kubectl get all
NAME                              READY   STATUS    RESTARTS   AGE
pod/learn-k8s-replica-set-cb54h   1/1     Running   0          2m58s
pod/learn-k8s-replica-set-q82r4   1/1     Running   0          2m58s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.43.0.1    <none>        443/TCP   242d

NAME                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/learn-k8s-replica-set   2         2         2       2m58s
```

Port forwarding to one of the pods.

```
➜ kubectl port-forward pod/learn-k8s-replica-set-cb54h 3000:3000
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
```

Making curl request.

```
➜ curl localhost:3000
{"data":{"message":"Hello, World!"}}
```
