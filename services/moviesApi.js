import axios from "axios";
export const API_BASE =
  "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

export function mapMovieData(item) {
  const a = item?.attributes;
  return {
    id: item.id,
    title: a?.title,
    intro: a?.intro || "",
    imdbRating: a?.imdbId || "",
    imageUrl: a.image?.url || "",
  };
}

export async function getMovies() {
  const response = await axios.get(`${API_BASE}/movies`, { timeout: 8000 });
  const data = response.data?.data || [];
  return data.map(mapMovieData);
}

export async function getMovieById(id) {
  const response = await axios.get(`${API_BASE}/movies/${id}`, {
    timeout: 8000,
  });
  const item = response.data?.data;
  return item ? mapMovieData(item) : null;
}
