import axios from 'axios';

export const getBackendMessage = async () => {
  const res = await axios.get('http://localhost:3001/');
  return res.data;
};

/* export const requestAStarPath = async (gridMatrix, start, goal) => {
  try{
    const res = await axios.post('http://localhost:3001/astar', {
      grid: gridMatrix,
      start,
      goal
    })
    return res.data.path
  }catch (error) {
    console.log("A* API error: ", error)
    return []
  }
} */

export const requestPathAlgorithm = async (gridMatrix, start, goal, algorithm) => {
  try{
    console.log("algorithm: ", algorithm);
    const res = await axios.post('http://localhost:3001/path', {
      grid: gridMatrix,
      start,
      goal,
      algorithm
    })
    return res.data.path
  }catch (error) {
    console.log("Path API error: ", error)
    return []
  }
};