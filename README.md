# TIKKO

A conference ticket generator built with **Next.js (App Router)**, **React**, and **TypeScript**. The application allows users to enter their personal information, upload an avatar, and generate a personalized conference ticket. Submitted data is stored using **Supabase** and used to render the generated ticket.

## Features

- Conference registration form
- Collects:
  - Full Name
  - Email Address
  - GitHub Username

- Form validation
- Email format validation
- Personalized ticket generation
- Supabase integration for storing submitted data
- Responsive layout
- Reusable React components

## Data Flow

1. User fills out the registration form
2. Validate required fields and input formats
3. Validate the uploaded avatar:
   - JPG or PNG
   - Maximum file size of 500KB

4. Submit the validated form data
5. Store the submitted data using Supabase
6. Generate a personalized conference ticket
7. Render the generated ticket with the submitted information

## Design Decisions

### Form validation

Form validation is performed before submitting the data to prevent invalid or incomplete information from being stored.

The validation covers required fields, email format, and avatar requirements.

### Supabase

Supabase is used for persistent data storage instead of implementing a custom backend.

This keeps the application architecture lightweight while still providing a real backend service for storing submitted registration data.

### Personalized ticket

The ticket is generated from the submitted form data rather than using a separate static dataset.

This allows the generated ticket to reflect the information entered by the user and keeps the registration and ticket generation flow connected.

### Responsive strategy (tablet handling)

The layout is responsive across desktop, tablet, and mobile screen sizes.

Tablet uses the mobile layout instead of introducing a separate tablet-specific design. This reduces layout complexity and allows the same components to be reused across smaller breakpoints.

## Trade-offs & Limitations

- Supabase is used as a managed backend instead of implementing a custom API
- Avatar validation is performed before upload to reduce unnecessary requests
- Ticket generation depends on successfully submitted form data
- The application does not include authentication because user accounts are not required for the registration flow
- The application focuses on the ticket generation flow rather than providing a full conference management system

These decisions were made to keep the project focused on the registration and ticket generation experience while still using a real backend service.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Tech Stack

### Core

- Next.js (App Router)
- React
- TypeScript

### Styling

- SCSS Modules
- `clsx`

### Tooling

- ESLint
- Prettier
- Stylelint
- Husky
- lint-staged

### Extras

- Supabase – database and backend services
- React Hook Form – form state management
- Zod – form validation

## Setup and Installation

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Create a `.env.local` file and add the required environment variables.
4. Start the development server with `npm run dev`.

## Scripts

```bash
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Run production build
npm run lint             # Run lint checks
npm run lint -- --fix    # Auto-fix lint issues
npm run typecheck        # TypeScript validation
```
