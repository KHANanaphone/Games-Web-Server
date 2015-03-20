var Home = {
    POSTS_PER_PAGE: 2
};

Home.showPosts = function(page){
    
    $.post('/posts/get', {count: Home.POSTS_PER_PAGE, page: page}, function(data){
        
        Home.setupNav(page, data.count);
        
        for(var i = 0; i < data.posts.length; i++){
            
            showPost(data.posts[i]);
        }    
    });  
    
    showPost = function(post){
        
        var $post = $('#hidden .single-post').clone();
        
        $post.find('.title').text(post.title);
        $post.find('.author').text('Adan');
        $post.find('.date').text(post.date);
        $post.find('.content').html(post.content);
        
        $('#posts-list').append($post);
    }
};

Home.setupNav = function(page, count){
  
    if(page == 0)
        $('#posts-nav .left').hide();
    else
        $('#posts-nav .left').attr('href', '/page?id=' + (page - 1));
    
    if((page + 1) * Home.POSTS_PER_PAGE >= count)
        $('#posts-nav .right').hide();
    else
        $('#posts-nav .right').attr('href', '/page?id=' + (page + 1));    
};