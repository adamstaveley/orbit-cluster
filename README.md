# Orbit Cluster

## Setup

Install deps for browser/server sides.
```
yarn
cd app
yarn
```

## IPFS Setup

1. Install go-ipfs or js-ipfs.
2. Init IPFS nodes

```
ipfs --config /tmp/node0 init
ipfs --config /tmp/node1 init
```

3. Modify configs (`/tmp/node0/config` and `/tmp/node1/config`):
    - remove bootstrap peers
    - modify swarm addresses
        - add a websocket endpoint: `/ip4/0.0.0.0/tcp/4xxx/ws`
        - make sure the nodes are using different ports

4. Run daemon

```
ipfs --config /tmp/node0 daemon
ipfs --config /tmp/node1 daemon
```

Test they are connected:
```
ipfs --config /tmp/node0 bootstrap peers
ipfs --config /tmp/node0 bootstrap peers
```

5. Run bootstrapper

Note this is not needed right now because the peers are found automatically (using MDNS?).

TODO: turn MDNS off in the server nodes to test this assumption (already off in browser).

```
node server/bootstrapper.js
```

6. Run frontend

```
cd app
yarn start
```
