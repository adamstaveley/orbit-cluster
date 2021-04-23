const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

// this would come from Switchboard
app.get('/peers', (_, res) => res.send([
    '/ip4/127.0.0.1/tcp/5002',
    '/ip4/127.0.0.1/tcp/5003',
    '/ip4/127.0.0.1/tcp/5004' // offline
]))

app.listen(5010, () => console.log('listening on 5010'))
