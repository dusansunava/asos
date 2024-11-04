function allowedOrigins() {
  if (process.env.ALLOWED_ORIGINS) {
    return process.env.ALLOWED_ORIGINS.split(",");
  }
  return [];
}

type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>;

const corsOptions = {
  origin: (
    requestOrigin: string | undefined,
    callback: (err: Error | null, origin?: StaticOrigin | undefined) => void
  ) => {
    if (!requestOrigin || allowedOrigins().includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};

export default corsOptions;
