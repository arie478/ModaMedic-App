# ModaMedic Mobile App

## Overview
The **ModaMedic Mobile App** is a key component of the ModaMedic system, designed to provide patients with an intuitive interface to track their post-surgery recovery. Built with **React Native**, the app allows patients to monitor mobility metrics, complete medical questionnaires, and access physiotherapy training videos.

## Features
- **User Authentication**: Secure login and registration.
- **Medical Questionnaires**: Patients can fill out and submit recovery-related forms.
- **Health Metrics Tracking**: Syncs with Google Fit and Mi Band to collect data.
- **Multilingual Support**: Supports Hebrew, Arabic, Russian, and English.
- **Physiotherapy Video Library**: Provides guided exercises to aid in recovery.

## Tech Stack
- **Frontend**: React Native
- **Backend API**: Node.js (via [ModaMedic Backend](https://github.com/arie478/ModaMedic-Backend))
- **Database**: MongoDB
- **Health Data**: Google Fit, Mi Band integration

## Installation
### Prerequisites
- Node.js & npm installed
- React Native CLI installed
- Android Studio / Xcode for emulation (or a physical device)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/arie478/ModaMedic-App
   cd ModaMedic-App
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   - For Android:
     ```sh
     npx react-native run-android
     ```
   - For iOS:
     ```sh
     npx react-native run-ios
     ```

## API Integration
The app communicates with the ModaMedic backend server for authentication, data retrieval, and message exchange. Ensure the backend is running before launching the app.
- **Backend Repo**: [ModaMedic Backend](https://github.com/arie478/ModaMedic-Backend)

## Deployment
- APK builds are generated for Android users.
- App was deployed to **Google Play Store** and **Apple App Store** during the project run time.

---
For related components of ModaMedic, see:
- **[Backend](https://github.com/arie478/ModaMedic-Backend)**
- **[Web Interface](https://github.com/arie478/ModaMedic-Web)**
<!--
- **[Machine Learning Module](https://github.com/arie478/ModaMedic-ML)**
-->


