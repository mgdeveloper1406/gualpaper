require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { graphqlHTTP } = require("express-graphql")
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")

const { buildSchema, print } = require("graphql")
const schema = buildSchema(print(graphqlSchema));
var cors = require('cors');
const initialData = require("./lib/initialData.js")

let mongo_url = `mongodb://`
if (process.env.MONGO_USER || process.env.MONGO_PASSWORD) {
  if (process.env.MONGO_USER) mongo_url += `${process.env.MONGO_USER}`
  if (process.env.MONGO_PASSWORD) mongo_url += `:${encodeURIComponent(process.env.MONGO_PASSWORD)}`
  mongo_url += `@`
}
mongo_url += `${process.env.MONGO_HOST}/${process.env.MONGO_DB}`
//
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(mongo_url, options)
  .then(() => {
    console.log('Database connection sucessfully')
  })
  .catch(error => {
    throw error
  })

mongoose.connection.once('open', function () {
	initialData.addInitData()
});

const SECRET = process.env.SECRET
const getUser = (req) => {
  const token = req.headers['authorization']
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0MjY3NTVkY2ZkNmYzMDQyMjk2NjA3YSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY4MDI0NDE2NCwiZXhwIjoxNjg4ODg0MTY0fQ.jVOdZtsPrdrvWJFC53Vh1uycflwCmORvQVOcsLiHTsQ"
  try {
		if (token) { // If Header has token
			const { user } = jwt.verify(token, SECRET) // If the token is valid then assign data into the user otherwise throw error;
      if (user) {
        return {user} // Return user data
      } else {
        return null
      }
		} else {
			return null // If token is not present in the header then return null
		}
	} catch (err) {
		return false // If token is invalid then return false
	}
}

const app = express()
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP((req) => {
    return {
      schema,
      rootValue: graphqlResolvers,
      graphiql: true,
      context: {
        user: getUser(req)
      }
    }
  })
)

app.listen(5000, () => console.log("Server is running on localhost:5000"))
