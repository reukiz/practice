var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Headline   = require('./models/headline'),
    Content    = require('./models/content')
    app        = express();

mongoose.connect('mongodb://localhost/problems');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//Index Route
app.get('/', function(req, res){
    res.redirect('/yelpcamp');
})

app.get('/yelpcamp/achieve', function(req, res){
    res.render('achieve');
})

app.get('/yelpcamp', function(req, res){
    Headline.find().populate('content').exec(function(err, done){
        if (err) {
            console.log(err)
        } else {
            res.render('index', {done: done})
        }
    });   
});

//Create Headline
app.get('/yelpcamp/addheadline/new', function(req, res){
    res.render('addheadlines');
});

app.post('/yelpcamp', function(req, res){
    Headline.create(req.body.addheadline, function(err, add){
        if (err) {
            console.log(err);
        } else {
            console.log(add);
            res.redirect('/yelpcamp');
        }
    })
});

//Create Content
app.get('/yelpcamp/:headlines/addcontent/new', function(req, res){
    Headline.findById(req.params.headlines, function(err, found){
        if(err){
            console.log(err);
        } else {
            res.render('contents', {found: found})
        }
    });
});

app.post('/yelpcamp/:headlines/addcontent', function(req, res){
    Headline.findById(req.params.headlines, function(err, found){
        if(err){
            console.log(err);
        } else {
            Content.create(req.body.addcontent, function(err, add){
                if(err){
                    console.log(err);
                } else {
                    console.log(add)
                    found.contents.push(add);
                    found.save();
                    console.log(add);
                    res.redirect('/yelpcamp');
                }
            })
        }
    })
})

//Error Route
app.get('*', function(req, res){
    res.send('Error');
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log('Server Start');
    // Headline.remove({}, function(err, remove){
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log('remove');
    //     }
    // });
    // Content.remove({}, function(err, remove){
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log('remove');
    //     }
    // });
})
