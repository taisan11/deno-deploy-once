import {createMiddleware} from "npm:hono/factory"
import {HTTPException} from "npm:hono/http-exception"

/**
 * @example ```ts
 * import {Hono} from "hono"
 * import {once} from ""
 * 
 * const app = new Hono()
 * 
 * app.use(once({defaultRegion:"us-central1"}))
 * ```
 * @returns 
 */
export async function once({defaultRegion,kv}:{defaultRegion?:string,kv?:Deno.Kv}) {
    kv = kv || await Deno.openKv()
    const region = await kv.get(["deno-deploy-once","region"])
    if (!region.value||region.value==defaultRegion||region.value==Deno.env.get("DEFAULT_REGION")) {
        //first run or changed region
        kv.set(["deno-deploy-once","region"],defaultRegion||Deno.env.get("DEFAULT_REGION")||Deno.env.get("DENO_REGION"))
    }
    return createMiddleware(async (c,next) => {
        if (region.value && region.value != Deno.env.get("DENO_REGION")) {
            throw new HTTPException(409, { message: "Already ran in this region" })
        }
        await next()
        return
    })
}