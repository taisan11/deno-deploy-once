import { once } from "./hono.ts"
import {Hono} from "npm:hono"

const app = new Hono()
app.use(await once({}))
app.get('/', (c) => c.text('Hono!'))

Deno.serve(app.fetch)