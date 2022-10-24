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

export const dateToStringForNativeInput = (date: Date) => {
  const castedDate = new Date(date);
  const dd = castedDate.getDate();
  const mm = castedDate.getMonth() + 1;
  const yyyy = castedDate.getFullYear();
  return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
};

// export const stringToDate = (date: string) => {
//   const [dd, mm, yyyy] = date.split('.');
//   return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
// };
