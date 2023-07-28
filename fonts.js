(function(Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('This Extension Must Run Unsandboxed');
    }
    var vm = Scratch.vm;
    var a = document.createElement("script"),
    var b = document.scripts[0];
    a.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
    a.async = true;
    b.parentNode.insertBefore(a, b);
  
    class fontext {
      getInfo() {
        return {
          id: 'font',
          name: 'Fonts',
          blocks: [
            {
              opcode: 'importfont',
              blockType: Scratch.BlockType.COMMAND,
              text: 'import font [NAME]',
              arguments: {
                NAME: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "Press Start 2P"
                }}
            }
          ]
        };
      }
      importfont(args, util) {
        if (!WebFont || !WebFont.load) {return}
        WebFont.load({
            google: {
              families: [args.NAME.toString()]
            }
          });
      }
    }
    Scratch.extensions.register(new fontext());
  })(Scratch);
  