(function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This Extension Must Run Unsandboxed');
  }
  fetch("https://cdn.jsdelivr.net/gh/pieroxy/lz-string/libs/lz-string.min.js")
   .then(response => response.text())
   .then((response) => {
     eval(response.toString()+'window.z=LZString;')
   })
  const vm = Scratch.vm
  const encodingChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_\`{|}~\'\"';
  class hex {
    getInfo() {
      return {
        id: 'hexa',
        name: 'Hexa',
        blocks: [{
            opcode: 'encode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encode [TEXT] to base 91',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!"
              }
            }
            }, {
            opcode: 'decode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decode [TEXT] from base 91',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ">OwJh>}AQ;r@@Y?F"
              }
            }
            }, {
            opcode: 'compressf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'super compress [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!"
              }
            }
          },

          {
            opcode: 'decompressf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'super decompress [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "҅〶惶̀Ў꤁㦀☄∀"
              }
            }
          }]
      };
    }
    base91_encode(input) {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(input);
      const length = bytes.length;
      let result = "";
      let n = 0;
      let b = 0;
      for (let i = 0; i < length; i++) {
        b |= bytes[i] << n;
        n += 8;
        if (n > 13) {
          let v = b & 8191;
          if (v > 88) {
            b >>= 13;
            n -= 13;
          } else {
            v = b & 16383;
            b >>= 14;
            n -= 14;
          }
          result += encodingChars.charAt(v % 91) + encodingChars.charAt((v / 91) | 0);
        }
      }
      if (n) {
        result += encodingChars.charAt(b % 91);
        if (n > 7 || b > 90) {
          result += encodingChars.charAt((b / 91) | 0);
        }
      }
      return result;
    }
    base91_decode(input) {
      const length = input.length;
      const decoder = new TextDecoder();
      let result = [];
      let b = 0;
      let n = 0;
      let v = -1;
      for (let i = 0; i < length; i++) {
        const c = encodingChars.indexOf(input[i]);
        if (c === -1) continue;
        if (v < 0) {
          v = c;
        } else {
          v += c * 91;
          b |= v << n;
          n += (v & 8191) > 88 ? 13 : 14;
          do {
            result.push(b & 0xff);
            b >>= 8;
            n -= 8;
          } while (n > 7);
          v = -1;
        }
      }
      if (v > -1) {
        result.push((b | (v << n)) & 0xff);
      }
      const view = new Uint8Array(result);
      const decoded = decoder.decode(view);
      return decoded;
    }
    encode(args, util) {
      return this.base91_encode(args.TEXT.toString());
    }
    decode(args, util) {
      return this.base91_decode(args.TEXT.toString());
    }
    compressf(args, util) {
      return z.compress(args.TEXT.toString)
    }
    decompressf(args, util) {
      return z.decompress(args.TEXT.toString)
    }
  }
  Scratch.extensions.register(new hex());
})(Scratch);
