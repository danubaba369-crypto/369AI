import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const possiblePaths = [
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public"),
    path.resolve(__dirname, "..", "dist", "public"),
    path.resolve(__dirname, "..", "public"),
  ];

  const distPath = possiblePaths.find((p) => fs.existsSync(p) && fs.statSync(p).isDirectory());

  if (!distPath) {
    console.error("Static files not found in:", possiblePaths);
    return; // Don't crash, just log. Vercel routes might handle it.
  }

  console.log(`[static] serving from ${distPath}`);
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not Found");
    }
  });
}
