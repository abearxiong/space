import dayjs, { Dayjs } from 'dayjs';

const formDate = (
  date: number | string | undefined,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  if (!date) return;
  if (date === 0) {
    return 0;
  } else {
    return date && dayjs(date).format(format);
  }
};

const now = () => new Date();

const days = (num: number) => num * 1 * 24 * 60 * 60 * 1000;

const dayAdd = (day: Dayjs, duration: number) => day.valueOf() + days(duration);

export { formDate, now, days, dayAdd };
