module.exports = {
  //formats date from raw date to mm/dd/yyyy xx:xx
  formatDate: (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  },
};
