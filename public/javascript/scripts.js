// //javascript/scripts.js

let currentUrl = new URL(window.location.href);
let currentPath = currentUrl.pathname.split('/');
let movieId = currentPath[2];
let reviewId = currentPath[4];

window.onload = function () {

    document.querySelector('.delete-review').addEventListener('click', (e) => {
        e.preventDefault();
        console.log("hello");
    })

    // we get the form from the handlebard/html form
    let newCommentForm = document.getElementById("newComment");
    document.getElementById("newComment").addEventListener("submit", e => {

        e.preventDefault();

        // DONT USE serializeArray(), it returns an arrya but we want JSON
        let comment = $(newCommentForm).serialize();

        // use axios to initialize a post request and send in the form data
        axios.post(`/movies/${comment.movieId}/reviews/comments`, comment)
            .then(function (response) {

                // we get the comment on a JSON format from the response
                let newComment = response.data.comment;
                let index = document.querySelectorAll(".card").length

                newCommentForm.reset();


                $('#comments').prepend(
                `
                    <div class = "card" id = "${newComment._id}">
                        <div class="card-block">
                        <h4 class="card-fowl">${newComment.title}<h4>
                        <p class="card-text">${newComment.content}</p>
                            <p>
            
                            <button class="btn btn-link delete-comment" id="delete-comment-${index}" type="button" onclick="deleteComment(${index});" data-comment-id=${newComment._id}>Delete</button>                            </p>
                        
                            </div>
                    </div>
                `
                );
            })
            .catch(function (error) {
                console.log(error);
                alert('There was a problem saving your comment. Please try again.')
            });
    });

}

function deleteComment(index) {
    console.log('click!');
    // let comment =
    //  $(newCommentForm).serialize();
    let commentId = $("#delete-comment-" + index).attr('data-comment-id');
    let movieId = $("#movieId").val()
    console.log(commentId)
    console.log(movieId)
    // let movieId = e.target.getAttribute('data-movie-id');
    axios.delete(`/movies/${movieId}/reviews/comments/${commentId}`)
        .then(response => {
            console.log(response);
            $(`#${commentId}`).remove();
        })
        .catch(error => {
            console.log(error);

        });
}