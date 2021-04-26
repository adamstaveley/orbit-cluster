const path = require('path');
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const fetch = require('node-fetch');
const tcpPortUsed = require('tcp-port-used');

const findFreePorts = async () => {
  try {
    var ports = [5001, 4000, 4001, 9089],
      isInUse = [true, true, true, true];
    do {
      if (isInUse[0]) isInUse[0] = await tcpPortUsed.check(++ports[0], '127.0.0.1');
      if (isInUse[1]) {
        ports[1] += 2;
        isInUse[1] = await tcpPortUsed.check(ports[1], '127.0.0.1');
      }
      if (isInUse[2]) {
        ports[2] += 2;
        isInUse[2] = await tcpPortUsed.check(ports[2], '127.0.0.1');
      }
      if (isInUse[3]) isInUse[3] = await tcpPortUsed.check(++ports[3], '127.0.0.1');
    } while (isInUse[0] || isInUse[1] || isInUse[2] || isInUse[3]);

    return ports;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const ports = await findFreePorts();
  console.log('using ports', ports);

  const peers = await (await fetch('http://localhost:5000/peers')).json();
  console.log('got peers:', peers);

  // remove self
  const boostrapPeers = peers.filter((peer) => !peer.endsWith(`${ports[1]}`) && !peer.endsWith(`${ports[2]}/ws`));
  console.log('boostrap:', boostrapPeers);

  const ipfs = await IPFS.create({
    config: {
      Bootstrap: boostrapPeers,
      Addresses: {
        Swarm: [`/ip4/0.0.0.0/tcp/${ports[1]}`, `/ip4/127.0.0.1/tcp/${ports[2]}/ws`],
        API: `/ip4/127.0.0.1/tcp/${ports[0]}`,
        Gateway: `/ip4/127.0.0.1/tcp/${ports[3]}`
      }
    },
    repo: path.join(__dirname, `../data/peer_${ports[1]}_${ports[2]}`)
  });
  // console.log(ipfs.id());

  const orbitdb = await OrbitDB.createInstance(ipfs);
	// console.log("orbitdb:", orbitdb);

	const db = await orbitdb.keyvalue('users')
	console.log(db.address.toString()) // tried to open this address in browser
	await db.put('name', 'Ali')
};

main();
