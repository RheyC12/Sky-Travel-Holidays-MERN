# Portfolio case study

## Sky Travel Holidays

**Original project:** June 2024, as supplied by the author.

**Type:** First web development project.

**Current stack:** MongoDB, Express, React, Node.js, Tailwind CSS.

The current code and dependencies do not establish the exact June 2024 implementation. GitHub publication and later documentation retain their actual dates. If the MERN rebuild happened later than the original website, list those dates separately when applying for jobs.

## Problem and solution

A travel agency needs to communicate its services while helping customers understand what happens after submitting an application. This project models that journey with applicant accounts, a multi-step visa form, supporting documents, status tracking, and an admin review queue.

The current implementation separates public marketing pages from authenticated applicant and administrator workflows. A REST API persists records in MongoDB and maintains status history.

## Skills demonstrated

| Skill | Evidence |
| --- | --- |
| React | Routed pages, reusable components, hooks, authentication context |
| Backend development | Express routes/controllers for authentication, applications, content, enquiries |
| Data modeling | Mongoose schemas, user/country references, embedded documents and history |
| Authorization | JWT verification, backend admin middleware, application ownership checks |
| Form workflows | Multi-step form, review screen, asynchronous submission and uploads |
| Integration | Axios, Multer, optional Nodemailer notifications |
| Code organization | Separate client/server and routes, controllers, models, middleware |

Authorization and reliability gaps remain; see [QUALITY.md](QUALITY.md). These are next improvements, not completed security guarantees.

## Suggested resume entry

**Sky Travel Holidays | Web Development Project | Original project: June 2024**

- Developed a travel agency application with destination browsing, applicant registration, and a multi-step visa application workflow using React, Express, Node.js, and MongoDB.
- Implemented applicant dashboards and an administrator review workflow with application status history, search/filtering, and document upload support.
- Organized reusable frontend components and backend routes, controllers, models, and middleware; integrated JWT authentication and optional email notifications.

Use these bullets only for work you personally implemented and can explain. Credit templates, collaborators, and assisted implementation where applicable. No client relationship, user count, business result, or production deployment is claimed.

## Short portfolio description

My first web development project, originally made in June 2024, explores a travel agency website and visa application management workflow. The current MERN version includes applicant accounts, a multi-step application form, document uploads, status tracking, and an admin review panel. It demonstrates full-stack application structure, with authorization, validation, and reliable submission handling as the next improvement priorities.

## Interview walkthrough

1. Explain the customer journey from destination selection to status tracking.
2. Trace a React request through Express middleware, controller, and Mongoose model.
3. Explain why frontend protected routes also require backend access checks.
4. Show the status history and optional email notification flow.
5. Discuss fixes for unrestricted request fields, public documents, and failed upload retries.

For a demo, use a local database, fictional travelers, and harmless sample files. Show a destination, applicant submission, admin review, and the updated applicant status. Screenshots, a recorded walkthrough, and a hosted demo have not been produced in this documentation task.
