export const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// Password must contain minimum 6 and contain at least one numeric digit, one uppercase and one lowercase letter!
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const REGEX_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const dateToString = (date: Date) => {
  const castedDate = new Date(date);
  const dd = castedDate.getDate();
  const mm = castedDate.getMonth() + 1;
  const yyyy = castedDate.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

export const dateToStringWithTime = (date: Date) => {
  const castedDate = new Date(date);
  const dd = castedDate.getDate();
  const mm = castedDate.getMonth() + 1;
  const yyyy = castedDate.getFullYear();
  let hh: string | number = castedDate.getHours();
  let min: string | number = castedDate.getMinutes();

  if (hh < 10) {
    hh = '0' + hh;
  }
  if (min < 10) {
    min = '0' + min;
  }

  return `${dd}.${mm}.${yyyy} - ${hh}:${min}`;
};

export const dateToStringForNativeInput = (date: Date) => {
  const castedDate = new Date(date);
  const dd = castedDate.getDate();
  const mm = castedDate.getMonth() + 1;
  const yyyy = castedDate.getFullYear();
  return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
};

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');
