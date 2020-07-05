// import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React, {useCallback, useState} from "react"

import { Button, TextInput } from "nes-react"

const Welcome = () => {
  const [gamecode, setGamecode] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const createGame = useCallback(async () => {
    console.log('createGame callback')
    setErrorMessage(null)
    const response = await fetch("/.netlify/functions/create-game",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({creator: 'me', coolvalue:456}),
    });
    console.log({response});
    if (response.status >= 400) {
      console.log('error status')
      setErrorMessage('Encountered error creating game. Please try again.')
    } else {
      const data = await response.json();
      console.log(data)
    }
  }, []) 

  const joinGame = useCallback(async () => {
    console.log('joinGame callback')
    setErrorMessage(null)
    const response = await fetch("/.netlify/functions/join-game",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code: gamecode}),
    });
    const games = await response.json();
    console.log(games);
    if (response.status >= 400) {
      setErrorMessage('Invalid code');
    } else {
      // redirect to games[0].uuid
    }
  }, [gamecode]) 


  return (
    <>
      <h1>Welcome!</h1>
      <p>This is a work in progress.</p>
      <div>
        <TextInput
          label="Join a game"
          placeholder="e.g. ABCD"
          value={gamecode}
          onChange={e => setGamecode(e.target.value.toUpperCase())}
        />
        <Button primary onClick={joinGame}>Join Game</Button>
        <h3>OR</h3>
        <Button success onClick={createGame}>Create New Game</Button>
        <p>{errorMessage}</p>

      </div>
    </>
  );
}
Welcome.propTypes = {
}

Welcome.defaultProps = {
}

export default Welcome
