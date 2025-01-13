/**
 * 
 * @param defaultRegion https://docs.deno.com/deploy/manual/regions/
 * @param kv 
 */
export async function once({defaultRegion,kv}:{defaultRegion?:string,kv?:Deno.Kv}) {
  const dr = defaultRegion ||Deno.env.get("DEFAULT_REGION")
  kv = kv || await Deno.openKv()
  if (await kv.get(["deno-deploy-once","region"])) { }
}