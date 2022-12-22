// function unique(array) {
//   return array.filter((item, index, array) => {
//     return array.indexof(item, 0) === index;
//   });
// }

// function unique(array) {
//   return Array.from(new Set(array));
// }

function unique(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        array.splice(j, 1);
        j--;
      }
    }
  }
  return array;
}

const array = [1, 2, 3, 4, 5, 6, 6, 6, 8, 1, 2];

unique(array);
