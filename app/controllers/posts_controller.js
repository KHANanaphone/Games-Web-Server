load('application');

action('edit', function(){
    
    var number = req.param('number');
    
    if(number){
        
        Post.findOne({where: {number: number}}, function(err, post){ 
            
            render({
                title: 'title',
                post: post
            });
        });        
    }
    else{
        render({
            title: 'title',
            post: null
        });
    }    
});

action('save', function(){
   
    var post = req.param('post');
    console.log(post);
    
    if(!post.date)
        post.date = new Date();
    
    if(!post.number)
        getPostNumber(post);
    else
        create(post);
    
    function getPostNumber(post){
        
        Post.findOne({order: 'number DESC'}, function(err, newestPost){
            
            if(!newestPost)
                post.number = 1;
            else
                post.number = newestPost.number + 1;
            
            create(post);
        });
    }
    
    function create(post){
        
        Post.create(post, function(err, p){
            
            send({post: p});
        });
    }
    
});

action('list', function(){
    
    render({
        title: 'Post List'
    });
});

action('get', function(){
   
    var count = req.param('count');
    var page = req.param('page') ? req.param('page') : 0;
    
    if(count == 'all'){
        Post.all({order: 'number DESC'}, function(err, posts){

            getTotalThenSend(posts);
        });        
    }    
    else{
        Post.all({order: 'number DESC', limit: parseInt(count), skip: page * count}, function(err, posts){

            getTotalThenSend(posts);
        });     
    }
    
    function getTotalThenSend(posts){
        
        Post.count(function(err, count){
           
            console.log(posts);
            send({posts: posts, count: count});
        });
    }
});