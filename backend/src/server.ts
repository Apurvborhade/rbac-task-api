import app from './app';
import dotenv from 'dotenv';

dotenv.config();

import { PORT } from './utils/constants';
import { errorMiddleware } from './middleware/error.middleware';


app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});