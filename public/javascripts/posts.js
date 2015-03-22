var Posts = {};

Posts.savePost = function(){
    
    var currentPost = Posts.currentPost ? Posts.currentPost : {};
    
    currentPost.title = $('#post-title').val();
    currentPost.content = $('.note-editable').html();
    
    $.post('/posts/save', {post: currentPost}, function(data){
        
        Posts.currentPost = data.post;
        window.location = "/posts";
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
        
        $row.find('a.link').text(post.title).attr('href', '/posts/edit?number=' + post.number);
        $row.find('a.delete').on('dblclick', function(){
            
            $.post('/posts/delete', {number: post.number});
            $(this).parent().remove();
        });
        
        $('#post-list').append($row);
    }
}