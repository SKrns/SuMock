module.exports = function(app,fs,Paper,request)
{
     app.get('/admin',function(req,res){
        const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        console.log(ip);
        if(ip!="?"){
            res.render('admin-index');
        }else{
            res.render('index');
        }
        
     });

     app.get('/admin-result',function(req,res){
        var get_arr = [req.query.grade,req.query.year,req.query.month,req.query.subject]

     	//GET : /api/papers/:grade/:year/:month/:subject
        // request.get({uri:"http://0.0.0.0:3001/api/papers"}, function (error, response, body) {
        //     res.render(body);
        //     //callback
        // })

        Paper.findOne({grade: get_arr[0], year: get_arr[1], month: get_arr[2], subject: get_arr[3]}, function(err, data){
            if(err) return res.status(500).json({error: err});
            if(!data){
                console.log("New ")
                var paper = new Paper();
                paper.grade = get_arr[0];
                paper.year = get_arr[1];
                paper.month = get_arr[2];
                paper.subject = get_arr[3];
                paper.rank = ['','','',''];
                paper.testPaper = '';
                paper.testAnswer = '';
                paper.testExplain = '';

                paper.save(function(err){
                    if(err){
                        console.error(err);
                        res.status(500).json({error: "err"});
                        return;
                    }

                });
                data = paper;
            }
            // console.log(type(accountStr))
            // var json = JSON.stringify(accountStr);

            // res.json(data.rank);

            res.render("admin-result",data)
        })
     });
    app.post('/admin/submit/:id',function(req,res){

        Paper.findById(req.params.id, function(err, data){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!data) return res.status(404).json({ error: 'data not found' });
        console.log(data);

        if(req.body.rank0) data.rank = [req.body.rank0,req.body.rank1,req.body.rank2,req.body.rank3];

        if(req.body.testPaper) data.testPaper = req.body.testPaper;
        if(req.body.testAnswer) data.testAnswer = req.body.testAnswer;
        if(req.body.testExplain) data.testExplain = req.body.testExplain;

        data.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'data updated'});
            });

        });


        // Paper.update({grade: req.params.grade, year: req.params.year, month: req.params.month, subject: req.params.subject}, { $set: req.body }, function(err, output){
        //     if(err) res.status(500).json({ error: 'database failure' });
        //     console.log(output);
        //     if(!output.n) return res.status(404).json({ error: 'paper not found' });
        //     res.render('admin-index')
        // })
        
     });



}