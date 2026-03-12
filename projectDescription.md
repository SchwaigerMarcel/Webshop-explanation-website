Website Project Description

# 1. Overview

This project is a comparison website for popular webshop systems. It is intended as a beginner-friendly guide to help people choose the right e‑commerce platform for their needs.

# 2. Project Idea

The site explains how well‑known systems such as Shopify, OpenCart, PrestaShop, Shopware, WooCommerce, Sylius and Magento work, describing each one’s main features, strengths, and potential drawbacks.

By presenting the information clearly and concisely, we aim to give visitors a quick overview when they’re unsure which solution fits their requirements.

E‑commerce is increasingly important, and many entrepreneurs, students, and hobbyists consider launching their own online shops. Choosing the appropriate software can be overwhelming; this site is designed to simplify that decision.

# 3. Target Audience

The primary audiences are:

- Students and beginners learning about webshop platforms
- Individuals planning to start an online shop
- Small businesses or hobby sellers who prefer straightforward explanations over technical jargon

We offer accessible, easy‑to‑understand content tailored to non‑technical readers.

# 4. Website Structure

The site is built with several static HTML pages:

- `index.html` – Homepage and introduction to the topic
- `magento.html` – Detailed overview of Magento
- `opencart.html` – Detailed overview of OpenCart
- `prestashop.html` – Detailed overview of PrestaShop
- `shopware.html` – Detailed overview of Shopware
- `sylius.html` – Detailed overview of Sylius
- `woocommerce.html` – Detailed overview of WooCommerce
- `shopfinder.html` – Interactive page that helps users find the best webshop solution based on a short survey
- `newsfeed.html` – AI‑powered news section with up‑to‑date e‑commerce headlines

All pages share a common header and footer for consistent navigation.

# 5. Design & Layout

- **Color scheme:** White and blue tones for a clean, easy‑on‑the‑eyes appearance
- **Layout elements:**
  - Fixed header with a navigation menu
  - Card‑style boxes used for navigation and content sections
  - Consistent page structure: site title in the header, followed by informational content

The site uses Bootstrap for responsive design and includes icons via Bootstrap Icons.

# 6. Dynamic Features

- **Shopfinder:** A simple questionnaire that suggests the most suitable webshop system based on user responses
- **AI Newsfeed:** A news page (`newsfeed.html`) that fetches headlines from a Cloudflare Worker API. The worker uses OpenAI (GPT) to generate short e‑commerce news summaries, which the front‑end pulls in via JavaScript (`assets/scripts/newsfeed.js`). This introduces a serverless backend component and demonstrates integration with third‑party APIs.

# 7. Milestones

1. Brainstorming, planning the site structure, and researching content
2. Creating basic HTML pages and implementing site-wide navigation
3. Populating pages with text, tables, and images
4. Applying CSS for design, layout, and mobile responsiveness
5. Testing, making improvements, and finalizing the presentation
6. Adding the first dynamic features (Shopfinder survey)
7. Implementing AI‑powered newsfeed with Cloudflare Worker and front‑end JavaScript
8. Fine‑tuning design and content based on feedback
