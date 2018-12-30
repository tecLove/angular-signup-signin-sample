/**
 * enums for rest end points
 */
export enum RestEndPoint {
  login = 'login',
  logout = 'logout',
  delete = 'users/',
  listusers = 'users/',
  update = 'users/',
  add = 'users/'

}

export interface UrlType {
  methodtype: string;
  url: string;
}

export interface User {
  token: string;
}
