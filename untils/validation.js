const validator = require('validator');
const pattern   = /[ !#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

module.exports = {
  //Return -1 for invalid case, otherwise a valid username string
  isValidUsername: function(username) {
    if( validator.isEmpty(username) ||
       !validator.isLength(username, { min: 5, max: 20 }) ||
        pattern.test(username)) {

      return -1;
    }
    return username;
  },

  isValidPassword: function(password) {
    if( validator.isEmpty(password) ||
       !validator.isLength(password, { min: 8, max: 30 }) ||
        pattern.test(password)) {

      return -1;
    }
    return password;
  }
}