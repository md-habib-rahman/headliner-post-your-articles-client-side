![Logo]('assets/head liner logo for light.png')

# **Headliner**

This project is built using **React**, **Node.js**, **MongoDB**, and other modern tools. It provides an engaging and dynamic experience for users to interact with articles, manage their profile, and track statistics.

##D **Live Demo Link**

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [User Stories](#user-stories)
- [Backend API Endpoints](#backend-api-endpoints)
  - [GET /articles/all](#get-articlesall)
  - [GET /stats/users](#get-statsusers)
  - [PUT /users/profile](#put-usersprofile)
- [Contributing](#contributing)
- [Admin Credential](#admin-credential)
- [License](#license)
- [Screenshots](#screenshots)

## **Introduction**

This project is a **web application** designed to help users view and interact with articles from different publishers. Users can also **update their profiles**, view **statistics**, and track **trending articles**.

The project uses **TanStack Query**, **React Hook Form**, and **TailwindCSS** to ensure a smooth and responsive user experience.

## **Features**

- **Articles Page**: View and filter articles by publisher, title, and tags.
- **Trending Articles**: Show top articles based on view count in a **slider**.
- **User Profile**: Users can view and update their profile information, including name, email, and profile picture.
- **Statistics**: View statistics about **total users**, **premium users**, and **article counts** with **animated numbers** using **React CountUp**.
- **Publisher Management**: Admin can manage publishers, and users can view articles from different publishers.
- **Premium Articles**: There is premium articles section. only subscribed user can view details.
- **News Ticker**: Posting every articles user can post a news ticker. that will display on the ticker section once admin approves it.
- **Comment on Articles**: User can comment on specific articles by going its details page. All the comments are visible in the home section.
- **Admin Dashboard**: Admin dashboard is there to approve articles, decline articles, make articles premium, change user role.
- **Social Login**: User can login directly without having registered with social login, currently google is availabe.
- **Payment Gatewey**: _*STRIPE*_ Payment gateway implemented.

## **Technologies**

### **Frontend**:

- **React** (v18+)
- **React Router** (for routing)
- **TanStack Query** (v5 for data fetching)
- **React Hook Form** (for form handling)
- **TailwindCSS** (for styling)
- **React CountUp** (for animated numbers)
- **React Google Charts** (for charts)
- **AOS** (Animate On Scroll)

### **Backend**:

- **Node.js**
- **Express**
- **MongoDB**
- **JWT** (for user authentication, which is planned for future development)

## **admin-credential**

- **User**: habib.rahman@live.com
- **Password**: JKLmnb098@
