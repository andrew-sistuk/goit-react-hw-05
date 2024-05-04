import axios from 'axios';
// API Key
// 760be0a6b71aa0047af19438304954b5

// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjBiZTBhNmI3MWFhMDA0N2FmMTk0MzgzMDQ5NTRiNSIsInN1YiI6IjY2MmZlZjAxNjY3NTFkMDEyNzg0MWRiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x7-H_pzznxWYhtAUGRkDq3MrDjtj5_Qa0AtBKgx3mVQ

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjBiZTBhNmI3MWFhMDA0N2FmMTk0MzgzMDQ5NTRiNSIsInN1YiI6IjY2MmZlZjAxNjY3NTFkMDEyNzg0MWRiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x7-H_pzznxWYhtAUGRkDq3MrDjtj5_Qa0AtBKgx3mVQ';
axios.defaults.headers.common['accept'] = 'application/json';

const options = {
  language: 'en-US',
};

export async function callTrendings(time_window) {
  const response = await axios.get(`trending/movie/${time_window}`, options);
  return response.data;
}

export async function callMoviesDetails(id) {
  const response = await axios.get(`movie/${id}`, options);
  return response.data;
}

export async function callTypeInfo(id, type) {
  const response = await axios.get(`movie/${id}/${type}`, options);
  // console.log(response.data);
  return response.data;
}
