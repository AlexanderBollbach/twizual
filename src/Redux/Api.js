import Axios from "axios";

export const fetchTweets = (name, startingFrom) => {
  return new Promise((resolve, reject) => {
    let params = {
      screen_name: name
    };

    if (startingFrom) {
      params.max_id = startingFrom;
    }
    Axios({
      url: "/twitter",
      params: params
    }).then(res => {
      const { data } = res;

      if (data.error) {
        reject(data.error);
      } else {
        resolve(data);
      }
    });
  });
};
