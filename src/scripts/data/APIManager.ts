const API_URL = "https://nipadmin.herokuapp.com/submitscore";

export default class APIManager {
  private static instance: APIManager = null;

  static GetInstance(): APIManager {
    if (APIManager.instance == null) {
      APIManager.instance = new APIManager();
    }
    return APIManager.instance;
  }

  getParams() {
    const query = {};
    let url = window.location.search;
    if (url) {
      url = decodeURIComponent(url);
    }
    const temp1 = url.split("?");
    if (temp1 && temp1.length > 1) {
      const temp2 = temp1[1].split("&");
      if (temp2 && temp2.length) {
        temp2.forEach((arr) => {
          const temp3 = arr.split("=");
          if (temp3 && temp3.length === 2) {
            query[temp3[0]] = temp3[1];
          }
        });
      }
    }
    return query;
  }

  sendData(score) {
    try {
      const getQueryObjects = this.getParams();
      let id = getQueryObjects["id"];
      let GameName = "QuizTime";

      if (id) {
        fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score,
            id,
            GameName,
          }),
          method: "POST",
          redirect: "follow",
        })
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Id not found in query params!");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
