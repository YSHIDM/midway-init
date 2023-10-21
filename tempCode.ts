// import probe from 'node-ffprobe'
const probe = require('node-ffprobe')
// import ffprobeInstaller from '@ffprobe-installer/ffprobe';
// const ffprobeInstaller = require('@ffprobe-installer/ffprobe')

// console.log(ffprobeInstaller.path, ffprobeInstaller.version)

// probe.FFPROBE_PATH = ffprobeInstaller.path

var track = 'doc/1.mp3' // or video

probe(track).then(probeData => {
  console.log(probeData)
})

const { customAlphabet } = require('nanoid')
// import { customAlphabet } from 'nanoid';

const customNanoid = customAlphabet('alphabet', length - 'prefix'.length);

console.log('customNanoid() :>>', customNanoid())
