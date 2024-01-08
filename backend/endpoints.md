- http://localhost:8000/app/users/
- http://localhost:8000/app/skills/
- http://localhost:8000/app/courses/
- http://localhost:8000/app/resources/
- http://localhost:8000/app/posts/

Перечисленные выше адреса работают одинаково: GET - получение списка всех узлов. Eсли добавить /[id]/, то: GET получение одного узла, PUT изменение, DELETE удаление

- http://localhost:8000/app/users/[id]/follows/ - получение списка подписок
- http://localhost:8000/app/users/[id]/followers/ - получение списка подписчиков



- http://localhost:8000/app/auth/ - авторизация работает так:

Отправляете POST запрос с телом
<pre>{
    "username": "user5@example.com",
    "password": "password5"
}</pre>
Важно чтобы в значении username был указан email. Получаете ответ в виде:
<pre>{
    "token": "3d4b4cdda1f5407cf1f533f955380561ca97b7c9"
}</pre>
Этот токен ужно вставить в заголовки запросов, которые требуют авторизацию. Вставлять нужно заголовок "Authorization" со значением "Token  <ключ>". Важно, что после слова Token стоит 2 пробела. 

- http://localhost:8000/app/signup/ - регистрация нового пользователя. Запрос примерно выглядит так: 
<pre>{
    "name": "test",
    "email": "test@mail.ru",
    "password": "test",
    "date_of_birth": "1990-01-01"
}</pre>
После отправки должен прийти авторизационный токен.

- http://localhost:8000/app/costile/ - костыль. После создания контента в neo4j, нужно взять почту и пароли пользователей и занести их в систему авторизации вручную. Для этого отправляем POST запрос по этому адресу с телом:
<pre>[
    {"email": "user1@example.com", "password": "password1"},
    {"email": "user2@example.com", "password": "password2"},
    {"email": "user3@example.com", "password": "password3"},
    {"email": "user4@example.com", "password": "password4"},
    {"email": "user5@example.com", "password": "password5"}
]</pre>
В ответ должны получить токены пользователей:
<pre>[
    "748b357902a77ef444d813d278910c49057020d3",
    "3aeacef3285981c177aae1d27392c41f2f07d844",
    "3dd108042fbc8874d7782d70028425103892dbaa",
    "7aedfdd797a87838dabd6fb6548668b6019ee4e6",
    "3d4b4cdda1f5407cf1f533f955380561ca97b7c9"
]</pre>


- http://localhost:8000/app/self/ - получение общей информации об авторизованном пользователе
- http://localhost:8000/app/follows/ - список своих подписок
- http://localhost:8000/app/followers/ - список своих подписчиков
- http://localhost:8000/app/myskills/ - список своих навыков

если по адресу follows или myskills отправить еще /[id]/ методом POST, то это подписка или присвоение себе скилла соответственно. Если отправлять методом DELETE, то это обратное действие.

- http://localhost:8000/app/post_likes/
- http://localhost:8000/app/course_likes/

списки постов/курсов, которые пользователь лайкнул. При запросе POST/DELETE с передачей в тело запроса post_id и course_id соответстенно, ставится/убирается лайк.

