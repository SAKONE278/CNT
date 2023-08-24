const regexTags = (tags) => {
  let newTags = [];
  for (let tag of tags) {
    tag = tag.split(' ').join('');
    tag = tag.replace(/[^-,'A-Za-z0-9]+/g, '-');
    tag = tag.toLowerCase();
    newTags.push(tag);
  }
  return newTags;
};

module.exports = regexTags;
