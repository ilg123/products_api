# Django Tree Menu

Этот проект представляет собой небольшое Django-приложение, которое будет состоять из двух частей:

1. API для работы с продуктами (создание и получение списка).
2. Страница на HTML с использованием JavaScript для отправки данных на API и отображения продуктов.

## Требования

- Docker
- Docker Compose

## Установка

1. Клонируйте репозиторий:
   git clone https://github.com/ilg123/products_api.git ->
   cd products_api

2. Создайте файл .env в корневой директории проекта и добавьте следующие строки пример -> env_example.txt

3. Соберите Docker-образ:
    docker-compose build

4. Выполните миграции и создайте суперпользователя:
    docker-compose run web python manage.py makemigrations ->
    docker-compose run web python manage.py migrate ->
    docker-compose run web python manage.py createsuperuser

5. Запустите контейнеры:
    docker-compose up

6. Откройте браузер и перейдите по адресу http://127.0.0.1:8000/, чтобы добавить пункты продуктов.
