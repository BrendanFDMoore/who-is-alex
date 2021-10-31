import React, {useState, useEffect, useCallback} from "react"
import { Link } from "gatsby"
import querystring from "querystring"
import Peer from 'peerjs';

import { Button, Container, TextInput } from "nes-react"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"


const NicknameInput = ({setNickname}) => {
  const [internalNickname, setInternalNickname] = useState('');

  const submitNickname = useCallback(async () => {
    console.log('submitNickname callback')
    setNickname(internalNickname)
  }, [internalNickname, setNickname]);

  return (
    <div>
      <TextInput
        label="Enter a nickname..."
        placeholder="e.g. Sam"
        value={internalNickname}
        onChange={e => setInternalNickname(e.target.value)}
      />
      <Button primary onClick={submitNickname} disabled={internalNickname.length == 0}>⏎</Button>
    </div>
  )
}

const GamePage = ({location}) => {
  const [uuid, setUuid] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [nickname, setNickname] = useState('');

  // const c = useCallback(async () => {
  //   console.log('submitNickname callback')
  //   setNickname(internalNickname)
  // }, [internalNickname, setNickname]);

  useEffect(async () => {
    async function setGameUuidFromQuery() {
     console.log('setGameUuidFromQuery');
     console.log(location);
     const qsObj = querystring.parse(location.search.substr(1))
     console.log(qsObj)
     setUuid(qsObj.id)
    }

    await setGameUuidFromQuery();
    setupNewPeer();
  }, []);

  const setupNewPeer = useCallback(() => {
    function setupNewPeerId() {
      console.log('setupNewPeerId');
      const peer = new Peer(); 
      console.log({peer});
      setPeerId(peer)
    }

    setupNewPeerId();
  }, []);

  return (
    <Layout>
      <SEO title="Game Page" />
      <h1>Game Room</h1>
      { !uuid && <Container>Loading...⏳</Container>}
      { uuid && !nickname &&  <NicknameInput setNickname={setNickname}/>}
      {nickname && <p>Welcome to the game room, {nickname}!</p>}
      {uuid && <p>game id: {uuid}</p>}

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default GamePage
