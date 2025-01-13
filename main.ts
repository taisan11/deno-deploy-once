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
  if (region.value) { 
    if (region.value != dr) {
      throw new Error("Already ran in this region")
    }
  } else {
    console.log("First run")
    await kv.set(["deno-deploy-once","region"],dr)
  }
}