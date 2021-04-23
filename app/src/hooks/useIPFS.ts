import IPFS, { PeerId } from 'ipfs'
import { JsonPeerId } from './useIdentity'

export const useIPFS = () => {
    return async (peerId: JsonPeerId, boostrapPeers: string[]) => IPFS.create({
        config: {
            // defaults in ipfs-core/src/runtime/config-browser.js
            Addresses: {},
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
            Bootstrap: boostrapPeers
        },
        repo: `ipfs-${peerId.id}`,
        init: {
            algorithm: 'Ed25519',
            privateKey: await PeerId.createFromJSON(peerId)
        }
    })
}
