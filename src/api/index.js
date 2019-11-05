import Axios from "axios";

export const getData = () => Axios.get('/api/people.json');