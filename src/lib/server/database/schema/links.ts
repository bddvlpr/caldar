import { users } from './users';
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
    id: serial('id').primaryKey(),

    userId: integer('user_id')
        .notNull()
        .references(() => users.id),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date())
});

export const linksRelations = relations(links, ({ one }) => ({
    user: one(users, {
        fields: [links.userId],
        references: [users.id]
    })
}));
