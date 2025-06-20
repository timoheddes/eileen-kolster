/**
 * delay call stack by t
 * @param {number} ms time to sleep in ms
 * @returns {Promise}
*/
export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
