import router from './gear.js';
import express from 'express';
const app = express();
app.use(router);
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("App listening on port 3000");
})