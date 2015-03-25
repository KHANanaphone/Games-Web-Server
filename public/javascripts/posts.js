var Posts = {};

Posts.savePost = function(){
    
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
        var $row = $('#hidden .post-row').clone();
        
        $row.find('a.link').text(post.title).attr('href', '/posts/edit?slug=' + post.slug);
        $row.find('a.delete').on('dblclick', function(){
            
            $.post('/posts/delete', {slug: post.slug});
            $(this).parent().remove();
        });
        
        $('#post-list').append($row);
    }
}