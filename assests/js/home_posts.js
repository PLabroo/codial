// method to submit form using ajax
{
    let createPost = () => {
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e) => {
            e.preventDefault();

            console.log(this);
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container >ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // enable the functionality of toggle like button on new post
                    // new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: "relax",
                        text: "Post published!",
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
     
    // method to create post in DOM

let newPostDOM = (post) => {
    return $(`<li id="post-${post._id}">
        <p>

        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">DELETE</a>
        </small>
            ${post.content}
        <br>
            <small>
                ${post.user.name}
            </small>
            
            <small>
                <a href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                    0 Likes
                </a> 
            </small>

        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">

                    </ul>
                </div>
        </div>
    </li>
`)
    }
    
    let deletePost = (deleteLink) => {

        console.log(deleteLink);
        $(deleteLink).click((e) => {
            console.log("Deleted clicked")
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: (data) => {
                    $(`#post-${data.data.post_id}`).remove();
                    
                }, error: (err)=> {
                    console.log(err.responseText);
                }
            })
        })
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = ()=> {
    console.log("ajax");
    $("#posts-list-container>div").each(()=>{
    let self = $(this);
    console.log(self);
    let deleteButton = $(" .delete-post-btn", self);
    console.log(deleteButton);
    deletePost(deleteButton);

      // get the post's id by splitting the id attribute
    //   let postId = self.prop("id").split("-")[1];
    //   new PostComments(postId);
    });
  };
    createPost();
    convertPostsToAjax();
}

