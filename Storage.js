export default class Storage {
  constructor() {
    this.localStorageIsEnabled = this.checkForLocalStorage();
  }

  get(key) {
    if (this.localStorageIsEnabled)
      return localStorage.getItem(key);

    return this.getCookie(key);
  }

  getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }

    return null;
  }

  set(key, val) {
    if (this.localStorageIsEnabled)
      return localStorage.setItem(key, val);

    return this.setCookie(key, val);
  }

  setCookie(key, val) {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = key + "=" + val + "; " + expires;
  }

  checkForLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
          localStorage.setItem('feature_test', 'yes');
          if (localStorage.getItem('feature_test') === 'yes') {
              localStorage.removeItem('feature_test');
              return true;
          } else {
              return false;
          }
      } catch(e) {
          return false;
      }
    } else {
        return false;
    }
  }
}
