const faunadb = require('faunadb');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

const GAMECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GAMECODE_LENGTH = 1;
const generateRoomCode = () =>
  [...Array(GAMECODE_LENGTH)]
  .map(() => GAMECODE_CHARS.charAt(Math.floor(Math.random() * GAMECODE_CHARS.length)))
  .join('');

exports.handler = async function(event, context, callback) {
  console.log('create game handler')
  console.log({event})
  try {
    let gamecode = generateRoomCode();
    // while ()
    const gameuuid = uuidv4();
    const now = dayjs();
    const today = now.format('YYYY-MM-DD');

    const newGame = {
      data: {
        code: gamecode,
        uuid: gameuuid,
        created: now.unix(),
        status: 'new',
        created_day: today,
      }
    }
    console.log(newGame);

    return client.query(q.Create(q.Ref("classes/games"), newGame))
    .then((response) => {
      console.log("success", response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({msg: 'Error creating new game.'})
      })
    })
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Encountered error while creating new game. Please try again.' }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}