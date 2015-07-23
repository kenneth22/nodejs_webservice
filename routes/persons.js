var Person = require('../models/person').Person;

exports.index = function(req,res){
	Person.find({},function(err,doc){
		if(!err){
			res.json(200,{result:doc});
		}else{
			res.json(500,{message:err});
		}
	})
};


exports.create = function(req,res){
	var name = req.body.name;
	var address = req.body.address;
	var points = req.body.points;
	Person.find({name : {$regex : new RegExp(name,"i")}},function(err,doc){
		if(!err && doc.length == 0){
			var newPerson  = new Person();
			newPerson.name = name;
			newPerson.address = address;
			newPerson.points = points;
			newPerson.save(function(err){
				if(!err){
					res.json(200,{result:"Successful"});
				}else{
					res.json(500,{message:err})
				}
			});
		}else if(!err){
			res.json(403,{message:"Person is already existing!"});
		}else{
			res.json(500,{message:err});
		}
	});
};	

exports.get = function(req,res){
	var id = req.query.id;
	Person.findById(id,function(err,doc){
		if(!err){
			res.json(200,{result:doc});
		}else{
			res.json(500,{message:err});
		}
	});
};

exports.update = function(req,res){
	Person.findById(req.body.id,function(err,doc){
		if(!err){
			if(doc!=null){
				doc.name = req.body.name;
				doc.address = req.body.address;
				doc.points = req.body.points;
				doc.save(function(err2){
					if(!err2){
						res.json(200,{result:"Successful"});
					}else{
						res.json(500,{message:err2});
					}
				});
			}else{
				res.json(403,{message:"Person not existing"});
			}
		}else{
			res.json(500,{message:err});
		}
	});
}

exports.delete = function(req,res){
	Person.findById(req.query.id,function(err,doc){
		if(!err){
			if(doc!=null){
				doc.remove(function(err){
					if(!err){
						res.json(200,{result:"Successful"});
					}else{
						res.json(500,{result:err});
					}
				});	
			}else{
				res.json(403,{message:"Person not existing"});
			}
		}else{
			res.json(500,{message:err});
		} 
	});
}