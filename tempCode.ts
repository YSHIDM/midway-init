const { customAlphabet } = require('nanoid')
// import { customAlphabet } from 'nanoid';

const customNanoid = customAlphabet('alphabet', length - 'prefix'.length);

console.log('customNanoid() :>>', customNanoid())
