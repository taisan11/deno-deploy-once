/**
 * 
 * @param defaultRegion https://docs.deno.com/deploy/manual/regions/
 * @example ```ts
 * import {once} from ""
 * 
 * Deno.serve((req) => {
 * once({defaultRegion:"us-central1"}).catch(return new Response("Already ran in this region"))
 * // your code here.....
 * })
 * ```
 * @param kv 
 */
export async function once({defaultRegion,kv}:{defaultRegion?:string,kv?:Deno.Kv}) {
    kv = kv || await Deno.openKv()
    const region = await kv.get(["deno-deploy-once","region"])
    if (region.value) { 
      if (region.value != Deno.env.get("DENO_REGION")) {
        throw new Error("Already ran in this region")
      }
    } else {
      console.log("First run")
      await kv.set(["deno-deploy-once","region"],defaultRegion||Deno.env.get("DEFAULT_REGION")||Deno.env.get("DENO_REGION"))
    }
  }