module.exports = (cookbookPath, onerror) => {

  // file io (for writing json)
  const fs = require('fs');

  // cookbook data
  let cookbookData = require(cookbookPath);
  
  // get cookbook data
  const get = () => cookbookData;

  // add new recipe to cookbook
  const add = (name, description, images, refUrl, ingredients, instructions) => {
    cookbookData.push({
      name: name,
      path: name.toLowerCase().replace(/[^a-z ]/g, '').replace(/ /g, '-'),
      description: description,
      images: images,
      refUrl: refUrl,
      ingredients: ingredients,
      instructions: instructions
    });
    save();
  };

  // delete recipe
  const remove = id => {
    delete cookbookData[id];
    save();
  };

  // edit recipe and save
  const edit = (id, param, value) => {
    cookbookData[id][param] = value;
    cookbook.save();
  };
  
  // save cookbook
  const save = () => {
    fs.writeFile(cookbookPath, JSON.stringify(cookbookData, null, 2), onerror);
  };

  // return object
  return {
    get: get,
    add: add,
    remove: remove,
    edit: edit,
    save: save
  };
};
