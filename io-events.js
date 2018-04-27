// convenience validation function
String.prototype.checkLength = function(minLength, maxLength, dataName, errorCallback) {
  if(this.length < minLength || this.length > maxLength) {
    errorCallback(`${dataName} must be between ${minLength} and ${maxLength} characters long.`);
  }
};
Array.prototype.checkLength = function(minLength, maxLength, dataName, errorCallback) {
  if(this.length < minLength || this.length > maxLength) {
    errorCallback(`${dataName} list must contain between ${minLength} and ${maxLength} items.`);
  }
};
Number.prototype.checkRangeExclusive = function(min, max, dataName, errorCallback) {
  if(this <= min || this >= max) {
    errorCallback(`${dataName} must be between ${min} and ${max} (exclusive).`);
  }
};
Number.prototype.checkRangeinclusive = function(min, max, dataName, errorCallback) {
  if(this < min || this > max) {
    errorCallback(`${dataName} must be between ${min} and ${max} (inclusive).`);
  }
};

// get ingredient unit types
const ingredientUnits = require('./data/ingredientUnits.js');

// socket.io events
module.exports = (io, cookbook, onerror) => {

  // on connect say hi!
  io.on('connection', socket => {

    console.log('INFO:\tA user has connected.');

    // create recipe
    socket.on('createRecipe', (data, callback) => {

      // error map
      let errors = {};

      // check types
      if(
        typeof data !== 'object'
        || data === null
        || typeof callback !== 'function'
        || typeof data.name !== 'string'
        || typeof data.description !== 'string'
        || typeof data.refUrl !== 'string'
        || typeof data.ingredients !== 'object'
        || typeof data.instructions !== 'object'
        // add image verification later
      ) {
        errors.name = 'The input data is of the wrong type';
        return callback(errors);
      }

      // trim down string data
      data.name = data.name.trim();
      data.description = data.description.trim();
      data.refUrl = data.refUrl.trim();

      // validate lengths
      data.name.checkLength(1, 64, 'Recipe name', m => errors.name = m);
      data.description.checkLength(1, 512, 'Recipe description', m => errors.description = m);
      data.refUrl.checkLength(0, 512, 'Recipe url', m => errors.refUrl = m);
      data.ingredients.checkLength(1, 64, 'Recipe ingredients', m => errors.ingredients = m);
      data.instructions.checkLength(1, 64, 'Recipe instructions', m => errors.instructions = m);

      // check lengths of each ingredient name and instruction
      // check that ingredients are valid (units, amount)
      for(let ingredient of data.ingredients) {
        if(ingredientUnits.find(unit => ingredient.unit === unit.value) === undefined) {
          errors.ingredients = 'An invalid unit has been selected';
        }
        ingredient.amount.checkRangeExclusive(0, Infinity, 'All recipe amounts', m => errors.ingredients = m);
      }
      for(let instruction of data.instructions) {
        instruction.checkLength(1, 64, 'All instructions', m => errors.instructions = m);
      }

      // if errors return
      if(Object.keys(errors).length > 0) {
        return callback(errors);
      }

      // success!
      // add images later
      //console.log(cookbook);
      // error here
      cookbook.add(data.name, data.description, [], data.refUrl, data.ingredients, data.instructions);
      //console.log(cookbook.add);
      return callback(true);

    });

  });
};
