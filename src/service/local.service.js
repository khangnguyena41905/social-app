export const USER_INFOR = "USER_INFOR";
export const localServ = {
  set: (userInfor) => {
    let json = JSON.stringify(userInfor);
    localStorage.setItem(USER_INFOR, json);
  },
  remove: () => {
    localStorage.removeItem(USER_INFOR);
  },
  get: () => {
    let json = localStorage.getItem(USER_INFOR);
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
};
