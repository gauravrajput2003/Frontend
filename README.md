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

# Steps in git bash for production
#1st step
cd ~/Downloads
cd ~/DevTinder
ssh -i "devTinder-gaurav.pem" ubuntu@ec2-51-21-131-83.eu-north-1.compute.amazonaws.com
# if we change in backend follow this-
cd ~/DevTinder
git pull origin main
npm install --legacy-peer-deps
pm2 restart devtinder-backend
# if we change in Frontend follow this-
  cd ~/Frontend
git pull origin main
npm install --legacy-peer-deps
npm run build
---------------
# restart nginx
sudo systemctl restart nginx

## Notes
- Keep ports 80 and 443 open in the EC2 Security Group. You can restrict 9931; Nginx proxies locally.
- Backend cookies are secure in production; using the domain + HTTPS is required for auth to persist.




2. chmod 400 devTinder-gaurav.pem
3. ssh -i "devTinder-gaurav.pem" ubuntu@ec2-51-21-131-83.eu-north-1.compute.amazonaws.com
4. pm2 list    
5. # ---for edit nginx config
  sudo nano /etc/nginx/sites-available/default    
  after chaneg (ctrl+o for save press enter then ctrl+x)
6. Test and restart Nginx 
sudo nginx -t
sudo systemctl restart nginx 
