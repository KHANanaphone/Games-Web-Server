exports.routes = function (map) {


    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');

    map.get('/', 'home#games');
    map.get('/blog', 'home#blog');
    map.get('/games', 'home#games');
    map.get('/about', 'home#about');
    map.get('/login', 'home#login');

    map.get('/posts', 'posts#list');

};
