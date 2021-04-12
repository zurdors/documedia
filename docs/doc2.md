---
id: doc2
title: Certificados HTTPS para Wordpress Bitnami
sidebar_label: Nuevo SSL
---

# Certificados HTTPS para Wordpress Bitnami
En este tutorial aprenderás a cómo instalar, crear, y configurar correctamente un **Certificado SSL Gratuito**, para nuestra instalación de **WordPress en Amazon Web Services (AWS) versión Bitnami**.

> Contar con un certificado SSL es primordial para mejorar la seguridad de nuestro sitio web y cumplir con las directrices de Google obteniendo una mejor indexación de nuestra página web (Posicionamiento Orgánico SEO).

## Instrucciones
Guía paso a paso:
1. Generar certificados HTTPS
2. Activar certificados para la aplicación Bitnami
3. Configurar Wordpress
4. Configurar Auto-Renovación del Certificado SSL.

## Generar certificados HTTPS 
#### Detener todos los servicios
```bash
sudo /opt/bitnami/ctlscript.sh stop
```

#### Generar los certificados con lego
```bash
sudo lego --tls --email="gaspar@dimedia.xyz" --domains="dimedia.xyz" --path="/opt/bitnami/letsencrypt" run
```

#### Copiar los certificados SSH a las carpetas de certificados de las aplicaciones
```bash
sudo cp /opt/bitnami/letsencrypt/certificates/dimedia.xyz.crt /opt/bitnami/apps/dimediawp/conf/certs/server.crt

sudo cp /opt/bitnami/letsencrypt/certificates/dimedia.xyz.key /opt/bitnami/apps/dimediawp/conf/certs/server.key
```

#### Arrancar todos los servicios
```bash
sudo /opt/bitnami/ctlscript.sh start
```

## Activar certificados para la aplicación
#### Modificar el archivo bitnami-apps-vhosts.conf
Modificar el archivo bitnami-apps-vhosts.conf. Dicho archivo se encuentra en `/opt/bitnami/apache2/conf/bitnami/bitnami-apps-vhosts.conf`

Agregar en la última línea del archivo la siguiente línea:
```
Include "/opt/bitnami/apps/dimediawp/conf/httpd-vhosts.conf"
```
 ![](Captura%20de%20Pantalla%202019-11-05%20a%20la(s)%2019.19.16.png)

#### Modificar el archivo `bitnami-apps-prefix.conf`
Modificar el archivo `bitnami-apps-prefix.conf`. Dicho archivo se encuentra en `/opt/bitnami/apache2/conf/bitnami/bitnami-apps-prefix.conf`. Busca las siguientes líneas `Include "/opt/bitnami/apps/dimediawp/conf/httpd-prefix.conf"` y coméntelas:
```apache
# Bitnami applications installed in a prefix URL
Include "/opt/bitnami/apps/wordpress/conf/httpd-prefix.conf"
Include "/opt/bitnami/apps/phpmyadmin/conf/httpd-prefix.conf"
# Include "/opt/bitnami/apps/dimediawp/conf/httpd-prefix.conf"
```

#### Modificar el archivo `httpd-vhosts.conf`
El archivo se encuentra aquí /home/bitnami/apps/dimediawp/conf/httpd-vhosts.conf. Sustituye todas las líneas por las siguientes:
```apache
<VirtualHost *:80>
    ServerName dimedia.xyz
    ServerAlias www.dimedia.xyz
    DocumentRoot "/opt/bitnami/apps/dimediawp/htdocs"
    ServerAdmin    gaspar@dimedia.xyz
    Include "/opt/bitnami/apps/dimediawp/conf/httpd-app.conf"
    ErrorLog "/opt/bitnami/apache2/logs/dimediawp.com-error_log"
    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^/(.*) https://dimedia.xyz/$1 [R,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName dimedia.xyz
    ServerAlias www.dimedia.xyz
    DocumentRoot "/opt/bitnami/apps/dimediawp/htdocs"
    ServerAdmin    gaspar@dimedia.xyz
    Include "/opt/bitnami/apps/dimediawp/conf/httpd-app.conf"
    ErrorLog "/opt/bitnami/apache2/logs/dimediawp.com-error_log"
    SSLEngine on
    SSLCertificateFile "/opt/bitnami/apps/dimediawp/conf/certs/server.crt"
    SSLCertificateKeyFile "/opt/bitnami/apps/dimediawp/conf/certs/server.key"
    Include "/opt/bitnami/apps/dimediawp/conf/httpd-app.conf"
    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ https://%1$1 [R=permanent,L]
</VirtualHost>

```

#### Reiniciar todos los servicios:
Reinicie los servicios ejecutando el script sin ningún argumento:
```bash
sudo /opt/bitnami/ctlscript.sh restart
```

## Configurar wp-config.php
Abre wp-config.php de la aplicación a la que se activó el certificado HTTPS. Busca la siguientes líneas:
```php

define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/dimediawp');
define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/dimediawp');

```

Y sustitúyelas por las siguientes:
```php

define('WP_SITEURL', 'https://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME', 'https://' . $_SERVER['HTTP_HOST'] . '/');

```

Reinicie los servicios ejecutando el script sin ningún argumento:
```bash
sudo /opt/bitnami/ctlscript.sh restart
```

**Fecha de modificación:** 19 de noviembre de 2019, 17:48 