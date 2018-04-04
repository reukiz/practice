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
    Headline.find({}).populate('contents').exec(function(err, found){
        if(err){
            console.log(err);
        } else {
            res.render('index', {found: found})
        }
    })
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
            res.redirect('/yelpcamp');
        }
    })
});

//Create Content
app.get('/yelpcamp/:id/addcontent/new', function(req, res){
    Headline.findById(req.params.id, function(err, found){
        if(err){
            console.log(err);
        } else {
            res.render('contents')
        }
    })
})

app.post('/yelpcamp/:id/addcontent', function(req, res){
    Headline.findById(req.params.id, function(err, found){
        if(err){
            console.log(err);
        } else {
            Content.create(req.body.addcontent, function(err, add){
                if(err){
                    console.log(err);
                } else {
                    found.contents.push(add);
                    found.save();
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
})