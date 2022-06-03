// На странице user-details.html:
// 4 Вывести всю, без исключения, информацию про объект user на кнопку/ссылку которого
// был совершен клик ранее.
// 5 Добавить кнопку "post of current user", при клике на которую, появляются title
// всех постов текущего юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту добавить кнопку/ссылку, при клике на которую происходит переход
// на страницу post-details.html, которая имеет детальную информацию про текущий пост.



try {
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
        .then(value => {

            const usersDet = document.createElement(`div`);
            usersDet.setAttribute(`class`, `usersDet`);

            for (const item of value) {
                const idUser = JSON.parse(localStorage.getItem(`idUser`));
                if (item.id === idUser) {
                    const userDet = document.createElement(`div`);
                    userDet.setAttribute(`class`, `userDet`);

                    for (const key in item) {
                        const elem = document.createElement(`li`);
                        // elem.setAttribute(`class`, `elem`);

                        if (typeof item[key] !== 'object') {
                            elem.innerText = `${key} : ${item[key]}`;
                        } else {
                            elem.innerText = `${key}`;
                            for (const element in item[key]) {
                                const itemDiv = document.createElement('li');
                                itemDiv.setAttribute(`class`, `elem`);

                                if (typeof item[key][element] !== 'object') {
                                    itemDiv.innerText = `${element} : ${item[key][element]}`;
                                } else {
                                    itemDiv.innerText = `${element}`;

                                    for (const itemDivElement in item[key][element]) {
                                        const itemElement = document.createElement('li');
                                        itemElement.setAttribute(`class`, `elem small`);
                                        itemElement.innerText = `${itemDivElement} : ${item[key][element][itemDivElement]}`;
                                        itemDiv.append(itemElement);
                                    }
                                }
                                elem.append(itemDiv);
                            }
                        }
                        userDet.append(elem);
                    }
                    usersDet.append(userDet);

                    const buttPostUser = document.createElement(`button`);
                    buttPostUser.setAttribute(`class`, `buttPostUser`);
                    buttPostUser.innerText = `Post of current user`;
                    userDet.append(buttPostUser);


                    buttPostUser.onclick = function () {

                        fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/posts`)
                            .then(response => response.json())
                            .then(value1 => {

                                const titles = document.createElement(`div`);
                                titles.setAttribute(`class`, `titles_wrap`);

                                for (const post of value1) {
                                    const liTitle = document.createElement(`li`);
                                    liTitle.setAttribute(`class`, `liTitle`);
                                    liTitle.innerText = post.title;
                                    titles.append(liTitle);


                                    const postDetails = document.createElement(`a`);
                                    postDetails.setAttribute(`target`, `_blank`);
                                    postDetails.setAttribute(`class`, `link_postDetails`);
                                    postDetails.setAttribute(`href`, `http://localhost:63342/project_js/html/post-details.html?_ijt=401nubq02h9vjq5afosgbr59bh&_ij_reload=RELOAD_ON_SAVE`);
                                    liTitle.append(postDetails);
                                    postDetails.innerHTML = `<br>Post Details`;
                                    postDetails.style.fontSize = `20px`;
                                    postDetails.style.margin = `30px`;


                                    postDetails.onclick = function () {
                                        localStorage.setItem(`idPost`, `${post.id}`);
                                    }

                                }
                                userDet.append(titles);
                            })
                        buttPostUser.disabled = true;
                    }
                }
            }
            document.body.append(usersDet);
        })

}catch (e) {
    e.message=`The server cannot receive requests. Repeat the request.`;
    console.log(e);
}