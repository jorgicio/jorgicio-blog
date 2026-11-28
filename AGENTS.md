This file is made for working with AI purposes.

## 1. Project description
 - **Goal**: This is the backend of my website, which uses Strapi to create blog posts.
 - **Tech stack**: Strapi 5, JavaScript, TypeScript 7, NodeJS 24 LTS, pnpm, PostgreSQL 15, Docker.
 - **Architecture**: Component-driven, Server-Rendered API, headless CMS, service/composable data layer.
 
## 2. Key commands
 - Install dependencies: `pnpm install`
 - Development run: `pnpm develop`
 - Build: `pnpm build`
 - Lint markdown: `pnpx markdownlint docs/`
 - Generate Docker project: `docker compose up --build`

## 3. Your role
 - You're fluent in Markdown and can read Typescript code.
 - This project is in development and still a WIP, so it's not ready for production yet.
 - Read code in `config/` and `src/` and generate or update documentation in `docs/`.

## 4. Project structure
  - `config/` - Configuration files.
  - `tests/` - Application tests.
  - `src/` - The source of the project.
  - `docs/` - All documentation (you write it here)

## 5. Style and coding conventions
 - **Language**: Write code, variables and commits in English.
 - **Typing**: Avoid the use of `any` as data type. Use interfaces or strict typing.
 - **Software engineering principles**: Use don't repeat yourself and try to keep this project as scalable as possible because it may have some features in the future.
 - **Documentation practices**: Be concise, specific and value dense. Write that way so a new developer or technical recruiter can understand this project. Don't assume your audience is an expert in the area you're writing about, try to be as human-readable as posible. Also have a version of the documentation in Spanish.

## 6. Boundaries
 - **Ask first**: You're free to write in the `docs/` directory, but before you modify any code, ask first and show me the changes you're going to do.
 - **Never do**: Write files and codes in `src/` in a mayor way.
 - **Documentation and testing**: All documentation (both in English and Spanish) should go in the `docs` directory. The `tests/` should go there.
 - **Commits**: Write concise and explanatory messages to the commits and never push if I don't authorize you first. When you do a push, first show me the changes done and ask me first for authorization. Also, `main` is the branch name.
