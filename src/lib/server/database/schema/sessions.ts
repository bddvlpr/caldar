import { users } from './users';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
    id: varchar('id', { length: 256 }).primaryKey(),

    userId: integer('user_id')
        .notNull()
        .references(() => users.id),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});
