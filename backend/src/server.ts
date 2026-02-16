import app from './app';
import dotenv from 'dotenv';

dotenv.config();

import { PORT } from './utils/constants';



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});