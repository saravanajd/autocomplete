$(document).ready(function() {
  $('pre').makeCode({
    style: 'code-style-dark',
    addons: [{ name: 'js', parser: javascriptCode }]
  });
});

var javascriptCode = function(text) {
  return text;
};

// All shit   

var csharpCode = function(text) {
  var comment = false;
  var lines = text.split('\n');
  text = '';

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    line = line
      .replace(
        /(public|private|protected|static|virtual|abstract|override|class|struct|new)\b/gi,
        '<span class="sharp-keywords">$1</span>'
      )
      .replace(
        /\b(if|else|switch|case|break|return|namespace|using|while|bool|int|float|double|true|false|void)\b/gi,
        '<span class="sharp-default-types">$1</span>'
      )
      .replace(/(\/\/(.*)$)/g, '<span class="comment">$1</span>');

    if (!comment) {
      // Multiline comments shit
      var result1 = line.match(/\/\*([\s\S]*?)\*\//gi);

      if (result1 != null) {
        for (var r = 0; r < result1.length; r++) {
          line = line.replace(result1[r], '<span class="comment">$&</span>');
        }
      } else {
        var result = line.match(/\/\*([\s\S]*?)[\s\S]*/i);

        if (result != null) {
          line = line.replace(result[0], '<span class="comment">$&</span>');

          comment = true;
        }
      }
    } else {
      var result = line.match(/[\s\S]*\*\/|\*\//);

      if (result != null) {
        line = line.replace(result[0], '<span class="comment">$&</span>');

        comment = false;
      } else {
        line = '<span class="comment">' + line + '</span>';
      }
    }

    text += line;
    if (i != lines.length - 1) text += '\n';
  }

  return text;
};

var htmlCode = function(text) {
  return text;
};

(function($) {
  $.fn.makeCode = function(options) {
    var settings = $.extend(
      {
        style: 'code-style-light',
        selectLabel: 'Select',
        addons: []
      },
      options
    );

    var defaultAddons = [
      { name: 'csharp', parser: csharpCode },
      { name: 'html', parser: htmlCode }
    ];

    options.addons = options.addons.concat(defaultAddons);
    defaultAddons = null;

    //replace html tags
    function replaceTag(tag) {
      var tagsToReplace = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
      return tagsToReplace[tag] || tag;
    }
    function safe_tags_replace(str) {
      return str.replace(/[&<>]/g, replaceTag);
    }

    function getAddon(name) {
      var result = null;
      options.addons.forEach(function(item, i, arr) {
        if (item.name == name) result = item;
      });
      return result;
    }

    $(this).each(function() {
      $this = $(this);
      var syntax = $this.prop('class').replace('syntax-', '');
      var text = $this.html();

      text = safe_tags_replace(text);

      var addon = getAddon(syntax);

      if (addon != null) text = addon.parser(text);

      var splitter = text.split(/\n/);

      text = '';

      for (var s = 0; s < splitter.length - 1; s++) {
        if (splitter[s].length > 0) {
          text +=
            '<div class="line">' +
            splitter[s]
              .replace(/^ +/gm, '\t')
              .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') +
            '</div>';
        } else {
          text += '<div class="line"><br></div>';
        }
      }

      $this.before(
        '<div class="code ' +
          settings.style +
          '"><div class="copy">' +
          settings.selectLabel +
          '</div><div class="numbers"></div><div class="source">' +
          text +
          '</div><div class="clear"></div></div>'
      );

      for (var i = 1; i < splitter.length; i++) {
        var height = $this
          .prev()
          .find('.source .line')
          .eq(i - 1)
          .height();
        $this
          .prev()
          .find('.numbers')
          .append('<div style="height: ' + height + 'px">' + i + '</div>');
      }

      $this
        .prev()
        .find('.source')
        .width(
          $this.prev().width() -
            ($this
              .prev()
              .find('.numbers')
              .width() +
              37)
        );
      $this.remove();
    });

    // fixed link
    $('.code').scroll(function() {
      var top = $(this).scrollTop();
      $(this)
        .find('.copy')
        .css('top', top + 5);
    });

    // select a code
    $('.code .copy').on('click', function(e) {
      selectText(this.parentNode.getElementsByClassName('source')[0]);
    });

    // select a line of code
    $('.code .numbers div').on('click', function(e) {
      var line = $(this)
        .parent()
        .parent()
        .find('.source .line')
        .eq($(this).index());
      selectText(line.get(0));
    });

    $(window).resize(function() {
      // --- ?
    });

    function selectText(node) {
      var e = node,
        s,
        r;

      if (window.getSelection) {
        s = window.getSelection();
        r = document.createRange();
        r.selectNodeContents(e);
        s.removeAllRanges();
        s.addRange(r);
      } else if (document.selection) {
        r = document.body.createTextRange();
        r.moveToElementText(e);
        r.select();
      }
    }
  };
})(jQuery);
