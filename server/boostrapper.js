const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

// this would come from Switchboard
app.get('/peers/tcp', (_, res) => res.send([
    '/ip4/192.168.0.101/tcp/4001/p2p/12D3KooWRK5bQ2YcyQPxGDCbU3oRifsqC6uitWZ57qgs62wnhDmk',
    '/ip4/192.168.0.101/tcp/4011/p2p/12D3KooWECEqjGeecvvF14qUBPyhcZ2imGUgfNhtLBcy8i3MuEQq',
]))

app.get('/peers/ws', (_, res) => res.send([
    '/ip4/192.168.0.101/tcp/4002/ws/p2p/12D3KooWRK5bQ2YcyQPxGDCbU3oRifsqC6uitWZ57qgs62wnhDmk',
    '/ip4/192.168.0.101/tcp/4012/ws/p2p/12D3KooWECEqjGeecvvF14qUBPyhcZ2imGUgfNhtLBcy8i3MuEQq',
]))

app.get('/providers', (_, res) => res.send([
    'http://localhost:5001',
    'http://localhost:5011'
]))

app.listen(5010, () => console.log('listening on 5010'))
