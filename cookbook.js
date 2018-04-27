module.exports = (cookbookPath, onerror) => {

  // cookbook data
  let cookbookData = require(cookbookPath);
  
  // return object
  return {

    // get cookbook data
    get: () => cookbookData,

    // add new recipe to cookbook
    add: (name, description, images, url, ingredients, instructions) => {
      cookbookData.push({
        name: name,
        description: description,
        images: images,
        url: url,
        ingredients: ingredients,
        instructions: instructions
      });
      cookbook.save();
    },

    // delete recipe
    remove: id => {
      delete cookbookData[id];
      cookbook.save();
    },

    // edit recipe and save
    edit: (id, param, value) => {
      cookbookData[id][param] = value;
      cookbook.save();
    },

    // save cookbook
    save: () => {
      fs.writeFile(cookbookPath, JSON.stringify(cookbookData, null, 2), onerror);
    }

  };
};
