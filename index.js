const str = "lvvyfrbhgiyexoirhunnuejzhesylojwbyatfkrv";

const pairs = [
  [13, 23],
  [13, 28],
  [15, 20],
  [24, 29],
  [6, 7],
  [3, 4],
  [21, 30],
  [2, 13],
  [12, 15],
  [19, 23],
  [10, 19],
  [13, 14],
  [6, 16],
  [17, 25],
  [6, 21],
  [17, 26],
  [5, 6],
  [12, 24]
];

function swapLexOrder(str, pairs) {
  const strArray = str.split("");
  const adjacencyList = {};

  for (let pair of pairs) {
    const [a, b] = pair;

    if (!adjacencyList[a]) {
      adjacencyList[a] = [b];
    } else if (adjacencyList[a].indexOf(b) === -1) {
      adjacencyList[a].push(b);
    }

    if (!adjacencyList[b]) {
      adjacencyList[b] = [a];
    } else if (adjacencyList[b].indexOf(a) === -1) {
      adjacencyList[b].push(a);
    }
  }

  const visited = [];
  const connected = [];

  Object.keys(adjacencyList).forEach(node => {
    const nodeNumber = parseInt(node);

    if (visited.indexOf(nodeNumber) === -1) {
      let queue = [nodeNumber];
      let group = [];

      while (queue.length > 0) {
        const currentNode = queue.shift();

        if (adjacencyList[currentNode]) {
          for (let adjacent of adjacencyList[currentNode]) {
            if (visited.indexOf(adjacent) === -1 && adjacent !== currentNode) {
              queue.push(adjacent);
            }
          }
        }

        group.push(currentNode);
        visited.push(currentNode);
      }

      connected.push(group.sort((a, b) => a - b));
    }
  });

  for (let group of connected) {
    const string = [];

    for (let position of group) {
      string.push(strArray[position - 1]);
    }

    string.sort().reverse();

    for (let i = 0; i < string.length; i += 1) {
      strArray[[group[i]] - 1] = string[i];
    }
  }

  return strArray.join("");
}

const expectedResult = "lyyvurrhgxyzvonohunlfejihesiebjwbyatfkrv";

console.log(swapLexOrder(str, pairs));
console.log(swapLexOrder(str, pairs) === expectedResult);
