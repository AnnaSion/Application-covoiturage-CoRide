require('dotenv').config({path:"./.env"});
const { urlencoded } = require('express');
const express = require('express');
const cors = require("cors");
const router = require("./app/router");
const adminController = require("./app/controllers/adminController");

const searchCities = require("./app/services/searchCities");

const app = express();
const expressSwagger = require("express-swagger-generator")(app);

////////////////////Options Swagger////////////////////////////////
const options = {
    swaggerDefinition: {
        info: {
            description: "This is the API for Co'Ride App.",
            title: "API Co'Ride",
            version: '1.0.0',
        },
        host: '18.235.248.88:3000',
        basePath: '/api/v1',
        produces: [
            "application/json",
            "multipart/form-data"
        ],
        schemes: ['http'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "The JWT for connect to this API",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./app/**/*.js'] //Path to the API handle folder
};
///////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5555;

expressSwagger(options);
app.use(cors());
app.use(urlencoded({extended:true}));
app.use(express.json());

//middleware pour fournir les photos de profiles
app.use(express.static("app/pictures"));

app.post("/login",adminController);

//test open cage data//////////
app.get("/cities",async (req,res,next)=>{
    const results = await searchCities(req.query.city);
    if(results){

        const datas = results.results.map(city=>{
            return {
                city: city.components.village,
                coords: city.geometry
            }
        })

    res.json(datas)
}else{
    next();
}
})
///////////////////////////////

app.use("/api/v1",router);

app.listen(PORT, () => {
    console.log(`Server for API TEST started on http://localhost:${PORT}`);
});