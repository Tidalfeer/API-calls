
//Fetch data using Fetch() function

document.getElementById("fetchFetchData").addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").textContent = `Title: ${data.title}`;
        document.getElementById("body").textContent = `Body: ${data.body}`;
    })
    .catch(error => {
        document.getElementById("statusMessage").textContent = `Error fetching data: ${error}`;
    });
});

//Fetch data using XHRHttpRequest() 

document.getElementById("fetchXHRData").addEventListener("click", function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById("title").textContent = `Title: ${data.title}`;
            document.getElementById("body").textContent = `Body: ${data.body}`;
        } else {
            document.getElementById("statusMessage").textContent = `Error fetching data...Status: ${xhr.status}`;
        }
    };

    xhr.onerror = function () {
        document.getElementById("statusMessage").textContent = `Network Failure`;
    };

    xhr.send();
});


//Posting data using POST function

document.getElementById("postForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;

    const postData = {
        title: title,
        body: body,
        id: 1
    };

    fetch('https://jsonplaveholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("statusMessage").textContent = `Post created: ID ${data.id}`;
    })
    .catch(error =>{
        document.getElementById("statusMessage").textContent = `Error posting... ${data.error}`;
    });
});


//Update post using PUT

document.getElementById("putForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const postId = document.getElementById("postId").value;
    const updatedTitle = document.getElementById("updateTitle").value;
    const updatedBody = document.getElementById("updateBody").value;

    const putData = {
        title: updatedTitle,
        body: updatedBody
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById("statusMessage").textContent = `Post Updated: Title ${data.title}, Body: ${data.body}`;
        } else {
            document.getElementById("statusMessage").textContent = `Error updating data... Status: ${xhr.status}`;
        }
    };

    xhr.onerror = function () {
        document.getElementById("statusMessage").textContent = 'Network Failure'; 
    };

    xhr.send(JSON.stringify(putData));
});

//Deleting a post

document.getElementById("deleteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const postId = document.getElementById("deletePostId").value;

    fetch(`https://jsonplaceholder.typicode.com/post/${postId}`, {
        method: 'DELETE',
    })
    .then(response => {
    if (response.ok) {
        document.getElementById("statusMessage").textContent = `Post with ID ${postId} deleted successfully`;
    } else {
        document.getElementById("statusMessage").textContent = `Error: Post not deleted`;
    }
    })
    .catch(error => {
        document.getElementById("statusMessage").textContent = `Error deleting post: ${error}`;
    });
});
