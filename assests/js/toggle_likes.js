// class ToggleLike{
//     constructor(toggleElement) {
//         this.toggler = toggleElement;
//         this.toggleLike();
//     }


//     toggleLike() {
        
//         $(this.toggler).click((e) => {
//             e.preventDefault();
//             let self = this;

//             // new way of writing ajax,looks like promises

//             $.ajax({
//                 type: 'GET',
//                 url: $(self).attr('href'),
//             })
//                 .done((data) => {
//                     console.log(data)
//                 let likesCount = parseInt($(self).attr('data-likes'));
//                 console.log(likesCount);

//                 // if (data.data.deleted == true)
//                 // {
//                 //     likesCount -= 1;
//                 // }
//                 // else
//                 // {
//                 //     likesCount += 1;
//                 // }

//                 $(self).attr('data-likes', likesCount);
//                 $(self).html(`${likesCount} Likes`)
//             })
//             .fail((errData) => {
//                 console.log("Error in completing request",errData)
//             })
//         })
//     }
// }

function toggleLike(toggleBtn){
    console.log(toggleBtn);
    $(toggleBtn).click(function(event){
        event.preventDefault();
        $.ajax({
            type : "GET",
            url : $(toggleBtn).attr("href"),
            success : function(data){
                let likesCount = $(toggleBtn).attr("data-likes");
                console.log(likesCount , toggleBtn);
                console.log(data);
                if(data.deleted){
                    likesCount--;
                }else{
                    likesCount++;
                }
                
                $(toggleBtn).attr("data-likes" , likesCount);
                let newLike;
                console.log(data.likeableType)

                if(data.type == 'Posts'){
                    if(data.deleted == true){
                        newLike = newUnLikeDomPost(likesCount , data.likeableType);
                    }else{
                        newLike = newLikeDomPost(likesCount , data.likeableType);
                    }
                }

                if(data.type == 'Comments'){
                    if(data.deleted == true){
                        newLike = newUnLikeDomComment(likesCount , data.likeableType);
                    }else{
                        newLike = newLikeDomComment(likesCount , data.likeableType);
                    }
                }
               
                $(toggleBtn).html(newLike)
                return res.redirect('back');
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
    }   


    $('.toggle-btn').each(function(){
        toggleLike($(this));
    });




    let newLikeDomPost = function (likesCount , post) {
        return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${post._id}&type=Posts">
        <img
          src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
          alt="likes-icon"
        />
      </a>
        <span>${likesCount}</span>`);
      };

      let newUnLikeDomPost = function (likesCount , post) {
        return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${post._id}&type=Posts">
        <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="likes-icon"
          />
      </a>
        <span>${likesCount}</span>`);
      };

      let newLikeDomComment = function (likesCount , comment) {
        return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${comment._id}&type=Comments">
        <img
          src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
          alt="likes-icon"
        />
      </a>
        <span>${likesCount}</span>`);
      };

      let newUnLikeDomComment = function (likesCount , comment) {
        return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${comment._id}&type=Comments">
        <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="likes-icon"
          />
      </a>
        <span>${likesCount}</span>`);
      };