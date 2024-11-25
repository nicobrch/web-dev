# Web Dev
Ayudantías de Desarrollo Web y Móvil 2024-02.

## Ayudantía 08

En esta ayudantía continuaremos viendo el desarrollo de la página coon frontend y backend separados de forma local.

Luego, veremos como desplegar nuestra aplicación en AWS utilizando NGINX, teniendo una URL para los archivos HTML y otra URL para la API.

### Dependencias Previas

Todo esto ya lo deberían tener instalado en su instancia:

```shell
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
sudo chown -R $USER:$USER /var/www/
sudo chmod -R 755 /var/www
sudo apt-get update
sudo apt-get install git
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install pm2@latest -g
```

Copiaremos los archivos necesarios para nuestra entrega, en mi caso lo haré con git.

```shell
git clone git@github.com:nicobrch/web-dev.git
git checkout ayudantia-08
cd web-dev/backend
npm install
```

Finalmente nos aseguramos que este ejecutandose nuestra aplicación de express.

```shell
pm2 start index.js --name app-express
pm2 startup
pm2 save
```

### Configurar NGINX

Primero, configuraremos el backend (la aplicación de express) para que funcione mediante NGINX en la ruta /api.

```shell
sudo nano /etc/nginx/sites-available/default
```

```shell
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Luego, movemos los archivos del frontend a la carpeta /var/www/html.

```shell
cd web-dev/front
sudo cp -r * /var/www/html
```

Finalmente, configuraremos el frontend (las páginas HTML) para que funcione mediante NGINX en la ruta /.

```shell
location / {
    if ($request_uri ~ ^/(.*)\.html(\?|$)) {
        return 302 /$1;
    }
    try_files $uri $uri.html $uri/ =404;
}
```

Si tienen problemas de CORS, cambiar el location /api a lo siguienteÑ

```shell
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;

    # Encabezados CORS
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS, DELETE, PUT";
    add_header Access-Control-Allow-Headers "Authorization, Content-Type, X-Requested-With";
    
    # Manejo de OPTIONS para preflight
    if ($request_method = OPTIONS) {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS, DELETE, PUT";
        add_header Access-Control-Allow-Headers "Authorization, Content-Type, X-Requested-With";
        add_header Content-Length 0;
        add_header Content-Type text/plain;
        return 204;
    }
}
```

También podrían necesitar cambiar sus API calls de localhost:3000 a la URL de la instancia.

Finalmente reiniciamos NGINX

```shell
sudo systemctl restart nginx
```