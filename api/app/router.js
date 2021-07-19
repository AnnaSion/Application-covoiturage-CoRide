const {Router} = require("express");


const uploadPicture = require("./services/uploadPicture");
const userController = require("./controllers/userController");
const activityController = require("./controllers/activityController");
const travelController = require("./controllers/travelController");
const vehicleController = require("./controllers/vehicleController");
const vehicleOptionController = require("./controllers/vehicleOptionController");
const joiValidator = require("./middlewares/joiValidator");
const schemas = require("./schemas");
const redis = require("./services/redisService");

const router = Router();

////////////Model User////////////////////////////////////////
/**
 * @route GET /users
 * @group Users - Operations about user
 * @security JWT
 * @returns {Array<User>} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @typedef postUser 
 * @property {string} first_name.required the first name user
 * @property {string} last_name.required the last name user
 * @property {string} email.required the user email
 * @property {file} picture the avatar file JPEG or PNG 512Ko max
 * @property {string} pseudo.required the user pseudo
 * @property {string} password.required the hash user password
 */
/**
 * @route POST /users
 * @group Users - Operations about user
 * @security JWT
 * @param {postUser.model} postUser.body.required the new user
 * @consumes multipart/form-data
 * @produces application/json
 * @returns {User.model} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /users
 * @group Users - Operations about user
 * @security JWT
 * @param {number} id.body.required the user id 
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
router.route("/users")
    .get(redis.cache,userController.getAll)
    .post(redis.flush,uploadPicture,joiValidator(schemas.user),userController.insertOrUpdate)
    .delete(redis.flush,userController.delete);

/**
 * @route GET /user/{id}
 * @group Users - Operations about user
 * @security JWT
 * @param {number} id.path.required the user id
 * @returns {User.model} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route PATCH /user/{id}
 * @group Users - Operations about user
 * @security JWT
 * @param {number} id.path.required the user id
 * @param {postUser.model} postUser.body.required
 * @consumes multipart/form-data
 * @returns {User.model} 200 - user details
 * @returns {Error} default - Unexpected error
 */
router.route("/user/:id(\\d+)")
    .get(redis.cache,userController.getOne)
    .patch(redis.flush,joiValidator(schemas.user),userController.insertOrUpdate);

////////////Model Activity////////////////////////////////////
/**
 * @route GET /activities
 * @group Activities - Operations about activity
 * @security JWT
 * @returns {Array<Activity>} 200 - activities details
 * @returns {Error} default - Unexpected error
 */
/**
 * @typedef postActivity 
 * @property {string} label.required the name activity
 * @property {string} color.required the color tag activity
 */
/**
 * @route POST /activities
 * @group Activities - Operations about activity
 * @security JWT
 * @param {postActivity.model} postActivity.body.required the new user
 * @consumes application/json
 * @produces application/json
 * @returns {Activity.model} 200 - activity details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /activities
 * @group Activities - Operations about activity
 * @security JWT
 * @param {number} id.body.required the activity id 
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
router.route("/activities")
    .get(redis.cache,activityController.getAll)
    .post(redis.flush,joiValidator(schemas.activity),activityController.insertOrUpdate)
    .delete(redis.flush,activityController.delete);

/**
 * @route GET /activity/{id}
 * @group Activities - Operations about activity
 * @security JWT
 * @param {number} id.path.required the activity id
 * @returns {Activity.model} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route PATCH /activity/{id}
 * @group Activities - Operations about activity
 * @security JWT
 * @param {number} id.path.required the activity id
 * @param {postActivity.model} postActivity.body.required
 * @consumes application/json
 * @returns {Activity.model} 200 - activity details
 * @returns {Error} default - Unexpected error
 */
router.route("/activity/:id(\\d+)")
    .get(redis.cache,activityController.getOne)
    .patch(redis.flush,joiValidator(schemas.activity),activityController.insertOrUpdate);

//////////Model Travel///////////////////////////////////////
/**
 * @route GET /travels
 * @group Travels - Operations about travel
 * @security JWT
 * @returns {Array<Travel>} 200 - travels details
 * @returns {Error} default - Unexpected error
 */
router.route("/travels")
    .get(redis.cache,travelController.getAll);

/**
 * @route GET /travel/{id}
 * @group Travels - Operations about travel
 * @security JWT
 * @param {number} id.path.required the travel id
 * @returns {Activity.model} 200 - travel details
 * @returns {Error} default - Unexpected error
 */
router.route("/travel/:id(\\d+)")
    .get(redis.cache,travelController.getOne);

/**
 * @route GET /travels/search
 * @group Travels - Operations about travel
 * @security JWT
 * @param {number} long.query.required the longitude departure
 * @param {number} lat.query.required the lalitude departure
 * @returns {Array<Travel>} 200 - travels details
 * @returns {Error} default - Unexpected error
 */
router.get("/travels/search",redis.cache,travelController.getAllByCoords);

/////////Model Vehicle Option////////////////////////////////
/**
 * @route GET /vehicle-options
 * @group Vehicle Option - Operations about vehicle option
 * @security JWT
 * @returns {Array<VehicleOption>} 200 - travels details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /vehicle-options
 * @group Vehicle Option - Operations about vehicle option
 * @security JWT
 * @param {integer} id.body.required the vehicle option id
 * @returns {void} 204 - return void or error
 * @returns {Error} default - Unexpected error
 */
/**
 * @typedef postVehicleOption
 * @property {string} label.required the label of vehicle option
 */
/**
 * @route POST /vehicle-options
 * @group Vehicle Option - Operations about vehicle option
 * @security JWT
 * @param {postVehicleOption.model} postVehicleOption.body.required the post for vehicle option
 * @consumes application/json
 * @returns {VehicleOption.model} 204 - return void or error
 * @returns {Error} default - Unexpected error
 */    
router.route("/vehicle-options")
    .get(redis.cache,vehicleOptionController.getAll)
    .post(redis.flush,vehicleOptionController.insertOrUpdate)
    .delete(redis.flush,vehicleOptionController.delete);

/**
 * @route GET /vehicle-option/{id}
 * @group Vehicle Option - Operations about vehicle option
 * @security JWT
 * @param {number} id.path.required the vehicle option id
 * @returns {VehicleOption.model} 200 - travel details
 * @returns {Error} default - Unexpected error
 */  
router.route("/vehicle-option/:id(\\d+)")
    .get(redis.cache,vehicleOptionController.getOne);
    
////////CRUD un travel//////////////////////////////////////
/**
 * @typedef postTravel 
 * @property {string} departure_city.required the name departure city
 * @property {string} destination_city.required the name destination city
 * @property {number} latitude_departure.required the latitude coords in float
 * @property {number} longitude_departure.required the longitude coords in float
 * @property {integer} places_available.required the number of places
 * @property {string} description.required the travel description
 * @property {string} departure_timestamp.required the date and time departure
 * @property {integer} activity_id.required the id of activity
 * @property {integer} user_id.required the id of user
 */
/**
 * @route POST /travels/user/{id}
 * @group Travels - Operations about travel
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {postTravel.model} postTravel.body.required the new user
 * @consumes application/json
 * @produces application/json
 * @returns {Travel.model} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route PATCH /travel/{travelId}/user/{userId}
 * @group Travels - Operations about travel
 * @security JWT
 * @param {integer} userId.path.required the user id
 * @param {integer} travelId.path.required the travel id
 * @param {postTravel.model} postTravel.body.required the new user
 * @consumes application/json
 * @produces application/json
 * @returns {Travel.model} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route GET /travels/user/{id}
 * @group Travels - Operations about travel
 * @security JWT
 * @param {number} id.path.required the user id
 * @returns {Array<Travel>} 200 - user details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /travels/user/{id}
 * @group Travels - Operations about travel
 * @security JWT
 * @param {number} id.path.required the user id
 * @param {number} id.body.required the travel id
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
 router.route("/travels/user/:id(\\d+)")
    .get(redis.cache,travelController.getAll)
    .delete(redis.flush,travelController.delete)
    .post(joiValidator(schemas.travel),redis.flush,travelController.insertOrUpdate);
router.patch("/travel/:travelId(\\d+)/user/:userId(\\d+)",joiValidator(schemas.travel),redis.flush,travelController.insertOrUpdate);

////////CRUD vehicules par user///////////////////////////////////////
/**
 * @route GET /user/{id}/vehicles
 * @group Users - Operations about user
 * @param {integer} id.path.required the user id
 * @security JWT
 * @returns {Array<Vehicle>} 200 - vehicle details
 * @returns {Error} default - Unexpected error
 */
/**
 * @typedef postVehicle 
 * @property {string} brand.required the vehicle brand
 * @property {string} model.required the vehicle model
 */
/**
 * @route POST /user/{id}/vehicles
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {postVehicle.model} postVehicle.body.required the new vehicle
 * @consumes application/json
 * @produces application/json
 * @returns {Vehicle.model} 200 - vehicle details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /user/{id}/vehicles
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {number} id.body.required the vehicle id 
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
router.route("/user/:id(\\d+)/vehicles")
    .get(redis.cache,vehicleController.getAll)
    .post(redis.flush,vehicleController.insertOrUpdate)
    .delete(redis.flush,vehicleController.delete);
/**
 * @route PATCH /user/{userId}/vehicle/{vehicleId}
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} userId.path.required the user id
 * @param {integer} vehicleId.path.required the vehicle id
 * @param {postVehicle.model} postVehicle.body.required the modify vehicle
 * @consumes application/json
 * @produces application/json
 * @returns {Vehicle.model} 200 - vehicle details
 * @returns {Error} default - Unexpected error
 */
router.patch("/user/:userId(\\d+)/vehicle/:vehicleId(\\d+)",joiValidator(schemas.vehicle),redis.flush,vehicleController.insertOrUpdate);

//////GET POST et DELETE activité d'un user///////////////////////////////////////
/**
 * @route GET /user/{id}/activities
 * @group Users - Operations about user
 * @param {integer} id.path.required the user id
 * @security JWT
 * @returns {Array<Activity>} 200 - vehicle details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route POST /user/{id}/activities
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {integer} id.body.required the activity id
 * @consumes application/json
 * @produces application/json
 * @returns {void} 201 - asuccess, no content
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /user/{id}/activities
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {integer} id.body.required the activity id 
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
router.route("/user/:id(\\d+)/activities")
    .get(redis.cache,userController.showActivities)
    .post(redis.flush,userController.addUserActivity)
    .delete(redis.flush,userController.deleteUserActivity);

//////GET POST et DELETE option véhicule d'un user////////////////////////////////
/**
 * @route GET /user/{id}/vehicle-options
 * @group Users - Operations about user
 * @param {integer} id.path.required the user id
 * @security JWT
 * @returns {Array<VehicleOption>} 200 - vehicle option details
 * @returns {Error} default - Unexpected error
 */
/**
 * @route POST /user/{id}/vehicle-options
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {integer} id.body.required the vehicle option id
 * @consumes application/json
 * @returns {void} 201 - success, no content
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /user/{id}/vehicle-options
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {integer} id.body.required the vehicle option id 
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
router.route("/user/:id(\\d+)/vehicle-options")
    .get(redis.cache,userController.showVehicleOptions)
    .post(redis.flush,userController.addUserOptionVehicle)
    .delete(redis.flush,userController.deleteUserOptionVehicle);


/**
 * @route POST /user/{id}/travels
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {integer} id.body.required the travel id
 * @consumes application/json
 * @returns {void} 201 - success, no content
 * @returns {Error} default - Unexpected error
 */
/**
 * @route DELETE /user/{id}/travels
 * @group Users - Operations about user
 * @security JWT
 * @param {integer} id.path.required the user id
 * @param {integer} id.body.required the travel id 
 * @returns {void} 204 - success, no content
 * @returns {Error} 400 - bad request
 * @returns {Error} default - Unexpected error
 */
router.route("/user/:id(\\d+)/travels")
    .post(redis.flush,userController.addUserTravel)
    .delete(redis.flush,userController.deleteUserTravel);

//middleware gestion erreur
router.use((err,req,res,next)=>res.status(404).json({"error":err}))

module.exports = router;