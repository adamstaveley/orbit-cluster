import OrbitDB from 'orbit-db'
import React, { useEffect } from 'react'

export const OrbitTest = ({ orbit }: { orbit: OrbitDB }) => {
    const [peerCount, setPeerCount] = React.useState(0)

    useEffect(() => {
        setInterval(async () => {
            const peers = await orbit._ipfs.swarm.peers()
            setPeerCount(peers.length)
        }, 5000)
    }, [setPeerCount, orbit])

    const shorten = (some: string) => `${some.substring(0, 5)}...${some.substring(some.length - 5)}`

    return (
        <div>
            <h2>Orbit DB</h2>
            <p>ID: {shorten(orbit.id)}</p>
            <p>Peers: {peerCount}</p>
        </div>
    )
}
