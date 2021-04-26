import IPFS, { PeerId } from 'ipfs'
import { JsonPeerId } from './useIdentity'

export const useIPFS = () => {
    return async (peerId: JsonPeerId, peers: string[]) => {
        // create full IPFS node / could also use http client?
        const ipfs = await IPFS.create({
            config: {
                // defaults in ipfs-core/src/runtime/config-browser.js
                Addresses: {
                    // could also use a delegate instead of bootstrap peers (reduce bandwidth?)
                    // Delegates: [<multiaddr>]
                },
                Discovery: {
                    MDNS: {
                        Enabled: false,
                        Interval: 10
                    },
                    webRTCStar: {
                        Enabled: false
                    }
                },
                // overwrite boostrap peers with those in our private net
                // somehow automatically finds localhost even with MDNS off
                // Bootstrap: peers,
            },
            // repo: `ipfs-${peerId.id}`,
            init: {
                algorithm: 'Ed25519',
                privateKey: await PeerId.createFromJSON(peerId)
            },
        })

        console.log('bootstrapped?', await ipfs.bootstrap.list())

        // for (const peer of peers) {
        //     const address = multiaddr(peer)
        //     console.log('adding addr manually', address)
        //     try {
        //         await ipfs.swarm.connect(address)
        //     } catch (err) {
        //         console.log('failed to connect:', err.message)
        //     }
        // }

        // setInterval(async () => {
        //     const swarm = await ipfs.swarm.peers()
        //     console.log('swarm', swarm)
        // }, 10000)
        return ipfs
    }
}
