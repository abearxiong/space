export const USERINFO = 'UserStore';

export interface UserData {
  headImgUrl: string;
  nickName: string;
  phone: string;
  token: string;
  uid: string;
  username: string;
}

export const setUserinfo = (data: any) => {
  // localStorage.setItem(USERINFO, JSON.stringify(data));
};
export const getUserinfo = (): UserData | SimpleObject => {
  try {
    const v = JSON.parse(localStorage.getItem(USERINFO) as string) ?? {};
    return v.userData ?? {};
  } catch {
    return {};
  }
};

export const removeUserinfo = () => {
  localStorage.removeItem(USERINFO);
};
