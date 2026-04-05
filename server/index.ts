import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { registerRoutes } from "./routes.js";

const entryUrl = import.meta.url;
const isBundledBuild =
  entryUrl.includes("/dist/index.js") || entryUrl.includes("\\dist\\index.js");
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = isBundledBuild ? "production" : "development";
}

const app = express();
const port = Number(process.env.PORT || process.env.SERVER_PORT) || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

async function start() {
  if (!isProd) {
    const [{ createServer: createViteServer }, { default: reactPlugin }] = await Promise.all([
      import("vite"),
      import("@vitejs/plugin-react"),
    ]);
    const vite = await createViteServer({
      root: path.join(__dirname, "../client"),
      base: process.env.BASE_PATH || "/",
      plugins: [reactPlugin()],
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const publicDir = path.join(__dirname, "public");
    app.use(express.static(publicDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  }

  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `[server] Port ${port} is already in use. Stop the other process (e.g. old "npm run dev") or set SERVER_PORT to a free port.`
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

export default app;
