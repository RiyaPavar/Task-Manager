// Temporarily disabled to prevent 500 errors when MongoDB is not running locally
export default async function dbConnect() {
  console.log('MongoDB connection skipped (Mock Mode Active)');
  return null;
}
