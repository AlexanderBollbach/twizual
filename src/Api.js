import Axios from "axios";

export const fetchTweets = name => {
  return new Promise((resolve, reject) => {
    Axios({
      url: "/twitter",
      params: {
        screen_name: name
      }
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

export const fetchOpensData = ({ fsym, tsym }) => {
  return new Promise(resolve => {
    Axios({
      url: "/opens",
      params: {
        fsym,
        tsym
      }
    }).then(res => {
      const { data } = res;
      resolve(data);
    });
  });
};

export const fetchExchangeVolumesData = ({ fsym, tsym }) => {
  return new Promise(resolve => {
    Axios({
      url: "/exchangeVolumes",
      params: {
        fsym,
        tsym
      }
    }).then(res => {
      const { data } = res;
      resolve(data);
    });
  });
};
