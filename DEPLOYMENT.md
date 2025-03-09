# Deployment Guide for EC2

## Prerequisites

1. AWS Account with EC2 access
2. EC2 instance running Amazon Linux 2023 or Ubuntu
3. Node.js 14+ installed on EC2
4. MySQL installed on EC2 or using RDS
5. Domain name (optional)

## EC2 Setup

1. Launch EC2 instance
   - Choose Amazon Linux 2023 or Ubuntu
   - t2.micro is sufficient for basic usage
   - Configure security group:
     - HTTP (80)
     - HTTPS (443)
     - SSH (22)
     - Custom TCP (8888) for backend API
     - MySQL (3306) if using local MySQL

2. Install required software:
   ```bash
   # Update system
   sudo yum update -y  # For Amazon Linux
   # or
   sudo apt update && sudo apt upgrade -y  # For Ubuntu

   # Install Node.js
   curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -  # For Amazon Linux
   sudo yum install -y nodejs
   # or
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -  # For Ubuntu
   sudo apt-get install -y nodejs

   # Install MySQL (skip if using RDS)
   sudo yum install -y mysql mysql-server  # For Amazon Linux
   # or
   sudo apt install -y mysql-server  # For Ubuntu

   # Install PM2 globally
   sudo npm install -y pm2 -g
   ```

3. Setup MySQL:
   ```bash
   # Start MySQL
   sudo systemctl start mysqld
   sudo systemctl enable mysqld

   # Secure MySQL installation
   sudo mysql_secure_installation
   ```

## Application Deployment

1. Clone repository:
   ```bash
   git clone <your-repo-url>
   cd test-todo-list-app
   ```

2. Backend Setup:
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cat > .env << EOL
   NODE_ENV=production
   PORT=8888
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=todo_app
   DB_PORT=3306
   FRONTEND_URL=http://your-domain-or-ip
   EOL

   # Initialize database
   npm run init-db

   # Start backend with PM2
   npm run prod
   ```

3. Frontend Setup:
   ```bash
   cd ../frontend
   npm install

   # Create .env file
   cat > .env << EOL
   REACT_APP_API_URL=http://your-domain-or-ip:8888
   EOL

   # Build frontend
   npm run build

   # Install and configure nginx
   sudo yum install -y nginx  # For Amazon Linux
   # or
   sudo apt install -y nginx  # For Ubuntu
   ```

4. Nginx Configuration:
   ```nginx
   # /etc/nginx/conf.d/todo-app.conf
   server {
       listen 80;
       server_name your-domain-or-ip;

       location / {
           root /path/to/frontend/build;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # Proxy API requests to backend
       location /todos {
           proxy_pass http://localhost:8888;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. Start Nginx:
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

## SSL Setup (Optional)

1. Install Certbot:
   ```bash
   sudo yum install -y certbot python3-certbot-nginx  # For Amazon Linux
   # or
   sudo apt install -y certbot python3-certbot-nginx  # For Ubuntu
   ```

2. Get SSL certificate:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Maintenance

- Monitor logs:
  ```bash
  pm2 logs
  pm2 monit
  ```

- Update application:
  ```bash
  cd /path/to/app
  git pull
  cd backend
  npm install
  pm2 reload all
  cd ../frontend
  npm install
  npm run build
  ```

## Troubleshooting

1. Check backend status:
   ```bash
   pm2 status
   pm2 logs todo-backend
   ```

2. Check nginx status:
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

3. Check MySQL status:
   ```bash
   sudo systemctl status mysqld
   ```

4. Common issues:
   - If the API is not accessible, check security group settings
   - If the frontend can't connect to backend, check CORS settings
   - If MySQL fails to connect, check credentials and firewall settings

## Backup

1. Database backup:
   ```bash
   mysqldump -u your_user -p todo_app > backup.sql
   ```

2. Application backup:
   ```bash
   tar -czf todo-app-backup.tar.gz /path/to/app
   ```