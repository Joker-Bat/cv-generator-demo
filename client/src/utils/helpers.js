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

export { getFormatedDurationString };
