const express = require('express')
const cors = require('cors');
const tcpPortUsed = require('tcp-port-used');

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

const findUsedPorts = async () => {
  try {
		var ports = [4002,4003];
    var usedPorts = [[], []],
      isInUse = [true, true];
    do {
      if (isInUse[0]) {
				usedPorts[0].push(ports[0])
        ports[0] += 2;
        isInUse[0] = await tcpPortUsed.check(ports[0], '127.0.0.1');
      }
      if (isInUse[1]) {
				usedPorts[1].push(ports[1])
        ports[1] += 2;
        isInUse[1] = await tcpPortUsed.check(ports[1], '127.0.0.1');
      }
    } while (isInUse[0] || isInUse[1]);

    return usedPorts;
  } catch (err) {
    console.error(err);
  }
};

// this would come from Switchboard
app.get('/peers', async (_, res) => {
	var ports = await findUsedPorts();
	var response = [];
	ports[0].map(port=>response.push(`/ip4/127.0.0.1/tcp/${port}`))
	ports[1].map(port=>response.push(`/ip4/127.0.0.1/tcp/${port}/ws`))
	res.send(response);
})

app.listen(5000, () => console.log('listening on 5000'))
