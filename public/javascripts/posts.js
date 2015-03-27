var Posts = {};

Posts.savePost = function(){
    
    $('#save').attr('disabled', true);
    
    var currentPost = Posts.currentPost ? Posts.currentPost : {};
    
    currentPost.title = $('#post-title').val();
    currentPost.content = $('.note-editable').html();
    
    $.post('/posts/save', {post: currentPost}, function(data){
        
        if(data.error){
            $('#error').show().text(data.error);
        }
        else{
            window.location = "/";
        }
        
    });
}

Posts.setup = function(post){
    
    Posts.currentPost = post;
    
    $('#post-title').val(post.title);
    $('.note-editable').html(post.content);
}

Posts.list = function(posts){
            
    for(var i = 0; i < posts.length; i++){

        var post = posts[i];
        var $row = $('#hidden .post-row').clone()
            .data('post', post);
        
        $row.find('a.link')
            .text(post.title)
            .attr('href', '/posts/edit?slug=' + post.slug);
        
        $row.find('a.delete').on('dblclick', function(){
            
            var slug = $(this).parents('.post-row').data('post').slug;
            
            $.post('/posts/delete', {slug: slug}, function(resp){
                
                if(!resp.error)
                    $(this).parent().remove();
                else
                    console.log(resp.error);
            });
        });
        
        $('#post-list').append($row);
    }
}