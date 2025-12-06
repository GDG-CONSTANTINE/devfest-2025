// Simple script to generate a beep sound WAV file
const fs = require('fs');
const path = require('path');

// WAV file parameters
const sampleRate = 8000;
const duration = 0.02; // 20ms
const frequency = 800; // Hz
const volume = 0.3;

// Calculate samples
const numSamples = Math.floor(sampleRate * duration);
const samples = new Int16Array(numSamples);

// Generate square wave
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const value = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
  samples[i] = Math.floor(value * volume * 32767);
}

// Create WAV file header
const dataSize = samples.length * 2;
const header = Buffer.alloc(44);

// RIFF header
header.write('RIFF', 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write('WAVE', 8);

// fmt chunk
header.write('fmt ', 12);
header.writeUInt32LE(16, 16); // fmt chunk size
header.writeUInt16LE(1, 20); // audio format (PCM)
header.writeUInt16LE(1, 22); // number of channels
header.writeUInt32LE(sampleRate, 24); // sample rate
header.writeUInt32LE(sampleRate * 2, 28); // byte rate
header.writeUInt16LE(2, 32); // block align
header.writeUInt16LE(16, 34); // bits per sample

// data chunk
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

// Combine header and samples
const wavBuffer = Buffer.concat([header, Buffer.from(samples.buffer)]);

// Write to file
const outputPath = path.join(__dirname, '..', 'public', 'sounds', 'beep.wav');
fs.writeFileSync(outputPath, wavBuffer);

console.log('Beep sound generated at:', outputPath);
