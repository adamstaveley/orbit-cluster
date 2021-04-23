const express = require('express')

const app = express()
app.use(express.json())

// this would come from Switchboard
app.get('/peers', (_, res) => res.send([
    '/ip4/127.0.0.1/tcp/5002',
    '/ip4/127.0.0.1/tcp/5003',
    '/ip4/127.0.0.1/tcp/5004' // offline
]))

app.listen(5010, () => console.log('listening on 5010'))
