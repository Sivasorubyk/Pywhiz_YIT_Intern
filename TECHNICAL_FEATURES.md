# PyWhiz – Technical Features

## 🛠️ Architecture
- **Frontend:** React.js (Vite) + TailwindCSS  
- **Backend:** Django REST Framework  
- **Database:** MySQL  
- **Hosting:** AWS EC2 (Ubuntu, Nginx, Gunicorn)  
- **APIs Used:**
  - OpenAI API (feedback & explanations)  
  - Piston API (Python code execution)  

---

## 📂 Core Modules

### 1. User Authentication
- **Signup:** Username, email, password, confirm password  
- **Login:** Email + password  
- **Logout:** JWT-based  
- **Forgot Password + OTP:** via email  

### 2. Lesson & Milestone Management
- `Milestone` model → defines stages of learning  
- `LearnContent` model → videos + study materials  
- API endpoints for:
  - Fetch milestones  
  - Fetch learning content  

### 3. Code Practice
- Integrated Python IDE in React  
- Backend uses Piston API to **execute Python code securely**  
- `CodeQuestion` model → stores practice tasks  
- `UserCodeAnswer` model → stores student attempts  

### 4. Exercise System
- Exercise Types:  
  - MCQ  
  - Drag-and-Drop  
  - Fill-in-the-Blank  
- `Exercise` model → stores exercise type per milestone  
- `ExerciseQuestion` model → stores individual questions  
- `UserExercise` model → stores student submissions  

### 5. Personalized Exercises
- After Milestone 7 → AI-generated exercises via **Gemini-1.5-Flash**  
- Personalization logic:  
  - Number of attempts  
  - Type of struggle (logic, syntax, etc.)  
  - Exercise difficulty levels: Easy / Intermediate / Difficult  
- `PersonalizedExercise` model → stores unique tasks  

### 6. Student Progress Tracking
- `UserProgress` model → records completed milestones  
- Dashboard shows completion percentage & weak areas  

---

## 🔧 Technical Features
- **React Components:** Navigation bar, footer, login/signup forms, IDE editor, progress dashboard  
- **Reusable Backend Structure:**  
  - Separate `user` app for authentication  
  - `lesson` app for milestones, exercises, personalization  
  - DRF serializers & views for clean API endpoints  
- **Database Schema:** Relational (MySQL), normalized to handle users, lessons, and exercises  
- **Security:** JWT authentication, supervisor logs on server  
- **Deployment:**  
  - Django + Gunicorn + Nginx (reverse proxy)  
  - MySQL on AWS EC2 instance  
  - Static files handled via Django storage  
