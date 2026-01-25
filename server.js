import createApp from "./server/app.js";

const PORT = 5080;
const app = createApp();

app.listen(PORT, () => {
  console.log("Startar Server...");
});
