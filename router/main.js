module.exports = function(app,fs,Paper)
{
     app.get('/',function(req,res){
        res.render('index')
     });
     app.get('/sitemap.xml',function(req,res){
        Paper.find(function(err, data){
            if(err) return  res.status(500).send({error : "Database failed"});
            var s = data.size;
            console.log("sitemap.xml checking");

            var xml ='<?xml version="1.0" encoding="utf-8" standalone="yes" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://sumock.me/</loc></url>'
            for(var i=0; i<Object.keys(data).length; i++){
                xml+="<url><loc>http://sumock.me/search/"+data[i].grade+"/"+data[i].year+"/"+data[i].month+"/"+data[i].subject+"</loc></url>";
            }
            xml+='</urlset>'
            res.header('Content-Type', 'text/xml');
            res.send(xml);
        })
     });
     app.get('/result',function(req,res){
     	// var fs = require('fs');
     	var get_arr = [req.query.grade,req.query.year,req.query.month,req.query.subject]

        // res.redirect('/'+get_arr[0]+'/'+get_arr[1]+'/'+get_arr[2]+'/'+get_arr[3]);

        Paper.findOne({grade: get_arr[0], year: get_arr[1], month: get_arr[2], subject: get_arr[3]}, function(err, data){
            if(err) return res.status(500).json({error: err});
            if(!data){
                var paper = new Paper();
                paper.grade = get_arr[0];
                paper.year = get_arr[1];
                paper.month = get_arr[2];
                paper.subject = get_arr[3];
                paper.rank = ['','','',''];
                paper.testPaper = '';
                paper.testAnswer = '';
                paper.testExplain = '';

                data = paper;
            }
            res.render("result",data)      
        })
     });

    app.get('/search', function(req, res){
        if(req.query.grade && req.query.year && req.query.month &&req.query.subject){
            var get_arr = [req.query.grade,req.query.year,req.query.month,req.query.subject]
            res.redirect('/search/'+get_arr[0]+'/'+get_arr[1]+'/'+get_arr[2]+'/'+get_arr[3]);  
        }else{
            res.redirect('/'); 
        }
       
    });

    app.get('/search/:grade/:year/:month/:subject', function(req, res){
        Paper.findOne({grade: req.params.grade, year: req.params.year, month: req.params.month, subject: req.params.subject}, function(err, data){
            if(err) return res.status(500).json({error: err});
            if(!data) {
                var paper = new Paper();
                paper.grade = req.params.grade;
                paper.year = req.params.year;
                paper.month = req.params.month;
                paper.subject = req.params.subject;
                paper.rank = ['','','',''];
                paper.testPaper = '';
                paper.testAnswer = '';
                paper.testExplain = '';

                data = paper;
            }
            res.render("result",data)
        })
    });



    // CREATE PAPER
    app.post('/api/papers', function(req, res){
        var paper = new Paper();
        paper.grade = req.body.grade;
        paper.year = req.body.year;
        paper.month = req.body.month;
        paper.subject = req.body.subject;
        paper.rank = [req.body.rank0,req.body.rank1,req.body.rank2,req.body.rank3];
        paper.testPaper = req.body.testPaper;
        paper.testAnswer = req.body.testAnswer;
        paper.testExplain = req.body.testExplain;

        paper.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // GET ALL PAPERS
    app.get('/api/papers', function(req,res){
        Paper.find(function(err, data){
            if(err) return  res.status(500).send({error : "database failed"});
            res.json(data);
        })
    });

    // GET SINGLE PAPER 학년/년도/월/과목
    app.get('/api/papers/:grade/:year/:month/:subject', function(req, res){
        Paper.findOne({grade: req.params.grade, year: req.params.year, month: req.params.month, subject: req.params.subject}, function(err, data){
            if(err) return res.status(500).json({error: err});
            if(!data) return res.status(404).json({error: 'data not found'});
            res.json(data);
        })
    });


    // UPDATE PAPER
    app.put('/api/papers/:grade/:year/:month/:subject', function(req, res){
        Paper.update({grade: req.params.grade, year: req.params.year, month: req.params.month, subject: req.params.subject}, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'paper not found' });
            res.json( { message: 'paper updated' } );
        })
    });

    // DELETE PAPER
    app.delete('/api/papers/:book_id', function(req, res){
        res.end();
    });

}