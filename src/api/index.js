import axios from "axios";

const origin = "http://ustbhuangyi.com/sell/";

const getSeller = get(origin + "api/seller");
const getGoods = get(origin + "api/goods");
const getRatings = get(origin + "api/ratings");

function get(url) {
  return function(params = {}) {
    return axios.get(url, { params }).then(res => {
      const { errno, data } = res.data;
      if (errno == 0) {
        return data;
      }
    });
  };
}

export { getSeller, getGoods, getRatings };
