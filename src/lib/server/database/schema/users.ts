import { pgTable, serial, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),

        provider: varchar('provider', { length: 256 }).notNull(),
        providerId: varchar('providerId', { length: 256 }).notNull(),

        createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date())
    },
    ({ provider, providerId }) => ({
        provider: unique().on(provider, providerId)
    })
);
