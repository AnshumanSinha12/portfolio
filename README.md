# Anshuman Sinha — Portfolio Website

A clean, modern portfolio built with **Flask + Python**.

---

## 📁 Project Structure

```
portfolio/
├── app.py                  # Flask app (main entry point)
├── requirements.txt        # Python dependencies
├── Procfile                # For Render deployment
├── templates/
│   └── index.html          # Main HTML page
└── static/
    ├── css/
    │   └── style.css       # All styles + dark/light theme
    └── js/
        └── main.js         # Cursor, theme toggle, animations
```

---

## 🚀 Run Locally

### Step 1 — Install Python
Make sure Python 3.8+ is installed. Check with:
```bash
python --version
```

### Step 2 — Create Virtual Environment
```bash
cd portfolio
python -m venv venv
```

### Step 3 — Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```
**Mac/Linux:**
```bash
source venv/bin/activate
```

### Step 4 — Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5 — Run the App
```bash
python app.py
```

Open your browser and go to: **http://127.0.0.1:5000**

---

## 🌐 Deploy on Render (FREE)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/AnshumanSinha12/portfolio.git
git push -u origin main
```

### Step 2 — Create Render Account
Go to **https://render.com** → Sign up with GitHub

### Step 3 — New Web Service
- Click **"New +"** → **"Web Service"**
- Connect your GitHub repo
- Fill in:
  - **Name:** anshuman-portfolio
  - **Runtime:** Python 3
  - **Build Command:** `pip install -r requirements.txt`
  - **Start Command:** `gunicorn app:app`
  - **Instance Type:** Free

### Step 4 — Deploy!
Click **"Create Web Service"** — Render will auto-deploy.
Your site will be live at: `https://anshuman-portfolio.onrender.com`

---

## ✨ Features
- Light / Dark theme toggle (saves preference)
- Custom cursor with hover effects
- Smooth scroll reveal animations
- Floating tech chips in hero
- Fully responsive (mobile-friendly)
- Clean sections: Hero, About, Skills, Projects, Contact

---

## 📬 Contact
- Email: anshumansinha1209@gmail.com
- GitHub: https://github.com/AnshumanSinha12
- LinkedIn: https://www.linkedin.com/in/anshuman-sinha-45ba89319
