load('application');

action('index', function(){
    
    
    var page = req.param('id') ? req.param('id') : 0;
    
    render({
        title: 'Adan Page',
        page: page
           });
});