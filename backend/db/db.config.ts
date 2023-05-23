export const databaseConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 27017,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'test',
  databaseName: process.env.DB_NAME || 'cinema-verse-db',
};
