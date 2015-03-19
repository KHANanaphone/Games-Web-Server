load('application');

action('index', function(){
   
    console.log('app: ');
    
    render({
        title: 'Adan Page',
        posts: {}
           });
});