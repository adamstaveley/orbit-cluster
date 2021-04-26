import { IPFS } from 'ipfs'
import OrbitDB from 'orbit-db'

export const useOrbit = () => async (ipfs: IPFS) => {
    const orbit = await OrbitDB.createInstance(ipfs)
    console.log(orbit);
    return orbit
}
