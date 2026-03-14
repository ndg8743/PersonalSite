# Workshop: Build & Host Your Personal Site on Hydra

## 1. Log in and create your container

1. Go to **hydra.newpaltz.edu** and sign in with your SUNY account
2. Click **Initialize Container** — wait for it to show "Running"
3. Click the **VS Code** link to open your browser IDE

## 2. Clone the starter repo

In the VS Code terminal (or SSH):

```bash
git clone https://github.com/ndg8743/PersonalSite.git ~/PersonalSite
cd ~/PersonalSite
```

## 3. Make it yours

Edit `src/` files in VS Code to customize the site. The project is React + TypeScript + Vite.

## 4. Build and run with Docker

```bash
cd ~/PersonalSite
docker build -t my-site .
docker run -d --name my-site -p 3000:80 my-site
```

Verify it works:

```bash
curl -s http://localhost:3000 | head -5
```

## 5. Expose your site publicly

1. Go back to the Hydra dashboard
2. Scroll to **Port Routing** → **Add Custom Route**
3. Endpoint: `mysite`, Port: `3000`, click **Add**
4. Your site is live at: `https://hydra.newpaltz.edu/students/YOUR_USERNAME/mysite/`

The route defaults to **Public** (no login required). Toggle to **SSO** if you want it private.

## 6. Rebuild after changes

```bash
docker stop my-site && docker rm my-site
docker build -t my-site . && docker run -d --name my-site -p 3000:80 my-site
```

## 7. (Optional) Make it persistent with supervisord

Create `~/supervisor.d/mysite.conf`:

```ini
[program:mysite]
# hydra.port=3000
# hydra.endpoint=mysite
command=docker start -a my-site
user=student
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/mysite.log
stderr_logfile=/var/log/supervisor/mysite-err.log
```

Then reload:

```bash
sudo supervisorctl reread
sudo supervisorctl update
```

## SSH access (optional)

1. Dashboard → **SSH Access** → **Download Key**
2. On your laptop:

```bash
mv ~/Downloads/YOUR_USERNAME_hydra_key ~/.ssh/
chmod 600 ~/.ssh/YOUR_USERNAME_hydra_key
ssh -i ~/.ssh/YOUR_USERNAME_hydra_key YOUR_USERNAME@hydra.newpaltz.edu -p 2222
```
