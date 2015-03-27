load('application');

before('check authorization', function(c){
   
    if(!req.session.authed)        
        redirect('/login');
    else
        c.next();
}, {except: ['get', 'single']});

action('edit', function(){
    
    var slug = req.param('slug');
    
    if(slug){
        
        Post.findOne({where: {slug: slug}}, function(err, post){ 
            
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
    
    if(!post.date)
        post.date = new Date();
    
    if(!post.slug)
        create(post);
    else
        save(post);
    
    function create(post){
        
        makeSlug(post.title, 0, function(slug){
            
            post.slug = slug;
            Post.create(post, function(err, obj){
                send({post: obj});
            });
        });
        
        function makeSlug(title, i, callback){
            
            var slug = title.toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
            
            if(i)
                slug += i;
            
            console.log(slug);
                    
            Post.findOne({where: {slug: slug}}, function(err, postObj){
                
                if(postObj && postObj.slug == slug)
                    makeSlug(title, i+1, callback);
                else
                    callback(slug);
            });
        } 
    };
    
    function save(post){
        
        Post.findOne({where: {slug: post.slug}}, function(err, postObj){
            
            if(!postObj)
                send({error: 'No Post Found'});
            else{
                postObj.title = post.title;
                postObj.content = post.content;
                postObj.save();
                send({post: postObj});
            }                
        });
    }
    
});

action('delete', function(){
    
    Post.findOne({where: {slug: req.param('slug')}}, function(err, post){
       
        console.log("DESTROYED! " + req.param('slug') + ' ' + post.slug);
        
        if(post.slug != req.param('slug'))
            send({error: 'post not found'});
        else{
            post.destroy();
            send({});
        }
    });
});

action('list', function(){
    
    render({
        title: 'Post List'
    });
});

action('single', function(){
    
    
    Post.findOne({where: {slug: req.param('id')}}, function(err, post){
        
        render({
            title: 'adanferguson.com: ' + post.title,
            post: post
        });
    });
});

action('get', function(){
   
    var count = req.param('count');
    var page = req.param('page') ? req.param('page') : 0;
    
    if(count == 'all'){
        Post.all({order: 'date DESC'}, function(err, posts){

            getTotalThenSend(posts);
        });        
    }    
    else{
        Post.all({order: 'date DESC', limit: parseInt(count), skip: page * count}, function(err, posts){

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