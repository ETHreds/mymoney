import Queue from 'bull';

const newTransactionQueue = new Queue('newTransactionQueue');

export { newTransactionQueue };