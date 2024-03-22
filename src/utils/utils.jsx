import moment from "moment";
import "moment/locale/id";
import numeral from "numeral";

export const handleFormatView = (number) => {
  try {
    if (number < 1000) {
      return number;
    } else if (number < 1000000) {
      return numeral(number).format("0.a").replace("k", " rb");
    } else {
      return numeral(number).format("0.0a").replace("m", " jt");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleFormatDate = (date) => {
  try {
    moment.locale("id");
    moment.updateLocale("id", {
      relativeTime: {
        past: "%s yang lalu",
        dd: "%d hari",
        d: "%d hari",
        hh: "%d jam",
        w: "%d minggu",
        ww: "%d minggu",
        MM: "%d bulan",
        M: "%d bulan",
        y: "%d tahun",
        yy: "%d tahun",
      },
    });
    const parsedDate = moment(date, "YYYYMMDD");

    // Menggunakan fromNow() untuk mendapatkan string yang menyatakan waktu relatif dari sekarang
    const formattedDate = parsedDate.fromNow();
    return formattedDate;
  } catch (error) {
    console.log(error);
  }
};

export const handleFormatDuration = (duration) => {
  try {
    const convertDuration = moment.duration(duration);
    const checkDuration =
      convertDuration.hours() > 0
        ? moment.utc(convertDuration.asMilliseconds()).format("hh:mm:ss")
        : moment.utc(convertDuration.asMilliseconds()).format("mm:ss");
    return checkDuration;
  } catch (error) {
    console.log(error);
  }
};

export const regexComment = (comment) => {
  return comment
    .replace(/&quot;/g, '"') // mengganti &quot; dengan "
    .replace(/<br>/g, "\n")
    .replace(/<a.*?>(.*?)<\/a>/g, "$1");
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Untuk animasi smooth scrolling
  });
};
