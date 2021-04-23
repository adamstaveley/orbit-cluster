const path = require('path')
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const fetch = require('node-fetch')

const port = [5002, 5003][parseInt(process.env.NODE, 10)]

if (!port) {
    console.log('Expected NODE to be set.')
    process.exit(1)
}

console.log('using port', port)

const main = async () => {
    const peers = await (await fetch('http://localhost:5010/peers')).json()
    console.log('got peers:', peers)

    // remove self
    const boostrapPeers = peers.filter(peer => !peer.endsWith(`${port}`))
    console.log('boostrap:', boostrapPeers)

    const ipfs = await IPFS.create({
        config: {
            Bootstrap: boostrapPeers
        },
        repo: path.join(__dirname, `../data/peer_${port}`)
    })

    const orbit = await OrbitDB.createInstance(ipfs)
}

main()
