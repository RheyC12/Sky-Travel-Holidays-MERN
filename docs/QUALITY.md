# Quality and verification

## Review evidence

November 2026 review:

- Frontend production build passed.
- Lint failed: ESLint dependency/configuration is missing.
- No automated test scripts or suite are configured.
- Database workflows, SMTP delivery, deployment, and rendered UI were not verified.

## Known issues and next steps

| Priority | Finding | Proposed improvement |
| --- | --- | --- |
| High | `createApplication` spreads request fields into a model containing status, payment status, assignment, and other internal fields. | Allowlist applicant fields and set internal values server-side. |
| High | `/uploads` serves documents without authentication. | Use private storage and owner/admin download authorization. |
| High | Multer writes files before ownership checks. | Authorize the target application before receiving files; clean up failures. |
| Medium | Upload failure after creation reports submission failure; retry creates duplicates. | Preserve the application ID and retry uploads separately. |
| Medium | SMTP failures propagate after database writes. | Separate notification failure from successful writes and add retry handling. |
| Medium | Business validation is incomplete; country changes retain the selected visa type. | Validate supported types and traveler/passport/travel dates on the server. |
| Medium | Applicant detail has no follow-up upload control. | Add upload controls for additional-document requests. |
| Medium | File filter trusts supplied MIME types and preserves original extensions. | Validate actual content and allowed extensions; apply storage quotas. |
| Medium | Search accepts regex input; pagination lacks bounds. | Escape literal searches and validate page/limit. |
| Medium | Several fetches lack visible error handling. | Add error, empty, and retry states. |

These are review findings; this documentation task does not fix them.

## Manual verification checklist

Use a dedicated local database with fictional data.

- Register, log in, refresh, log out, and try an expired token.
- Call admin APIs as an applicant and confirm rejection.
- Attempt to read, cancel, and upload to another user's application.
- Attempt submission with internal status/payment fields; confirm rejection after the fix.
- Validate unsupported visa types and invalid date relationships.
- Simulate upload failure and retry without creating a duplicate after the fix.
- Update status as admin and inspect applicant history.
- Test follow-up documents once upload controls are added.
- Test valid, unsupported, oversized, and excessive files.
- Confirm unauthenticated document access fails after private downloads are implemented.
- Check mobile layout, keyboard navigation, persistent labels, and error announcements.

## Deployment boundaries

Fix authorization and private storage before using real applicant information. Demo credentials are public; seeded content and homepage statistics are not verified outcomes. Production needs HTTPS, secrets, routing, backups, durable private storage, dependency review, and meaningful API tests. Do not commit `.env`, uploaded documents, or database exports.
