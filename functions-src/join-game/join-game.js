const faunadb = require('faunadb');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async function(event, context, callback) {
  console.log('join game handler')
  console.log({event})
  try {
    //-- Parse the body contents into an object.
    const data = JSON.parse(event.body)
    console.log({data});

    const code = data.code;

    return client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('gamerefs_by_code'), code)
        ),
        ref => q.Get(ref)
      )
    )
    .then((response) => {
      console.log("success", response)
      const twohoursago = dayjs().subtract(2,'hour');
      const games = response.data
        .map(({data}) => data )
        .filter(({created}) => dayjs.unix(created) > twohoursago)

      if (games.length == 1){
        /* Success! return the response with statusCode 200 */
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(games[0])
        })
      } else {
        return callback(null, {
          statusCode: 400,
          body: JSON.stringify({msg: 'Invalid game code'})
        })
      }
      
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}