import path from "path";
import express from "express";
import { fileURLToPath } from "url";

import pagesRouter from "./routes/pages.js";
import moviesRouter from "./routes/movies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function createApp() {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use("/src", express.static(path.join(__dirname, "..", "src")));
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use("/", pagesRouter);
  app.use("/movies", moviesRouter);

  app.use((req, res) => {
    res.status(404).render("pages/404", { title: "404 - Sidan hittades inte" });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res
      .status(500)
      .render("pages/500", { title: "Något gick fel, försök igen senare..." });
  });
  return app;
}
