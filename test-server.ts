import { once } from "./main.ts"
once({})
import {Hono} from "npm:hono"

const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

Deno.serve(app.fetch)