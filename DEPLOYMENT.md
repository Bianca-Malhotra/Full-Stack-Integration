# 🚀 Deployment Guide

## Option 1: Quick Demo (Free - 5 minutes)

### Step 1: Deploy Backend to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo: `Bianca-Malhotra/Full-Stack-Integration`
4. Configure:
   - **Root Directory**: `Rest-Api-main/Rest-Api`
   - **Runtime**: Java
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/Rest-Api-0.0.1-SNAPSHOT.jar`
5. Add environment variables:
   - `DATABASE_URL`: Your production database URL
   - `DB_USERNAME`: Database username
   - `DB_PASSWORD`: Database password

### Step 2: Update Frontend API URL
1. Get your backend URL from Render (e.g., `https://your-app.onrender.com`)
2. Update `src/api.js`:
```javascript
const BASE_URL = process.env.NODE_ENV === 'production'
  ? "https://your-app.onrender.com/api/students"
  : "http://localhost:8081/api/students";
```

### Step 3: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import from GitHub: `Bianca-Malhotra/Full-Stack-Integration`
4. Configure:
   - **Root Directory**: `fsd_integration`
   - **Build Settings**: Automatic
5. Deploy!

## Option 2: Railway (Free tier available)

### Deploy Both Services
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Deploy backend first, then frontend
4. Get the backend URL and update frontend API

## Option 3: Manual Deployment

### Backend (Heroku/AWS)
```bash
# Build the JAR
cd Rest-Api-main/Rest-Api
./mvnw clean package -DskipTests

# Deploy JAR to your hosting platform
```

### Frontend (Netlify/Vercel)
```bash
cd fsd_integration
npm run build
# Upload dist/ folder to hosting platform
```

## 🌐 Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

**Single Access Link**: Your frontend URL (e.g., `https://your-frontend.vercel.app`)

## 🔧 Environment Variables

Create these in your hosting platform:

### Backend (Render/Railway):
```
DATABASE_URL=jdbc:mysql://your-db-host:3306/your-db-name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### Frontend (Vercel):
```
NODE_ENV=production
```

## 📱 Testing Your Deployment

1. Visit your frontend URL
2. Try adding a student
3. Check if data persists (backend working)
4. Test search and edit features

## 💡 Pro Tips

- Use Railway for easiest setup (both services in one platform)
- Render + Vercel for better performance
- Add a health check endpoint for monitoring
- Consider adding authentication for production use