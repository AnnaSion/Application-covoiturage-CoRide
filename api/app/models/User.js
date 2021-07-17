const coreModel = require("./coreModel");
const pool = require("../db");

/**
 * @typedef User 
 * @property {string} first_name.required the first name user
 * @property {string} last_name.required the last name user
 * @property {string} email.required the user email
 * @property {string} picture_link the link for user avatar
 * @property {string} pseudo the user pseudo
 * @property {string} created_at timestamptz created
 * @property {string} updated_at timestamptz updated
 * @property {string} password.required the hash user password
 */
class User extends coreModel {

    static tableName = "user";

    constructor(obj) {
        super(obj);
    };

    /**
     * this method get all activities for one user by id
     * @param {integer} id 
     * @returns {array} return an array of User
     */
    static async getActivities(id) {
        try {

            const sqlQuery = {
                text: `SELECT a.* FROM activity AS a
                      INNER JOIN user_activity AS ua
                      ON a.id = ua.activity_id
                      INNER JOIN "user" AS u
                      ON u.id = ua.user_id
                      WHERE u.id = $1;`,
                values: [parseInt(id, 10)]
            };

            const {
                rows
            } = await pool.query(sqlQuery);

            return rows ? rows.map(row => new this(row)) : new Error("internal error");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this method get all vehicle options for one user by id
     * @param {integer} id 
     * @returns {array} return an array of vehicle options
     */
    static async getVehicleOption(id) {
        try {

            const sqlQuery = {
                text: `SELECT v.* FROM vehicle_option AS v
                      INNER JOIN user_vehicle_option AS uvo
                      ON v.id = uvo.vehicle_option_id
                      INNER JOIN "user" AS u
                      ON u.id = uvo.user_id
                      WHERE u.id = $1;`,
                values: [parseInt(id, 10)]
            };

            const {
                rows
            } = await pool.query(sqlQuery);

            return rows ? rows.map(row => new this(row)) : new Error("internal error");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this method add one activity for one user by id
     * @param {integer} activityId 
     * @returns {void} return  void
     */
    async addActivity(activityId) {
        try {

            const sqlQuery = {
                text: `INSERT INTO user_activity(user_id,activity_id) 
                       VALUES($1,$2) 
                       RETURNING id;`,
                values: [parseInt(this.id, 10), parseInt(activityId, 10)]
            }

            const {
                rows
            } = await pool.query(sqlQuery);

            return rows ? rows[0] : new Error("internal error...");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this method delete one activity by id for one user
     * @param {integer} activityId 
     * @returns {void}
     */
    async deleteActivity(activityId) {
        try {

            const sqlQuery = {
                text: `DELETE FROM user_activity 
                     WHERE user_id = $1 AND activity_id = $2;`,
                values: [parseInt(this.id, 10), parseInt(activityId, 10)]
            }

            const {
                rowCount
            } = await pool.query(sqlQuery);

            return rowCount ? true : new Error("internal error");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this method add one vehicle option for one user
     * @param {integer} vehicleOptionId 
     * @returns {void}
     */
    async addVehicleOption(vehicleOptionId) {
        try {

            const sqlQuery = {
                text: `INSERT INTO user_vehicle_option(user_id,vehicle_option_id) 
                   VALUES($1,$2) 
                   RETURNING id;`,
                values: [parseInt(this.id, 10), parseInt(vehicleOptionId, 10)]
            }

            const {
                rows
            } = await pool.query(sqlQuery);

            return rows ? rows[0] : new Error("internal error...");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this method delete one vehicle option for one user
     * @param {integer} vehicleOptionId 
     * @returns {void}
     */
    async deleteVehicleOption(vehicleOptionId) {
        try {

            const sqlQuery = {
                text: `DELETE FROM user_vehicle_option 
                 WHERE user_id = $1 AND vehicle_option_id = $2;`,
                values: [parseInt(this.id, 10), parseInt(vehicleOptionId, 10)]
            }

            const {
                rowCount
            } = await pool.query(sqlQuery);

            return rowCount ? true : new Error("internal error");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this function add user for passenger on travel
     * @param {integer} travelId 
     * @returns {void}
     */
    async addTravel(travelId){
        try {
            const sqlQuery = {
                text: `SELECT * FROM add_passenger($1,$2);`,
                values: [parseInt(this.id,10), parseInt(travelId,10)]
            }

            const {
                rows
            } = await pool.query(sqlQuery);

            return rows ? rows[0] : new Error("internal error...");

        } catch (err) {
            throw err;
        }
    };

    /**
     * this method delete the user passenger
     * @param {integer} travelId 
     * @returns {void}
     */
    async deleteTravel(travelId){
        try {

            const sqlQuery = {
                text: `DELETE FROM user_travel 
                 WHERE user_id = $1 AND travel_id = $2;`,
                values: [parseInt(this.id, 10), parseInt(travelId, 10)]
            }

            const {
                rowCount
            } = await pool.query(sqlQuery);

            return rowCount ? true : new Error("internal error");

        } catch (err) {
            throw err;
        } 
    }

};

module.exports = User;