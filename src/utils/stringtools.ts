
import { customAlphabet } from 'nanoid';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'

export const getCode = (prefix: string, length = 10) => {
  const customNanoid = customAlphabet(alphabet, length - prefix.length);
  return prefix + customNanoid();
}
