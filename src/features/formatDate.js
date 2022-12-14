const formatDate = (data) => {
  const date = data ? new Date(data) : new Date();
  const year = String(date.getFullYear());
  const day = String(date.getDate());
  const hour = String(date.getHours());
  const minutes = String(date.getMinutes());
  const month = date.getMonth() + 1;
  return `${year.substring(2)}.${month}.${day} ${hour}:${minutes}`;
};

export { formatDate };
