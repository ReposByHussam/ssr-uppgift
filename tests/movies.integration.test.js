import request from "supertest";
import createApp from "../server/app.js";

describe("Integration tests for movie pages (Jest + Supertest)", () => {
  const app = createApp();

  test("GET /movies - should return 200 and contain movie titles", async () => {
    const response = await request(app).get("/movies");
    expect(response.status).toBe(200);

    const match = response.text.match(/href="\/movies\/(\d+)"/);
    expect(match).not.toBeNull();
    const movieId = match[1];

    const movieTitleMatch = response.text.match(
      /<h3 class="movieCard__title">([^<]+)<\/h3>/,
    );
    expect(movieTitleMatch).not.toBeNull();
    const movieTitle = movieTitleMatch[1].trim();

    const movieResponse = await request(app).get(`/movies/${movieId}`);
    expect(movieResponse.status).toBe(200);

    expect(response.text).toContain(movieTitle);
  });

  test("Unknown movie ID should return 404", async () => {
    const res = await request(app).get("/movies/99999999999999999999999");
    expect(res.status).toBe(404);
    expect(res.text).toContain("404");
  });
});
