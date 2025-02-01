import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const priority = pgEnum("priority", ["low", "medium", "high", "urgent"]);
export const status = pgEnum("status", ["todo", "in_progress", "done"]);
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  owner_id: text("owner_id")
    .notNull()
    .references(() => user.id),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  due_date: timestamp("due_date").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  project_id: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  priority: priority("priority").notNull(),
  status: status("status").notNull(),
});
