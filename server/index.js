const path = require('path')
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const fetch = require('node-fetch')
const createClient = require('ipfs-http-client')

const port = [4002, 4003][parseInt(process.env.NODE, 10)]

if (!port) {
    console.log('Expected NODE to be set.')
    process.exit(1)
}

console.log('using swarm port', port)
console.log('using API port', port + 1000)

const main = async () => {
    const peers = await (await fetch('http://localhost:5010/peers')).json()
    console.log('got peers:', peers)

    const tcpPeers = peers.filter(peer => peer.match('tcp'))

    const ifps = createClient

    // const ipfs = await IPFS.create({
    //     config: {
    //         Addresses: {
    //             API: `/ip4/0.0.0.0/tcp/${port + 1000}`,
    //             Swarm: [
    //                 `/ip4/0.0.0.0/tcp/${port}`,
    //                 `/ip4/0.0.0.0/tcp/${port + 10}/ws`
    //             ],
    //             Gateway: `/ip4/0.0.0.0/tcp/port + 4000`,
    //             Announce: [],
    //             NoAccounce: []
    //         },
    //         API: {
    //             HTTPHeaders: {
    //                 'Access-Control-Allow-Origin': ['http://localhost:3000'],
    //                 'Access-Control-Allow-Methods': ['PUT', 'POST', 'GET']
    //             }
    //         },
    //         Bootstrap: tcpPeers
    //     },
    //     repo: path.join(__dirname, `../data/peer_${port}`),
    //     init: {
    //         algorithm: 'Ed25519'
    //     },
    //     start: true
    // })

    // setInterval(async () => {
    //     const peers = await ipfs.swarm.peers()
    //     console.log('peers:', new Set(peers.map(({peer}) => peer)))
    // }, 120 * 1000)


    // TODO: use ipfs http api to connect to local go node
    const orbit = await OrbitDB.createInstance(ipfs)
}

main()
