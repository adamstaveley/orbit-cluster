import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LoginForm } from './components/login.form';
import { JsonPeerId, useIdentity } from './hooks/useIdentity';
import { useIPFS } from './hooks/useIPFS';

import OrbitDB from 'orbit-db';

function App() {
  const [loginError, setLoginError] = useState<string | undefined>();
  const [peerId, setPeerId] = useState<JsonPeerId | undefined>()

  const identity = useIdentity()
  const ipfs = useIPFS()

  useEffect(() => {
    const createIPFS = async () => {
      if (peerId) {
        const bootstrapPeers = await (await fetch('http://localhost:5000/peers')).json()
        console.log('peers', bootstrapPeers)
        const peer = await ipfs(peerId, bootstrapPeers)
        console.log('me', await peer.id())

				const orbitdb = await OrbitDB.createInstance(peer);
				// users db address from node
				// const db = await orbitdb.keyvalue('/orbitdb/zdpuAtyWmm5oiREUHhXrvaxmRLyypc2iaR5HL9htYegj7YXjD/users');
				// db.load();
				// console.log(db);
      }
    }
    createIPFS()
  }, [peerId, ipfs])

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <LoginForm
          identity={identity}
          onError={(err) => {
            setPeerId(undefined)
            setLoginError(err)
          }}
          onSubmit={async (key) => {
            setLoginError(undefined)
            setPeerId(key)
          }}
        />
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        {peerId && <p style={{ color: 'green' }}>{peerId.id}</p>}
      {/* </header> */}
    </div>
  );
}

export default App;
