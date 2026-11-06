# 02 — Architecture

## 1. Monorepo

```
apps/
  web/           Next.js (App Router) public portfolio — RSC first, ISR + tag revalidation
  admin/         Next.js admin dashboard / CMS            (next phase)
  api/           NestJS REST API, the only authoritative backend (phase after admin)
packages/
  config/        shared tsconfig presets
  types/         domain DTO types shared by web, admin and api
  schemas/       Zod schemas (page sections, contact form) — validated on both ends
  utils/         framework-free helpers (slugify, dates, cn)
  ui/            shared brand components (logo)
  content-seed/  CV-derived initial content; consumed by the Prisma seed and as web dev fallback
prisma/          schema.prisma, migrations, seed.ts (backend phase)
docs/
```

### Website-first delivery and the content contract

The website ships before the API. To avoid hard-coding content in components while the API does not yet
exist, the web app reads everything through **one typed content client** (`apps/web/src/lib/content`).
Each function maps to a planned public endpoint:

| Client function | Endpoint |
| --- | --- |
| `getSettings()` | `GET /api/v1/public/settings` |
| `getNavigation()` | `GET /api/v1/public/navigation` |
| `getPage(slug)` | `GET /api/v1/public/pages/:slug` |
| `getProjects()` | `GET /api/v1/public/projects` |
| `getProject(slug)` | `GET /api/v1/public/projects/:slug` |
| `getExperience()` | `GET /api/v1/public/experience` |
| `getSkills()` | `GET /api/v1/public/skills` |
| `getResume()` | `GET /api/v1/public/resume` |
| contact form | `POST /api/v1/public/contact` |

When `API_URL` is set, data comes from NestJS (with `next.revalidate` + cache tags). When it is not set
and `CONTENT_FALLBACK=seed`, the client serves `@du/content-seed` — the exact data the Prisma seed will
insert. Components never import content directly.

## 2. Database schema proposal (Prisma, PostgreSQL)

```
User(id, email@unique, name, passwordHash, isActive, twoFactorSecret?, lastLoginAt, failedLogins, lockedUntil, timestamps, deletedAt)
Role(id, key@unique [SUPER_ADMIN|EDITOR], name)            UserRole(userId, roleId) @@id
Permission(id, key@unique e.g. "pages.publish")            RolePermission(roleId, permissionId) @@id
RefreshToken(id, userId, familyId, tokenHash@unique, expiresAt, revokedAt, replacedById, ip, userAgent)
PasswordResetToken(id, userId, tokenHash@unique, expiresAt, usedAt)

Page(id, slug@unique, title, status [DRAFT|PUBLISHED|SCHEDULED], publishAt?, visibility, showInNav,
     navOrder, seo Json, publishedRevisionId?, timestamps, deletedAt)
PageSection(id, pageId, type, schemaVersion, order, data Json, settings Json)   @@index(pageId, order)
PageRevision(id, pageId, version, snapshot Json, createdById, createdAt)          @@unique(pageId, version)
SectionTemplate(id, name, type, data Json)

Project(id, slug@unique, title, subtitle, summary, categoryId, industry, role, projectType,
        timelineLabel, year, status, isFeatured, isPublished, liveUrl?, repoUrl?, thumbnailId?,
        heroImageId?, caseStudy Json, seo Json, order, timestamps, deletedAt)
ProjectCategory(id, slug@unique, name, order)
Technology(id, slug@unique, name, iconId?)       ProjectTechnology(projectId, technologyId) @@id
ProjectMedia(projectId, mediaId, order, caption)  RelatedProject(projectId, relatedId) @@id

Experience(id, company, role, employmentType, location, startDate, endDate?, isCurrent, summary,
           responsibilities String[], achievements String[], order, timestamps)
ExperienceTechnology(experienceId, technologyId) @@id
SkillCategory(id, name, slug@unique, description?, order, isVisible)
Skill(id, categoryId, name, iconId?, description?, order, isVisible)
Education(id, institution, qualification, startYear, endYear, order)

Media(id, provider, key@unique, url, mimeType, kind [IMAGE|VIDEO|PDF], bytes, width?, height?, alt,
      title, focalX, focalY, collection?, uploadedById, timestamps, deletedAt)
ContactMessage(id, name, email, subject, projectType, message, status [UNREAD|READ|ARCHIVED],
               ipHash, userAgent, createdAt)                              @@index(status, createdAt)
NavigationItem(id, location [HEADER|FOOTER], label, pageId?, href?, isExternal, parentId?, order, isVisible)
Testimonial(id, author, role, company, quote, avatarId?, isPublished, order)
SiteSetting(key@id, value Json, updatedById, updatedAt)   // site, seo, social, about, resume, theme, maintenance
ActivityLog(id, actorId?, action, entityType, entityId?, meta Json, ip, createdAt) @@index(entityType, createdAt)
```

Section content is JSON **validated by `@du/schemas`** (discriminated union on `type`, versioned) in
the API on write and in the web renderer on read; unknown or invalid sections are skipped safely.

## 3. Backend modules (NestJS)

`auth, users, roles, permissions, pages, projects, categories, technologies, experiences, skills, media,
contact, navigation, settings, seo, analytics (dashboard), activity-logs, mail, revalidation` plus
`common/{decorators, guards, interceptors, filters, pipes, middleware}`, `config`, `prisma`.

- Response envelope: `{ success, data, error, meta? }`.
- Guards: `JwtAuthGuard` → `PermissionsGuard` (`@RequirePermissions('pages.publish')`).
- Throttling on auth + contact; Helmet; strict CORS allow-list; refresh tokens rotated per family and
  stored hashed; HttpOnly `SameSite=Strict` refresh cookie + double-submit CSRF token.
- On publish/update the API calls the web app's `POST /api/revalidate` with a shared secret to purge
  cache tags.

## 4. CMS architecture

- **Page builder:** page = ordered list of sections; each section type has a Zod schema, a default
  value, an admin form and a web renderer, all keyed by the same `type` in a registry.
- **Drafts & revisions:** editing writes to `PageSection`; publishing snapshots sections into a
  `PageRevision` and points `Page.publishedRevisionId` at it, so public reads only see published
  snapshots. Restore = copy a revision back into the draft.
- **Media:** backend-mediated uploads to Cloudinary/S3 with MIME sniffing, size limits and metadata in
  Postgres.

## 5. Roadmap

1. Discovery & design ✅
2. Foundation: workspace and shared packages
3. **Public website** — design system, all pages, animations, SEO, tests ← *current*
4. Admin dashboard — auth UI, page builder, all CMS modules
5. NestJS API + Prisma + Redis + media + mail; switch web/admin to live data
6. Integration, testing, optimisation, deployment docs
