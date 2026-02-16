import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

import { PORT } from './utils/constants.js';
import { errorMiddleware } from './middleware/error.middleware.js';


app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});