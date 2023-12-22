module.exports=(req,res)=>{
    let baseUrl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    console.log(baseUrl);
    let id=req.url.split("/")[3];
    const regexV4=new RegExp(
         /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    );
    console.log(id);
    if (req.url==="/api/movies"){
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if(!regexV4.test(id)){
        res.writeHead(400,{"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Validation failed",message:"UUID is not valid"}));
    }
    else if(baseUrl==="/api/movies/"&&regexV4.test(id)){
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        let filterdMovie=req.movies.filter((movie)=>{
            return movie.id===id;
        });
        if(filterdMovie.length>0){
            res.statusCode=200;
            res.write(JSON.stringify(filterdMovie));
            res.end();

        }else{
            res.statusCode=404;
            res.write(JSON.stringify({title:"Not Found",message:"Movie not found"}));
            res.end();
        }
       
    }
    else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Not Found",message:"Route not found"}));
    }
}