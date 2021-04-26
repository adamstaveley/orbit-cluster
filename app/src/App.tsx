import OrbitDB from 'orbit-db';
import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LoginForm } from './components/login.form';
import { OrbitTest } from './components/orbit-test';
import { JsonPeerId, useIdentity } from './hooks/useIdentity';
import { useIPFS } from './hooks/useIPFS';
import { useOrbit } from './hooks/useOrbit';

function App() {
  const [loginError, setLoginError] = useState<string | undefined>();
  const [peerId, setPeerId] = useState<JsonPeerId | undefined>()
  const [db, setDb] = useState<OrbitDB | undefined>()

  const identity = useIdentity()
  const ipfs = useIPFS()
  const orbit = useOrbit()

  useEffect(() => {
    const createDb = async () => {
      if (peerId && !db) {
        const peers = await (await fetch('http://localhost:5010/peers/ws')).json()
        const peer = await ipfs(peerId, peers)
        console.log('me', await peer.id())
        setDb(await orbit(peer))
      }
    }
    createDb()
  }, [peerId, ipfs, orbit, db, setDb])

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

        {db && <OrbitTest orbit={db} />}
      {/* </header> */}
    </div>
  );
}

export default App;
