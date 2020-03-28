const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    let arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    let answer = arr.join(" , ");
    console.log(answer);
    return answer;
}

function objToSql(ob) {
    let arr = [];

    for (var key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + " = " + value);
        }
    }

    return arr.join(" ");
}

const orm = {
    //Select all burgers
    all: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //Create new burger
    create: function(table, cols, vals, cb) {
       let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;

        // let queryString = "INSERT INTO " + table;

        // queryString += " (";
        // queryString += cols.toString();
        // queryString += ") ";
        // queryString += "VALUES (";
        // queryString += printQuestionMarks(vals.length);
        // queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    //Update a Burger
    update: function(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        // let queryString = "UPDATE " + table;

        // queryString += " SET ";
        // queryString += objToSql(objColVals);
        // queryString += " WHERE ";
        // queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

//Export the ORM object
module.exports = orm;