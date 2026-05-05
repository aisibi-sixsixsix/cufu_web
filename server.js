const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const VISITS_FILE = path.join(__dirname, 'data.json');

app.use(express.json());

app.get('/api/visits', (req, res) => {
  let data = { count: 0, visits: [] };
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const content = fs.readFileSync(VISITS_FILE, 'utf-8');
      data = JSON.parse(content);
      if (typeof data.count !== 'number') data.count = 0;
      if (!Array.isArray(data.visits)) data.visits = [];
    }
  } catch (e) {
    console.error('读取文件失败:', e);
  }

  data.count += 1;
  data.visits.unshift({ time: new Date().toLocaleString('zh-CN') });
  fs.writeFileSync(VISITS_FILE, JSON.stringify(data, null, 2));

  res.json({ count: data.count, lastVisit: data.visits[data.visits.length - 1].time });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`访客统计: http://localhost:${PORT}/api/visits`);
});