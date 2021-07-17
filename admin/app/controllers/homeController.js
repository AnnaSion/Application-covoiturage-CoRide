const fetch = require("node-fetch");

const homeController = {

    async home(req,res,next){

        const results = await fetch("http://18.235.248.88:3000/api/v1/users",{
            method: "GET",
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvcmlkZUFwcCIsInJvbGUiOiJmcm9udCIsImlhdCI6MTYyNjQzMTMxNn0.1CNqBMz8qsl2SsOL0WCmJOBC01ta1smRrOLA0sUs2eA`
            }
        });

        const users = await results.json();

        res.render("index",{users});
    }
}

module.exports = homeController;