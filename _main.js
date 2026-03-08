// ########## 
import "./_main.scss";

// ############ https://bulma.io/documentation/components/message/
 function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (getCookie('siteCookieNotice') === 'dismissed') {
      const el = document.querySelector('.notification.is-info.is-light');
      if (el) el.remove();
      return;
    }

    (document.querySelectorAll('.notification .delete') || []).forEach($delete => {
      const $notification = $delete.parentNode;
      console.log('Found delete button:', $delete);

      $delete.addEventListener('click', () => {
        console.log('Clicked delete');
        setCookie('siteCookieNotice', 'dismissed', 365);
        $notification.remove();
      });
    });
  });

// ########## 
