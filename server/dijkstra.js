function runDijkstra(grid, start, goal) {
  const yonler = [
    { x: 1, z: 0 },
    { x: -1, z: 0 },
    { x: 0, z: 1 },
    { x: 0, z: -1 }
  ];

  const kuyruk = [{ x: start.x, z: start.z, cost: 0 }];
  const maliyetHaritasi = {};
  const neredenGeldik = {};

  maliyetHaritasi[`${start.x},${start.z}`] = 0;

  while (kuyruk.length > 0) {
    
    kuyruk.sort((a, b) => a.cost - b.cost);
    const suanki = kuyruk.shift();
    const anahtar = `${suanki.x},${suanki.z}`;

    // hedefe ulaştıysa geri toplanir
    if (suanki.x === goal.x && suanki.z === goal.z) {
      const yol = [];
      let k = anahtar;

      while (k !== `${start.x},${start.z}`) {
        const [x, z] = k.split(',').map(Number);
        yol.unshift({ x, z });
        k = `${neredenGeldik[k].x},${neredenGeldik[k].z}`;
      }
      yol.unshift(start);
      return yol;
    }

    // komşulara bak
    for (const yon of yonler) {
      const nx = suanki.x + yon.x;
      const nz = suanki.z + yon.z;

      if (
        nx >= 0 &&
        nz >= 0 &&
        nx < grid.length &&
        nz < grid[0].length &&
        grid[nx][nz] === 0
      ) {
        const komsuAnahtar = `${nx},${nz}`;
        const yeniMaliyet = suanki.cost + 1;

        if (!(komsuAnahtar in maliyetHaritasi) || yeniMaliyet < maliyetHaritasi[komsuAnahtar]) {
          maliyetHaritasi[komsuAnahtar] = yeniMaliyet;
          neredenGeldik[komsuAnahtar] = { x: suanki.x, z: suanki.z };
          kuyruk.push({ x: nx, z: nz, cost: yeniMaliyet });
        }
      }
    }
  }

  // yol bulunamazsa
  return [];
}
  
module.exports = runDijkstra
  