// Early polyfills that must run before any app module
import { Buffer } from 'buffer';

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

// Polyfill for TextEncoder in very old browsers (modern browsers already have it)
if (typeof globalThis.TextEncoder === 'undefined') {
  // Minimal TextEncoder shim using Uint8Array (not full spec)
  globalThis.TextEncoder = class TextEncoder {
    encode(str) {
      const utf8 = unescape(encodeURIComponent(str));
      const arr = new Uint8Array(utf8.length);
      for (let i = 0; i < utf8.length; ++i) arr[i] = utf8.charCodeAt(i);
      return arr;
    }
  };
}

