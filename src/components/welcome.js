import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { Container, Button, TextInput } from "nes-react"

const Header = ({ intro = null, siteTitle = 'Set [siteTitle]' }) => (
  <>
    <h1>Welcome!</h1>
    <p>This is a work in progress.</p>
    <div>
      <TextInput
        label="Join a game"
        placeholder="ABCD"
        value={null}
        // onChange={e => this.setState({ textInput: e.target.value })}
        onChange={e => ({})}
      />
      <Button primary>Join Game</Button>
      <h3>OR</h3>
      <Button success>Create New Game</Button>
    </div>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
