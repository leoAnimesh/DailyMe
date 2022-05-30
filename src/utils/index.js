import moment from 'moment';

export const formatDate = (date) => {
  if (date !== '' && typeof date === 'object') {
    return moment(date['seconds'] * 1000).format('MMMM Do YYYY, h:mm a');
  }
  if (date !== '' && typeof date === 'string') {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }
  if (date['seconds'] * 1000 > Date.now() && date !== '') {
    return 'Due : ' + moment(date).format('MMMM Do YYYY, h:mm a');
  }
  return 'No date';
};
