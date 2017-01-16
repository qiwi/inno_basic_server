Базовый пример проекта на es6+koa+ts
## Запуск

```
npm run watch
```
Запустится nodemon, который будет смотреть на изменения .ts файлов и транспилить их в js.

Также можно врубить поддержку TS в IDE, чтобы были видны ошибки в окне редактора.

## Линтер
Линтёр - это хорошо. 

Пользуемся им так:

```
npm run lint
```
При желании можно его поставить глобально: Ставим его вот так: https://palantir.github.io/tslint/
Правила пока немного экспериментальные.
Перед коммитами стараемся не забывать его прогонять.

## TODO
#### Сделать тесты API
Юнит тесты не нужны, будем покрывать именно REST API.
Вот тут есть сравнение современных либ: https://github.com/koajs/koa/issues/703
Можно попробовать  jest+supertest-as-promised. 
Делать надо так, чтобы можно было использовать и дописывать людям с _очень_ слабым знанием JS (QA).
Так можно будет покрыть потребности чекаута и кассы
#### Сделать middleware авторизации
Подключается в routes на нужные методы. Принимает в basic авторизации id пользователя и хеш от пароля.
Если все ок - пропускает дальше. Закрыть методы удаления и обновления пользователя.
#### Еще
* Подключить compress в koa
* Добавить CORS, если в конфиге development
* Отключить etag header в koa ( app.disable('etag') - было в express )

#### Потом
* Определить название вместо innotrio
* Выделить в отдельную библиотеку, включив туда app.js
* Вытащить в github?

## Установка
Создать базу koa и прописать в настройках config.js

### Полезное
* Библиотека валидатора: https://github.com/chriso/validator.js
* Используе pg-pool для бд: https://github.com/brianc/node-pg-pool

