import { formatDistanceToNow } from "date-fns";

const getFormatedDurationString = duration => {
  try {
    const fromDate = duration.from.month + " " + duration.from.year;
    const toDate = duration.to.month + " " + duration.to.year;
    return fromDate + " - " + toDate;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return "Invalid Date Format";
  }
};

const getHumanReadableTime = date => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export { getFormatedDurationString, getHumanReadableTime };
