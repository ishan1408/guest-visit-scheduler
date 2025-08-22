import mongoose from 'mongoose';


export const connectDB = async (uri) => {
try {
const conn = await mongoose.connect(uri, {
autoIndex: true,
serverSelectionTimeoutMS: 10000,
});
console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};