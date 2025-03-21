import express from "express";
import cors from "cors";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

app.get("/api/pollen/:cityName", async (req, res) => {
  const cityName = req.params.cityName;
  const url = `https://api.ambeedata.com/latest/pollen/by-place?place=${cityName}`;
  const apiKey = "94041507041a3150f709836d930fb620c36fb28a54d7d27512007a7ab82bf830";

  try {
    console.log(`Fetching pollen data for city: ${cityName}`);
    console.log(`Request URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: "Failed to fetch pollen data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching pollen data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7ff2d54809cb5400fea929d83f975141`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: "Failed to fetch weather data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/api/map/:long/:lat", async (req, res) => {
  const { long, lat } = req.params;
  const layer = 'temp_new';
  const url = `https://tile.openweathermap.org/map/${layer}/1/${long}/${lat}.png?appid=7ff2d54809cb5400fea929d83f975141`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: "Failed to fetch map data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching map data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});