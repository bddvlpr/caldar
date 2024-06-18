import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dbCredentials: {
        url: process.env.POSTGRES_URL!
    },
    dialect: 'postgresql',
    out: 'migrations',
    schema: 'src/lib/server/database/schema/**',
    strict: true,
    verbose: true
});
