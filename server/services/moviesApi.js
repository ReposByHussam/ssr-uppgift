import axios from "axios";
export const API_BASE =
  "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

export function mapMovieData(item) {
  const a = item?.attributes ?? {};
  return {
    id: item?.id,
    title: a.title ?? "",
    intro: a.intro ?? "",
    imageUrl: a.image?.url ?? null,
  };
}

export async function getMovies() {
  const { data } = await axios.get(API_BASE, { timeout: 10_000 });
  const list = data?.data ?? [];
  return list.map(mapMovieData);
}

export async function getMovieById(id) {
  const { data } = await axios.get(`${API_BASE}/${id}`);
  const item = data?.data;
  return item ? mapMovieData(item) : null;
}
