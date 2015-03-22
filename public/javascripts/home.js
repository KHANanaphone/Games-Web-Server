var Home = {
    POSTS_PER_PAGE: 5
};

Home.showPosts = function(page){
    
    $.post('/posts/get', {count: Home.POSTS_PER_PAGE, page: page}, function(data){
        
        Home.setupNav(page, data.count);
        
        for(var i = 0; i < data.posts.length; i++){
            
            var post = data.posts[i];
            var $post = $('#hidden .single-post').clone();
            Home.showSinglePost($post, post);
            setupCommentsLink($post, post.number);
            $('#posts-list').append($post);
            
        }    
        
//        importDisqus();
    });  
    
    function setupCommentsLink($target, number){
        
        var $link = $target.find('.comments-link')
            .attr('href', '/post?id=' + number);
        
        $link.find('span').attr('data-disqus-identifier', number);
    }
    
    function importDisqus(){
        
        var s = document.createElement('script'); 
        s.async = true;
        s.type = 'text/javascript';
        s.src = '//adanferguson.disqus.com/count.js';
        (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
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

Home.showSinglePost = function($post, post){
    
    var date = new Date(post.date);

    $post.find('.title').text(post.title).attr('href', '/post?id=' + post.number);
    $post.find('.author').text('Adan');
    $post.find('.date').text(date.format('mmmm d, yyyy'));
    $post.find('.content').html(post.content);
}

Home.showComments = function($target, number){
    
    var disqus_shortname = 'adanferguson';
    var disqus_identifier = number;

    var dsq = document.createElement('script'); 
    dsq.type = 'text/javascript'; 
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}