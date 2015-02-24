var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function RatingStub () {
    return {
        puzzle_id: '',
        value: ''
    };
}

describe('RatingController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /ratings/new
     * Should render ratings/new.ejs
     */
    it('should render "new" template on GET /ratings/new', function (done) {
        request(app)
        .get('/ratings/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/ratings\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /ratings
     * Should render ratings/index.ejs
     */
    it('should render "index" template on GET /ratings', function (done) {
        request(app)
        .get('/ratings')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/ratings\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /ratings/:id/edit
     * Should access Rating#find and render ratings/edit.ejs
     */
    it('should access Rating#find and render "edit" template on GET /ratings/:id/edit', function (done) {
        var Rating = app.models.Rating;

        // Mock Rating#find
        Rating.find = sinon.spy(function (id, callback) {
            callback(null, new Rating);
        });

        request(app)
        .get('/ratings/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Rating.find.calledWith('42').should.be.true;
            app.didRender(/ratings\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /ratings/:id
     * Should render ratings/index.ejs
     */
    it('should access Rating#find and render "show" template on GET /ratings/:id', function (done) {
        var Rating = app.models.Rating;

        // Mock Rating#find
        Rating.find = sinon.spy(function (id, callback) {
            callback(null, new Rating);
        });

        request(app)
        .get('/ratings/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Rating.find.calledWith('42').should.be.true;
            app.didRender(/ratings\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /ratings
     * Should access Rating#create when Rating is valid
     */
    it('should access Rating#create on POST /ratings with a valid Rating', function (done) {
        var Rating = app.models.Rating
        , rating = new RatingStub;

        // Mock Rating#create
        Rating.create = sinon.spy(function (data, callback) {
            callback(null, rating);
        });

        request(app)
        .post('/ratings')
        .send({ "Rating": rating })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Rating.create.calledWith(rating).should.be.true;

            done();
        });
    });

    /*
     * POST /ratings
     * Should fail when Rating is invalid
     */
    it('should fail on POST /ratings when Rating#create returns an error', function (done) {
        var Rating = app.models.Rating
        , rating = new RatingStub;

        // Mock Rating#create
        Rating.create = sinon.spy(function (data, callback) {
            callback(new Error, rating);
        });

        request(app)
        .post('/ratings')
        .send({ "Rating": rating })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Rating.create.calledWith(rating).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /ratings/:id
     * Should redirect back to /ratings when Rating is valid
     */
    it('should redirect on PUT /ratings/:id with a valid Rating', function (done) {
        var Rating = app.models.Rating
        , rating = new RatingStub;

        Rating.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/ratings/1')
        .send({ "Rating": rating })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/ratings/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /ratings/:id
     * Should not redirect when Rating is invalid
     */
    it('should fail / not redirect on PUT /ratings/:id with an invalid Rating', function (done) {
        var Rating = app.models.Rating
        , rating = new RatingStub;

        Rating.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/ratings/1')
        .send({ "Rating": rating })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /ratings/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Rating on DELETE /ratings/:id');

    /*
     * DELETE /ratings/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Rating on DELETE /ratings/:id if it fails');
});
