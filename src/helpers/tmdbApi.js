import axios from 'axios';
// API Key
// 760be0a6b71aa0047af19438304954b5

// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjBiZTBhNmI3MWFhMDA0N2FmMTk0MzgzMDQ5NTRiNSIsInN1YiI6IjY2MmZlZjAxNjY3NTFkMDEyNzg0MWRiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x7-H_pzznxWYhtAUGRkDq3MrDjtj5_Qa0AtBKgx3mVQ

axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjBiZTBhNmI3MWFhMDA0N2FmMTk0MzgzMDQ5NTRiNSIsInN1YiI6IjY2MmZlZjAxNjY3NTFkMDEyNzg0MWRiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x7-H_pzznxWYhtAUGRkDq3MrDjtj5_Qa0AtBKgx3mVQ'

const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

const options = {

};

export default async function callAxios() {
    return await axios
      .get(url, options)
      .then(response => console.log(response))
      .catch(err => console.error(err));
}
