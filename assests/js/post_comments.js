{
    let createComment = () => {
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit((e) => {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let newComment = newCommentDOM(data.data.comment);
                    $('#post-comments-list >ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                    
                    new Noty({
                        theme: "relax",
                        text: "Comment made!",
                        type: "success",
                        layout: "topRight",
                        timeout: 1500,
                    }).show();

                }, error: (err) => {
                    console.log(err.responseText);
                }
            })
        })
    }

    // method to create comment in DOM
    let newCommentDOM = (comment) => {
        return $(`<li id="comment-${comment._id}">
    <p>
        <small>
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">DELETE</a>
        </small>
                ${comment.content}
        <br>
        <small>
                ${comment.user.name}
        </small>
    </p>
        </li>`)
    }


    let deleteComment = (deleteLink) => {
        $(deleteLink).click((e) => {
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: (data) => {
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: "relax",
                        text: "Comment Deleted",
                        type: "success",
                        layout: "topRight",
                        timeout: 1500,
                    }).show();
                },
                error: (err) => {
                    console.log(err.responseText);
                }
            })
        })
    }
    createComment();
}