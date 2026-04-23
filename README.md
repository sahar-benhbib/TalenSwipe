# 🚀 TalentSwipe

A React Native Expo recruitment app inspired by Tinder swiping experience.

---

## 📱 About the App

TalentSwipe is a recruitment platform with swipe-based interaction where users can:

- Swipe job offers (like/dislike)
- View job details
- Upload a Video CV
- Chat with recruiters after a match
- Manage profiles based on roles

---

## 👥 User Roles

- 👤 Candidate (User)
- 🧑‍💼 Recruiter
- 🏢 Company

Each role has its own dedicated interface and navigation.

---

## ⚙️ Tech Stack

- React Native (Expo SDK 54)
- Expo Router v6 (File-based routing)
- TypeScript
- AsyncStorage (local persistence)
- Expo Image Picker (Video CV)
- React Native Safe Area Context
- Ionicons (@expo/vector-icons)

---

## 🎨 Design System

- Background: `#08070f`
- Cards: `#0d0c1a`
- Borders: `#1a1929`
- Primary Violet: `#5b4fff`
- Success Green: `#1D9E75`
- Error Red: `#ef4444`
- Warning Amber: `#f59e0b`
- Border Radius: `12px`
- Dark Theme Only

---

## 📂 Project Structure

- Onboarding flow
- Authentication (Login / Signup)
- Role-based navigation
- Swipe system (Tinder-like cards)
- Job details screen
- Video CV upload
- Matches system
- Chat system (AsyncStorage based)
- Recruiter dashboard
- Company management panel
- Settings & Profile

---

## 🔐 Data Storage

All data is stored locally using AsyncStorage:

- ONBOARDING_DONE
- SESSION_USER
- USERS_KEY
- CHAT_USER_{id}

---

## 🚀 Features

- Swipe-based job discovery
- Role-based app experience
- Video CV upload system
- Local authentication system
- Persistent sessions
- Recruiter candidate management
- Company job posting system
- Dark UI optimized for mobile

---

## 🧪 Status

This project is a **final year academic prototype (PFA)** developed for demonstration purposes.

---

## 👨‍💻 Author

- Student: Sahar
- Project: TalentSwipe
- Year: 2026

---

## 📌 Note

No backend is used. Everything runs locally using AsyncStorage.
