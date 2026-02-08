# --- ЕТАП 1: Збірка проекту (React + Vite) ---
FROM node:20-alpine AS builder

WORKDIR /app

# Копіюємо залежності та встановлюємо їх
COPY package.json package-lock.json* ./
RUN npm install

# Копіюємо весь код і робимо білд
COPY . .
RUN npm run build

# --- ЕТАП 2: Nginx + Автоматична конфігурація ---
FROM nginx:alpine

# Встановлюємо робочу папку для Nginx
WORKDIR /usr/share/nginx/html

# Видаляємо стандартний конфіг
RUN rm /etc/nginx/conf.d/default.conf

# 1. СТВОРЮЄМО ШАБЛОН КОНФІГУРАЦІЇ ПРЯМО В DOCKERFILE
# Ми використовуємо змінну $DIRECTUS_URL, яка підставиться при запуску
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Головна сторінка (Frontend) \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Кешування статики \
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|mp4)$ { \
        expires 6M; \
        access_log off; \
        add_header Cache-Control "public"; \
    } \
    \
    # Проксі для API (Backend) \
    location /api/ { \
        rewrite ^/api/(.*) /$1 break; \
        # $DIRECTUS_URL буде замінено на реальну адресу при запуску \
        proxy_pass $DIRECTUS_URL; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
    } \
}' > /etc/nginx/conf.d/default.conf.template

# Копіюємо зібраний React сайт з першого етапу
COPY --from=builder /app/dist .

# Відкриваємо порт
EXPOSE 80

# 2. МАГІЧНА КОМАНДА ЗАПУСКУ
# Вона бере змінну середовища з Coolify, вставляє її в конфіг і запускає Nginx
CMD ["/bin/sh", "-c", "envsubst '$DIRECTUS_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
