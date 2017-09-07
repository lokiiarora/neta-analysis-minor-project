const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const flash = require("flash");
const request = require("request");
const requestSanitizer = require("request-sanitizer")()
const sql = require("sqlite3").verbose();
const db = new sql.Database("../db/cons2014.db");
const _ = require("underscore");

app.use(bodyparser.json())
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(requestSanitizer.sanitize);
app.use(express.static(path.join(__dirname, 'views','neta-analysis','build'), { maxAge: 31557600000 }));
app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname + "/views" +"/neta-analysis/"+"build/"+ "index.html"))
});

app.get("/list/activities", (req,res) => {
     res.status(200).json(
         {
             "activities":[
                {
                    "id":1,
                    "action":"m2fRatio",
                    "payload":"Male to Female Ratio in a Constituency"
                },
                {
                    "id":2,
                    "action":"listm",
                    "payload":"Number of Male Population in a Constituency"
                },
                {
                    "id":3,
                    "action":"listf",
                    "payload":"Number of Female Population in a Constituency"
                },
                {
                    "id":4,
                    "action":"listo",
                    "payload":"Number of Other Population"
                },
                {
                    "id":5,
                    "action":"p1819m",
                    "payload":"Number of Males in 18-19 age group"
                },
                {
                    "id":6,
                    "action":"p1819f",
                    "payload":"Number of Females in 18-19 age group"
                },
                {
                    "id":7,
                    "action":"p1819o",
                    "payload":"Number of Others in 18-19 age group"
                },
                {
                    "id":8,
                    "action":"epic",
                    "payload":"Number of people with valid Voter ID Card"
                },
                {
                    "id":9,
                    "action":"photo",
                    "payload":"Number of people with valid Photo in Voter ID Card"
                }
            ]
         }
    );
});

app.get("/exactlist/states", (req,res) => {
    db.all("select distinct state from cons2014", (err,rows)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"error":"Bad Request , Try Again!"});
        }
        res.status(200).json(rows);
    })
});

app.get("/exactlist/cons", (req,res) => {
    let state = req.body.state || req.query.state;
    db.all("select consname from cons2014 where state like '"+ state +"'", (err,rows)=> {
        if(err){
            console.log(err);
            return res.status(500).json({"error":"Bad Request , Try Again!"});
        }
        res.status(200).json(rows);
    })
});

app.get("/exactlist/all", (req,res) => {
    let state = req.body.state || req.query.state;
    let cons = req.body.cons || req.query.cons;
    let action = req.body.action || req.query.action;
    switch(action){
        case 'm2fRatio':
        // console.log("I'm here in m2f");    
        db.get("select ratio from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            })
            break;
        case 'listm':
        // console.log("I'm here");    
        db.get("select m18a from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'listf':
        // console.log("I'm here");    
        db.get("select f18a from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'listo':
        // console.log("I'm here");    
        db.get("select o18a from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'p1819m':
        // console.log("I'm here");    
        db.get("select m1819 from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'p1819f':
        // console.log("I'm here");    
        db.get("select f1819 from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'p1819o':
        // console.log("I'm here");    
        db.get("select o1819 from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'epic':
        // console.log("I'm here");    
        db.get("select epicnum from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'photo':
        // console.log("I'm here");    
        db.get("select photo from cons2014 where (state like '"+state+"') and (consname like '"+cons+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
    }
});

app.get("/state/all", (req,res) => {
    let state = req.body.state || req.query.state;
    let action = req.body.action || req.query.action;
    switch(action){
        case 'm2fRatio':
        // console.log("I'm here in m2f");    
        db.get("select avg(ratio) from cons2014 where (state like '"+state+"') ",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.chain(rows).each(num => {return Math.ceil(num)}).values().value());
            })
            break;
        case 'listm':
        // console.log("I'm here");    
        db.get("select sum(m18a) from cons2014 where (state like '"+state+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'listf':
        // console.log("I'm here");    
        db.get("select sum(f18a) from cons2014 where (state like '"+state+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'listo':
        // console.log("I'm here");    
        db.get("select sum(o18a) from cons2014 where (state like '"+state+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'p1819m':
        // console.log("I'm here");    
        db.get("select sum(m1819) from cons2014 where (state like '"+state+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'p1819f':
        // console.log("I'm here");    
        db.get("select sum(f1819) from cons2014 where (state like '"+state+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'p1819o':
        // console.log("I'm here");    
        db.get("select sum(o1819) from cons2014 where (state like '"+state+"')",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'epic':
        // console.log("I'm here");    
        db.get("select sum(epicnum) from cons2014 where (state like '"+state+"') ",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
        case 'photo':
        // console.log("I'm here");    
        db.get("select sum(photo) from cons2014 where (state like '"+state+"') ",(err,rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({"error":"Bad Request , Try Again!"})
                
                }
                console.log(rows);
                res.status(200).json(_.values(rows));
            });
            break;
    }
});

app.listen(app.get('port'), () => {
    console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env')); 
    console.log('  Press CTRL-C to stop\n');
});