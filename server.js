import 'dotenv/config.js';
import app from './src/app.js';

app.listen(process.env.PORT, () => {
  console.log(`Api listening on port ${process.env.PORT}`);
});
