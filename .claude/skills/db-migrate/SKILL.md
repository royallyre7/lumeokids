---
name: db-migrate
description: Use after changing prisma/schema.prisma — runs migration, regenerates client, and verifies schema.
---

# Database Migration

Run this skill whenever you add or change a Prisma model.

## Steps

1. Generate a migration with a descriptive name:
   ```bash
   npx prisma migrate dev --name <describe-the-change>
   ```

2. Regenerate the Prisma client so TypeScript types are up to date:
   ```bash
   npx prisma generate
   ```

3. Verify the database reflects the schema (optional, requires prisma studio):
   ```bash
   npx prisma studio --port 5555
   ```

## Rules

- Use `--name` that describes what changed (e.g. `add-user-model`, `add-child-relations`).
- Never run `prisma migrate reset` in production — it destroys data.
- If the migration fails, check that `DATABASE_URL` in `.env` is correct and the database is running.
