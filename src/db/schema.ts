import { mysqlTable, varchar, serial, text, int, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

const timestampHelper = {
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    deletedAt: timestamp('deleted_at'),
};

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    ...timestampHelper,
});

export const photos = mysqlTable('photos', {
    id: int('id').primaryKey().autoincrement(),
    caption: varchar('caption', { length: 255 }),
    tags: varchar('tags', { length: 255 }),
    photoUrl: varchar('photo_url', { length: 500 }).notNull(),
    userId: int('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    ...timestampHelper,
});

// // Relations
// export const usersRelations = relations(users, ({ many }) => ({
//     photos: many(photos),
// }));

// export const photosRelations = relations(photos, ({ one }) => ({
//     user: one(users, {
//         fields: [photos.userId],
//         references: [users.id],
//     }),
// }));
