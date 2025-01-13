/**
 * 
 * @param defaultRegion https://docs.deno.com/deploy/manual/regions/
 * @param kv 
 */
export async function once({defaultRegion,kv}:{defaultRegion?:string,kv?:Deno.Kv}) {
  const dr = defaultRegion ||Deno.env.get("DENO_REGION")
  console.log("deRegion:",dr)
  kv = kv || await Deno.openKv()
  const region = await kv.get(["deno-deploy-once","region"])
  console.log("region:",region)
  if (region) { 
    if (region.value === dr) {
      console.log("Already ran in this region")
      Deno.exit(0)
    }
  } else {
    await kv.set(["deno-deploy-once","region"],dr)
  }
}