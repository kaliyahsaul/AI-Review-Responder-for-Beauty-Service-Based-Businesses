# AI Review Responder for Beauty & Service-Based Businesses

This is a SaaS MVP that allows beauty professionals and local service providers to automatically generate personalized responses to Google or Yelp reviews using AI.

---

## 🚀 Features
- Generate AI-powered review responses (friendly, professional, playful tone options)
- Save responses to MongoDB
- REST API built with Express.js
- Frontend built with React (Vite)
- Ready for deployment on Render (backend) and Vercel (frontend)

---

## 🏗 Folder Structure
```
root/
├── backend/       # Express.js + MongoDB API
└── frontend/      # Vite + React App
```

---

## 🧠 Tech Stack
- Backend: Node.js, Express, Mongoose, OpenAI API
- Frontend: React, Vite, Axios
- Database: MongoDB
- Deployment: Render (backend), Vercel (frontend)

---

## 🛠 Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `/backend`:
```
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongodb_connection_uri_here
```
Run the server:
```bash
node index.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file inside `/frontend`:
```
VITE_API_URL=http://localhost:5000
```
Run the React app:
```bash
npm run dev
```

---

## 🌍 Deployment

### Deploy Backend to Render
- Create new web service from GitHub or ZIP
- Set build command: `npm install`
- Set start command: `node index.js`
- Add environment variables

### Deploy Frontend to Vercel
- Import frontend folder from GitHub or upload
- Set environment variable:
  ```
  VITE_API_URL=https://your-backend-url.onrender.com
  ```

---

## 📬 API Endpoints

### `POST /generate-response`
Request:
```json
{
  "reviewText": "The service was amazing!",
  "tone": "friendly"
}
```
Response:
```json
{
  "aiResponse": "Thank you so much! We're thrilled you enjoyed the service — see you again soon! 💅"
}
```

### `POST /save-review`
Stores the review + AI response in the database.

---

## ✨ Credits
Created with ❤️ to help local businesses build customer trust faster.
