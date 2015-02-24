load('application');

before(loadRating, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('insert', function(){

	Rating.create(req.body.Rating, function(err, rating){
		send({err: err});
	})
});
	
action('new', function () {
    this.title = 'New rating';
    this.rating = new Rating;
    render();
});

action(function create() {
    Rating.create(req.body.Rating, function (err, rating) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: rating && rating.errors || err});
                } else {
                    send({code: 200, data: rating.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Rating can not be created');
                    render('new', {
                        rating: rating,
                        title: 'New rating'
                    });
                } else {
                    flash('info', 'Rating created');
                    redirect(path_to.ratings);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Ratings index';
    Rating.all(function (err, ratings) {
        switch (params.format) {
            case "json":
                send({code: 200, data: ratings});
                break;
            default:
                render({
                    ratings: ratings
                });
        }
    });
});

action(function show() {
    this.title = 'Rating show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.rating});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Rating edit';
    switch(params.format) {
        case "json":
            send(this.rating);
            break;
        default:
            render();
    }
});

action(function update() {
    var rating = this.rating;
    this.title = 'Edit rating details';
    this.rating.updateAttributes(body.Rating, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: rating && rating.errors || err});
                } else {
                    send({code: 200, data: rating});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Rating updated');
                    redirect(path_to.rating(rating));
                } else {
                    flash('error', 'Rating can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.rating.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy rating');
                } else {
                    flash('info', 'Rating successfully removed');
                }
                send("'" + path_to.ratings + "'");
            });
        });
    });
});

function loadRating() {
    Rating.find(params.id, function (err, rating) {
        if (err || !rating) {
            if (!err && !rating && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.ratings);
        } else {
            this.rating = rating;
            next();
        }
    }.bind(this));
}
