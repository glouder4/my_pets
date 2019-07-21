var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require("fs");

var port = 3000;

var data_base = "glouder4_nr_user";
var now_date = new Date();

app.use("/",express.static(__dirname));

var io = require('socket.io').listen(app.listen(3000));
var List_Players ='';
var locker = 0;
io.sockets.on('connection', function (socket) {
		socket.on('player_online',function(ID){			
			if(List_Players != ''){
				for(var i=0; i < List_Players.split("_").length-1;i++){
					if(List_Players.split("_")[i] == ID.id){
						locker = 1;
					}
				}		
				if(locker == 0){
					List_Players += ID.id+'_';
				}
			}
			else{
				List_Players = ID.id+'_';
			}
			console.log("Otad "+List_Players);
			socket.emit('get_playersList',{List_Players});
		});
		socket.on('player_leave',function(leaver){
			var new_players_list = '';
			for(var i=0; i < List_Players.split("_").length-1;i++){
				if(List_Players.split("_")[i] != leaver.id) new_players_list += List_Players.split("_")[i]+'_';
			}
			List_Players = new_players_list;
			console.log(List_Players);
		});
		socket.on('send mess', function(data) {
		// Внутри функции мы передаем событие 'add mess',
		// которое будет вызвано у всех пользователей и у них добавиться новое сообщение 
		now_date = new Date();
		io.sockets.emit('add mess', {message_date:now_date,message:data.mess,p_ID:data.ID});
	});
		
});

app.post("/gamezone",function(req,res){
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Eryjsn567",
	  database: 'glouder4_players'
	});
	con.connect(function(err){
	if(err){				
		console.log(err.message);
		res.status(408).end();
	}
	else{
		req.on('data',function(Player_data){
				var level = "'"+(Player_data.toString().split(',')[1]).split(':')[1].split('"')[0]+"'";
				var exp = "'"+(Player_data.toString().split(',')[2]).split(':')[1].split('"')[0]+"'";
				var butterflies = "'"+(Player_data.toString().split(',')[3]).split(':')[1].split('"')[0]+"'";
				var Lcoins = "'"+(Player_data.toString().split(',')[4]).split(':')[1].split('"')[0]+"'";
				var hearts = "'"+(Player_data.toString().split(',')[5]).split(':')[1].split('"')[0]+"'";
				var item_action_1 = "'"+(Player_data.toString().split(',')[6]).split(':')[1].split('"')[1]+"'";
				var item_action_2 = "'"+(Player_data.toString().split(',')[7]).split(':')[1].split('"')[1]+"'";
				var item_action_3 = "'"+(Player_data.toString().split(',')[8]).split(':')[1].split('"')[1]+"'";
				var Tshirt = "'"+(Player_data.toString().split(',')[9]).split(':')[1].split('"')[1]+"'";
				var pants = "'"+(Player_data.toString().split(',')[10]).split(':')[1].split('"')[1]+"'";
				var tie = "'"+(Player_data.toString().split(',')[11]).split(':')[1].split('"')[1]+"'";
				var belt = "'"+(Player_data.toString().split(',')[12]).split(':')[1].split('"')[1]+"'";
				var amulet = "'"+(Player_data.toString().split(',')[13]).split(':')[1].split('"')[1]+"'";
				var ring = "'"+(Player_data.toString().split(',')[14]).split(':')[1].split('"')[1]+"'";
				var bonus = "'"+(Player_data.toString().split(',')[15]).split(':')[1].split('"')[1]+"'";				
				var bonus_duration = "'"+(Player_data.toString().split(',')[16]).split(':')[1].split('"')[1]+"'";		
				
				var name = (Player_data.toString().split(',')[17]).split(':')[1].split('"')[1];
				if(level == "''") level = "'"+(Player_data.toString().split(',')[1]).split(':')[1].split('"')[1]+"'";
				if(Lcoins == "''") Lcoins = "'"+(Player_data.toString().split(',')[4]).split(':')[1].split('"')[1]+"'";
				if(exp == "''") exp = "'"+(Player_data.toString().split(',')[2]).split(':')[1].split('"')[1]+"'";
				if(butterflies == "''") butterflies = "'"+(Player_data.toString().split(',')[3]).split(':')[1].split('"')[1]+"'";
				if(hearts == "''" ) hearts = "'"+(Player_data.toString().split(',')[5]).split(':')[1].split('"')[1]+"'";
				var Array_names =["level","exp","butterflies","Lcoins","hearts","item_action_1","item_action_2","item_action_3","Tshirt","pants","tie","belt","amulet","ring","bonus","bonus_duration"];
				var Array_values =[level,exp,butterflies,Lcoins,hearts,item_action_1,item_action_2,item_action_3,Tshirt,pants,tie,belt,amulet,ring,bonus,bonus_duration];
				function updater(){
				for(var i =0; i < Array_names.length;i++){
				   con.query("update "+name+" set "+Array_names[i]+" = "+Array_values[i]+"",function(err){
					    if(err) console.log(err.message);
					});
					if(i == Array_names.length-1) res.status(200).end();
				}
				}
				updater();
				
				
		});
	}
	});
});
app.post("/Pets_auth",function(req,res){
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Eryjsn567",
	  database: 'glouder4_players'
	});
	req.on('data',function(chunk){
		con.query("SELECT password FROM "+chunk.toString().split('_')[0].split('"')[1]+"",function(err,data){
			if(err) res.status(408).send(err.message).end();
			else{
			   if(chunk.toString().split('_')[1].split('"')[0] == data[0].password){
					
					var result = '';
					con.query("SELECT * FROM "+chunk.toString().split('_')[0].split('"')[1],function(err,statistic){
							if(err) console.log(err.message);
							result = statistic[0].gender + '-' +statistic[0].level +'-'+statistic[0].exp +'-'+statistic[0].butterflies +'-'+statistic[0].Lcoins +'-'+statistic[0].hearts +'-'+statistic[0].item_action_1 +'-'+statistic[0].item_action_2 +'-'+statistic[0].item_action_3 +'-'+statistic[0].Tshirt +'-'+statistic[0].pants +'-'+statistic[0].tie +'-'+statistic[0].belt +'-'+statistic[0].amulet +'-'+statistic[0].ring +'-'+statistic[0].bonus +'-'+statistic[0].bonus_duration +'-'+statistic[0].id;
							res.status(200).send(result).end();								
					});			
				}
				else{
					res.status(408).end();
				}
			}
		});
	});	
});

function createPath(path){
			fs.mkdir(path, function(err){
				if(err) res.send(408,err.message).end();
			});
		}
		function createFile(path,val){
			fs.writeFile(path, val, function(err){
				if(err) res.send(408,err.message).end();
			});
		}
	function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

app.post("/gender",function(req,res){		
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Eryjsn567",
	  database: data_base
	});
	con.connect(function(err) {
	  if (err) {
			res.status(408).send("AAA "+err.message).end();
		}		  
	    else {
	        var checker = 0;
        	var User = 0;
        	function Name_exist(){
        		checker++;
        		if(checker < 100000){
        			function getRandomInt(min, max) {
        			  return Math.round(Math.random() * (max - min) + min);
        			}
        		User = getRandomInt(0,10000);
        			con.query("CREATE TABLE user_"+User+"(id INT ,gender text,level text ,exp text,butterflies text,Lcoins text,hearts text,item_action_1 text,item_action_2 text,item_action_3 text,Tshirt text,pants text,tie text,belt text,amulet text,ring text,bonus text,bonus_duration text,password TEXT,email TEXT,status text)",function(err){
        				if(err) {
        					if(err.message == "ER_TABLE_EXISTS_ERROR: Table 'user_"+User+"' already exists") Name_exist();
        					else console.log(err.message);
        				}
        				else{ 
        				console.log("Таблица User_"+User +" создана");}
        			});			
        		} 
        		else console.log("Всё занято!");
        	}
        	function getRandomInt(min, max) {
        		 return Math.round(Math.random() * (max - min) + min);
        	}
        	User = getRandomInt(0,10000);
			con.query("CREATE TABLE user_"+User+"(id INT ,gender text,level text ,exp text,butterflies text,Lcoins text,hearts text,item_action_1 text,item_action_2 text,item_action_3 text,Tshirt text,pants text,tie text,belt text,amulet text,ring text,bonus text,bonus_duration text,password TEXT,email TEXT,status text)",function(err){
				if(err) {
					if(err.message == "ER_TABLE_EXISTS_ERROR: Table 'user_"+User+"' already exists")  Name_exist();
					else console.log(err.message);
				}
				else {					
					console.log("Таблица user_"+User+" создана");
				}
			});
			req.on('data',function(chunk){
			    var id = User;
				var gender ="'"+(chunk.toString().split(',')[0]).split(':')[1].split('"')[1]+"'";
				var level = "'"+(chunk.toString().split(',')[1]).split(':')[1].split('"')[1]+"'";
				var exp = "'"+(chunk.toString().split(',')[2]).split(':')[1].split('"')[1]+"'";
				var butterflies = "'"+(chunk.toString().split(',')[3]).split(':')[1].split('"')[1]+"'";
				var Lcoins = "'"+(chunk.toString().split(',')[4]).split(':')[1].split('"')[1]+"'";
				var hearts = "'"+(chunk.toString().split(',')[5]).split(':')[1].split('"')[1]+"'";
				var item_action_1 = "'"+(chunk.toString().split(',')[6]).split(':')[1].split('"')[1]+"'";
				var item_action_2 = "'"+(chunk.toString().split(',')[7]).split(':')[1].split('"')[1]+"'";
				var item_action_3 = "'"+(chunk.toString().split(',')[8]).split(':')[1].split('"')[1]+"'";
				var Tshirt = "'"+(chunk.toString().split(',')[9]).split(':')[1].split('"')[1]+"'";
				var pants = "'"+(chunk.toString().split(',')[10]).split(':')[1].split('"')[1]+"'";
				var tie = "'"+(chunk.toString().split(',')[11]).split(':')[1].split('"')[1]+"'";
				var belt = "'"+(chunk.toString().split(',')[12]).split(':')[1].split('"')[1]+"'";
				var amulet = "'"+(chunk.toString().split(',')[13]).split(':')[1].split('"')[1]+"'";
				var ring = "'"+(chunk.toString().split(',')[14]).split(':')[1].split('"')[1]+"'";
				var bonus = "'"+(chunk.toString().split(',')[15]).split(':')[1].split('"')[1]+"'";
				var bonus_duration = "'"+(chunk.toString().split(',')[16]).split(':')[1].split('"')[1]+"'";	
				con.query("INSERT INTO user_"+User+"(id,gender,level,exp,butterflies,Lcoins,hearts,item_action_1,item_action_2,item_action_3,Tshirt,pants,tie,belt,amulet,ring,bonus,bonus_duration) VALUES("+id+","+gender+","+level+","+exp+","+butterflies+","+Lcoins+","+hearts+","+item_action_1+","+item_action_2+","+item_action_3+","+Tshirt+","+pants+","+tie+","+belt+","+amulet+","+ring+","+bonus+","+bonus_duration+")",function(err){
									if(err){ 
										    console.log(err.message)
										}								
										else{
												res.status(200).send('"' +User+'"').end();
										}
				});	
			});
			
			
	  }
	});
});


app.post("/register_new_player",function(req,res){	
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Eryjsn567",
	  database: data_base
	});
	con.connect(function(err){
	    if(err){		
			console.log(err.message);
			res.status(408).end();
		}
		else{
		    req.on('data',function(chunk){
		        var registration_data = chunk.toString().split("%")[0];
		        var Player_data = chunk.toString().split("%")[1];
		        var gender = Player_data.split("_")[0];
		        var level = Player_data.split("_")[1];
		        var exp = Player_data.split("_")[2];
		        var butterflies = Player_data.split("_")[3];
		        var Lcoins = Player_data.split("_")[4];
		        var hearts = Player_data.split("_")[5];
		        var item_action_1 = Player_data.split("_")[6];
		        var item_action_2 = Player_data.split("_")[7];
		        var item_action_3 = Player_data.split("_")[8];
		        var Tshirt = Player_data.split("_")[9];
		        var pants = Player_data.split("_")[10];
		        var tie =  Player_data.split("_")[11];
		        var belt = Player_data.split("_")[12];
				var amulet = Player_data.split("_")[13];
				var ring =  Player_data.split("_")[14];
				var bonus =  Player_data.split("_")[15];
				var bonus_duration = Player_data.split("_")[16].split('"')[0];
				
				var name = registration_data.split("_")[0].split('"')[1];
				var password = registration_data.split("_")[1];
				var email = registration_data.split("_")[2];
				var start_id = registration_data.split("_")[3];
				
				con = mysql.createConnection({
        		host: "localhost",
        		user: "root",
        		password: "Eryjsn567",
        		database: "glouder4_players"
        		});
        		con.connect(function(err){
        												    if(err) res.status(408).send("а может и Тут "+ err.message);
        												    else{
        												        con.query("CREATE TABLE "+name+"(id text ,gender text,level text ,exp text,butterflies text,Lcoins text,hearts text,item_action_1 text,item_action_2 text,item_action_3 text,Tshirt text,pants text,tie text,belt text,amulet text,ring text,bonus text,bonus_duration text,password TEXT,email TEXT,status text)",function(err){
                                                    				if(err) {
                                                    					if(err.message == "ER_TABLE_EXISTS_ERROR: Table '"+name.toLowerCase()+"' already exists")  res.status(409).send("exist").end();
                                                    					else res.status(409).send(err.message).end();
                                                    				}
                                                    				else {
                                                    				    con.query("insert into "+name+"(gender,level,exp,butterflies,Lcoins,hearts,item_action_1,item_action_2,item_action_3,Tshirt,pants,tie,belt,amulet,ring,bonus,bonus_duration,password,email,id) values('"+gender+"','"+level+"','"+exp+"','"+butterflies+"','"+Lcoins+"','"+hearts+"','"+item_action_1+"','"+item_action_2+"','"+item_action_3+"','"+Tshirt+"','"+pants+"','"+tie+"','"+belt+"','"+amulet+"','"+ring+"','"+bonus+"','"+bonus_duration+"','"+password+"','"+email+"','"+name+"')",function(err){
                                                        					if(err){ 
                                                        						res.status(408).send("апдейт "+ err.message);
                                                        					}								
                                                        					else{
                                                        					    con = mysql.createConnection({
                                                                            	  host: "localhost",
                                                                            	  user: "root",
                                                                            	  password: "Eryjsn567",
                                                                            	  database: data_base
                                                                            	});
                                                                            	con.connect(function(err){
                                                                            	    con.query("drop table user_"+start_id+"",function(err){
                                                                						if(err) res.status(408).send("Тут "+ err.message);
                                                                						else{
                                                                							res.status(200).send(name).end();
                                                                						}
                                                            			        	});
                                                                            	});
                                                        					}
                                                        				});
                                                    				}
                                                    			});
        												    }
        												});	
				
		    });
		}
	});
});

app.post("/get_date",function(req,res){
	var date = new Date();
	console.log(date);
	res.status(200).send(date).end();
});

app.post("/add_food",function(req,res){
	req.on('data',function(chunk){
		var image = chunk.toString().split("_")[0].split('"')[1];
		var name = chunk.toString().split("_")[1];
		var cost = chunk.toString().split("_")[2];
		var butterflies = chunk.toString().split("_")[3];
		var expirience = chunk.toString().split("_")[4];
		var hearts= chunk.toString().split("_")[5].split('"')[0];
		
		var count_of_foods_inFS = 0;
		fs.readdir(__dirname+"/shop_list/food", function(err, items) {
			if(err) console.log(err.message)		
			count_of_foods_inFS = items.length+1;	
		
					
			fs.mkdir(__dirname+"/shop_list/food/food_item_"+count_of_foods_inFS, function(err){
				if(err) res.send(408,err.message).end();
				else{
					fs.writeFile(__dirname+"/shop_list/food/food_item_"+count_of_foods_inFS+"/food_butterflies.txt", cost, function(err){
						if(err) res.send(408,err.message).end();
						else {
							fs.writeFile(__dirname+"/shop_list/food/food_item_"+count_of_foods_inFS+"/food_image.txt", image, function(err){
								if(err) res.send(408,err.message).end();
								else {
										fs.writeFile(__dirname+"/shop_list/food/food_item_"+count_of_foods_inFS+"/food_name.txt", name, function(err){
											if(err) res.send(408,err.message).end();
											else {
												fs.writeFile(__dirname+"/shop_list/food/food_item_"+count_of_foods_inFS+"/food_cost.txt", cost, function(err){
													if(err) res.send(408,err.message).end();
													else {
														fs.writeFile(__dirname+"/eat_exp_weight/"+image+'.txt', expirience, function(err){
													if(err) res.send(408,err.message).end();
													else {
														fs.writeFile(__dirname+"/eat_hearts_weight/"+image+'.txt', hearts, function(err){
															if(err) res.send(408,err.message).end();
															else {
																fs.writeFile(__dirname+"/eat_butterflies_weight/"+image+'.txt', butterflies, function(err){
																	if(err) res.send(408,err.message).end();
																	else {
																		res.status(200).send('Okey').end();
																	}
																});
															}
														});
														}
													});
													}
												});
											}
										});
									}
							});
						}
					});
				}
			});
			
		});		
		
	});
});

app.post("/add_set",function(req,res){
	req.on('data',function(chunk){
		var set_name = chunk.toString().split("_")[0].split('"')[1];
		var rarity = chunk.toString().split("_")[1];
		var Tshirt_image = chunk.toString().split("_")[2];
		var Tshirt_butterflies = chunk.toString().split("_")[3];
		var Tshirt_cost = chunk.toString().split("_")[4];
		var pants_image = chunk.toString().split("_")[5];
		var pants_butterflies = chunk.toString().split("_")[6];
		var pants_cost = chunk.toString().split("_")[7];
		var tie_image = chunk.toString().split("_")[8];
		var tie_butterflies = chunk.toString().split("_")[9];
		var tie_cost = chunk.toString().split("_")[10];
		var belt_image = chunk.toString().split("_")[11];
		var belt_butterflies = chunk.toString().split("_")[12];
		var belt_cost = chunk.toString().split("_")[13];
		var amulet_image = chunk.toString().split("_")[14];
		var amulet_butterflies = chunk.toString().split("_")[15];
		var amulet_cost = chunk.toString().split("_")[16];
		var ring_image = chunk.toString().split("_")[17];
		var ring_butterflies = chunk.toString().split("_")[18];
		var ring_cost = chunk.toString().split("_")[19].split('"')[0];
		
		var count_of_sets_inFS = 0;		
				
		fs.readdir(__dirname+"/shop_list/sets", function(err, items) {
			if(err) console.log(err.message)		
			count_of_sets_inFS = items.length+1;
    			     fs.mkdir(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS, function(err){
        				if(err) res.send(408,err.message).end();
        				else{
            			     fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/T-shirt.txt', Tshirt_image, function(err){
                				if(err) res.send(408,err.message).end();
                				else{
                				    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/pants.txt', pants_image, function(err){
                        				if(err) res.send(408,err.message).end();
                        				else{
                        				  fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/tie.txt', tie_image, function(err){
                                				if(err) res.send(408,err.message).end();
                                				else{
                                				     fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/belt.txt', belt_image, function(err){
                                        				if(err) res.send(408,err.message).end();
                                        				else{
                                        				    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/amulet.txt', amulet_image, function(err){
                                                				if(err) res.send(408,err.message).end();
                                                				else{
                                                				    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/ring.txt', ring_image, function(err){
                                                        				if(err) res.send(408,err.message).end();
                                                        				else{
                                                        				    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/rarity.txt', rarity, function(err){
                                                                				if(err) res.send(408,err.message).end();
                                                                				else{
                                                                				    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/name_of_set.txt', set_name, function(err){
                                                                        				if(err) res.send(408,err.message).end();
                                                                        				else {
                                                                        				    //set_component
                                                                        				    fs.mkdir(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component', function(err){
                                                                                				if(err) res.send(408,err.message).end();
                                                                                				else{   
                                                                                    				    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/pants.txt', set_name.split(" ")[0]+" pants", function(err){
                                                                                                        if(err) res.send(408,err.message).end();
                                                                                                        else{
                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/tie.txt', set_name.split(" ")[0]+" tie", function(err){
                                                                                                                if(err) res.send(408,err.message).end();
                                                                                                                else{
                                                                                                                    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/belt.txt', set_name.split(" ")[0]+" belt", function(err){
                                                                                                                        if(err) res.send(408,err.message).end();
                                                                                                                        else{
                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/amulet.txt', set_name.split(" ")[0]+" medallion", function(err){
                                                                                                                                if(err) res.send(408,err.message).end();
                                                                                                                                else{
                                                                                                                                    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/ring.txt',set_name.split(" ")[0]+" ring", function(err){
                                                                                                                                        if(err) res.send(408,err.message).end();
                                                                                                                                        else{
                                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/T-shirt.txt', set_name.split(" ")[0]+" T-shirt", function(err){
                                                                                                                                            if(err) res.send(408,err.message).end();
                                                                                                                                            else{
                                                                                                                                                //set_component/component_butterflies
                                                                                                                                                fs.mkdir(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies', function(err){
                                                                                                                                    				if(err) res.send(408,err.message).end();
                                                                                                                                    				else{
                                                                                                                                                           fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies/T-shirt.txt',Tshirt_butterflies, function(err){
                                                                                                                                                                if(err) res.send(408,err.message).end();
                                                                                                                                                                else{
                                                                                                                                                                    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies/pants.txt',pants_butterflies, function(err){
                                                                                                                                                                       if(err) res.send(408,err.message).end();
                                                                                                                                                                        else{
                                                                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies/tie.txt',tie_butterflies, function(err){
                                                                                                                                                                            if(err) res.send(408,err.message).end();
                                                                                                                                                                            else{
                                                                                                                                                                                fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies/belt.txt',belt_butterflies, function(err){
                                                                                                                                                                                    if(err) res.send(408,err.message).end();
                                                                                                                                                                                    else{
                                                                                                                                                                                        fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies/amulet.txt',amulet_butterflies, function(err){
                                                                                                                                                                                        if(err) res.send(408,err.message).end();
                                                                                                                                                                                        else{
                                                                                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_butterflies/ring.txt',ring_butterflies, function(err){
                                                                                                                                                                                                 if(err) res.send(408,err.message).end();
                                                                                                                                                                                                else{
                                                                                                                                                                                                       //set_component/component_cost
                                                                                                                                                                                                            fs.mkdir(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost', function(err){
                                                                                                                                                                                                				if(err) res.send(408,err.message).end();
                                                                                                                                                                                                				else{
                                                                                                                                                                                                                       fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost/T-shirt.txt',Tshirt_cost, function(err){
                                                                                                                                                                                                                            if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                            else{
                                                                                                                                                                                                                                fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost/pants.txt',pants_cost, function(err){
                                                                                                                                                                                                                                   if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                    else{
                                                                                                                                                                                                                                        fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost/tie.txt',tie_cost, function(err){
                                                                                                                                                                                                                                        if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost/belt.txt',belt_cost, function(err){
                                                                                                                                                                                                                                                if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost/amulet.txt',amulet_cost, function(err){
                                                                                                                                                                                                                                                    if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                    else{
                                                                                                                                                                                                                                                        fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/set_component/component_cost/ring.txt',ring_cost, function(err){
                                                                                                                                                                                                                                                       if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                                               //component_types
                                                                                                                                                                                                                                                                                fs.mkdir(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types', function(err){
                                                                                                                                                                                                                                                                    				if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                    				else{
                                                                                                                                                                                                                                                                                           fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types/T-shirt.txt',"clothes", function(err){
                                                                                                                                                                                                                                                                                                if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                                                                    fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types/pants.txt',"clothes", function(err){
                                                                                                                                                                                                                                                                                                       if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types/tie.txt',"accessory", function(err){
                                                                                                                                                                                                                                                                                                            if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                                                            else{
                                                                                                                                                                                                                                                                                                                fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types/belt.txt',"accessory", function(err){
                                                                                                                                                                                                                                                                                                                    if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                                                                    else{
                                                                                                                                                                                                                                                                                                                        fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types/amulet.txt',"decoration", function(err){
                                                                                                                                                                                                                                                                                                                        if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                                                                                                            fs.writeFile(__dirname+"/shop_list/sets/set_"+count_of_sets_inFS+'/component_types/ring.txt',"decoration", function(err){
                                                                                                                                                                                                                                                                                                                           if(err) res.send(408,err.message).end();
                                                                                                                                                                                                                                                                                                                            else{
                                                                                                                                                                                                                                                                                                                                   res.status(200).send("OK").end();				    
                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                });                                        				    
                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                        });                                     				    
                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                });                                     				    
                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                       });                                       				    
                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                 });  
                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                });  				    
                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                            });                                        				    
                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                    });                                     				    
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            });                                     				    
                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                   });                                       				    
                                                                                                                                                                                                                               }
                                                                                                                                                                                                                             });  
                                                                                                                                                                                                                       }
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                }
                                                                                                                                                                                                            });  				    
                                                                                                                                                                                                    }
                                                                                                                                                                                                });                                        				    
                                                                                                                                                                                             }
                                                                                                                                                                                        });                                     				    
                                                                                                                                                                                    }
                                                                                                                                                                                });                                     				    
                                                                                                                                                                           }
                                                                                                                                                                       });                                       				    
                                                                                                                                                                   }
                                                                                                                                                                 });  
                                                                                                                                                           }
                                                                                                                                                        });
                                                                                                                                    				}
                                                                                                                                    			});
                                                                                                                                                }    
                                                                                                                                        });
                                                                                                                                        }
                                                                                                                                   });                                  				    
                                                                                                                                }
                                                                                                                           });                                  				    
                                                                                                                        }
                                                                                                                   });                                  				    
                                                                                                                }
                                                                                                           });                                    				    
                                                                                                        }
                                                                                                   });  
                                                                                				}
                                                                        			}); 
                                                                				}
                                                                			});  
                                                        				}
                                                        			});  
                                                				}
                                                			});  
                                        				}
                                        			});  
                                				}
                                			});  
                        				}
                        			});
                				}
            			     });
        				    }
                		});
    			     }
    			 });
				      
        				 
            				 
                				 
				 
				  
				  
		});
	});
});

app.post("/add_bonus",function(req,res){
	req.on('data',function(chunk){
		var Bonus_image = chunk.toString().split("_")[0].split('"')[1];
		var Bonus_name = chunk.toString().split("_")[1];
		var Bonus_cost = chunk.toString().split("_")[2];
		var Bonus_butterflies = chunk.toString().split("_")[3];
		var Bonus_expirience = chunk.toString().split("_")[4];
		var Bonus_hearts= chunk.toString().split("_")[5];
		var Bonus_duration = chunk.toString().split("_")[6].split('"')[0];
		
		var count_of_sets_inFS = 0;		
				
		fs.readdir(__dirname+"/shop_list/bonus", function(err, items) {
			if(err) console.log(err.message)	
			else{
				count_of_sets_inFS = items.length+1;
				
				fs.mkdir(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS, function(err){
                     fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_image.txt',Bonus_image, function(err){
                         if(err) res.send(408,err.message).end();
                         else{
                            fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/name_of_bonus.txt',Bonus_name, function(err){
                                 if(err) res.send(408,err.message).end();
                                 else{
                                    fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_cost.txt',Bonus_cost, function(err){
                                         if(err) res.send(408,err.message).end();
                                         else{
                                             fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_butterflies.txt',Bonus_butterflies, function(err){
                                                 if(err) res.send(408,err.message).end();
                                                 else{
                                                    fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_exp.txt',Bonus_expirience, function(err){
                                                         if(err) res.send(408,err.message).end();
                                                         else{
                                                            fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_hearts.txt',Bonus_hearts, function(err){
                                                                 if(err) res.send(408,err.message).end();
                                                                 else{
                                                                    fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_duration.txt',Bonus_duration, function(err){
                                                                         if(err) res.send(408,err.message).end();
                                                                         else{
                                                                             fs.writeFile(__dirname+"/shop_list/bonus/Bonus_"+count_of_sets_inFS+'/bonus_id.txt',count_of_sets_inFS, function(err){
                                                                                 if(err) res.send(408,err.message).end();
                                                                                 else{
                                                                                    res.status(200).end();
                                                                                 }
                                                                             });
                                                                         }
                                                                     });
                                                                 }
                                                             });
                                                         }
                                                     });
                                                 }
                                             });
                                         }
                                     });
                                 }
                             });
                         }
                     });
				});
			}
		});
	});
});

app.post("/add_game",function(req,res){
	req.on('data',function(chunk){
		console.log(chunk.toString().split("_"));
		var Game_image = chunk.toString().split("_")[0].split('"')[1];
		var Game_name = chunk.toString().split("_")[1];
		var Game_cost = chunk.toString().split("_")[2];
		var Game_butterflies = chunk.toString().split("_")[3];
		var Game_expirience = chunk.toString().split("_")[4];
		var Game_hearts= chunk.toString().split("_")[5];
		var Game_Lcoins= chunk.toString().split("_")[6];
		var Game_charges = chunk.toString().split("_")[7].split('"')[0];
		
		var count_of_games_inFS = 0;		
				
		fs.readdir(__dirname+"/shop_list/games", function(err, items) {
			if(err) console.log(err.message)	
			else{
				count_of_games_inFS = items.length+1;
				fs.mkdir(__dirname+"/shop_list/games/game_"+count_of_games_inFS, function(err){
				    if(err)res.send(408,err.message).end();
                    else{
        				fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_image.txt',Game_image, function(err){
                            if(err) res.send(408,err.message).end();
                            else{
                                fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_name.txt',Game_name, function(err){
                                    if(err) res.send(408,err.message).end();
                                    else{
                                        fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_cost.txt',Game_cost, function(err){
                                            if(err) res.send(408,err.message).end();
                                            else{
                                                fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_butterflies.txt',Game_butterflies, function(err){
                                                    if(err) res.send(408,err.message).end();
                                                    else{
                                                        fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_exp.txt',Game_expirience, function(err){
                                                            if(err) res.send(408,err.message).end();
                                                            else{
                                                                fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_hearts.txt',Game_hearts, function(err){
                                                                    if(err) res.send(408,err.message).end();
                                                                    else{
                                                                        fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_Lcoins.txt',Game_Lcoins, function(err){
                                                                            if(err) res.send(408,err.message).end();
                                                                            else{
                                                                               fs.writeFile(__dirname+"/shop_list/games/game_"+count_of_games_inFS+'/game_charges.txt',Game_charges, function(err){
                                                                                    if(err) res.send(408,err.message).end();
                                                                                    else{
                                                                                        res.status(200).end();
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                         });
			}
			});
			}
		});
	});
});

app.post("/get_count_of_dir_in_path",function(req,res){
	req.on('data',function(chunk){
		fs.readdir(__dirname+chunk.toString().split('"')[1], function(err, items) {
			if(err) console.log(err.message);
			else res.send(200,items.length).end();
		});
	});
});

app.post("/get_status",function(req,res){
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Eryjsn567",
	  database: 'glouder4_players'
	});
	req.on('data',function(chunk){
		con.query("SELECT status FROM "+chunk.toString().split('"')[1],function(err,data){
			if(err) res.status(408).send(err.message).end();
			else{
			   if(data[0].status == 'administrator'){
					res.status(200).end();		
				}
				else{
					res.status(408).send('not').end();
				}
			}
		});
	});	
});

























