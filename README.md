# ChainLabs

A modern, responsive website for ChainLabs - blockchain analytics and solutions platform. Built with React, TypeScript, and Supabase.

## Features

### Public-Facing
- **Modern Landing Page** - Hero section with animated network visualization
- **Company Information** - Team profiles, mission, and values
- **Solutions Overview** - Comprehensive blockchain analytics solutions
- **Industries Coverage** - Detailed industry-specific use cases
- **Interactive Coverage Map** - Visual representation of blockchain coverage
- **Insights & Content** - Blog posts and case studies
- **Contact Form** - Lead capture with automated notifications
- **Cookie Consent** - GDPR-compliant cookie management
- **Responsive Design** - Mobile-first, fully responsive across all devices

### Admin Panel
- **Secure Authentication** - Email/password authentication via Supabase
- **Content Management** - Create and manage articles and case studies
- **Rich Text Editor** - Full-featured WYSIWYG content editor
- **Image Upload** - Direct integration with Supabase Storage
- **Social Sharing** - Built-in social media metadata management

### Technical Features
- **Row Level Security** - Comprehensive RLS policies for data protection
- **Automated Webhooks** - Database triggers for form submissions
- **Edge Functions** - Serverless notification processing
- **Analytics Integration** - Custom analytics tracking
- **SEO Optimization** - Sitemap and robots.txt included

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Edge Functions**: Supabase Functions (Deno runtime)
- **Deployment**: Optimized for modern hosting platforms

## Prerequisites

- Node.js 18+ and npm
- Supabase account (for database and auth)
- Modern web browser

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chainlabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

   Run the migrations in order:
   ```bash
   # The migrations are located in supabase/migrations/
   # Apply them through Supabase Dashboard or CLI:

   - 20251021125645_create_company_page_tables.sql
   - 20251021132005_create_insights_tables.sql
   - 20251029125747_create_demo_requests_table.sql
   - 20251029130017_create_demo_request_webhook.sql
   - 20251117134721_create_admin_auth_and_content_enhancements.sql
   - 20251117153956_add_cover_images_and_storage.sql
   ```

5. **Edge Function Deployment**

   The `notify-demo-request` edge function is included. Deploy it through your Supabase project.

6. **Admin User Setup**

   Create an admin user through Supabase Auth dashboard, then update the `admin_users` table with their user ID.

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
chainlabs/
├── public/                    # Static assets (images, videos, logos)
├── src/
│   ├── components/           # Reusable React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── CookieConsent.tsx
│   │   ├── CountUp.tsx
│   │   ├── CoverageMap.tsx
│   │   ├── Footer.tsx
│   │   ├── LineArt.tsx
│   │   ├── Navigation.tsx
│   │   └── NetworkVisualization.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/                 # Utilities and configurations
│   │   ├── analytics.ts
│   │   └── supabase.ts
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin panel pages
│   │   ├── CompanyPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── IndustriesPage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── SolutionsPage.tsx
│   │   └── TermsPage.tsx
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── supabase/
│   ├── functions/          # Edge Functions
│   │   └── notify-demo-request/
│   └── migrations/         # Database migrations
└── package.json
```

## Key Features Explained

### Contact Form Workflow
1. User submits contact form on `/contact`
2. Data is stored in `demo_requests` table
3. Database trigger fires automatically
4. Edge function receives notification
5. Email content is prepared and logged (email service integration pending)

### Admin Panel Access
- Navigate to `/admin/login`
- Sign in with authorized admin credentials
- Manage articles and case studies at `/admin/articles` and `/admin/case-studies`

### Database Security
- All tables have Row Level Security enabled
- Restrictive policies ensure data access control
- Admin-only access for content management
- Public read access for published content

### Content Management
- Rich text editor with formatting options
- Image upload with automatic optimization
- Draft/publish workflow
- Social media metadata for sharing

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 ChainLabs. All rights reserved.

## Support

For questions or issues, please contact the ChainLabs team through the website contact form.
