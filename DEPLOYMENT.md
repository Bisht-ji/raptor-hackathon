# 🚀 Deployment Guide - Collapsing IDE

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Build the client**:
```bash
cd client
npm run build
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Configure**:
- Set build command: `npm run build`
- Set output directory: `dist`
- Set install command: `npm install`

#### Backend Deployment

Deploy backend separately on Render, Railway, or Fly.io (see below).

---

### Option 2: Netlify (Frontend)

1. **Build**:
```bash
cd client
npm run build
```

2. **Deploy via Netlify CLI**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

3. **Configure**:
- Build command: `npm run build`
- Publish directory: `dist`

---

### Option 3: Render (Full Stack)

#### Frontend (Static Site)

1. Connect your GitHub repo
2. Set build command: `cd client && npm install && npm run build`
3. Set publish directory: `client/dist`

#### Backend (Web Service)

1. Connect your GitHub repo
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add environment variables from `.env.example`

---

### Option 4: Railway (Full Stack)

1. **Install Railway CLI**:
```bash
npm i -g @railway/cli
```

2. **Login**:
```bash
railway login
```

3. **Deploy Backend**:
```bash
cd server
railway up
```

4. **Deploy Frontend**:
```bash
cd client
railway up
```

5. **Set Environment Variables** in Railway dashboard

---

### Option 5: Docker (Self-Hosted)

#### Create Dockerfile for Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install --production

COPY server/ ./

EXPOSE 5000

CMD ["node", "src/index.js"]
```

#### Create Dockerfile for Frontend

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=${MONGODB_URI}
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

**Deploy**:
```bash
docker-compose up -d
```

---

### Option 6: AWS (Production-Ready)

#### Frontend (S3 + CloudFront)

1. **Build**:
```bash
cd client && npm run build
```

2. **Upload to S3**:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront** for CDN

#### Backend (EC2 + Load Balancer)

1. Launch EC2 instance
2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone and setup:
```bash
git clone <your-repo>
cd collapsing-ide-pro/server
npm install
```

4. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start src/index.js --name collapsing-ide-backend
pm2 startup
pm2 save
```

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.com
VITE_SOCKET_URL=https://your-backend-url.com
```

### Backend (.env)

```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/collapsing-ide
JWT_SECRET=super_secure_random_string_here
```

---

## Performance Optimization

### 1. Enable Compression

```javascript
// server/src/index.js
import compression from 'compression';
app.use(compression());
```

### 2. Add Caching Headers

```javascript
app.use(express.static('public', {
  maxAge: '1y',
  etag: false
}));
```

### 3. Use CDN for Static Assets

Upload Monaco Editor files to CDN and reference in index.html.

### 4. Enable GZIP

```nginx
# nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

---

## Monitoring

### Add Application Monitoring

```bash
npm install newrelic
# or
npm install @sentry/node
```

### Health Check Endpoint

Already included at `/api/health`

---

## Security Checklist

- [ ] Enable HTTPS (use Let's Encrypt)
- [ ] Set secure headers (helmet.js already configured)
- [ ] Enable CORS with specific origins
- [ ] Rate limit API endpoints (already configured)
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Implement JWT authentication for API
- [ ] Add input validation
- [ ] Enable CSP headers
- [ ] Regular dependency updates

---

## Scaling

### Horizontal Scaling

Use load balancer (AWS ALB, Nginx) with multiple backend instances:

```nginx
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    location /api {
        proxy_pass http://backend;
    }
}
```

### Database Scaling

Use MongoDB Atlas with replica sets and sharding.

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        npm install
        cd client && npm install
        cd ../server && npm install
    
    - name: Build frontend
      run: cd client && npm run build
    
    - name: Deploy to Vercel
      run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CLIENT_URL in backend .env
   - Verify CORS configuration in server/src/index.js

2. **Socket.IO Connection Failed**
   - Ensure WebSocket support on hosting platform
   - Check firewall rules

3. **MongoDB Connection Timeout**
   - Whitelist IP address in MongoDB Atlas
   - Verify connection string

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version (18+)

---

## Cost Estimation

### Free Tier Options

- **Frontend**: Vercel/Netlify (Free)
- **Backend**: Render/Railway (Free tier available)
- **Database**: MongoDB Atlas (512MB free)

**Total**: $0/month for low traffic

### Production (Medium Traffic)

- **Frontend**: Vercel Pro ($20/month)
- **Backend**: AWS EC2 t3.small ($15/month)
- **Database**: MongoDB Atlas M10 ($57/month)
- **CDN**: CloudFront ($5-10/month)

**Total**: ~$100/month

---

## Support

For deployment issues:
1. Check the logs
2. Open an issue on GitHub
3. Contact support

**Happy deploying! 💥**
