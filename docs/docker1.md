---
id: docker1
title: Comandos básicos de Docker
sidebar_label: Comandos Docker
---
:::important
Una página con comandos básicos para dominar Docker
:::

## Introducción
Docker hace que sea fácil envolver sus aplicaciones y servicios en contenedores para poder ejecutarlos en cualquier lugar. Sin embargo, a medida que se trabaja con Docker, también es fácil acumular una cantidad excesiva de imágenes, contenedores y volúmenes de datos que consumen recursos y ocupan espacio en disco.

Docker le brinda todas las herramientas necesarias para limpiar su sistema desde la línea de comandos. En esta guía a modo de página de trucos se brinda una referencia rápida a comandos útiles para liberar espacio en el disco y mantener su sistema organizado mediante la eliminación de imágenes, contenedores y volúmenes no utilizados de Docker.

## docker ps
El comando `docker ps` es muy util para listar todos los contenedores que tiene instalado. En combinación con otros argumentos es una herramienta muy efectiva para filtrar información de los contenedores.