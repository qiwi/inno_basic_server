define({ "api": [
  {
    "type": "post",
    "url": "/public/auth/login",
    "title": "",
    "name": "login",
    "group": "Auth",
    "description": "<p>Авторизует пользователя. В ответ на запрос отдаст JWT-Токен. Его необходимо указывать в заголовке Authorization.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта пользователя.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>jwtToken</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cHWL6MGW4LeYvnm1JA\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/public/users/add",
    "title": "",
    "name": "createUser",
    "group": "User",
    "description": "<p>Добавляет нового пользователя</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта пользователя.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Созданный пользователь.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/remove",
    "title": "",
    "name": "deleteUser",
    "group": "User",
    "description": "<p>Удаление пользователя</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Идентификатор пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>результат удаления.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/public/users/item",
    "title": "",
    "name": "getUser",
    "group": "User",
    "description": "<p>Возвращает список созданных юзеров</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Идентификатор пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>пользователь.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/public/users/items",
    "title": "",
    "name": "getUsers",
    "group": "User",
    "description": "<p>Возвращает список созданных юзеров</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Массив созданных пользователей.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/update",
    "title": "",
    "name": "updateUser",
    "group": "User",
    "description": "<p>Обновление пользователя</p>",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers-Example:",
          "content": "{ \"Authorization\": \"Bearer :jwtToken\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Идентификатор пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>обновленный пользователь.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  }
] });
