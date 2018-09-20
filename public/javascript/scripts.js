// // javascript/scripts.js
// alert("qondaysang!!!");


//     // listens for a form submit event
//     document.getElementById("newComment").addEventListener("submit", e => {
//         // prevent the default form behavior
//         e.preventDefault();
//         // serialize the form data into an object
//         let comment = this.serializeArray()
//         // use axios to initialize a post request and send in the form data

//         axios.post(`/movies/${movieId}/reviews/${reviewId}/comments`, comment)
//             .then(function (response) {
//                 // wait for the success response from the server
//                 console.log(response);
//                 // remove the information from the form
//                 this.reset();
//                 // display the data as a new comment on the page
//                 document.getElementById('comments').prepend(
//                 `
//                      <div class="card" id="${response.data.comment._id}">
//                             <div class="card-block">
//                                 <h4 class="card-title">${response.data.comment.title}</h4>
//                                 <p class="card-text">${response.data.comment.content}</p>
//                                 <p>
//                                 <button class="btn btn-link" id="deleteComment" data-comment-id=${response.data.comment._id}>Delete</button>
//                                 </p>
//                             </div>
//                         </div>
//                 `
//                 );
//             })
//     });

window.onload = function () {

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
                newCommentForm.reset();


                $('#comments').prepend(
                    `
            <div class="card">
                <div class="card-block">
                <p class="card-text">${newComment.content}</p>
                <p>
                    <form method="POST" action="/reviews/comments/${newComment._id}?_method=DELETE">
                        <button class="btn btn-link" type="submit">Delete</button>
                    </form>
                </p>
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

};
