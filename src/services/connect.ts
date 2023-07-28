import mongoose from "mongoose";
import 'dotenv/config';

const connect = () => {
    return mongoose.connect(process.env['MONGO_URI']!, {
        dbName: 'travlDB',
    });
}

export default connect;