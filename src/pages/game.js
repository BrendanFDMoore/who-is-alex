import React, {useState, useEffect} from "react"
import { Link } from "gatsby"
import querystring from "querystring"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"

const GamePage = ({location}) => {
  const [uuid, setUuid] = useState('INITIAL_UUID');

  useEffect(() => {
    function setGameUuidFromQuery() {
     console.log('setGameUuidFromQuery');
     console.log(location);
     const qsObj = querystring.parse(location.search.substr(1))
     console.log(qsObj)
     setUuid(qsObj.id)
    }

    setGameUuidFromQuery();
  }, []);

  return (
    <Layout>
      <SEO title="GAme Page" />
      <h1>Hi from the game page</h1>
      <p>Welcome to the game page for {uuid}</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default GamePage
