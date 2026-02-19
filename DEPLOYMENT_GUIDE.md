# Book Bazar Deployment Guide - Render

## Backend Deployment on Render

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Setup Render deployment"
git push origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easier)
3. Connect your GitHub account

### Step 3: Deploy Backend on Render

1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Select **"Connect Repository"** → Choose your `book-bazar` repo
4. Configure:
   - **Name**: `book-bazar-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm ci --omit=dev && npm rebuild bcrypt`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preference)

5. Click **"Advanced"** and add Environment Variables:

   ```
   DB_URL = your-mongodb-atlas-connection-string
   JWT_SECRET_KEY = your-jwt-secret-key
   NODE_ENV = production
   ```

6. Leave everything else as default
7. Click **"Create Web Service"**
8. Wait for deployment (3-5 minutes)
9. Copy your Render URL (e.g., `https://book-bazar-backend.onrender.com`)

### Step 4: Deploy Frontend on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select GitHub → Choose `book-bazar` repo
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `frontend`

5. Click **"Deploy site"**
6. Go to **Site settings** → **Build & deploy** → **Environment**
7. Add environment variable:
   ```
   VITE_API_URL = https://book-bazar-backend.onrender.com
   ```
8. **Trigger deploy** to apply changes

### Step 5: Update CORS in Backend

Once you have your Render backend URL, update `backend/index.js`:

```javascript
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://your-netlify-site.netlify.app",
            "https://book-bazar.onrender.com",
          ]
        : ["http://localhost:5173"],
    credentials: true,
  }),
);
```

Then push the changes:

```bash
git add backend/index.js
git commit -m "Update CORS for production"
git push origin main
```

### Step 6: Test Your Deployment

1. Visit your Netlify URL: `https://your-site.netlify.app`
2. Try admin login with:
   - Username: `admin`
   - Password: `kasturi`
3. Check the browser console (F12) for any errors

---

## Troubleshooting

### 401 Unauthorized on Admin Login

- Check if MongoDB is accessible from Render
- Verify JWT_SECRET_KEY is set in Render environment variables

### CORS Errors

- Make sure VITE_API_URL in Netlify matches your Render backend URL
- Update CORS origins in backend/index.js

### Page Not Found (404)

- Make sure netlify.toml exists in frontend folder
- Redeploy on Netlify after updating

### MongoDB Connection Issues

- Verify DB_URL in Render environment
- Add Render IP to MongoDB Atlas whitelist (0.0.0.0/0)

---

## Important Notes

- **Free plan on Render**: Services spin down after 15 minutes of inactivity
- **Free plan on Netlify**: Limited build minutes per month
- Keep your MongoDB Atlas connection string and JWT secret secure!
