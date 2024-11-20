import "server-only";

import { apiVersion, dataset, projectId, token } from "../env";
import { createClient } from "next-sanity";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}
