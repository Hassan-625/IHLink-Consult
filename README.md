# IHLink Consult

Standalone consulting platform for IHLink software, cloud, AI, data and technology engagements.

## Platform role

- **Platform key:** `consult`
- **Frontend:** standalone repository
- **Backend:** shared IHLink Supabase project
- **Administration:** IHLink Command Center
- **Deployment:** Vercel

## Core capabilities

- Consulting request intake and qualification
- Proposal and statement-of-work uploads
- Proposal versioning, preview and customer response
- Project conversion and milestone tracking
- Quotation, invoice and BillStack payment workflow
- Private project files and support

## Architecture

Consult engagements progress from request and qualification through proposal acceptance, project delivery and billing. Private proposal/project documents use protected storage and signed access.

The platform uses shared IHLink authentication and backend services while retaining platform-specific customer routes, data authorization and operational workflows.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase
- Vercel

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

When configured in the repository, also run `npm run typecheck` and `npm run lint` before release.

## Environment and secrets

Public client configuration is supplied through environment variables, including the Supabase project URL and anonymous client key. Platform-origin variables may also be used for IHLink cross-platform handoff.

Never commit payment-provider credentials, service-role keys, webhook secrets, private API keys or production credentials.

## Payments and protected operations

Payment initiation may occur from the client experience, but settlement/finalization and other privileged state transitions must be verified server-side. The shared IHLink payment ledger and platform-specific records are authoritative only after verified settlement.

## IHLink ecosystem integration

This repository is a standalone customer-facing platform connected to the shared IHLink backend and Command Center. Platform access is authorization-specific and is not automatically inherited from another IHLink service.

## Deployment

Production is deployed through the IHLink Vercel team. Verify the production deployment, routing and required environment variables after each release.

## Ownership

**IHLink Co. Ltd.**  
Copyright © 2026 IHLink Co. Ltd. All rights reserved.
