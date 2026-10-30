import { copyFile } from "node:fs/promises"

// Explicitly update the checked-in snapshot; normal builds need no backend checkout.
const source = process.argv[2] ?? "../waypoint-be/api/openapi.yaml"
await copyFile(source, new URL("../api/openapi.yaml", import.meta.url))
console.log(`Updated API contract from ${source}`)
