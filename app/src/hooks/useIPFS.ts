import IPFS, { multiaddr, PeerId } from 'ipfs'
import { JsonPeerId } from './useIdentity'

// for using in localhost
const WS = require('libp2p-websockets')
const filters = require('libp2p-websockets/src/filters')

export const useIPFS = () => {
    return async (peerId: JsonPeerId, peers: string[]) => {
        // create full IPFS node / could also use http client?
        const ipfs = await IPFS.create({
            config: {
                // defaults in ipfs-core/src/runtime/config-browser.js
                Addresses: {
                    Swarm: [
                        '/dns4/localhost/tcp/9090/ws/p2p-webrtc-star/'
                    ],
                    // could also use a delegate instead of bootstrap peers (reduce bandwidth?)
                    // Delegates: [<multiaddr>]
                },
                Discovery: {
                    MDNS: {
                        Enabled: false,
                        Interval: 10
                    },
                    webRTCStar: {
                        Enabled: true
                    }
                },
                // overwrite boostrap peers with those in our private net
                // somehow automatically finds localhost even with MDNS off
                Bootstrap: [],
            },
            repo: `ipfs-${peerId.id}`,
            init: {
                algorithm: 'Ed25519',
                privateKey: await PeerId.createFromJSON(peerId)
            },
            libp2p: {
                config: {
                    transport: {
                        // In a production environment the default filter should be used
                        // where only DNS + WSS addresses will be dialed by websockets in the browser.
                        [WS.prototype[Symbol.toStringTag]]: {
                            filter: filters.all
                        }
                    }
                }
            }
        })

        // console.log('bootstrapped?', await ipfs.bootstrap.list())

        for (const peer of peers) {
            const address = multiaddr(peer)
            try {
                await ipfs.swarm.connect(address)
                console.log('connected to', peer)
            } catch (err) {
                console.log('failed to connect:', err.message)
            }
        }

        // setInterval(async () => {
        //     const swarm = await ipfs.swarm.peers()
        //     console.log('swarm', swarm)
        // }, 1000)
        return ipfs
    }
}
