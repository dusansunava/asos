import express, { Response, Request } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import router from "./routes";
import dotenvExpand from "dotenv-expand";
import path from "path";
import { EnvVariablesSchema } from "./schema";
import credentials from "@/middleware/credentials";
import corsOptions from "@/config/corsOptions";
import { SUPPORTED_LANGUAGES } from "./config/constants";
import language from "@/middleware/language";

if (process.env.NODE_ENV === "development") {
  const env = dotenv.config({ path: "../.env.development" });
  dotenvExpand.expand(env);
}

const result = EnvVariablesSchema.safeParse(process.env);
if (!result.success) {
  throw result.error.format();
}

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(credentials);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(language);
app.set("trust proxy", true);

app.use("/api", router());

app.get("/api/translations", (req: Request, res: Response) => {
  const language = req.language;
  if (language && SUPPORTED_LANGUAGES.includes(language)) {
    return res.sendFile(path.join(__dirname, "locales", `${language}.json`));
  }
  return res.sendFile(path.join(__dirname, "locales", "en.json"));
});

const server = http.createServer(app);

const port = process.env.BE_PORT;
const host = process.env.SERVER_HOST;

server.listen(port, () => {
  console.log(`Server running on ${host}:${port}`);
});
