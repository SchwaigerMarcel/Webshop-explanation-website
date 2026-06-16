# Webshop Comparison Project

A beginner-friendly comparison website for popular e-commerce and webshop systems.

The purpose of this project is to help users understand different webshop platforms and choose the most suitable solution for their needs.

## Architecture

This project consists of two separate repositories:

### Frontend (this repository)

The static website containing all comparison pages, the shop recommendation tool, and the newsfeed interface.

> [!IMPORTANT]
>
> ## Backend / JSON API (Separate Repository)
>
> Der Newsfeed dieser Website wird **nicht direkt von diesem Repository bereitgestellt**.
>
> Die Daten stammen aus einem separaten Cloudflare-Worker-Projekt:
>
> **JSON Server / API Repository:**
> https://github.com/SchwaigerMarcel/Ecommerce-Worker
>
> **Live API Endpoint:**
> https://ecommerce-news.marcel-8cf.workers.dev/
>
> Der Worker generiert und liefert die E-Commerce-News als JSON-Daten, welche von dieser Website dynamisch geladen und angezeigt werden.

---

## Overview

This project provides structured information about well-known webshop systems:

* Shopify
* WooCommerce
* Magento
* PrestaShop
* OpenCart
* Shopware
* Sylius

Each platform is described in a clear and simple way, focusing on:

* Main features
* Advantages
* Disadvantages
* Typical use cases

The goal is to make decision-making easier for beginners and small businesses entering e-commerce.

---

## Features

### Platform Comparison

Compare multiple webshop systems and learn about their strengths, weaknesses, and intended use cases.

### Shopfinder

An interactive questionnaire that recommends the most suitable webshop platform based on user requirements.

![Shopfinder](screenshots/shopfinder.png)

### AI Newsfeed

A dynamic e-commerce news section that:

* Fetches data from a separate Cloudflare Worker JSON API
* Receives AI-generated news summaries
* Loads content dynamically via JavaScript
* Demonstrates frontend-backend integration

**Backend Repository:**
https://github.com/SchwaigerMarcel/Ecommerce-Worker

![Newsfeed](screenshots/newsfeed.png)

---

## Website Structure

The project consists of multiple static HTML pages:

* `index.html` – Homepage and introduction
* `shopware.html` – Shopware overview
* `shopify.html` – Shopify overview
* `woocommerce.html` – WooCommerce overview
* `magento.html` – Magento overview
* `opencart.html` – OpenCart overview
* `prestashop.html` – PrestaShop overview
* `sylius.html` – Sylius overview
* `shopfinder.html` – Interactive recommendation tool
* `newsfeed.html` – AI-powered e-commerce news feed

All pages share a consistent layout with navigation and footer.

---

## Design & Layout

* Clean and minimal design
* Responsive Bootstrap layout
* Card-based content presentation
* Bootstrap Icons
* Consistent navigation structure
* Mobile-friendly design

![Homepage](screenshots/index.png)

![Comparison](screenshots/example.png)

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* Bootstrap
* JavaScript

### Backend

* Cloudflare Workers
* JSON API
* Google Gemini API

---

## Related Projects

### E-Commerce Guide API

Backend repository used by this project:

https://github.com/SchwaigerMarcel/Ecommerce-Worker

### Real-World Application

This project is related to a real business website:

https://messerschmiede-schwaiger.at

Source code:

https://github.com/SchwaigerMarcel/Messer-Website

![Comparison](screenshots/messer.png)
