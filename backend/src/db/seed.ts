import { seedData } from "@/db/seedData/data";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { db } from "@/db/connection";

async function main() {
  const env = dotenv.config({ path: "../.env.production.development" });
  dotenvExpand.expand(env);
  await seedData(db);
}

main().finally(() => db.$disconnect());
