export const USERINFO = 'UserStore';

export interface UserData {
  avatarUrl: string;
  bio: string;
  company: string;
  createdAt: string;
  email: string;
  id: string;
  isCampusExpert: boolean;
  isDeveloperProgramMember: boolean;
  isEmployee: boolean;
  isHireable: boolean;
  isSiteAdmin: boolean;
  isViewer: boolean;
  location: string;
  login: string;
  name: string;
  resourcePath: string;
  sponsorsListing: string;
  status?: {
    id: string;
    message: string;
    emoji: string;
    createdAt: string;
    updatedAt: string;
  };
  twitterUsername: string;
  updatedAt: string;
  viewerCanFollow: boolean;
  websiteUrl: string;
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
