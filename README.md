# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


//create login page
-install axios
-isntall cors
add origin and credotal in cors
-whenever your makinga api call so pass axios =>{withcredediantial:true}
-got to application and see the token


#DEPLOYMENT
sigunup aws
create insatce ec2
create key pair
i did clone
  ##for frontend
then , npm i, npm run dev

## Deployed link (use HTTPS domain)
https://codeally.online

## API base URL (no .env needed)
In `src/utils/Constant.js` the base URL switches automatically:

```js
const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
export const BASE_URL = isLocalHost
  ? "http://localhost:9931"
  : `${window.location.origin}/api`;
```

## Nginx config (production)
Put this in `/etc/nginx/sites-available/default` and replace cert paths if needed:

```nginx
  server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name codeally.online www.codeally.online;
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name codeally.online www.codeally.online;

    ssl_certificate /etc/letsencrypt/live/codeally.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/codeally.online/privkey.pem;

    root /var/www/html;
    index index.html;

    # API proxy
    location /api/ {
      proxy_pass http://127.0.0.1:9931;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_read_timeout 60s;
    }

    # SPA fallback
    location / {
      try_files $uri /index.html;
    }
  }
```

# 🚀 PRODUCTION DEPLOYMENT GUIDE

## 📋 Prerequisites
- AWS EC2 instance: `i-078203704ab1904a9` (51.21.131.83)
- Domain: `codeally.online` pointing to EC2
- PEM key: `devTinder-gaurav.pem`

## 🔧 Initial Setup (One Time Only)
```bash
# 1. Set PEM permissions
chmod 400 devTinder-gaurav.pem

# 2. SSH to server
ssh -i "devTinder-gaurav.pem" ubuntu@ec2-51-21-131-83.eu-north-1.compute.amazonaws.com

# 3. Check services status
pm2 list
```

## 🔄 DEPLOYMENT WORKFLOW

### 📱 For FRONTEND Changes (UI, Landing page, Chat, etc.)
```bash
# Step 1: SSH to server
ssh -i "devTinder-gaurav.pem" ubuntu@ec2-51-21-131-83.eu-north-1.compute.amazonaws.com

# Step 2: Update frontend code
cd ~/Frontend
git pull origin main

# Step 3: Install new packages (only if you added new ones)
npm install --legacy-peer-deps

# Step 4: Build for production
npm run build

# Step 5: Deploy build (replace old files with new)
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
# updated
sudo rm -rf /var/www/codeally.online/*
sudo cp -r dist/* /var/www/codeally.online/

# ✅ DONE! Your site is now live at https://codeally.online
```

### 🖥️ For BACKEND Changes (APIs, Database, Business logic)
```bash
# Step 1: SSH to server
ssh -i "devTinder-gaurav.pem" ubuntu@ec2-51-21-131-83.eu-north-1.compute.amazonaws.com

# Step 2: Update backend code
cd ~/DevTinder
git pull origin main

# Step 3: Install new packages (only if you added new ones)
npm idepsnstall --legacy-peer-

# Step 4: Restart backend server with updated environment variables
pm2 restart devtinder-backend --update-env

# ✅ DONE! Your APIs are now live
```

## 🔧 NGINX CONFIGURATION (Only edit if needed)

**⚠️ IMPORTANT: Use the CORRECT config file**
```bash
# Edit the CORRECT nginx config file (NOT default!)
sudo nano /etc/nginx/sites-available/codeally.online

# After editing:
sudo nginx -t                    # Test config
sudo systemctl restart nginx     # Restart nginx
```

**Correct Nginx Config:**
```nginx
location /api/ {
    proxy_pass http://127.0.0.1:9931;  # NO trailing slash!
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 🚨 TROUBLESHOOTING

**If site is down:**
```bash
# Check backend status
pm2 list
pm2 logs devtinder-backend

# Restart everything
pm2 restart devtinder-backend
sudo systemctl restart nginx

# Test API
curl https://codeally.online/api
```

**Health Check URLs:**
- Website: https://codeally.online
- API: https://codeally.online/api

## 📝 QUICK REFERENCE

**Frontend deployment:** `git pull` → `npm run build`  
**Backend deployment:** `git pull` → `pm2 restart devtinder-backend`  
**Both changed:** Do frontend first, then backend

## ⚠️ CRITICAL NOTES
- ✅ Nginx config file: `/etc/nginx/sites-available/codeally.online` (NOT default!)
- ✅ Proxy pass: `http://127.0.0.1:9931` (NO trailing slash!)
- ✅ Always test locally before deploying
- ✅ Frontend builds to `dist/`; deploy by copying to `/var/www/html`

### If changes don’t show up
- Check deployed files: `ls -lah /var/www/html/`
- Hard refresh the browser (Ctrl/Cmd+Shift+R) or try Incognito
- Verify Nginx root: it should be `root /var/www/html;` in `/etc/nginx/sites-available/codeally.online`
 # sending email using ses
 - create a IAM user
 - give acces to amazomsesFull access
 -create ses:create identity
 -verify email and domain name
 - intall aws sdk v3
 -steup sesclient
 -acces credential should be created in Iam under securityCrenditail tab
 -add the credital to the env file
 -write code for sending email address 
 -make the email dynamic 
