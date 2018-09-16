// javascript/scripts.js
alert("hello world");
// Make a request to the color api
axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
    .then(function (response) {
        // handle success
        alert(response.hex.value);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });


    // listen for a form submit event
    // prevent the default form behavior
    // serialize the form data into an object
    // use axios to initialize a post request and send in the form data
    // wait for the success response from the server
    // remove the information from the form
    // display the data as a new comment on the page
    // handle any errors

    // listens for a form submit event
    document.getElementById("newComment").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();
        // serialize the form data into an object
        let comment = this.serializeArray()
        // use axios to initialize a post request and send in the form data


        // axios.post('/user', comment)
        //     .then(function (response) {
        //         // wait for the success response from the server
        //         console.log(response);
        //         // remove the information from the form
        //         // display the data as a new comment on the page
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         // handle any errors
        //         alert('There was a problem saving your comment. Please try again.')
        //     });

        axios.post(`/movies/${movieId}/reviews/${reviewId}/comments`, comment)
            .then(function (response) {
                // wait for the success response from the server
                console.log(response);
                // remove the information from the form
                this.reset();
                // display the data as a new comment on the page
                document.getElementById('comments').prepend(
                `
                     <div class="card" id="${response.data.comment._id}">
                            <div class="card-block">
                                <h4 class="card-title">${response.data.comment.title}</h4>
                                <p class="card-text">${response.data.comment.content}</p>
                                <p>
                                <button class="btn btn-link" id="deleteComment" data-comment-id=${response.data.comment._id}>Delete</button>
                                </p>
                            </div>
                        </div>
                `
                );
            })
    });