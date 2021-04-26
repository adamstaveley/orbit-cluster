import OrbitDB from 'orbit-db'
import React from 'react'

export const OrbitTest = ({ orbit }: { orbit: OrbitDB }) => {
    return (
        <div>
            <h2>Orbit DB</h2>
            <p>{orbit.id}</p>
        </div>
    )
}
