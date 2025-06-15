# 📷 Snap Share – Backend

> Backend server for the Snap Share photo-sharing app — handles dynamic image rendering, metadata support for social sharing, and API logic.

---

## 🌐 Project Overview

This Node.js + Express backend powers **Snap Share**, a minimalist Instagram-like photo-sharing platform. It primarily serves as a rendering engine for dynamic Open Graph metadata to ensure optimal previews when links are shared (on Facebook, Twitter, WhatsApp, etc.).

👉 React frontend: [callmegautam/snap-share-frontend](https://github.com/callmegautam/snap-share-frontend)

---

## 🚀 Features

- 🖼 Dynamic HTML pages with proper OG meta tags for each photo
- 🔄 Returns random images on refresh (MVP-level)
- 📡 Simple REST API endpoints for image data
- 🧩 Easily linkable to any frontend (like the React version)

---

## ⚙️ Tech Stack

- **Node.js**  
- **Express.js** for routing  
- **Middleware** for metadata injection  
- **Deployment-ready** (e.g., Heroku, Render, Vercel Functions)

---

## 🧑‍💻 Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/callmegautam/snap-share-backend.git
cd snap-share-backend

# Install dependencies
npm install

# Copy config/template (if provided)
cp .env.example .env
# Fill in any required variables (e.g. image storage paths, domain)

# Start the server
npm start
# or
npm run dev
```
