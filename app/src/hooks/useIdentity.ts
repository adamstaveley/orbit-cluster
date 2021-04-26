import crypto from 'libp2p-crypto'
import { PeerId } from 'ipfs'

export type JsonPeerId = {
    id: string
    privKey?: string
    pubKey?: string
}

export type UseIdentityReturnType = {
    getEd25519Key: (email: string, password: string) => Promise<JsonPeerId>
}

export const useIdentity = (): UseIdentityReturnType => {
    const encoder = new TextEncoder()
    return {
        getEd25519Key: async (email: string, password: string) => {
            const entropy = crypto.pbkdf2(`${email}_${password}`, 'salty', 20000, 32, 'sha2-256').toString()
            const key = await crypto.keys.generateKeyPairFromSeed("Ed25519", encoder.encode(entropy), 2048)
            return (await PeerId.createFromPrivKey(key.bytes)).toJSON()
        }
    }
}
