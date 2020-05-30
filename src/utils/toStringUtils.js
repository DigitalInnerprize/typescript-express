// STRINGS
export const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

export const toStudlyCase = (str) =>
  str
    .replace(/[\.\_\-]+/g, ` `)
    .toTitleCase()
    .replace(/ /g, ``);
