import { links } from './links';
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const timetables = pgTable('timetables', {
    id: serial('id').primaryKey(),

    linkId: integer('link_id')
        .notNull()
        .references(() => links.id),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date())
});

export const timetablesRelations = relations(timetables, ({ one }) => ({
    link: one(links, {
        fields: [timetables.linkId],
        references: [links.id]
    })
}));
