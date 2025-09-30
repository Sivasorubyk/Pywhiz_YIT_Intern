# Pywhiz - YIT Intern Project

Pywhiz is a **Python learning platform for kids (ages 11–16)** built with modern full-stack technologies.  
The application provides **milestone-based learning**, **live code execution**, and **personalized exercises** to help students learn Python in a fun and interactive way.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite + TypeScript + TailwindCSS)  
- **Backend**: Django REST Framework (DRF)  
- **Database**: MySQL  
- **Authentication**: JWT (JSON Web Token)  
- **APIs**: OpenAI API (feedback & debugging), Piston API (code execution)  
- **Cloud**: AWS S3 (private video streaming)  
- **Hosting**: AWS EC2 (Ubuntu 24.04), GitHub-based deployment  

---

## 📂 Project Structure as it is.

## ⚡ Prerequisites

Before setting up, ensure you have installed:

- [Node.js](https://nodejs.org/) (>= 18.x)  
- [Python](https://www.python.org/downloads/) (>= 3.10)  
- [MySQL](https://dev.mysql.com/downloads/) (>= 8.0)  
- [Git](https://git-scm.com/)  
- [Docker](https://www.docker.com/) (optional, for deployment)  

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sivasorubyk/Pywhiz_YIT_Intern.git
cd Pywhiz_YIT_Intern

2️⃣ Backend Setup (Django + MySQL)
1. Create and activate a virtual environment:
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows


2. Install dependencies:
pip install -r requirements.txt

3. Configure MySQL database in backend/settings.py:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'pywhiz_yit_intern',
        'USER': 'root',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

4. Apply migrations:
python manage.py makemigrations
python manage.py migrate

5. Create a superuser:
python manage.py createsuperuser

6. Run the Django server:
python manage.py runserver

Backend will be available at:
👉 http://127.0.0.1:8000/

3️⃣ Frontend Setup (React + Vite + TailwindCSS)
1. Navigate to frontend:
cd ../frontend

2. Install dependencies:
npm install

3. Create a .env file inside frontend/:
VITE_API_URL=http://127.0.0.1:8000/api

4. Run the frontend:
npm run dev

Frontend will be available at:
👉 http://127.0.0.1:5173/

4️⃣ API Integrations

Piston API: Used for live Python code execution.

OpenAI API: Used for personalized feedback, debugging help, and explanations.

👉 Add your API keys in backend/.env:
OPENAI_API_KEY=your_openai_api_key
PISTON_API_URL=https://emkc.org/api/v2/piston/execute

5️⃣ AWS S3 Video Integration

For milestone learning videos:

Upload videos to your private S3 bucket.

Generate pre-signed URLs.

Store URLs in the LearnContent model in Django.

6️⃣ Deployment on AWS EC2 (Direct from GitHub)

Steps you can follow to deploy:

1. Launch an Ubuntu 24.04 EC2 instance

2. Install required packages:

sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip mysql-server nginx git -y

3. Clone the repo:
git clone https://github.com/Sivasorubyk/Pywhiz_YIT_Intern.git
cd Pywhiz_YIT_Intern

4.Setup backend (venv, pip install, migrations)

5.Setup frontend (npm install, build with npm run build)

6.Configure Gunicorn + Nginx for Django

7.Serve React build folder (frontend/dist) with Nginx

✅ Features

JWT-based authentication system

15 milestones with videos & exercises

Code editor with dynamic input/output execution

OpenAI-powered feedback & debugging

Personalized exercises after milestone 7

Private AWS-hosted milestone videos

Deployed directly on AWS EC2 instance

Once you complete you should able to see as follows: (Just for reference)

Check out my project (https://drive.google.com/file/d/1I1AEgVpDTA6kqnRxs_VY3INriihEZXdP/view?usp=sharing)

This project is fully open-source.








