# 🛍️ LOOMLORE — Turnkey E-Commerce Platform Handover & Setup Guide

Congratulations on acquiring **Loomlore — Heirlooms of India**, an enterprise-grade luxury handloom e-commerce application built using Next.js (App Router), TypeScript, Tailwind CSS, Zustand, and Firebase Authentication.

This document serves as the complete technical, deployment, and brand transfer guide for the new website owner.

---

## 📌 Executive Summary & Architecture Overview

| Key Metrics | Value |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router, Server & Client Components) |
| **Language** | TypeScript (100% Strict Type Safety) |
| **Styling** | Custom Vanilla CSS Design System + Tailwind CSS |
| **State Management** | Zustand (Persistent Local Storage Sync) |
| **Authentication** | Firebase Auth (Email/Password, Google 1-Click, Password Reset) |
| **Security Layer** | Sliding-Window Rate Limiting, Input Sanitization, XSS Defense, TLS 1.3 Headers |
| **Static Pre-rendering** | 97 Fully Static & SSG Prerendered Pages |
| **Currencies Supported** | INR (₹), USD ($), EUR (€), GBP (£), AED |

---

## 🚀 5-Minute Quick Setup & Deployment Guide

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/The-Dhananjay/LOOMLORE.git
cd LOOMLORE
npm install
```

### Step 2: Configure Environment Variables
Create a file named `.env.local` in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDilKFbWtFlTI7_d4AZJBrFiNutjZ014Bg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=loomlore-853cc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=loomlore-853cc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=loomlore-853cc.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=803266102215
NEXT_PUBLIC_FIREBASE_APP_ID=1:803266102215:web:4d9ea2fd20f7802a2a8fe2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-0H27MH3523
```

*(Note: The application contains built-in fallback keys in `src/lib/firebase.ts`, so it compiles and runs seamlessly even if `.env.local` is omitted).*

### Step 3: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎛️ How to Re-brand the Website (1-Click Turnkey Admin Panel)

As the new owner, you can re-brand the store (Change Store Name, Tagline, Email, Support Phone, Address, Notice Bar) without modifying any code:

1. Navigate to `/admin` in your browser.
2. Select the **"Store Re-branding"** tab.
3. Enter your custom Store Name, Email, Support Phone, and Notice Bar Text.
4. Click **"Save Re-branding Settings"**. The entire application instantly updates globally!

---

## 📊 Features & Functional Portals

### 1. Customer Shopping Experience (`/catalog`, `/checkout`, `/profile`)
- **Global Multi-Currency Switcher**: Top navbar selector allows switching between **₹ INR**, **$ USD**, **€ EUR**, **£ GBP**, and **AED**.
- **Interactive Cart & GST Split**: Real-time tax breakdown (CGST + SGST), discount coupons (`WELCOME500`, `HEIRLOOM10`), and pan-India shipping logic.
- **Account Order Tracking**: Stage timeline (`Processing` -> `Handwoven & Dispatched` -> `Out for Delivery` -> `Delivered`).
- **Address Manager**: Add, edit, delete, and set default shipping locations at `/address`.

### 2. Artisan Merchant Seller Portal (`/seller`)
- **Product Listing Manager**: Weaver co-ops can add new products with custom pricing, fabric, and state origin.
- **Stock Inventory Toggles**: Real-time "In Stock" / "Out of Stock" management.

### 3. Admin & Executive Suite (`/admin`)
- **Pending Seller Approval Workflow**: Review firm credentials (PAN, GSTIN, Bank A/C) and approve listing access with 1 click.
- **Sales Analytics Dashboard**: Visual revenue metrics, growth percentages, and craft category breakdown.
- **1-Click Data Backup**: Export all catalog products, orders, and seller registrations in **JSON** or **CSV** format.

---

## 🌐 Deploying to Vercel

1. Import your repository into [Vercel](https://vercel.com).
2. Set Build Command: `npm run build`
3. Click **Deploy**. Vercel will prerender all 97 static pages automatically!

---

## 📄 License & Ownership
Full commercial ownership and IP rights transferred to the buyer.
