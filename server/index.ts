import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

export const app = express();
export const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Initialization state
let routesRegistered = false;
let registrationPromise: Promise<void> | null = null;

const ensureRoutes = async () => {
  if (routesRegistered) return;
  if (!registrationPromise) {
    registrationPromise = (async () => {
      try {
        await registerRoutes(app);
        if (process.env.NODE_ENV === "production") {
          serveStatic(app);
        } else {
          const { setupVite } = await import("./vite");
          await setupVite(httpServer, app);
        }
        routesRegistered = true;
      } catch (err) {
        console.error("Critical Initialization Error:", err);
        throw err;
      }
    })();
  }
  return registrationPromise;
};

// Middleware to block until routes are ready
app.use(async (req, res, next) => {
  try {
    await ensureRoutes();
    next();
  } catch (err) {
    next(err);
  }
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

// Local development port binding
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  httpServer.listen(PORT, () => {
    console.log(`[local] server running on port ${PORT}`);
  });
}

export default app;
