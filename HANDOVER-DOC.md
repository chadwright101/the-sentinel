# Emergency Handover Document - The Sentinel

> **This document is for Blyde's emergency contacts. If you're reading this, Chad has passed away and this guide will help you manage the transition of this client project to new ownership and a new developer.**

---

## Table of Contents

### Part 1: For Blyde (Emergency Responder)

1. [Introduction & Your Role](#part-1-for-blyde)
2. [Immediate Actions Checklist](#immediate-actions-checklist)
3. [Understanding the Project](#understanding-the-project)
4. [Transfer Priority Guide](#transfer-priority-guide)
5. [Service Transfer Rationale](#service-transfer-rationale)
6. [Working with the Client](#working-with-the-client)
7. [Handoff Preparation](#handoff-preparation)

### Part 2: Technical Documentation (For New Developer)

8. [Quick Start Guide](#quick-start-guide)
9. [Technical Stack](#technical-stack)
10. [Project Structure](#project-structure)
11. [Environment Configuration](#environment-configuration)
12. [Development Workflow](#development-workflow)
13. [Key Features & Functionality](#key-features--functionality)
14. [Data Management](#data-management)
15. [Third-Party Services & Integrations](#third-party-services--integrations)
16. [Important Files & Locations](#important-files--locations)
17. [Custom Development Patterns](#custom-development-patterns)
18. [Maintenance Notes](#maintenance-notes)

---

# PART 1: FOR BLYDE

## Introduction & Your Role

Hey man, this is just a quick reminder about what needs to happen with this project.

**The gist:**

- Get the client sorted with a new developer.
- Handle the service transfers (GitHub, Vercel, etc.).
- Answer any technical questions that come up.
- No need to maintain this long-term or learn the codebase deeply.

Take your time with it. The site is stable and working, so there's no rush. Unless I'm actually a kak developer, and in that case, get someone to rebuild this thing quick...

---

## Quick Checklist

- [ ] Get `.env.local` from the Bitwarden emergency kit
- [ ] Contact the client (contact details in Part 2) and give them the heads up
- [ ] Verify the site is working
- [ ] Get the login details for this project on Bitwarden
- [ ] Help them find a new developer
- [ ] Handle the service transfers (see Transfer Priority Guide below)
- [ ] Field any technical questions from the new dev, but definitely don't babysit

---

## Project Overview

**Website:** https://www.sentinelnews.com.au/
**Client:** The Sentinel

**Tech:** Next.js, React, TypeScript, Tailwind CSS
**Site Hosting:** Vercel
**Code:** GitHub (https://github.com/The-Wright-Designs/the-sentinel.git)
**Domain:** GoDaddy
**Web Hosting:** Vercel

**The site:** A modern news platform for "The Sentinel" featuring dynamic articles, digital editions via Calameo, event listings, and newsletter subscriptions.

---

## Transfer Priority Guide

Transfers needed from my accounts to the client/new dev. You know what to do here - just an order of operations (all my account login details for the below services will be on Bitwarden):

**Do first:**

1. **GitHub** - Transfer the repo. Easiest, most important.
2. **[Domain Host]** - Transfer domain/hosting. More involved, contact their support.
3. **Vercel** - Once the domain and hosting has been transferred away, they can transfer the project to their own account.
4. **Other Services** - Calameo, Mailchimp, Google reCAPTCHA, Email SMTP.

**Why all of this?** My accounts will eventually go inactive and take services down with them. Better to transfer now while the new dev is getting up to speed.

---

## Service Transfer Rationale

**GitHub:** Code needs to be under their ownership so they can maintain and deploy updates.

**[Domain Host]:** Domain and hosting account ownership ensures they control the infrastructure.

**Vercel:** Deployment pipeline runs through here. They need their own account.

**Calameo, Mailchimp, Google reCAPTCHA, Email SMTP:** These services are tied to specific features like document viewing, newsletters, security, and email delivery. Ownership needs to be transferred to ensure these continue to function.

---

## Working with the Client

**What to tell them:**
"Chad passed away. I'm Blyde. The site is working fine and totally documented. I'll help guide you to find a new dev and I'll handle the service transfers, but I'm not taking over maintenance long-term. Take your time finding the right person."

**What to tell prospective developers:**
"Next.js 16/React 19 build. Live and working. Hosted on Vercel. Features Calameo digital editions, WordPress API integration, and reCAPTCHA-protected forms. Clean build, solid documentation, no major issues. Need to transfer GitHub repo ownership, domain, and set up new accounts."

---

## Handoff Preparation

Give the new dev:

- Part 2 of this doc (technical reference)
- GitHub repo access
- `.env.local` info (in Projects folder on Bitwarden)
- Client contact info

They'll need to set up their own accounts for any third-party services.

---

# PART 2: TECHNICAL DOCUMENTATION

This section is the reference guide for the new developer. You can share this entire section with them.

---

## 1. Project Overview

### Client Information

- **Name:** The Sentinel
- **Email:** admin@sentinelnews.com.au
- **Phone:** 07 5438 7445

### Business Description

The Sentinel is a news publication serving local communities with news, events, and digital editions of their newspaper.

---

## 2. Quick Start Guide

### Prerequisites

- **Node.js:** 20.x or higher (recommended)
- **npm:** 10.x or higher
- **Git:** For cloning the repository
- **Code Editor:** VSCode or similar

### Repository Access

- **GitHub Repository:** https://github.com/The-Wright-Designs/the-sentinel.git

### Local Setup Instructions

1. **Clone the repository:**

   ```
   git clone [URL]
   cd the-sentinel
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**

   - The `.env.local` file should be provided to you during handover
   - Place it in the project root directory (same level as package.json)

4. **Run development server:**

   ```
   npm run dev
   ```

   - The site will be accessible at `http://localhost:3000`

5. **Build for production:**

   ```
   npm run build
   npm start
   ```

6. **Run code linting:**

   ```
   npm run lint
   ```

---

## 3. Technical Stack

### Core Framework

- **Next.js:** ^16.1.1
- **React:** 19.2.1

### Styling & UI

- **Tailwind CSS:** ^4
- **Swiper:** ^12.0.3 (for sliders)
- **classnames:** ^2.5.1

### Services & Libraries

- **Nodemailer:** ^7.0.11 (Email delivery)
- **react-google-recaptcha / v3:** (Bot protection)
- **@vercel/analytics:** (Traffic monitoring)

---

## 4. Project Structure

```
/
├── _actions/             # Server actions (Email, Newsletter, Calameo)
├── _components/          # React components organized by page/feature
├── _data/                 # JSON data files (Navigation, General)
├── _lib/                  # Utility functions, hooks, templates
├── _styles/               # Tailwind CSS and global styles
├── _types/                # TypeScript interfaces and types
├── app/                   # Next.js App Router (pages and layouts)
├── public/                # Static assets (logos, icons, images)
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## 5. Environment Configuration

### Environment Variables File

The `.env.local` file should be placed in the project root directory. **This file is gitignored and should NEVER be committed to the repository.**

### Required Environment Variables

- `NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL`: WordPress API endpoint for content.
- `MAILCHIMP_API_KEY`: API key for newsletter integration.
- `MAILCHIMP_AUDIENCE_ID`: Mailchimp list ID.
- `MAILCHIMP_SERVER_PREFIX`: Mailchimp server prefix (e.g., us1).
- `SMTP_HOST`: SMTP server for contact form emails.
- `SMTP_USER`: SMTP authentication user.
- `SMTP_PASS`: SMTP authentication password.
- `SMTP_SEND_TO`: Recipient email for contact form submissions.
- `CALAMEO_API_KEY`: API key for digital editions.
- `CALAMEO_API_SECRET`: API secret for digital editions.
- `RECAPTCHA_SECRET_KEY`: Google reCAPTCHA server-side key.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Google reCAPTCHA client-side key.
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Flag to enable/disable Vercel analytics.

---

## 6. Development Workflow

### Available npm Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

---

## 7. Key Features & Functionality

- **Dynamic Content:** Articles and categories are fetched from a WordPress backend.
- **Digital Editions:** Integration with Calameo to display newspaper PDFs.
- **Newsletter Signup:** Newsletter subscription form connected to Mailchimp.
- **Contact Form:** Secure contact form with reCAPTCHA and SMTP notification.
- **Event Listings:** "What's On" page fetching events from a custom endpoint.
- **Responsive Design:** Mobile-first design using Tailwind CSS.
- **SEO & Performance:** Optimized images, metadata, and Vercel analytics.

---

## 8. Data Management

- **External API:** Content is primarily managed in WordPress and fetched via REST API.
- **Static Data:** Navigation and some general business info are stored in `_data/*.json`.
- **Media:** Images are served from the WordPress source or the `public/` directory.

---

## 9. Third-Party Services & Integrations

- **Vercel:** Hosting and Analytics.
- **Mailchimp:** Email marketing and newsletter management.
- **Calameo:** Digital publication hosting.
- **Google reCAPTCHA:** Form security.
- **Nodemailer:** SMTP email delivery for contact forms.

---

## 10. Important Files & Locations

- `_styles/globals.css`: Tailwind configuration and global styles.
- `app/layout.tsx`: Root layout and global metadata.
- `_lib/utils/category-mapping.ts`: Maps dynamic category slugs to WordPress IDs.
- `_actions/`: Contains server-side logic for API calls and form handling.

---

## 11. Custom Development Patterns

- **cssClasses Prop:** Components use `cssClasses` instead of the traditional `className` for styling.
- **Server Actions:** Form submissions and data mutations are handled via Next.js Server Actions in the `_actions/` directory.
- **Shared UI:** Reusable UI elements (buttons, links) are located in `_components/ui/`.

---

## 12. Maintenance Notes

- **API Compatibility:** Ensure the WordPress REST API remains accessible and CORS is configured correctly.
- **Token Expiry:** Monitor API keys for Calameo and Mailchimp.
- **Next.js Updates:** Regularly check for framework updates to maintain security and performance.

---

## Access & Credentials Checklist

### During Transition (Blyde's Responsibility)

- [ ] `.env.local` file - shared securely
- [ ] Vercel account login information - facilitated transfer
- [ ] GitHub repository access - transfer repository ownership
- [ ] GoDaddy account is on their own account

### For New Developer to Set Up

- [ ] GitHub account created
- [ ] Vercel Account created
- [ ] Environment variables configured

---

That's it. Keep it simple, ask questions if anything's unclear, and don't hesitate to loop in a developer early if you're unsure about something.
