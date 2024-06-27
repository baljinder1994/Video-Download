// server.js
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());

app.get('/video', async (req, res) => {
  const url = req.query.url;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

  res.json({
    title: info.videoDetails.title,
    download_url: format.url,
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
