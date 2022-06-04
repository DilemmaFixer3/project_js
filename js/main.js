// В index.html
// 1 получить массив объектов user с endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вывести id,name всех user в index.html. Отдельный блок для каждого user.
// 3 Добавить каждому блоку кнопку/ссылку , при клике на которую происходит переход на
// страницу user-details.html, которая имеет детальную информацию про объект на который кликнули
//

    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
        .then(value => {

            const wrap_users = document.createElement(`div`);
            wrap_users.setAttribute(`class`, `wrap_users`);
            document.body.append(wrap_users);

            for (const item of value) {
                const user = document.createElement(`div`);
                user.setAttribute(`class`, `user`);
                user.innerHTML = `<h3>ID : ${item.id}</h3>
                            <h2>Name : ${item.name}</h2>`;
                wrap_users.append(user);

                const userDetails = document.createElement(`a`);
                userDetails.setAttribute(`target`, `_blank`);
                userDetails.setAttribute(`class`, `link_userDetails`);
                userDetails.setAttribute(`href`, `http://localhost:63342/project_js/html/user-details.html?_ijt=401nubq02h9vjq5afosgbr59bh&_ij_reload=RELOAD_ON_SAVE`);
                user.append(userDetails);
                userDetails.innerText = `User Details`;
                // userDetails.style.fontSize=`20px`;
                userDetails.style.margin = `30px`;


                userDetails.onclick = function () {
                    localStorage.setItem(`idUser`, `${item.id}`);
                }


            }

        })



//----------------------Приклад помилки------------------------------------------
// const err = document.createElement(`div`);
// err.innerHTML=`<h1>ServerBusy 503</h1>
//                          <h3>The server cannot receive requests. Repeat the request.</h3>`;
// err.style.width=`100%`;
// err.style.justifyContent= `center`;
// err.style.textAlign = `center`;
// document.body.append(err);
//----------------------------------------------------------------------------

//
// На странице user-details.html:
// 4 Вывести всю, без исключения, информацию про объект user на кнопку/ссылку которого
// был совершен клик ранее.
// 5 Добавить кнопку "post of current user", при клике на которую, появляются title
// всех постов текущего юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту добавить кнопку/ссылку, при клике на которую происходит переход
// на страницу post-details.html, которая имеет детальную информацию про текущий пост.
//
// На странице post-details.html:
// 7 Вывести всю, без исключения, информацию про объект post на кнопку/ссылку
// которого был совершен клик ранее.
// 8 Ниже информации про пост, вывести все комментарии текущего поста (эндпоинт
// для получения информации - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизация проекта -
// index.html - все блоки с user - по 2 в ряд. кнопки/ссылки находяться под информацией про user.
// user-details.html - блок с информацией про user вверху страницы. Кнопка ниже,
// на 90% ширины страницы, по центру.
// блоки с краткой информацией про post - в ряд по 5 объектов.

// post-details.html - блок с информацией про пост вверху.
// Комментарии - по 4 в ряд.

// Все без исключения элементы, который характеризируют user,post,
// comment  визуализировать,
// так, что бы было видно их блоки (дать задний фон + margin.
// Иными словами - крайне четкая сетка)
