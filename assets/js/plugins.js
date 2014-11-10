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

/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
(function(t){t.extend(t.fn,{validate:function(e){if(!this.length)return e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var i=t.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(e){function s(){var s;return i.settings.submitHandler?(i.submitButton&&(s=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&s.remove(),!1):!0}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,s()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):s():(i.focusInvalid(),!1)})),i)},valid:function(){if(t(this[0]).is("form"))return this.validate().form();var e=!0,i=t(this[0].form).validate();return this.each(function(){e=e&&i.element(this)}),e},removeAttrs:function(e){var i={},s=this;return t.each(e.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},rules:function(e,i){var s=this[0];if(e){var r=t.data(s.form,"validator").settings,n=r.rules,a=t.validator.staticRules(s);switch(e){case"add":t.extend(a,t.validator.normalizeRule(i)),delete a.messages,n[s.name]=a,i.messages&&(r.messages[s.name]=t.extend(r.messages[s.name],i.messages));break;case"remove":if(!i)return delete n[s.name],a;var u={};return t.each(i.split(/\s/),function(t,e){u[e]=a[e],delete a[e]}),u}}var o=t.validator.normalizeRules(t.extend({},t.validator.classRules(s),t.validator.attributeRules(s),t.validator.dataRules(s),t.validator.staticRules(s)),s);if(o.required){var l=o.required;delete o.required,o=t.extend({required:l},o)}return o}}),t.extend(t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){return!!t.trim(""+t(e).val())},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(s):t(e).addClass(i).removeClass(s)},unhighlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(s):t(e).removeClass(i).addClass(s)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function e(e){var i=t.data(this[0].form,"validator"),s="on"+e.type.replace(/^validate/,"");i.settings[s]&&i.settings[s].call(i,this[0],e)}this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i=this.groups={};t.each(this.settings.groups,function(e,s){"string"==typeof s&&(s=s.split(/\s/)),t.each(s,function(t,s){i[s]=e})});var s=this.settings.rules;t.each(s,function(e,i){s[e]=t.validator.normalizeRule(i)}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),this.currentElements=t(e);var i=this.check(e)!==!1;return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(e){if(e){t.extend(this.errorMap,e),this.errorList=[];for(var i in e)this.errorList.push({message:e[i],element:this.findByName(i)[0]});this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.replace(" ",".");return t(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i=t(e).attr("type"),s=t(e).val();return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof s?s.replace(/\r/g,""):s},check:function(e){e=this.validationTargetFor(this.clean(e));var i,s=t(e).rules(),r=!1,n=this.elementValue(e);for(var a in s){var u={method:a,parameters:s[a]};try{if(i=t.validator.methods[a].call(this,n,e,u.parameters),"dependency-mismatch"===i){r=!0;continue}if(r=!1,"pending"===i)return this.toHide=this.toHide.not(this.errorsFor(e)),void 0;if(!i)return this.formatAndAdd(e,u),!1}catch(o){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+u.method+"' method.",o),o}}return r?void 0:(this.objectLength(s)&&this.successList.push(e),!0)},customDataMessage:function(e,i){return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase())},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;arguments.length>t;t++)if(void 0!==arguments[t])return arguments[t];return void 0},defaultMessage:function(e,i){return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(e,i){var s=this.defaultMessage(e,i.method),r=/\$?\{(\d+)\}/g;"function"==typeof s?s=s.call(this,i.parameters,e):r.test(s)&&(s=t.validator.format(s.replace(r,"{$1}"),i.parameters)),this.errorList.push({message:s,element:e}),this.errorMap[e.name]=s,this.submitted[e.name]=s},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e;for(t=0;this.errorList[t];t++){var i=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var s=this.errorsFor(e);s.length?(s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),s.html(i)):(s=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(s=s.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(s).length||(this.settings.errorPlacement?this.settings.errorPlacement(s,t(e)):s.insertAfter(e))),!i&&this.settings.success&&(s.text(""),"string"==typeof this.settings.success?s.addClass(this.settings.success):this.settings.success(s,e)),this.toShow=this.toShow.add(s)},errorsFor:function(e){var i=this.idOrName(e);return this.errors().filter(function(){return t(this).attr("for")===i})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+e+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0},dependTypes:{"boolean":function(t){return t},string:function(e,i){return!!t(e,i.form).length},"function":function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[e.name],i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e){return t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},s=t(e).attr("class");return s&&t.each(s.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},attributeRules:function(e){var i={},s=t(e),r=s[0].getAttribute("type");for(var n in t.validator.methods){var a;"required"===n?(a=s.get(0).getAttribute(n),""===a&&(a=!0),a=!!a):a=s.attr(n),/min|max/.test(n)&&(null===r||/number|range|text/.test(r))&&(a=Number(a)),a?i[n]=a:r===n&&"range"!==r&&(i[n]=!0)}return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(e){var i,s,r={},n=t(e);for(i in t.validator.methods)s=n.data("rule-"+i.toLowerCase()),void 0!==s&&(r[i]=s);return r},staticRules:function(e){var i={},s=t.data(e.form,"validator");return s.settings.rules&&(i=t.validator.normalizeRule(s.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(s,r){if(r===!1)return delete e[s],void 0;if(r.param||r.depends){var n=!0;switch(typeof r.depends){case"string":n=!!t(r.depends,i.form).length;break;case"function":n=r.depends.call(i,i)}n?e[s]=void 0!==r.param?r.param:!0:delete e[s]}}),t.each(e,function(s,r){e[s]=t.isFunction(r)?r(i):r}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,s){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==s?s:t.validator.messages[e],3>i.length&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,s){if(!this.depend(s,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var r=t(i).val();return r&&r.length>0}return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(""+new Date(t))},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9 \-]+/.test(t))return!1;var i=0,s=0,r=!1;t=t.replace(/\D/g,"");for(var n=t.length-1;n>=0;n--){var a=t.charAt(n);s=parseInt(a,10),r&&(s*=2)>9&&(s-=9),i+=s,r=!r}return 0===i%10},minlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s},maxlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||s>=r},rangelength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s[0]&&s[1]>=r},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||i>=t},range:function(t,e,i){return this.optional(e)||t>=i[0]&&i[1]>=t},equalTo:function(e,i,s){var r=t(s);return this.settings.onfocusout&&r.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){t(i).valid()}),e===r.val()},remote:function(e,i,s){if(this.optional(i))return"dependency-mismatch";var r=this.previousValue(i);if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),r.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=r.message,s="string"==typeof s&&{url:s}||s,r.old===e)return r.valid;r.old=e;var n=this;this.startRequest(i);var a={};return a[i.name]=e,t.ajax(t.extend(!0,{url:s,mode:"abort",port:"validate"+i.name,dataType:"json",data:a,success:function(s){n.settings.messages[i.name].remote=r.originalMessage;var a=s===!0||"true"===s;if(a){var u=n.formSubmitted;n.prepareElement(i),n.formSubmitted=u,n.successList.push(i),delete n.invalid[i.name],n.showErrors()}else{var o={},l=s||n.defaultMessage(i,"remote");o[i.name]=r.message=t.isFunction(l)?l(e):l,n.invalid[i.name]=!0,n.showErrors(o)}r.valid=a,n.stopRequest(i,a)}},s)),"pending"}}}),t.format=t.validator.format})(jQuery),function(t){var e={};if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,s){var r=t.port;"abort"===t.mode&&(e[r]&&e[r].abort(),e[r]=s)});else{var i=t.ajax;t.ajax=function(s){var r=("mode"in s?s:t.ajaxSettings).mode,n=("port"in s?s:t.ajaxSettings).port;return"abort"===r?(e[n]&&e[n].abort(),e[n]=i.apply(this,arguments),e[n]):i.apply(this,arguments)}}}(jQuery),function(t){t.extend(t.fn,{validateDelegate:function(e,i,s){return this.bind(i,function(i){var r=t(i.target);return r.is(e)?s.apply(r,arguments):void 0})}})}(jQuery);

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ES (Spanish; Español)
 */
jQuery.extend(jQuery.validator.messages, {
  required: "Este campo es obligatorio.",
  remote: "Por favor, rellena este campo.",
  email: "Por favor, escribe una dirección de correo válida",
  url: "Por favor, escribe una URL válida.",
  date: "Por favor, escribe una fecha válida.",
  dateISO: "Por favor, escribe una fecha (ISO) válida.",
  number: "Por favor, escribe un número entero válido.",
  digits: "Por favor, escribe sólo dígitos.",
  creditcard: "Por favor, escribe un número de tarjeta válido.",
  equalTo: "Por favor, escribe el mismo valor de nuevo.",
  accept: "Por favor, escribe un valor con una extensión aceptada.",
  maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
  minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
  rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
  range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
  max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
  min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
});