module.exports = {
    formatDate: (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString();
    }
  };
  