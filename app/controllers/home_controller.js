load('application');

action('blog', function(){

    var page = req.param('id') ? req.param('id') : 0;

    render({
        title: "Adan's Game Design",
        page: page
           });
});

action('games', function(){

    render({
        title: "Adan's Game Design - Games"
           });
});

action('about', function(){

    render({
        title: "Adan's Game Design - About"
           });
});

action('login', function(){

    var code = req.param('code');

    if(code == 'koolkode420'){

        req.session.authed = true;
        redirect('/posts');
    }

    render({
        title: "Adan's Game Design - About"
           });
});
