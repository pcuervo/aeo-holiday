/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jï¿½Ã¶rn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 *
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 *
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 *
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 *
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
  metadata : {
    defaults : {
      type: 'class',
      name: 'metadata',
      cre: /({.*})/,
      single: 'metadata'
    },
    setType: function( type, name ){
      this.defaults.type = type;
      this.defaults.name = name;
    },
    get: function( elem, opts ){
      var settings = $.extend({},this.defaults,opts);
      // check for empty string in single property
      if ( !settings.single.length ) settings.single = 'metadata';

      var data = $.data(elem, settings.single);
      // returned cached data if it already exists
      if ( data ) return data;

      data = "{}";

      var getData = function(data) {
        if(typeof data != "string") return data;

        if( data.indexOf('{') < 0 ) {
          data = eval("(" + data + ")");
        }
      }

      var getObject = function(data) {
        if(typeof data != "string") return data;

        data = eval("(" + data + ")");
        return data;
      }

      if ( settings.type == "html5" ) {
        var object = {};
        $( elem.attributes ).each(function() {
          var name = this.nodeName;
          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
          else return true;
          object[name] = getObject(this.nodeValue);
        });
      } else {
        if ( settings.type == "class" ) {
          var m = settings.cre.exec( elem.className );
          if ( m )
            data = m[1];
        } else if ( settings.type == "elem" ) {
          if( !elem.getElementsByTagName ) return;
          var e = elem.getElementsByTagName(settings.name);
          if ( e.length )
            data = $.trim(e[0].innerHTML);
        } else if ( elem.getAttribute != undefined ) {
          var attr = elem.getAttribute( settings.name );
          if ( attr )
            data = attr;
        }
        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
      }

      $.data( elem, settings.single, object );
      return object;
    }
  }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
  return $.metadata.get( this[0], opts );
};

/*
 * jQuery Media Plugin for converting elements into rich media content.
 *
 * Examples and documentation at: http://malsup.com/jquery/media/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: M. Alsup
 * @version: 0.99 (05-JUN-2013)
 * @requires jQuery v1.1.2 or later
 * $Id: jquery.media.js 2460 2007-07-23 02:53:15Z malsup $
 *
 * Supported Media Players:
 *  - Flash
 *  - Quicktime
 *  - Real Player
 *  - Silverlight
 *  - Windows Media Player
 *  - iframe
 *
 * Supported Media Formats:
 *   Any types supported by the above players, such as:
 *   Video: asf, avi, flv, mov, mpg, mpeg, mp4, qt, smil, swf, wmv, 3g2, 3gp
 *   Audio: aif, aac, au, gsm, mid, midi, mov, mp3, m4a, snd, rm, wav, wma
 *   Other: bmp, html, pdf, psd, qif, qtif, qti, tif, tiff, xaml
 *
 * Thanks to Mark Hicken and Brent Pedersen for helping me debug this on the Mac!
 * Thanks to Dan Rossi for numerous bug reports and code bits!
 * Thanks to Skye Giordano for several great suggestions!
 * Thanks to Richard Connamacher for excellent improvements to the non-IE behavior!
 */
/*global SWFObject alert Sys */
/*jshint forin:false */
;(function($) {
"use strict";

var mode = document.documentMode || 0;
var msie = /MSIE/.test(navigator.userAgent);
var lameIE = msie && (/MSIE (6|7|8)\.0/.test(navigator.userAgent) || mode < 9);

/**
 * Chainable method for converting elements into rich media.
 *
 * @param options
 * @param callback fn invoked for each matched element before conversion
 * @param callback fn invoked for each matched element after conversion
 */
$.fn.media = function(options, f1, f2) {
  if (options == 'undo') {
    return this.each(function() {
      var $this = $(this);
      var html = $this.data('media.origHTML');
      if (html)
        $this.replaceWith(html);
    });
  }

  return this.each(function() {
    if (typeof options == 'function') {
      f2 = f1;
      f1 = options;
      options = {};
    }
    var o = getSettings(this, options);
    // pre-conversion callback, passes original element and fully populated options
    if (typeof f1 == 'function') f1(this, o);

    var r = getTypesRegExp();
    var m = r.exec(o.src.toLowerCase()) || [''];
    var fn;

    if (o.type)
      m[0] = o.type;
    else
      m.shift();

    for (var i=0; i < m.length; i++) {
      fn = m[i].toLowerCase();
      if (isDigit(fn[0])) fn = 'fn' + fn; // fns can't begin with numbers
      if (!$.fn.media[fn])
        continue;  // unrecognized media type
      // normalize autoplay settings
      var player = $.fn.media[fn+'_player'];
      if (!o.params) o.params = {};
      if (player) {
        var num = player.autoplayAttr == 'autostart';
        o.params[player.autoplayAttr || 'autoplay'] = num ? (o.autoplay ? 1 : 0) : o.autoplay ? true : false;
      }
      var $div = $.fn.media[fn](this, o);

      $div.css('backgroundColor', o.bgColor).width(o.width);

      if (o.canUndo) {
        var $temp = $('<div></div>').append(this);
        $div.data('media.origHTML', $temp.html()); // store original markup
      }

      // post-conversion callback, passes original element, new div element and fully populated options
      if (typeof f2 == 'function') f2(this, $div[0], o, player.name);
      break;
    }
  });
};

/**
 * Non-chainable method for adding or changing file format / player mapping
 * @name mapFormat
 * @param String format File format extension (ie: mov, wav, mp3)
 * @param String player Player name to use for the format (one of: flash, quicktime, realplayer, winmedia, silverlight or iframe
 */
$.fn.media.mapFormat = function(format, player) {
  if (!format || !player || !$.fn.media.defaults.players[player]) return; // invalid
  format = format.toLowerCase();
  if (isDigit(format[0])) format = 'fn' + format;
  $.fn.media[format] = $.fn.media[player];
  $.fn.media[format+'_player'] = $.fn.media.defaults.players[player];
};

// global defautls; override as needed
$.fn.media.defaults = {
  standards:  true,       // use object tags only (no embeds for non-IE browsers)
  canUndo:    true,       // tells plugin to store the original markup so it can be reverted via: $(sel).mediaUndo()
  width:    400,
  height:   400,
  autoplay: 0,      // normalized cross-player setting
  bgColor:  '#ffffff',  // background color
  params:   { wmode: 'transparent'},  // added to object element as param elements; added to embed element as attrs
  attrs:    {},     // added to object and embed elements as attrs
  flvKeyName: 'file',   // key used for object src param (thanks to Andrea Ercolino)
  flashvars:  {},     // added to flash content as flashvars param/attr
  flashVersion: '7',  // required flash version
  expressInstaller: null, // src for express installer

  // default flash video and mp3 player (@see: http://jeroenwijering.com/?item=Flash_Media_Player)
  flvPlayer:   'mediaplayer.swf',
  mp3Player:   'mediaplayer.swf',

  // @see http://msdn2.microsoft.com/en-us/library/bb412401.aspx
  silverlight: {
    inplaceInstallPrompt: 'true', // display in-place install prompt?
    isWindowless:     'true', // windowless mode (false for wrapping markup)
    framerate:        '24',   // maximum framerate
    version:        '0.9',  // Silverlight version
    onError:        null,   // onError callback
    onLoad:           null,   // onLoad callback
    initParams:       null,   // object init params
    userContext:      null    // callback arg passed to the load callback
  }
};

// Media Players; think twice before overriding
$.fn.media.defaults.players = {
  flash: {
    name:    'flash',
    title:     'Flash',
    types:     'flv,mp3,swf',
    mimetype:  'application/x-shockwave-flash',
    pluginspage: 'http://www.adobe.com/go/getflashplayer',
    ieAttrs: {
      classid:  'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
      type:   'application/x-oleobject',
      codebase: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + $.fn.media.defaults.flashVersion
    }
  },
  quicktime: {
    name:    'quicktime',
    title:     'QuickTime',
    mimetype:  'video/quicktime',
    pluginspage: 'http://www.apple.com/quicktime/download/',
    types:     'aif,aiff,aac,au,bmp,gsm,mov,mid,midi,mpg,mpeg,mp4,m4a,psd,qt,qtif,qif,qti,snd,tif,tiff,wav,3g2,3gp',
    ieAttrs: {
      classid:  'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
      codebase: 'http://www.apple.com/qtactivex/qtplugin.cab'
    }
  },
  realplayer: {
    name:     'real',
    title:      'RealPlayer',
    types:      'ra,ram,rm,rpm,rv,smi,smil',
    mimetype:   'audio/x-pn-realaudio-plugin',
    pluginspage:  'http://www.real.com/player/',
    autoplayAttr: 'autostart',
    ieAttrs: {
      classid: 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'
    }
  },
  winmedia: {
    name:     'winmedia',
    title:      'Windows Media',
    types:      'asx,asf,avi,wma,wmv',
    mimetype:   isFirefoxWMPPluginInstalled() ? 'application/x-ms-wmp' : 'application/x-mplayer2',
    pluginspage:  'http://www.microsoft.com/Windows/MediaPlayer/',
    autoplayAttr: 'autostart',
    oUrl:     'url',
    ieAttrs: {
      classid:  'clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6',
      type:   'application/x-oleobject'
    }
  },
  // special cases
  img: {
    name:  'img',
    title: 'Image',
    types: 'gif,png,jpg'
  },
  iframe: {
    name:  'iframe',
    types: 'html,pdf'
  },
  silverlight: {
    name:  'silverlight',
    types: 'xaml'
  }
};

//
//  everything below here is private
//


// detection script for FF WMP plugin (http://www.therossman.org/experiments/wmp_play.html)
// (hat tip to Mark Ross for this script)
function isFirefoxWMPPluginInstalled() {
  var plugs = navigator.plugins || [];
  for (var i = 0; i < plugs.length; i++) {
    var plugin = plugs[i];
    if (plugin['filename'] == 'np-mswmp.dll')
      return true;
  }
  return false;
}

var counter = 1;

for (var player in $.fn.media.defaults.players) {
  var types = $.fn.media.defaults.players[player].types;
  $.each(types.split(','), function(i,o) {
    if (isDigit(o[0])) o = 'fn' + o;
    $.fn.media[o] = $.fn.media[player] = getGenerator(player);
    $.fn.media[o+'_player'] = $.fn.media.defaults.players[player];
  });
}

function getTypesRegExp() {
  var types = '';
  for (var player in $.fn.media.defaults.players) {
    if (types.length) types += ',';
    types += $.fn.media.defaults.players[player].types;
  }
  return new RegExp('\\.(' + types.replace(/,/ig,'|') + ')\\b');
}

function getGenerator(player) {
  return function(el, options) {
    return generate(el, options, player);
  };
}

function isDigit(c) {
  return '0123456789'.indexOf(c) > -1;
}

// flatten all possible options: global defaults, meta, option obj
function getSettings(el, options) {
  options = options || {};
  var a, n;
  var $el = $(el);
  var cls = el.className || '';
  // support metadata plugin (v1.0 and v2.0)
  var meta = $.metadata ? $el.metadata() : $.meta ? $el.data() : {};
  meta = meta || {};
  var w = meta.width  || parseInt(((cls.match(/\bw:(\d+)/)||[])[1]||0),10) || parseInt(((cls.match(/\bwidth:(\d+)/)||[])[1]||0),10);
  var h = meta.height || parseInt(((cls.match(/\bh:(\d+)/)||[])[1]||0),10) || parseInt(((cls.match(/\bheight:(\d+)/)||[])[1]||0),10);

  if (w) meta.width = w;
  if (h) meta.height = h;
  if (cls) meta.cls = cls;

  // crank html5 style data attributes
  var dataName = 'data-';
    for (var i=0; i < el.attributes.length; i++) {
        a = el.attributes[i], n = $.trim(a.name);
        var index = n.indexOf(dataName);
        if (index === 0) {
      n = n.substring(dataName.length);
      meta[n] = a.value;
        }
    }

  a = $.fn.media.defaults;
  var b = options;
  var c = meta;

  var p = { params: { bgColor: options.bgColor || $.fn.media.defaults.bgColor } };
  var opts = $.extend({}, a, b, c);
  $.each(['attrs','params','flashvars','silverlight'], function(i,o) {
    opts[o] = $.extend({}, p[o] || {}, a[o] || {}, b[o] || {}, c[o] || {});
  });

  if (typeof opts.caption == 'undefined') opts.caption = $el.text();

  // make sure we have a source!
  opts.src = opts.src || $el.attr('href') || $el.attr('src') || 'unknown';
  return opts;
}

//
//  Flash Player
//

// generate flash using SWFObject library if possible
$.fn.media.swf = function(el, opts) {
  var f, p;
  if (!window.SWFObject && !window.swfobject) {
    // roll our own
    if (opts.flashvars) {
      var a = [];
      for (f in opts.flashvars)
        a.push(f + '=' + opts.flashvars[f]);
      if (!opts.params) opts.params = {};
      opts.params.flashvars = a.join('&');
    }
    return generate(el, opts, 'flash');
  }

  var id = el.id ? (' id="'+el.id+'"') : '';
  var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
  var $div = $('<div' + id + cls + '>');

  // swfobject v2+
  if (window.swfobject) {
    $(el).after($div).appendTo($div);
    if (!el.id) el.id = 'movie_player_' + counter++;

    // replace el with swfobject content
    window.swfobject.embedSWF(opts.src, el.id, opts.width, opts.height, opts.flashVersion,
      opts.expressInstaller, opts.flashvars, opts.params, opts.attrs);
  }
  // swfobject < v2
  else {
    $(el).after($div).remove();
    var so = new SWFObject(opts.src, 'movie_player_' + counter++, opts.width, opts.height, opts.flashVersion, opts.bgColor);
    if (opts.expressInstaller) so.useExpressInstall(opts.expressInstaller);

    for (p in opts.params)
      if (p != 'bgColor') so.addParam(p, opts.params[p]);
    for (f in opts.flashvars)
      so.addVariable(f, opts.flashvars[f]);
    so.write($div[0]);
  }

  if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
  return $div;
};

// map flv and mp3 files to the swf player by default
$.fn.media.flv = $.fn.media.mp3 = function(el, opts) {
  var src = opts.src;
  var player = /\.mp3\b/i.test(src) ? opts.mp3Player : opts.flvPlayer;
  var key = opts.flvKeyName;
  src = encodeURIComponent(src);
  opts.src = player;
  opts.src = opts.src + '?'+key+'=' + (src);
  var srcObj = {};
  srcObj[key] = src;
  opts.flashvars = $.extend({}, srcObj, opts.flashvars );
  return $.fn.media.swf(el, opts);
};

//
//  Silverlight
//
$.fn.media.xaml = function(el, opts) {
  if (!window.Sys || !window.Sys.Silverlight) {
    if ($.fn.media.xaml.warning) return;
    $.fn.media.xaml.warning = 1;
    alert('You must include the Silverlight.js script.');
    return;
  }

  var props = {
    width: opts.width,
    height: opts.height,
    background: opts.bgColor,
    inplaceInstallPrompt: opts.silverlight.inplaceInstallPrompt,
    isWindowless: opts.silverlight.isWindowless,
    framerate: opts.silverlight.framerate,
    version: opts.silverlight.version
  };
  var events = {
    onError: opts.silverlight.onError,
    onLoad: opts.silverlight.onLoad
  };

  var id1 = el.id ? (' id="'+el.id+'"') : '';
  var id2 = opts.id || 'AG' + counter++;
  // convert element to div
  var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
  var $div = $('<div' + id1 + cls + '>');
  $(el).after($div).remove();

  Sys.Silverlight.createObjectEx({
    source: opts.src,
    initParams: opts.silverlight.initParams,
    userContext: opts.silverlight.userContext,
    id: id2,
    parentElement: $div[0],
    properties: props,
    events: events
  });

  if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
  return $div;
};

//
// generate object/embed markup
//
function generate(el, opts, player) {
  var $el = $(el);
  var o = $.fn.media.defaults.players[player];
  var a, key, v;

  if (player == 'iframe') {
    o = $('<iframe' + ' width="' + opts.width + '" height="' + opts.height + '" >');
    o.attr('src', opts.src);
    o.css('backgroundColor', o.bgColor);
  }
  else if (player == 'img') {
    o = $('<img>');
    o.attr('src', opts.src);
    if (opts.width)
      o.attr('width', opts.width);
    if (opts.height)
      o.attr('height', opts.height);
    o.css('backgroundColor', o.bgColor);
  }
  else if (lameIE) {
    a = ['<object width="' + opts.width + '" height="' + opts.height + '" '];
    for (key in opts.attrs)
      a.push(key + '="'+opts.attrs[key]+'" ');
    for (key in o.ieAttrs || {}) {
      v = o.ieAttrs[key];
      if (key == 'codebase' && window.location.protocol == 'https:')
        v = v.replace('http','https');
      a.push(key + '="'+v+'" ');
    }
    a.push('></ob'+'ject'+'>');
    var p = ['<param name="' + (o.oUrl || 'src') +'" value="' + opts.src + '">'];
    for (key in opts.params)
      p.push('<param name="'+ key +'" value="' + opts.params[key] + '">');
    o = document.createElement(a.join(''));
    for (var i=0; i < p.length; i++)
      o.appendChild(document.createElement(p[i]));
  }
  else if (opts.standards) {
    // Rewritten to be standards compliant by Richard Connamacher
    a = ['<object type="' + o.mimetype +'" width="' + opts.width + '" height="' + opts.height +'"'];
    if (opts.src) a.push(' data="' + opts.src + '" ');
    if (msie) {
      for (key in o.ieAttrs || {}) {
        v = o.ieAttrs[key];
        if (key == 'codebase' && window.location.protocol == 'https:')
          v = v.replace('http','https');
        a.push(key + '="'+v+'" ');
      }
    }
    a.push('>');
    a.push('<param name="' + (o.oUrl || 'src') +'" value="' + opts.src + '">');
    for (key in opts.params) {
      if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
        continue;
      a.push('<param name="'+ key +'" value="' + opts.params[key] + '">');
    }
    // Alternate HTML
    a.push('<div><p><strong>'+o.title+' Required</strong></p><p>'+o.title+' is required to view this media. <a href="'+o.pluginspage+'">Download Here</a>.</p></div>');
    a.push('</ob'+'ject'+'>');
  }
   else {
          a = ['<embed width="' + opts.width + '" height="' + opts.height + '" style="display:block"'];
          if (opts.src) a.push(' src="' + opts.src + '" ');
          for (key in opts.attrs)
              a.push(key + '="'+opts.attrs[key]+'" ');
          for (key in o.eAttrs || {})
              a.push(key + '="'+o.eAttrs[key]+'" ');
          for (key in opts.params) {
              if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
          continue;
              a.push(key + '="'+opts.params[key]+'" ');
          }
          a.push('></em'+'bed'+'>');
      }
  // convert element to div
  var id = el.id ? (' id="'+el.id+'"') : '';
  var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
  var $div = $('<div' + id + cls + '>');
  $el.after($div).remove();
  if (lameIE || player == 'iframe' || player == 'img')
    $div.append(o);
  else
    $div.html(a.join(''));

  if (opts.caption)
    $('<div>').appendTo($div).html(opts.caption);
  return $div;
}


})(jQuery);

})(jQuery);

!function(e,t){function n(t){var n=y(),o=n.querySelector("h2"),r=n.querySelector("p"),a=n.querySelector("button.cancel"),c=n.querySelector("button.confirm");if(o.innerHTML=w(t.title).split("\n").join("<br>"),r.innerHTML=w(t.text||"").split("\n").join("<br>"),t.text&&S(r),C(n.querySelectorAll(".icon")),t.type){for(var l=!1,s=0;s<d.length;s++)if(t.type===d[s]){l=!0;break}if(!l)return e.console.error("Unknown alert type: "+t.type),!1;var u=n.querySelector(".icon."+t.type);switch(S(u),t.type){case"success":v(u,"animate"),v(u.querySelector(".tip"),"animateSuccessTip"),v(u.querySelector(".long"),"animateSuccessLong");break;case"error":v(u,"animateErrorIcon"),v(u.querySelector(".x-mark"),"animateXMark");break;case"warning":v(u,"pulseWarning"),v(u.querySelector(".body"),"pulseWarningIns"),v(u.querySelector(".dot"),"pulseWarningIns")}}if(t.imageUrl){var f=n.querySelector(".icon.custom");f.style.backgroundImage="url("+t.imageUrl+")",S(f);var m=80,g=80;if(t.imageSize){var p=t.imageSize.split("x")[0],b=t.imageSize.split("x")[1];p&&b?(m=p,g=b,f.css({width:p+"px",height:b+"px"})):e.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+t.imageSize)}f.setAttribute("style",f.getAttribute("style")+"width:"+m+"px; height:"+g+"px")}n.setAttribute("data-has-cancel-button",t.showCancelButton),t.showCancelButton?a.style.display="inline-block":C(a),t.cancelButtonText&&(a.innerHTML=w(t.cancelButtonText)),t.confirmButtonText&&(c.innerHTML=w(t.confirmButtonText)),c.style.backgroundColor=t.confirmButtonColor,i(c,t.confirmButtonColor),n.setAttribute("data-allow-ouside-click",t.allowOutsideClick);var h=t.doneFunction?!0:!1;n.setAttribute("data-has-done-function",h),n.setAttribute("data-timer",t.timer)}function o(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n="#",o,r;for(r=0;3>r;r++)o=parseInt(e.substr(2*r,2),16),o=Math.round(Math.min(Math.max(0,o+o*t),255)).toString(16),n+=("00"+o).substr(o.length);return n}function r(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function a(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null}function i(e,t){var n=a(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"}function c(){var e=y();T(g(),10),S(e),v(e,"showSweetAlert"),b(e,"hideSweetAlert"),A=t.activeElement;var n=e.querySelector("button.confirm");n.focus(),setTimeout(function(){v(e,"visible")},500);var o=e.getAttribute("data-timer");"null"!==o&&setTimeout(function(){l()},o)}function l(){var n=y();E(g(),5),E(n,5),b(n,"showSweetAlert"),v(n,"hideSweetAlert"),b(n,"visible");var o=n.querySelector(".icon.success");b(o,"animate"),b(o.querySelector(".tip"),"animateSuccessTip"),b(o.querySelector(".long"),"animateSuccessLong");var r=n.querySelector(".icon.error");b(r,"animateErrorIcon"),b(r.querySelector(".x-mark"),"animateXMark");var a=n.querySelector(".icon.warning");b(a,"pulseWarning"),b(a.querySelector(".body"),"pulseWarningIns"),b(a.querySelector(".dot"),"pulseWarningIns"),e.onkeydown=M,t.onclick=I,A&&A.focus(),z=void 0}function s(){var e=y();e.style.marginTop=B(y())}var u=".sweet-alert",f=".sweet-overlay",d=["error","warning","info","success"],m={title:"",text:"",type:null,allowOutsideClick:!1,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#AEDEF4",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null},y=function(){return t.querySelector(u)},g=function(){return t.querySelector(f)},p=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},v=function(e,t){p(e,t)||(e.className+=" "+t)},b=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(p(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},w=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},h=function(e){e.style.opacity="",e.style.display="block"},S=function(e){if(e&&!e.length)return h(e);for(var t=0;t<e.length;++t)h(e[t])},x=function(e){e.style.opacity="",e.style.display="none"},C=function(e){if(e&&!e.length)return x(e);for(var t=0;t<e.length;++t)x(e[t])},k=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},B=function(e){e.style.left="-9999px",e.style.display="block";var t=e.clientHeight,n=parseInt(getComputedStyle(e).getPropertyValue("padding"),10);return e.style.left="",e.style.display="none","-"+parseInt(t/2+n)+"px"},T=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)};o()}},E=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"};o()},q=function(n){if(MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var r=t.createEvent("MouseEvents");r.initEvent("click",!1,!1),n.dispatchEvent(r)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},O=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)},A,I,M,z;e.sweetAlertInitialize=function(){var e='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><button class="cancel" tabIndex="2">Cancel</button><button class="confirm" tabIndex="1">OK</button></div>',n=t.createElement("div");n.innerHTML=e,t.body.appendChild(n)},e.sweetAlert=e.swal=function(){function a(e){var t=e.keyCode||e.which;if(-1!==[9,13,32,27].indexOf(t)){for(var n=e.target||e.srcElement,o=-1,r=0;r<S.length;r++)if(n===S[r]){o=r;break}9===t?(n=-1===o?w:o===S.length-1?S[0]:S[o+1],O(e),n.focus(),i(n,f.confirmButtonColor)):(n=13===t||32===t?-1===o?w:void 0:27!==t||h.hidden||"none"===h.style.display?void 0:h,void 0!==n&&q(n,e))}}function u(e){var t=e.target||e.srcElement,n=e.relatedTarget,o=p(d,"visible");if(o){var r=-1;if(null!==n){for(var a=0;a<S.length;a++)if(n===S[a]){r=a;break}-1===r&&t.focus()}else z=t}}if(void 0===arguments[0])return e.console.error("sweetAlert expects at least 1 attribute!"),!1;var f=r({},m);switch(typeof arguments[0]){case"string":f.title=arguments[0],f.text=arguments[1]||"",f.type=arguments[2]||"";break;case"object":if(void 0===arguments[0].title)return e.console.error('Missing "title" argument!'),!1;f.title=arguments[0].title,f.text=arguments[0].text||m.text,f.type=arguments[0].type||m.type,f.allowOutsideClick=arguments[0].allowOutsideClick||m.allowOutsideClick,f.showCancelButton=void 0!==arguments[0].showCancelButton?arguments[0].showCancelButton:m.showCancelButton,f.closeOnConfirm=void 0!==arguments[0].closeOnConfirm?arguments[0].closeOnConfirm:m.closeOnConfirm,f.closeOnCancel=void 0!==arguments[0].closeOnCancel?arguments[0].closeOnCancel:m.closeOnCancel,f.timer=arguments[0].timer||m.timer,f.confirmButtonText=m.showCancelButton?"Confirm":m.confirmButtonText,f.confirmButtonText=arguments[0].confirmButtonText||m.confirmButtonText,f.confirmButtonColor=arguments[0].confirmButtonColor||m.confirmButtonColor,f.cancelButtonText=arguments[0].cancelButtonText||m.cancelButtonText,f.imageUrl=arguments[0].imageUrl||m.imageUrl,f.imageSize=arguments[0].imageSize||m.imageSize,f.doneFunction=arguments[1]||null;break;default:return e.console.error('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}n(f),s(),c();for(var d=y(),g=function(e){var t=e.target||e.srcElement,n="confirm"===t.className,r=p(d,"visible"),a=f.doneFunction&&"true"===d.getAttribute("data-has-done-function");switch(e.type){case"mouseover":n&&(e.target.style.backgroundColor=o(f.confirmButtonColor,-.04));break;case"mouseout":n&&(e.target.style.backgroundColor=f.confirmButtonColor);break;case"mousedown":n&&(e.target.style.backgroundColor=o(f.confirmButtonColor,-.14));break;case"mouseup":n&&(e.target.style.backgroundColor=o(f.confirmButtonColor,-.04));break;case"focus":var i=d.querySelector("button.confirm"),c=d.querySelector("button.cancel");n?c.style.boxShadow="none":i.style.boxShadow="none";break;case"click":if(n&&a&&r)f.doneFunction(!0),f.closeOnConfirm&&l();else if(a&&r){var s=String(f.doneFunction).replace(/\s/g,""),u="function("===s.substring(0,9)&&")"!==s.substring(9,10);u&&f.doneFunction(!1),f.closeOnCancel&&l()}else l()}},v=d.querySelectorAll("button"),b=0;b<v.length;b++)v[b].onclick=g,v[b].onmouseover=g,v[b].onmouseout=g,v[b].onmousedown=g,v[b].onfocus=g;I=t.onclick,t.onclick=function(e){var t=e.target||e.srcElement,n=d===t,o=k(d,e.target),r=p(d,"visible"),a="true"===d.getAttribute("data-allow-ouside-click");!n&&!o&&r&&a&&l()};var w=d.querySelector("button.confirm"),h=d.querySelector("button.cancel"),S=d.querySelectorAll("button:not([type=hidden])");M=e.onkeydown,e.onkeydown=a,w.onblur=u,h.onblur=u,e.onfocus=function(){e.setTimeout(function(){void 0!==z&&(z.focus(),z=void 0)},0)}},e.swal.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");r(m,e)},function(){"complete"===t.readyState||"interactive"===t.readyState&&t.body?sweetAlertInitialize():t.addEventListener?t.addEventListener("DOMContentLoaded",function e(){t.removeEventListener("DOMContentLoaded",arguments.callee,!1),sweetAlertInitialize()},!1):t.attachEvent&&t.attachEvent("onreadystatechange",function(){"complete"===t.readyState&&(t.detachEvent("onreadystatechange",arguments.callee),sweetAlertInitialize())})}()}(window,document);