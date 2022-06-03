// На странице post-details.html:
// 7 Вывести всю, без исключения, информацию про объект post на кнопку/ссылку
// которого был совершен клик ранее.
// 8 Ниже информации про пост, вывести все комментарии текущего поста (эндпоинт
// для получения информации - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const idUser = JSON.parse(localStorage.getItem(`idUser`));

const idPost = JSON.parse(localStorage.getItem(`idPost`));

try {
    fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/posts`)
        .then(response => response.json())
        .then(value => {
            for (const post of value) {
                if (post.id === idPost) {
                    const postDiv = document.createElement(`div`);
                    postDiv.setAttribute(`class`, `post`);
                    postDiv.innerHTML = `<h3>User ID : ${post.userId}</h3>
                                     <h4>ID : ${post.id}</h4>
                                     <h3>Title : ${post.title}</h3>
                                     <p><b>Body :</b> ${post.body}</p>`;
                    document.body.append(postDiv);

                    const titleComments = document.createElement(`h1`);
                    titleComments.innerText = `Comments to this post`;
                    titleComments.setAttribute(`class`, `titleComments`);
                    document.body.append(titleComments);




                    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
                        .then(response => response.json())
                        .then(value1 => {

                            const commentsWrap = document.createElement(`div`);
                            commentsWrap.setAttribute(`class`, `commentsWrap`);
                            for (const comment of value1) {
                                const commentDiv = document.createElement(`div`);
                                commentDiv.setAttribute(`class`, `commentDiv`);
                                commentDiv.innerHTML = `<h4>Post ID : ${comment.postId}</h4>
                                                    <h4>ID : ${comment.id}</h4>
                                                    <h2>Name : ${comment.name}</h2>
                                                    <h3>Email : ${comment.email}</h3>
                                                    <p><b>Body :</b> ${comment.body}</p>`;
                                commentsWrap.append(commentDiv);
                            }
                            document.body.append(commentsWrap);
                        })
                }
            }
        })
}catch (e) {
    e.message=`The server cannot receive requests. Repeat the request.`;
    console.log(e);
}
