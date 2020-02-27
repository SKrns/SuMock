module.exports = function(app,fs)
{
     app.get('/',function(req,res){
        res.render('index')
     });
     app.get('/result',function(req,res){
     	// var fs = require('fs');
     	var get_arr = [req.query.grade,req.query.year,req.query.month,req.query.subject]
     	var path = "./public/data/"+get_arr[0]+"/"+get_arr[1]+"/"+get_arr[2]+"/"+get_arr[3]+"/";
     	try{
			var array = fs.readFileSync(path+'등급.txt').toString().split(",");
		}
		catch (exception){
			var array = ['','','','']
		}
		console.log(array)
        res.render('result',{information : get_arr , rank : array})
     });

}