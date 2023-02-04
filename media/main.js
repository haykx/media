// header bg change on scroll
const header = document.querySelector('header');
const postContainer = document.querySelector('.post.container');
const url = 'http://localhost:8040/api/v1';

window.addEventListener('load', renderPosts());
window.addEventListener('scroll',() =>{
    header.classList.toggle('shadow', window.scrollY > 0);
})

function renderPosts() {
    fetchPosts()
        .then(data => {
            data.forEach(post => {
                const div = generatePost(post.image, post.updated, post.headline);
                postContainer.appendChild(div);
            })
        })
        .catch(e => console.log(e));
}
async function fetchPosts() {
    return await fetch(url+'/post')
        .then(response => response.json())
}

function generatePost(img, date, headline){
    const div = document.createElement('div');
    div.classList.add("post-box");
    div.innerHTML =  `<img src="${getBase64Img(img)}" alt="" post-img><a href="post-page.html" class="post-title flicker">${headline}</a><span class="post-date">${new Date(date).toDateString()}</span>`
    return div;
}

function getBase64Img(base64) {
    return `data:image/jpeg;base64, ${base64}`;
}