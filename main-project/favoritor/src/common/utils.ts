export const filterBySearch = (object: {[x: string]: string | number | string[] | null}, word: string) => {
  const index = Object.values(object).findIndex(value => {
    if (typeof value === 'string') {
      return value.toLowerCase().indexOf(word.toLowerCase()) !== -1;
    } else if (Array.isArray(value)) {
      return value.findIndex(item => item.toLowerCase().indexOf(word.toLowerCase()) !== -1);
    }
    return false;
  })
  return index > -1;
};
