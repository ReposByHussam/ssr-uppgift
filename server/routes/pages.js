import express from "express";
import { getMovies } from "../services/moviesApi.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await getMovies();
    res.render("pages/index", { title: "Kino - Uppsala", movies });
  } catch (err) {
    next(err);
  }
});
router.get("/index.html", (req, res) => res.redirect(301, "/"));

router.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Kino - Kontakt" });
});
router.get("/contact.html", (req, res) => res.redirect(301, "/contact"));

router.get("/bistro", (req, res) => {
  res.render("pages/bistro", { title: "Kino - Bistro" });
});
router.get("/bistro.html", (req, res) => res.redirect(301, "/bistro"));

router.get("/about-us", (req, res) => {
  res.render("pages/about-us", { title: "Kino - Om oss" });
});
router.get("/about-us.html", (req, res) => res.redirect(301, "/about-us"));

router.get("/eventPage", (req, res) => {
  res.render("pages/eventPage", { title: "Kino - Evenemang" });
});
router.get("/eventPage.html", (req, res) => res.redirect(301, "/eventPage"));

export default router;
