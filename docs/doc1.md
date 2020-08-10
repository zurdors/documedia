---
id: doc1
title: Cómo renovar automáticamente certificados SSL en un servidor Ubuntu 16.04 con Apache y Bitnami WordPress Stack.
sidebar_label: Renovación SSL
---

Let’s Encrypt es una entidad de certificación (CA) que proporciona una manera sencilla de obtener e instalar certificados de TLS/SSL gratuitos, lo que permite usar HTTPS cifrado en servidores web. Simplifica el proceso al proporcionar un cliente de software, [Lego](https://github.com/go-acme/lego), que intenta automatizar la mayoría (cuando no todos) de los pasos requeridos. Cabe mencionar que los certificados Let's Encrypt solo son válidos durante tres meses por los que es necesario renovar el certificado antes de que caduque.

En este tutorial, se utilizará Lego y Cron para renovar automáticamente un certificado de SSL gratuito.

:::important

En este tutorial asumimos que usted ya generó y configuró por primera vez, utilizando Lego, un certificado SSL en el servidor Ubuntu 16.04 con Apache y Bitnami WordPress Stack. Si no es así, siga el siguiente tutorial de [Cómo generar un certificado SSL](#).

:::

## Requisitos previos
Para este tutorial, necesitará lo siguiente:
* Un servidor/instancia Ubuntu 16.04 LTS con Apache y Bitnami WordPress Stack
* Un editor de texto basado en consola o terminal. Para este tutorial se utilizará VIM.
* Debe disponer de Cron instalado en el servidor
* Un nombre de dominio registrado y apuntando hacia el IP del servidor desde donde generaremos el certificado. En este tutorial, se utilizará el subdominio tienda.dimedia.xyz como ejemplo. Puede adquirir un nombre de dominio en [GoDaddy](https://mx.godaddy.com) u obtener uno gratuito en [Freenom](https://www.freenom.com/es/index.html?lang=es) o utilizar un registrador de dominios de su preferencia.

## Crear un script de shell
Para renovar automáticamente los certificados antes de que caduquen, es necesario escribir un [script de shell](https://es.wikipedia.org/wiki/Script_de_shell) que corra los comandos de renovación del certificado y posteriormente programar una tarea en Cron que ejecute periódica y automaticamente el script.

* Con VIM crea un script en `/opt/bitnami/letsencrypt/scripts/`. Asígnale el nombre de tu preferencia al script. En este tutorial nosotros nombramos nuestro archivo como `renovar-certificado.sh`.

```bash
sudo vim /opt/bitnami/letsencrypt/scripts/renovar-certificado.sh
```

* Copia, pega y guarda el contenido que se encuentra en el bloque de código de abajo en el script que acabas de crear. Recuerda sustituir el nombre del subdomino _tienda.dimedia.xyz_ por el nombre de tu domino o subdomino, también remplaza el correo electrónico _ gaspar@dimedia.xyz_ con tu dirección de correo electrónico.

```bash
#!/bin/bash

## Detiene todos los servicios
sudo /opt/bitnami/ctlscript.sh stop

## Solicita un nuevo certficado para tienda.dimedia.xyz
sudo /opt/bitnami/letsencrypt/lego --tls --email="gaspar@dimedia.xyz" --domains="tienda.dimedia.xyz" --path="/opt/bitnami/letsencrypt" renew --days 90

## Copia los certificados a la ruta/dirección donde se almacenarán los nuevos certificados para el modulo wordpress del sitio web tienda.dimedia.xyz
sudo cp /opt/bitnami/letsencrypt/certificates/tienda.dimedia.xyz.crt /opt/bitnami/apps/shopdmwp/conf/certs/server.crt
sudo cp /opt/bitnami/letsencrypt/certificates/tienda.dimedia.xyz.key /opt/bitnami/apps/shopdmwp/conf/certs/server.key

## Inicia todos los servicios
sudo /opt/bitnami/ctlscript.sh start

```

:::note
No es necesario copiar los comentarios `##` del script.
:::

## Autorizar ejecución de script de shell
El script de shell que acabamos de crear será ejecutado por Cron, pero por defecto el archivo no tiene dichos permisos por lo cual tendremos que asignárselo de la siguiente manera:

```bash
sudo chmod +x /opt/bitnami/letsencrypt/scripts/renovar-certificado.sh
```

**Recuerda** cambiar el nombre del script `renovar-certificado.sh` por el nombre que le asignaste en los pasos anteriores.

## Programar script de shell en Cron
Ahora es momento de programar la tarea de Cron para ejecutar periódica y automáticamente la renovación del certificados SSL. En el caso de este tutorial, la tarea será programada para que a la _una de madrugada del primer día de cada mes_ se renueve el certificado SSL.

- Ejecuta el siguiente comando para abrir el archivo crontab con el editor VIM:
```bash
sudo VISUAL=vim crontab -e
```

- Agregamos las siguientes líneas al archivos crontab:
```bash
0 7 1 * * /opt/bitnami/letsencrypt/scripts/renovar-certificado.sh 2> /dev/null
```

Esta tarea se ejecuta en segundo plano redireccionando el error estándar de la secuencia de comandos a una ubicación vacía, como `/dev/null`.
