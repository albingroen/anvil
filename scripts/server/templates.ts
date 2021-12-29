export const FASTIFY_TEMPLATE = `import Fastify from 'fastify'
import cors from 'fastify-cors'
import dotenv from 'dotenv'
const fastify = Fastify()

fastify.register(cors)
dotenv.config()

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen(process.env.PORT || 5000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.info(\`server listening on \${address}\`)
})`
