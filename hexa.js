(function (Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('This Extension Must Run Unsandboxed');
    }
    const vm = Scratch.vm
    var LZString=function(){var o=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(o,r){if(!e[o]){e[o]={};for(var n=0;n<o.length;n++)e[o][o.charAt(n)]=n}return e[o][r]}var s={compressToBase64:function(o){if(null==o)return"";var n=s._compress(o,6,function(o){return r.charAt(o)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(o){return null==o?"":""==o?null:s._decompress(o.length,32,function(n){return t(r,o.charAt(n))})},compressToUTF16:function(r){return null==r?"":s._compress(r,15,function(r){return o(r+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:s._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=s.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;e<t;e++){var i=r.charCodeAt(e);n[2*e]=i>>>8,n[2*e+1]=i%256}return n},decompressFromUint8Array:function(r){if(null==r)return s.decompress(r);for(var n=new Array(r.length/2),e=0,t=n.length;e<t;e++)n[e]=256*r[2*e]+r[2*e+1];var i=[];return n.forEach(function(r){i.push(o(r))}),s.decompress(i.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":s._compress(o,6,function(o){return n.charAt(o)})},decompressFromEncodedURIComponent:function(o){return null==o?"":""==o?null:(o=o.replace(/ /g,"+"),s._decompress(o.length,32,function(r){return t(n,o.charAt(r))}))},compress:function(r){return s._compress(r,16,function(r){return o(r)})},_compress:function(o,r,n){if(null==o)return"";var e,t,s,i={},p={},c="",a="",u="",l=2,f=3,h=2,d=[],m=0,v=0;for(s=0;s<o.length;s+=1)if(c=o.charAt(s),Object.prototype.hasOwnProperty.call(i,c)||(i[c]=f++,p[c]=!0),a=u+c,Object.prototype.hasOwnProperty.call(i,a))u=a;else{if(Object.prototype.hasOwnProperty.call(p,u)){if(u.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=u.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=u.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete p[u]}else for(t=i[u],e=0;e<h;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),i[a]=f++,u=String(c)}if(""!==u){if(Object.prototype.hasOwnProperty.call(p,u)){if(u.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=u.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=u.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete p[u]}else for(t=i[u],e=0;e<h;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:s._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(r,n,e){var t,s,i,p,c,a,u,l=[],f=4,h=4,d=3,m="",v=[],w={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(i=0,c=Math.pow(2,2),a=1;a!=c;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=n,w.val=e(w.index++)),i|=(p>0?1:0)*a,a<<=1;switch(i){case 0:for(i=0,c=Math.pow(2,8),a=1;a!=c;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=n,w.val=e(w.index++)),i|=(p>0?1:0)*a,a<<=1;u=o(i);break;case 1:for(i=0,c=Math.pow(2,16),a=1;a!=c;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=n,w.val=e(w.index++)),i|=(p>0?1:0)*a,a<<=1;u=o(i);break;case 2:return""}for(l[3]=u,s=u,v.push(u);;){if(w.index>r)return"";for(i=0,c=Math.pow(2,d),a=1;a!=c;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=n,w.val=e(w.index++)),i|=(p>0?1:0)*a,a<<=1;switch(u=i){case 0:for(i=0,c=Math.pow(2,8),a=1;a!=c;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=n,w.val=e(w.index++)),i|=(p>0?1:0)*a,a<<=1;l[h++]=o(i),u=h-1,f--;break;case 1:for(i=0,c=Math.pow(2,16),a=1;a!=c;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=n,w.val=e(w.index++)),i|=(p>0?1:0)*a,a<<=1;l[h++]=o(i),u=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[u])m=l[u];else{if(u!==h)return null;m=s+s.charAt(0)}v.push(m),l[h++]=s+m.charAt(0),s=m,0==--f&&(f=Math.pow(2,d),d++)}}};return s}();
    const encodingChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_\`{|}~\'\"';
    class b91 {
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
              opcode: 'compress',
              blockType: Scratch.BlockType.REPORTER,
              text: 'super compress [TEXT]',
              arguments: {
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Hello, World!"
                }
              },
              {
                opcode: 'decompress',
                blockType: Scratch.BlockType.REPORTER,
                text: 'super decompress [TEXT]',
                arguments: {
                  TEXT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "҅〶惶̀Ў꤁㦀☄∀"
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
          compress(args, util) {
            return LZString.compress(args.TEXT.toString)
          }
          decompress(args, util) {
            return LZString.decompress(args.TEXT.toString)
          }
        }
        Scratch.extensions.register(new b91());
      })(Scratch);
