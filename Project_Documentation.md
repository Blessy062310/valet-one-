# Project Title: Valet One - Secure Digital Asset & Legacy Management System

## 1. Abstract
In the modern digital era, individuals accumulate significant digital assets—such as cryptocurrency, digital stocks, and online wallets. However, unlike traditional bank accounts, there is a severe lack of mechanisms to pass these digital assets to loved ones in the event of an unexpected tragedy. Millions of dollars in digital assets are permanently lost every year because families do not have access to passwords or even know the assets exist.

**Valet One** is a secure, full-stack web application designed to solve this problem. It acts as a digital vault designed to store financial assets safely while implementing a "Legacy Protocol." This protocol allows users to assign predefined beneficiaries (nominees). In the event of the user's death, nominees can utilize a secure Claim Portal to submit a Government Death Certificate. Upon verification by an administrator, the asset allocations are automatically mapped and transferred to the beneficiaries.

## 2. Introduction
**Valet One** was developed as a 2nd-year, 2nd-semester academic project. It demonstrates the integration of a modern React.js frontend with a robust Supabase (PostgreSQL) backend. The primary objective is to showcase secure data management, CRUD (Create, Read, Update, Delete) operations, and role-based workflows in a FinTech application.

## 3. Technology Stack
*   **Frontend:** React.js, Vite
*   **Styling:** Custom CSS, Lucide React (Icons), UI Glassmorphism design system
*   **Backend & Database:** Supabase (BaaS) running PostgreSQL
*   **Authentication:** Supabase Auth & Custom Users Schema
*   **Routing:** React Router v6

## 4. Core Modules & Functionality
The application is divided into four distinct modules representing the complete lifecycle of asset management:

### A. Authentication & User Management
A secure portal where users can register for a new account and securely log in. It captures user credentials and stores them securely in the backend database.

### B. Asset Management (The Wallet)
Users have access to a personalized dashboard where they can add, view, and track their various assets (e.g., Bitcoin, Bank Accounts, Real Estate deeds). Data is persistently linked and updated in the `assets` database table.

### C. Legacy Protocol (Nominee Setup)
This is the core differentiator of the platform. A proprietary settings panel allows the account owner to assign specific individuals (Spouse, Children, etc.) as "Nominees". The owner can allocate specific percentage shares of their total wealth. This is synced securely to the `nominees` database table.

### D. Claim Verification System (Admin & Nominee Dual-Portal)
The fail-safe system triggered upon the owner's death:
1.  **Claim Portal:** A public-facing portal where a nominee can enter their registered email and upload a digital copy of a Death Certificate.
2.  **Admin Vault:** A restricted administrative dashboard that receives the claim, allows the admin to review the uploaded certificate, and approves or rejects the transfer of digital wealth.

## 5. System Workflow (How it Works)
1.  **Onboarding:** The Owner signs up via the Login Portal.
2.  **Asset Injection:** The Owner logs their financial holdings into the Wallets page.
3.  **Will & Testament Mapping:** The Owner accesses the Legacy Setup, adds their spouse/child, and allocates a 50% share to each.
4.  **The Trigger Event:** The Owner passes away. The assets remain locked.
5.  **The Claim:** The spouse navigates to the Claim Portal and uploads the official Death Certificate.
6.  **Resolution:** The Admin reviews the certificate in the Admin Vault. Upon approval, the system recognizes the 50/50 split and marks the legacy transfer as ready.

## 6. Future Scope (Optional for presentation)
While the current prototype successfully demonstrates the data flow and UI architecture, future iterations of this project could include:
*   Integration with live Crypto APIs for real-time portfolio tracking.
*   Automated AI-verification of Death Certificates using OCR technology.
*   Advanced Role-Based Access Control (RBAC) to completely isolate user environments.
