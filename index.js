// const Person = require('./person');
// // import Person from './person';
// const person1 = new Person('Mithun', 25);


// person1.greetings();

const http = require('http');
const path = require('path');
const fs = require('fs');
const server = http.createServer((req,res)=>{
  //  console.log(req.url);
//     if(req.url === '/'){
//         fs.readFile(
//             path.join(__dirname, 'public','index.html'),
//             (err, content)=>{
//             if (err) throw err;
//             res.writeHead(200,{'Content-Type': 'text/html'});
//             res.end(content);
//         }
//         );        
//     }
//     if(req.url === '/about'){
//         fs.readFile(
//             path.join(__dirname, 'public','about.html'),
//             (err, content)=>{
//             if (err) throw err;
//             res.writeHead(200,{'Content-Type': 'text/html'});
//             res.end(content);
//         }
//         );     
//     }
//         if(req.url === '/api/users'){
            
//             const users =[{
//                 name: 'Mithun', age:40
//             },
//             {name: 'Mithun', age: 20}
//         ];
//         res.writeHead(
//             200, {'Content-Type': 'application/json'}
//         );
//         res.end(JSON.stringify(users));
//     }


//file path
let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url);
// console.log(filePath);
// res.end();
let extname = path.extname(filePath);
//initial content type
let contentType ='text/html';

//check ext and set content type
switch(extname){
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.json':
            contentType = 'application/json';
            break;
     case '.png':
            contentType = 'image/png'; 
            break;
     case '.jpg':
            contentType = 'image/jpg'; 
            break;  
}
//Read file 
fs.readFile(filePath, (err, content)=>{
    if(err){
        if(err.code == 'ENOENT'){
            fs.readFile(path.join(__dirname, 'public', '404.html'),(err,content)=>{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(content, 'utf8')
            })

        }else{
            //Some server error
            res.writeHead(500);
            res.sendDate(`Server error:${err.code}`);
        }
    }
    else{
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content, 'utf8');
    }
})
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));