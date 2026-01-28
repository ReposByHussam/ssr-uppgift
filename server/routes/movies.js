import express from "express";
import markdownIt from "markdown-it";
import { getMovies, getMovieById } from "../services/moviesApi.js";

const router = express.Router();

const md = new markdownIt({
  html: false,
  linkify: true,
  breaks: true,
});

router.get("/", async (req, res, next) => {
  try {
    const movies = await getMovies();
    res.render("movies/index", { title: "Filmer", movies });
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await getMovieById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .render("404", { title: "404 - Sidan / Filmen hittades inte" });
    }
    const introHtml = md.render(movie.intro || "");

    res.render("movies/show", {
      title: movie.title,
      movie,
      introHtml,
    });
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404 || status === 500) {
      return res
        .status(404)
        .render("pages/404", { title: "404 - Sidan / Filmen hittades inte" });
    }
    next(err);
  }
});
export default router;
