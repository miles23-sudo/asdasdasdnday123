// server/index.ts
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

// server/routes.ts
function registerRoutes(app2) {
  app2.get("/api/health", (_req, res) => {
    const response = {
      status: "ok",
      message: "Birthday Surprise server is running"
    };
    res.json(response);
  });
}

// server/index.ts
var app = express();
var port = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3001;
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var isProd = process.env.NODE_ENV === "production";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
registerRoutes(app);
async function start() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      configFile: path.join(__dirname, "../vite.config.ts"),
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const publicDir = path.join(__dirname, "public");
    app.use(express.static(publicDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  }
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
var index_default = app;
export {
  index_default as default
};
