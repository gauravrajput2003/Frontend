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

# deployed link of frontend
http://51.21.131.83
# nginx config
    location /api/ {
        proxy_pass http://localhost:9931/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

# steps in git bash for production
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




2. chmod 400 devTinder-gaurav.pem
3. ssh -i "devTinder-gaurav.pem" ubuntu@ec2-51-21-131-83.eu-north-1.compute.amazonaws.com
4. pm2 list    
5. for edit nginx config
  sudo nano /etc/nginx/sites-available/default    
  after chaneg (ctrl+o for save press enter then ctrl+x)
6. Test and restart Nginx 
sudo nginx -t
sudo systemctl restart nginx 
