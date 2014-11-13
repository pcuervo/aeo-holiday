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

/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
(function(t){t.extend(t.fn,{validate:function(e){if(!this.length)return e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var i=t.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(e){function s(){var s;return i.settings.submitHandler?(i.submitButton&&(s=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&s.remove(),!1):!0}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,s()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):s():(i.focusInvalid(),!1)})),i)},valid:function(){if(t(this[0]).is("form"))return this.validate().form();var e=!0,i=t(this[0].form).validate();return this.each(function(){e=e&&i.element(this)}),e},removeAttrs:function(e){var i={},s=this;return t.each(e.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},rules:function(e,i){var s=this[0];if(e){var r=t.data(s.form,"validator").settings,n=r.rules,a=t.validator.staticRules(s);switch(e){case"add":t.extend(a,t.validator.normalizeRule(i)),delete a.messages,n[s.name]=a,i.messages&&(r.messages[s.name]=t.extend(r.messages[s.name],i.messages));break;case"remove":if(!i)return delete n[s.name],a;var u={};return t.each(i.split(/\s/),function(t,e){u[e]=a[e],delete a[e]}),u}}var o=t.validator.normalizeRules(t.extend({},t.validator.classRules(s),t.validator.attributeRules(s),t.validator.dataRules(s),t.validator.staticRules(s)),s);if(o.required){var l=o.required;delete o.required,o=t.extend({required:l},o)}return o}}),t.extend(t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){return!!t.trim(""+t(e).val())},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(s):t(e).addClass(i).removeClass(s)},unhighlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(s):t(e).removeClass(i).addClass(s)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function e(e){var i=t.data(this[0].form,"validator"),s="on"+e.type.replace(/^validate/,"");i.settings[s]&&i.settings[s].call(i,this[0],e)}this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i=this.groups={};t.each(this.settings.groups,function(e,s){"string"==typeof s&&(s=s.split(/\s/)),t.each(s,function(t,s){i[s]=e})});var s=this.settings.rules;t.each(s,function(e,i){s[e]=t.validator.normalizeRule(i)}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),this.currentElements=t(e);var i=this.check(e)!==!1;return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(e){if(e){t.extend(this.errorMap,e),this.errorList=[];for(var i in e)this.errorList.push({message:e[i],element:this.findByName(i)[0]});this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.replace(" ",".");return t(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i=t(e).attr("type"),s=t(e).val();return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof s?s.replace(/\r/g,""):s},check:function(e){e=this.validationTargetFor(this.clean(e));var i,s=t(e).rules(),r=!1,n=this.elementValue(e);for(var a in s){var u={method:a,parameters:s[a]};try{if(i=t.validator.methods[a].call(this,n,e,u.parameters),"dependency-mismatch"===i){r=!0;continue}if(r=!1,"pending"===i)return this.toHide=this.toHide.not(this.errorsFor(e)),void 0;if(!i)return this.formatAndAdd(e,u),!1}catch(o){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+u.method+"' method.",o),o}}return r?void 0:(this.objectLength(s)&&this.successList.push(e),!0)},customDataMessage:function(e,i){return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase())},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;arguments.length>t;t++)if(void 0!==arguments[t])return arguments[t];return void 0},defaultMessage:function(e,i){return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(e,i){var s=this.defaultMessage(e,i.method),r=/\$?\{(\d+)\}/g;"function"==typeof s?s=s.call(this,i.parameters,e):r.test(s)&&(s=t.validator.format(s.replace(r,"{$1}"),i.parameters)),this.errorList.push({message:s,element:e}),this.errorMap[e.name]=s,this.submitted[e.name]=s},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e;for(t=0;this.errorList[t];t++){var i=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var s=this.errorsFor(e);s.length?(s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),s.html(i)):(s=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(s=s.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(s).length||(this.settings.errorPlacement?this.settings.errorPlacement(s,t(e)):s.insertAfter(e))),!i&&this.settings.success&&(s.text(""),"string"==typeof this.settings.success?s.addClass(this.settings.success):this.settings.success(s,e)),this.toShow=this.toShow.add(s)},errorsFor:function(e){var i=this.idOrName(e);return this.errors().filter(function(){return t(this).attr("for")===i})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+e+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0},dependTypes:{"boolean":function(t){return t},string:function(e,i){return!!t(e,i.form).length},"function":function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[e.name],i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e){return t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},s=t(e).attr("class");return s&&t.each(s.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},attributeRules:function(e){var i={},s=t(e),r=s[0].getAttribute("type");for(var n in t.validator.methods){var a;"required"===n?(a=s.get(0).getAttribute(n),""===a&&(a=!0),a=!!a):a=s.attr(n),/min|max/.test(n)&&(null===r||/number|range|text/.test(r))&&(a=Number(a)),a?i[n]=a:r===n&&"range"!==r&&(i[n]=!0)}return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(e){var i,s,r={},n=t(e);for(i in t.validator.methods)s=n.data("rule-"+i.toLowerCase()),void 0!==s&&(r[i]=s);return r},staticRules:function(e){var i={},s=t.data(e.form,"validator");return s.settings.rules&&(i=t.validator.normalizeRule(s.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(s,r){if(r===!1)return delete e[s],void 0;if(r.param||r.depends){var n=!0;switch(typeof r.depends){case"string":n=!!t(r.depends,i.form).length;break;case"function":n=r.depends.call(i,i)}n?e[s]=void 0!==r.param?r.param:!0:delete e[s]}}),t.each(e,function(s,r){e[s]=t.isFunction(r)?r(i):r}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,s){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==s?s:t.validator.messages[e],3>i.length&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,s){if(!this.depend(s,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var r=t(i).val();return r&&r.length>0}return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(""+new Date(t))},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9 \-]+/.test(t))return!1;var i=0,s=0,r=!1;t=t.replace(/\D/g,"");for(var n=t.length-1;n>=0;n--){var a=t.charAt(n);s=parseInt(a,10),r&&(s*=2)>9&&(s-=9),i+=s,r=!r}return 0===i%10},minlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s},maxlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||s>=r},rangelength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s[0]&&s[1]>=r},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||i>=t},range:function(t,e,i){return this.optional(e)||t>=i[0]&&i[1]>=t},equalTo:function(e,i,s){var r=t(s);return this.settings.onfocusout&&r.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){t(i).valid()}),e===r.val()},remote:function(e,i,s){if(this.optional(i))return"dependency-mismatch";var r=this.previousValue(i);if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),r.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=r.message,s="string"==typeof s&&{url:s}||s,r.old===e)return r.valid;r.old=e;var n=this;this.startRequest(i);var a={};return a[i.name]=e,t.ajax(t.extend(!0,{url:s,mode:"abort",port:"validate"+i.name,dataType:"json",data:a,success:function(s){n.settings.messages[i.name].remote=r.originalMessage;var a=s===!0||"true"===s;if(a){var u=n.formSubmitted;n.prepareElement(i),n.formSubmitted=u,n.successList.push(i),delete n.invalid[i.name],n.showErrors()}else{var o={},l=s||n.defaultMessage(i,"remote");o[i.name]=r.message=t.isFunction(l)?l(e):l,n.invalid[i.name]=!0,n.showErrors(o)}r.valid=a,n.stopRequest(i,a)}},s)),"pending"}}}),t.format=t.validator.format})(jQuery),function(t){var e={};if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,s){var r=t.port;"abort"===t.mode&&(e[r]&&e[r].abort(),e[r]=s)});else{var i=t.ajax;t.ajax=function(s){var r=("mode"in s?s:t.ajaxSettings).mode,n=("port"in s?s:t.ajaxSettings).port;return"abort"===r?(e[n]&&e[n].abort(),e[n]=i.apply(this,arguments),e[n]):i.apply(this,arguments)}}}(jQuery),function(t){t.extend(t.fn,{validateDelegate:function(e,i,s){return this.bind(i,function(i){var r=t(i.target);return r.is(e)?s.apply(r,arguments):void 0})}})}(jQuery);

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ES (Spanish; Español)
 */
jQuery.extend(jQuery.validator.messages, {
  required: "<span class='glyphicon glyphicon-remove-circle'></span> Este campo es obligatorio.",
  remote: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, rellena este campo.",
  email: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe una dirección de correo válida",
  url: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe una URL válida.",
  date: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe una fecha válida.",
  dateISO: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe una fecha (ISO) válida.",
  number: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe un número entero válido.",
  digits: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe sólo dígitos.",
  creditcard: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe un número de tarjeta válido.",
  equalTo: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe el mismo valor de nuevo.",
  accept: "<span class='glyphicon glyphicon-remove-circle'></span> Por favor, escribe un valor con una extensión aceptada.",
  maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
  minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
  rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
  range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
  max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
  min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
});

/*!
 * Isotope PACKAGED v2.0.1
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function n(e,i){t.fn[e]=function(n){if("string"==typeof n){for(var s=o.call(arguments,1),a=0,u=this.length;u>a;a++){var p=this[a],h=t.data(p,e);if(h)if(t.isFunction(h[n])&&"_"!==n.charAt(0)){var f=h[n].apply(h,s);if(void 0!==f)return f}else r("no such method '"+n+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+n+"'")}return this}return this.each(function(){var o=t.data(this,e);o?(o.option(n),o._init()):(o=new i(this,n),t.data(this,e,o))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),n(t,e)},t.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)})(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==n.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var o=0,s=r.length;s>o;o++){var a=r[o];a()}}}function o(o){return o.bind(n,"DOMContentLoaded",i),o.bind(n,"readystatechange",i),o.bind(t,"load",i),e}var n=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],o)):t.docReady=o(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},o.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},o.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},o.addListener=function(t,i){var o,n=this.getListenersAsObject(t),r="object"==typeof i;for(o in n)n.hasOwnProperty(o)&&-1===e(n[o],i)&&n[o].push(r?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,i){var o,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(o=e(r[n],i),-1!==o&&r[n].splice(o,1));return this},o.off=i("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(t,e){var i,o,n,r,s=this.getListenersAsObject(t);for(n in s)if(s.hasOwnProperty(n))for(o=s[n].length;o--;)i=s[n][o],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},o.trigger=i("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var o=s[e];t[o]=0}return t}function o(t){function o(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var o=r(t);if("none"===o.display)return i();var n={};n.width=t.offsetWidth,n.height=t.offsetHeight;for(var h=n.isBorderBox=!(!p||!o[p]||"border-box"!==o[p]),f=0,d=s.length;d>f;f++){var l=s[f],c=o[l];c=a(t,c);var y=parseFloat(c);n[l]=isNaN(y)?0:y}var m=n.paddingLeft+n.paddingRight,g=n.paddingTop+n.paddingBottom,v=n.marginLeft+n.marginRight,_=n.marginTop+n.marginBottom,I=n.borderLeftWidth+n.borderRightWidth,L=n.borderTopWidth+n.borderBottomWidth,z=h&&u,S=e(o.width);S!==!1&&(n.width=S+(z?0:m+I));var b=e(o.height);return b!==!1&&(n.height=b+(z?0:g+L)),n.innerWidth=n.width-(m+I),n.innerHeight=n.height-(g+L),n.outerWidth=n.width+v,n.outerHeight=n.height+_,n}}function a(t,e){if(n||-1===e.indexOf("%"))return e;var i=t.style,o=i.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=o,s&&(r.left=s),e}var u,p=t("boxSizing");return function(){if(p){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var o=r(t);u=200===e(o.width),i.removeChild(t)}}(),o}var n=t.getComputedStyle,r=n?function(t){return n(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function o(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){o(t);for(var i=t.parentNode.querySelectorAll(e),n=0,r=i.length;r>n;n++)if(i[n]===t)return!0;return!1}function r(t,e){return o(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,o=t.length;o>i;i++){var n=t[i],r=n+"MatchesSelector";if(e[r])return r}}();if(a){var u=document.createElement("div"),p=i(u,"div");s=p?i:r}else s=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function n(t,n,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var u=r("transition"),p=r("transform"),h=u&&p,f=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[u],l=["transform","transition","transitionDuration","transitionProperty"],c=function(){for(var t={},e=0,i=l.length;i>e;e++){var o=l[e],n=r(o);n&&n!==o&&(t[o]=n)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=c[i]||i;e[o]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=parseInt(t[i?"left":"right"],10),r=parseInt(t[o?"top":"bottom"],10);n=isNaN(n)?0:n,r=isNaN(r)?0:r;var a=this.layout.size;n-=i?a.paddingLeft:a.paddingRight,r-=o?a.paddingTop:a.paddingBottom,this.position.x=n,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var y=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-o,p={},h=this.layout.options;a=h.isOriginLeft?a:-a,u=h.isOriginTop?u:-u,p.transform=y(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=h?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var m=p&&o(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:m,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},a.prototype.transition=a.prototype[u?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],n):(t.Outlayer={},t.Outlayer.Item=n(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===f.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=l(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,f,l,c,y){function m(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!d(t))return u&&u.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var o=++g;this.element.outlayerGUID=o,v[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return m.namespace="outlayer",m.Item=y,m.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(m.prototype,f.prototype),m.prototype.option=function(t){e(this.options,t)},m.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},m.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},m.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},m.prototype._filterFindItemElements=function(t){t=o(t);for(var e=this.options.itemSelector,i=[],n=0,r=t.length;r>n;n++){var s=t[n];if(d(s))if(e){c(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),u=0,p=a.length;p>u;u++)i.push(a[u])}else i.push(s)}return i},m.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},m.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},m.prototype._init=m.prototype.layout,m.prototype._resetLayout=function(){this.getSize()},m.prototype.getSize=function(){this.size=l(this.element)},m.prototype._getMeasurement=function(t,e){var i,o=this.options[t];o?("string"==typeof o?i=this.element.querySelector(o):d(o)&&(i=o),this[t]=i?l(i)[e]:o):this[t]=0},m.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},m.prototype._layoutItems=function(t,e){function i(){o.emitEvent("layoutComplete",[o,t])}var o=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r],u=this._getItemLayoutPosition(a);u.item=a,u.isInstant=e||a.isLayoutInstant,n.push(u)}this._processLayoutQueue(n)},m.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},m.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},m.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},m.prototype._postLayout=function(){this.resizeContainer()},m.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},m.prototype._getContainerSize=h,m.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m.prototype._itemsOn=function(t,e,i){function o(){return n++,n===r&&i.call(s),!0}for(var n=0,r=t.length,s=this,a=0,u=t.length;u>a;a++){var p=t[a];p.on(e,o)}},m.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},m.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n(o,this.stamps),this.unignore(o)}},m.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o(t)):void 0},m.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},m.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m.prototype._manageStamp=h,m.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=l(t),n={left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom};return n},m.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},m.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},m.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},m.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},m.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.prototype.needsResizeLayout=function(){var t=l(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.reveal()}},m.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.hide()}},m.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},m.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i],r=this.getItem(n);r&&e.push(r)}return e}},m.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),n(s,this.items)}}},m.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},m.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},m.create=function(t,i){function o(){m.apply(this,arguments)}return Object.create?o.prototype=Object.create(m.prototype):e(o.prototype,m.prototype),o.prototype.constructor=o,o.defaults=e({},m.defaults),e(o.defaults,i),o.prototype.settings={},o.namespace=t,o.data=m.data,o.Item=function(){y.apply(this,arguments)},o.Item.prototype=new y,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),n="data-"+e+"-options",s=0,h=i.length;h>s;s++){var f,d=i[s],l=d.getAttribute(n);try{f=l&&JSON.parse(l)}catch(c){u&&u.error("Error parsing "+n+" on "+d.nodeName.toLowerCase()+(d.id?"#"+d.id:"")+": "+c);continue}var y=new o(d,f);p&&p.data(d,t,y)}}),p&&p.bridget&&p.bridget(t,o),o},m.Item=y,m}var a=t.document,u=t.console,p=t.jQuery,h=function(){},f=Object.prototype.toString,d="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},l=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t){function e(){t.Item.apply(this,arguments)}e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var i=e.prototype.destroy;return e.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},e}"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window),function(t){function e(t,e){function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!==this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window),function(t){function e(t,e){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++){var n=t[i];if(n===e)return i}return-1};"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,i){var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;e(o.prototype,i.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},o}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],i):i(t.Isotope.LayoutMode,t.Masonry)}(window),function(t){function e(t){var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0},e.prototype._getItemLayoutPosition=function(t){t.getSize(),0!==this.x&&t.size.outerWidth+this.x>this.isotope.size.innerWidth&&(this.x=0,this.y=this.maxY);var e={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=t.size.outerWidth,e},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t){var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===h.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=f(e,t);-1!==i&&e.splice(i,1)}function r(t,i,r,u,h){function f(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],u=o.sortData[s];if(a>u||u>a){var p=void 0!==e[s]?e[s]:e,h=p?1:-1;return(a>u?1:-1)*h}}return 0}}var d=t.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=u,d.LayoutMode=h,d.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),t.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var e in h.modes)this._initLayoutMode(e)},d.prototype.reloadItems=function(){this.itemGUID=0,t.prototype.reloadItems.call(this)},d.prototype._itemize=function(){for(var e=t.prototype._itemize.apply(this,arguments),i=0,o=e.length;o>i;i++){var n=e[i];n.id=this.itemGUID++}return this._updateItemsSortData(e),e},d.prototype._initLayoutMode=function(t){var i=h.modes[t],o=this.options[t]||{};this.options[t]=i.options?e(i.options,o):o,this.modes[t]=new i(this)},d.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?(this.arrange(),void 0):(this._layout(),void 0)},d.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},d.prototype.arrange=function(t){this.option(t),this._getIsInstant(),this.filteredItems=this._filter(this.items),this._sort(),this._layout()},d.prototype._init=d.prototype.arrange,d.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},d.prototype._filter=function(t){function e(){f.reveal(n),f.hide(r)}var i=this.options.filter;i=i||"*";for(var o=[],n=[],r=[],s=this._getFilterTest(i),a=0,u=t.length;u>a;a++){var p=t[a];if(!p.isIgnored){var h=s(p);h&&o.push(p),h&&p.isHidden?n.push(p):h||p.isHidden||r.push(p)}}var f=this;return this._isInstant?this._noTransition(e):e(),o},d.prototype._getFilterTest=function(t){return s&&this.options.isJQueryFiltering?function(e){return s(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return r(e.element,t)}},d.prototype.updateSortData=function(t){this._getSorters(),t=o(t);
var e=this.getItems(t);e=e.length?e:this.items,this._updateItemsSortData(e)},d.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=l(i)}},d.prototype._updateItemsSortData=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];o.updateSortData()}};var l=function(){function t(t){if("string"!=typeof t)return t;var i=a(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),u=d.sortDataParsers[i[1]];return t=u?function(t){return t&&u(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&p(i)}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},d.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=f(e,this.options.sortAscending);this.filteredItems.sort(i),t!==this.sortHistory[0]&&this.sortHistory.unshift(t)}},d.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw Error("No layout mode: "+t);return e.options=this.options[t],e},d.prototype._resetLayout=function(){t.prototype._resetLayout.call(this),this._mode()._resetLayout()},d.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},d.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},d.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},d.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},d.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},d.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps();var o=this._filterRevealAdded(e);this.layoutItems(i),this.filteredItems=o.concat(this.filteredItems)}},d.prototype._filterRevealAdded=function(t){var e=this._noTransition(function(){return this._filter(t)});return this.layoutItems(e,!0),this.reveal(e),t},d.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e);for(this._noTransition(function(){this.hide(r)}),i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var c=d.prototype.remove;return d.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(c.call(this,t),e&&e.length)for(var i=0,r=e.length;r>i;i++){var s=e[i];n(s,this.filteredItems)}},d.prototype.shuffle=function(){for(var t=0,e=this.items.length;e>t;t++){var i=this.items[t];i.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},d.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},d.prototype.getFilteredItemElements=function(){for(var t=[],e=0,i=this.filteredItems.length;i>e;e++)t.push(this.filteredItems[e].element);return t},d}var s=t.jQuery,a=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},u=document.documentElement,p=u.textContent?function(t){return t.textContent}:function(t){return t.innerText},h=Object.prototype.toString,f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],r):t.Isotope=r(t.Outlayer,t.getSize,t.matchesSelector,t.Isotope.Item,t.Isotope.LayoutMode)}(window);

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/*!
 * cellsByRows layout mode for Isotope
 * http://isotope.metafizzy.co
 */

( function( window ) {

'use strict';

function cellsByRowDefinition( LayoutMode ) {

  var CellsByRow = LayoutMode.create( 'cellsByRow' );

  CellsByRow.prototype._resetLayout = function() {
    // reset properties
    this.itemIndex = 0;
    // measurements
    this.getColumnWidth();
    this.getRowHeight();
    // set cols
    this.cols = Math.floor( this.isotope.size.innerWidth / this.columnWidth );
    this.cols = Math.max( this.cols, 1 );
  };

  CellsByRow.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    var col = this.itemIndex % this.cols;
    var row = Math.floor( this.itemIndex / this.cols );
    // center item within cell
    var x = ( col + 0.5 ) * this.columnWidth - item.size.outerWidth / 2;
    var y = ( row + 0.5 ) * this.rowHeight - item.size.outerHeight / 2;
    this.itemIndex++;
    return { x: x, y: y };
  };

  CellsByRow.prototype._getContainerSize = function() {
    return {
      height: Math.ceil( this.itemIndex / this.cols ) * this.rowHeight
    };
  };

  return CellsByRow;

}

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'isotope/js/layout-mode'
    ],
    cellsByRowDefinition );
} else {
  // browser global
  cellsByRowDefinition(
    window.Isotope.LayoutMode
  );
}

})( window );

//Nice file input
!function(a){a.fn.nicefileinput=function(b){var c={label:"Browse...",fullPath:!1};return b&&a.extend(c,b),this.each(function(){var b=this;if(void 0===a(b).attr("data-styled")){var d=Math.round(1e4*Math.random()),e=new Date,f=e.getTime()+d.toString(),g=a('<input type="text" readonly="readonly">').css({display:"block","float":"left",margin:0,padding:"0 5px"}).addClass("NFI-filename NFI"+f),h=a("<div>").css({overflow:"hidden",position:"relative",display:"block","float":"left","white-space":"nowrap","text-align":"center"}).addClass("NFI-button NFI"+f).html(c.label);a(b).after(g),a(b).wrap(h),a(".NFI"+f).wrapAll('<div class="NFI-wrapper" id="NFI-wrapper-'+f+'" />'),a(".NFI-wrapper").css({overflow:"auto",display:"inline-block"}),a("#NFI-wrapper-"+f).addClass(a(b).attr("class")),a(b).css({opacity:0,position:"absolute",border:"none",margin:0,padding:0,top:0,right:0,cursor:"pointer",height:"60px"}).addClass("NFI-current"),a(b).on("change",function(){var d=a(b).val();if(c.fullPath)g.val(d);else{var e=d.split(/[/\\]/);g.val(e[e.length-1])}}),a(b).attr("data-styled",!0)}})}}(jQuery);


function SC_onError(e,t){$.scriptcam.SC_onError(e,t)}function SC_fileReady(e){$.scriptcam.SC_fileReady(e)}function SC_fileConversionStarted(e){$.scriptcam.SC_fileConversionStarted(e)}function SC_onMotion(e){$.scriptcam.SC_onMotion(e)}function SC_promptWillShow(){$.scriptcam.SC_promptWillShow()}function SC_onHandLeft(){$.scriptcam.SC_onHandLeft()}function SC_onHandRight(){$.scriptcam.SC_onHandRight()}function SC_onWebcamReady(e,t,n,r){$.scriptcam.SC_onWebcamReady(e,t,n,r)}function SC_onPictureAsBase64(e){$.scriptcam.SC_onPictureAsBase64(e)}function SC_connected(){$.scriptcam.SC_connected()}function SC_disconnected(){$.scriptcam.SC_disconnected()}function SC_setVolume(e){$.scriptcam.SC_setVolume(e)}function SC_onMotion(e,t,n,r,i){$.scriptcam.SC_onMotion(e,t,n,r,i)}function SC_timeLeft(e){$.scriptcam.SC_timeLeft(e)}function SC_addChatText(e){$.scriptcam.SC_addChatText(e)}function SC_userJoined(e){$.scriptcam.SC_userJoined(e)}function SC_userLeft(e){$.scriptcam.SC_userLeft(e)}(function(e){e.fn.scriptcam=function(t){var n=e.extend({},e.fn.scriptcam.defaults,t);return this.each(function(){n.id=this.id;data=n;data.path=decodeURIComponent(data.path);e("#"+n.id).html(n.noFlashFound);e.scriptcam.SC_promptWillShow=data.promptWillShow;e.scriptcam.SC_fileReady=data.fileReady;e.scriptcam.SC_fileConversionStarted=data.fileConversionStarted;e.scriptcam.SC_onMotion=data.onMotion;e.scriptcam.SC_onError=data.onError;e.scriptcam.SC_onHandLeft=data.onHandLeft;e.scriptcam.SC_onHandRight=data.onHandRight;e.scriptcam.SC_onWebcamReady=data.onWebcamReady;e.scriptcam.SC_connected=data.connected;e.scriptcam.SC_onPictureAsBase64=data.onPictureAsBase64;e.scriptcam.SC_disconnected=data.disconnected;e.scriptcam.SC_setVolume=data.setVolume;e.scriptcam.SC_timeLeft=data.timeLeft;e.scriptcam.SC_userLeft=data.userLeft;e.scriptcam.SC_userJoined=data.userJoined;e.scriptcam.SC_addChatText=function(t){t=t.replace(":{",'<img src="'+data.path+'angry.gif" width="16" height="16" class="smiley"/>');t=t.replace(":-{",'<img src="'+data.path+'angry.gif" width="16" height="16" class="smiley"/>');t=t.replace(":)",'<img src="'+data.path+'smile.gif" width="16" height="16" class="smiley"/>');t=t.replace(":-)",'<img src="'+data.path+'smile.gif" width="16" height="16" class="smiley"/>');t=t.replace(":D",'<img src="'+data.path+'biggrin.gif" width="16" height="16" class="smiley"/>');t=t.replace(":-D",'<img src="'+data.path+'biggrin.gif" width="16" height="16" class="smiley"/>');t=t.replace(":O",'<img src="'+data.path+'ohmy.gif" width="16" height="16" class="smiley"/>');t=t.replace(":-O",'<img src="'+data.path+'ohmy.gif" width="16" height="16" class="smiley"/>');t=t.replace(":(",'<img src="'+data.path+'sad.gif" width="16" height="16" class="smiley"/>');t=t.replace(":-(",'<img src="'+data.path+'sad.gif" width="16" height="16" class="smiley"/>');t=t.replace(":p",'<img src="'+data.path+'tongue.gif" width="16" height="16" class="smiley"/>');t=t.replace(":-p",'<img src="'+data.path+'tongue.gif" width="16" height="16" class="smiley"/>');t=t.replace(";)",'<img src="'+data.path+'wink.gif" width="16" height="16" class="smiley"/>');t=t.replace(";-)",'<img src="'+data.path+'wink.gif" width="16" height="16" class="smiley"/>');e("#"+data.chatWindow).append(t+"<br/>");e("#"+data.chatWindow).animate({scrollTop:e("#"+data.chatWindow).prop("scrollHeight")-e("#"+data.chatWindow).height()},100)};if(n.canvasHeight&&n.canvasHeight){var t=n.canvasWidth;var r=n.canvasHeight}else{var t=n.width*n.zoom;var r=n.height*n.zoom;if(n.chatRoom){t=n.width*n.zoom+n.width*n.zoomChat+5;n.posX=n.width*n.zoom+5;r=n.height*Math.max(n.zoom,n.zoomChat)}}if(t<215){t=215}if(r<138){r=138}if(n.rotate!=0||n.skewX!=0||n.skewY!=0||n.flip!=0||n.zoom!=1||n.zoomChat!=1){var i={menu:"false",wmode:"window",allowScriptAccess:"always",allowFullScreen:"true"}}else{var i={menu:"false",wmode:"direct",allowScriptAccess:"always",allowFullScreen:"true"}}for(var s in n){n[s]=encodeURIComponent(n[s])}swfobject.embedSWF(decodeURIComponent(data.path)+"scriptcam.swf",n.id,t,r,"11.6",false,n,i)})};e.scriptcam={};e.scriptcam.getFrameAsBase64=function(){return e("#"+data.id).get(0).SC_getFrameAsBase64()};e.scriptcam.version=function(){return e("#"+data.id).get(0).SC_version()};e.scriptcam.hardwareacceleration=function(){return e("#"+data.id).get(0).SC_hardwareacceleration()};e.scriptcam.getMotionParameters=function(){e("#"+data.id).get(0).SC_getMotionParameters()};e.scriptcam.getBarCode=function(){return e("#"+data.id).get(0).SC_getBarCode()};e.scriptcam.startRecording=function(){e("#"+data.id).get(0).SC_startRecording()};e.scriptcam.pauseRecording=function(){e("#"+data.id).get(0).SC_pauseRecording()};e.scriptcam.resumeRecording=function(){e("#"+data.id).get(0).SC_resumeRecording()};e.scriptcam.closeCamera=function(){e("#"+data.id).get(0).SC_closeCamera()};e.scriptcam.changeVolume=function(t){e("#"+data.id).get(0).SC_changeVolume(t)};e.scriptcam.sendMessage=function(t){e("#"+data.id).get(0).SC_sendMessage(t)};e.scriptcam.playMP3=function(t){e("#"+data.id).get(0).SC_playMP3(t)};e.scriptcam.changeCamera=function(t){e("#"+data.id).get(0).SC_changeCamera(t)};e.scriptcam.changeMicrophone=function(t){e("#"+data.id).get(0).SC_changeMicrophone(t)};e.fn.scriptcam.defaults={width:320,height:240,chatWindow:"chatWindow",path:"",zoom:1,zoomChat:1,rotate:0,skewX:0,skewY:0,flip:0,noFlashFound:'<p>You need <a href="http://www.adobe.com/go/getflashplayer">Adobe Flash Player 11.7</a> to use this software.<br/>Please click on the link to download the installer.</p>'}})(jQuery);

/*!
 * Lightbox for Bootstrap 3 by @ashleydw
 * https://github.com/ashleydw/lightbox
 *
 * License: https://github.com/ashleydw/lightbox/blob/master/LICENSE
 */
(function(){"use strict";var a,b;a=jQuery,b=function(b,c){var d,e,f,g=this;return this.options=a.extend({title:null,footer:null,remote:null},a.fn.ekkoLightbox.defaults,c||{}),this.$element=a(b),d="",this.modal_id=this.options.modal_id?this.options.modal_id:"ekkoLightbox-"+Math.floor(1e3*Math.random()+1),f='<div class="modal-header"'+(this.options.title||this.options.always_show_close?"":' style="display:none"')+'><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">'+(this.options.title||"&nbsp;")+"</h4></div>",e='<div class="modal-footer"'+(this.options.footer?"":' style="display:none"')+">"+this.options.footer+"</div>",a(document.body).append('<div id="'+this.modal_id+'" class="ekko-lightbox modal fade" tabindex="-1"><div class="modal-dialog"><div class="modal-content">'+f+'<div class="modal-body"><div class="ekko-lightbox-container"><div></div></div></div>'+e+"</div></div></div>"),this.modal=a("#"+this.modal_id),this.modal_dialog=this.modal.find(".modal-dialog").first(),this.modal_content=this.modal.find(".modal-content").first(),this.modal_body=this.modal.find(".modal-body").first(),this.lightbox_container=this.modal_body.find(".ekko-lightbox-container").first(),this.lightbox_body=this.lightbox_container.find("> div:first-child").first(),this.showLoading(),this.modal_arrows=null,this.border={top:parseFloat(this.modal_dialog.css("border-top-width"))+parseFloat(this.modal_content.css("border-top-width"))+parseFloat(this.modal_body.css("border-top-width")),right:parseFloat(this.modal_dialog.css("border-right-width"))+parseFloat(this.modal_content.css("border-right-width"))+parseFloat(this.modal_body.css("border-right-width")),bottom:parseFloat(this.modal_dialog.css("border-bottom-width"))+parseFloat(this.modal_content.css("border-bottom-width"))+parseFloat(this.modal_body.css("border-bottom-width")),left:parseFloat(this.modal_dialog.css("border-left-width"))+parseFloat(this.modal_content.css("border-left-width"))+parseFloat(this.modal_body.css("border-left-width"))},this.padding={top:parseFloat(this.modal_dialog.css("padding-top"))+parseFloat(this.modal_content.css("padding-top"))+parseFloat(this.modal_body.css("padding-top")),right:parseFloat(this.modal_dialog.css("padding-right"))+parseFloat(this.modal_content.css("padding-right"))+parseFloat(this.modal_body.css("padding-right")),bottom:parseFloat(this.modal_dialog.css("padding-bottom"))+parseFloat(this.modal_content.css("padding-bottom"))+parseFloat(this.modal_body.css("padding-bottom")),left:parseFloat(this.modal_dialog.css("padding-left"))+parseFloat(this.modal_content.css("padding-left"))+parseFloat(this.modal_body.css("padding-left"))},this.modal.on("show.bs.modal",this.options.onShow.bind(this)).on("shown.bs.modal",function(){return g.modal_shown(),g.options.onShown.call(g)}).on("hide.bs.modal",this.options.onHide.bind(this)).on("hidden.bs.modal",function(){return g.gallery&&a(document).off("keydown.ekkoLightbox"),g.modal.remove(),g.options.onHidden.call(g)}).modal("show",c),this.modal},b.prototype={modal_shown:function(){var b,c=this;return this.options.remote?(this.gallery=this.$element.data("gallery"),this.gallery&&(this.gallery_items="document.body"===this.options.gallery_parent_selector||""===this.options.gallery_parent_selector?a(document.body).find('*[data-toggle="lightbox"][data-gallery="'+this.gallery+'"]'):this.$element.parents(this.options.gallery_parent_selector).first().find('*[data-toggle="lightbox"][data-gallery="'+this.gallery+'"]'),this.gallery_index=this.gallery_items.index(this.$element),a(document).on("keydown.ekkoLightbox",this.navigate.bind(this)),this.options.directional_arrows&&this.gallery_items.length>1&&(this.lightbox_container.prepend('<div class="ekko-lightbox-nav-overlay"><a href="#" class="'+this.strip_stops(this.options.left_arrow_class)+'"></a><a href="#" class="'+this.strip_stops(this.options.right_arrow_class)+'"></a></div>'),this.modal_arrows=this.lightbox_container.find("div.ekko-lightbox-nav-overlay").first(),this.lightbox_container.find("a"+this.strip_spaces(this.options.left_arrow_class)).on("click",function(a){return a.preventDefault(),c.navigate_left()}),this.lightbox_container.find("a"+this.strip_spaces(this.options.right_arrow_class)).on("click",function(a){return a.preventDefault(),c.navigate_right()}))),this.options.type?"image"===this.options.type?this.preloadImage(this.options.remote,!0):"youtube"===this.options.type&&(b=this.getYoutubeId(this.options.remote))?this.showYoutubeVideo(b):"vimeo"===this.options.type?this.showVimeoVideo(this.options.remote):"instagram"===this.options.type?this.showInstagramVideo(this.options.remote):"url"===this.options.type?this.showInstagramVideo(this.options.remote):this.error('Could not detect remote target type. Force the type using data-type="image|youtube|vimeo|url"'):this.detectRemoteType(this.options.remote)):this.error("No remote target given")},strip_stops:function(a){return a.replace(/\./g,"")},strip_spaces:function(a){return a.replace(/\s/g,"")},isImage:function(a){return a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSwf:function(a){return a.match(/\.(swf)((\?|#).*)?$/i)},getYoutubeId:function(a){var b;return b=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/),b&&11===b[2].length?b[2]:!1},getVimeoId:function(a){return a.indexOf("vimeo")>0?a:!1},getInstagramId:function(a){return a.indexOf("instagram")>0?a:!1},navigate:function(a){if(a=a||window.event,39===a.keyCode||37===a.keyCode){if(39===a.keyCode)return this.navigate_right();if(37===a.keyCode)return this.navigate_left()}},navigate_left:function(){var b;if(1!==this.gallery_items.length)return this.showLoading(),0===this.gallery_index?this.gallery_index=this.gallery_items.length-1:this.gallery_index--,this.options.onNavigate("left",this.gallery_index),this.$element=a(this.gallery_items.get(this.gallery_index)),this.updateTitleAndFooter(),b=this.$element.attr("data-remote")||this.$element.attr("href"),this.detectRemoteType(b,this.$element.attr("data-type"))},navigate_right:function(){var b,c;if(1!==this.gallery_items.length)return this.showLoading(),this.gallery_index===this.gallery_items.length-1?this.gallery_index=0:this.gallery_index++,this.options.onNavigate("right",this.gallery_index),this.$element=a(this.gallery_items.get(this.gallery_index)),c=this.$element.attr("data-remote")||this.$element.attr("href"),this.updateTitleAndFooter(),this.detectRemoteType(c,this.$element.attr("data-type")),this.gallery_index+1<this.gallery_items.length&&(b=a(this.gallery_items.get(this.gallery_index+1),!1),c=b.attr("data-remote")||b.attr("href"),"image"===b.attr("data-type")||this.isImage(c))?this.preloadImage(c,!1):void 0},detectRemoteType:function(a,b){var c;return"image"===b||this.isImage(a)?(this.options.type="image",this.preloadImage(a,!0)):"youtube"===b||(c=this.getYoutubeId(a))?(this.options.type="youtube",this.showYoutubeVideo(c)):"vimeo"===b||(c=this.getVimeoId(a))?(this.options.type="vimeo",this.showVimeoVideo(c)):"instagram"===b||(c=this.getInstagramId(a))?(this.options.type="instagram",this.showInstagramVideo(c)):"url"===b||(c=this.getInstagramId(a))?(this.options.type="instagram",this.showInstagramVideo(c)):(this.options.type="url",this.loadRemoteContent(a))},updateTitleAndFooter:function(){var a,b,c,d;return c=this.modal_content.find(".modal-header"),b=this.modal_content.find(".modal-footer"),d=this.$element.data("title")||"",a=this.$element.data("footer")||"",d||this.options.always_show_close?c.css("display","").find(".modal-title").html(d||"&nbsp;"):c.css("display","none"),a?b.css("display","").html(a):b.css("display","none"),this},showLoading:function(){return this.lightbox_body.html('<div class="modal-loading">Loading..</div>'),this},showYoutubeVideo:function(a){var b,c,d;return b=560/315,d=this.$element.data("width")||560,d=this.checkDimensions(d),c=d/b,this.resize(d),this.lightbox_body.html('<iframe width="'+d+'" height="'+c+'" src="//www.youtube.com/embed/'+a+'?badge=0&autoplay=1&html5=1" frameborder="0" allowfullscreen></iframe>'),this.modal_arrows?this.modal_arrows.css("display","none"):void 0},showVimeoVideo:function(a){var b,c,d;return b=500/281,d=this.$element.data("width")||560,d=this.checkDimensions(d),c=d/b,this.resize(d),this.lightbox_body.html('<iframe width="'+d+'" height="'+c+'" src="'+a+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'),this.modal_arrows?this.modal_arrows.css("display","none"):void 0},showInstagramVideo:function(a){var b;return b=this.$element.data("width")||612,b=this.checkDimensions(b),this.resize(b),this.lightbox_body.html('<iframe width="'+b+'" height="'+b+'" src="'+this.addTrailingSlash(a)+'embed/" frameborder="0" allowfullscreen></iframe>'),this.modal_arrows?this.modal_arrows.css("display","none"):void 0},loadRemoteContent:function(b){var c,d,e=this;return d=this.$element.data("width")||560,this.resize(d),c=this.$element.data("disableExternalCheck")||!1,console.log(c,this.isExternal(b)),c||this.isExternal(b)?this.lightbox_body.html('<iframe width="'+d+'" height="'+d+'" src="'+b+'" frameborder="0" allowfullscreen></iframe>'):this.lightbox_body.load(b,a.proxy(function(){return e.$element.trigger("loaded.bs.modal")})),this.modal_arrows?this.modal_arrows.css("display","block"):void 0},isExternal:function(a){var b;return b=a.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/),"string"==typeof b[1]&&b[1].length>0&&b[1].toLowerCase()!==location.protocol?!0:"string"==typeof b[2]&&b[2].length>0&&b[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"),"")!==location.host?!0:!1},error:function(a){return this.lightbox_body.html(a),this},preloadImage:function(b,c){var d,e=this;return d=new Image,(null==c||c===!0)&&(d.onload=function(){var b;return b=a("<img />"),b.attr("src",d.src),b.addClass("img-responsive"),e.lightbox_body.html(b),e.modal_arrows&&e.modal_arrows.css("display","block"),e.resize(d.width)},d.onerror=function(){return e.error("Failed to load image: "+b)}),d.src=b,d},resize:function(b){var c;return c=b+this.border.left+this.padding.left+this.padding.right+this.border.right,this.modal_dialog.css("width","auto").css("max-width",c),this.lightbox_container.find("a").css("padding-top",function(){return a(this).parent().height()/2}),this},checkDimensions:function(a){var b,c;return c=a+this.border.left+this.padding.left+this.padding.right+this.border.right,b=document.body.clientWidth,c>b&&(a=this.modal_body.width()),a},close:function(){return this.modal.modal("hide")},addTrailingSlash:function(a){return"/"!==a.substr(-1)&&(a+="/"),a}},a.fn.ekkoLightbox=function(c){return this.each(function(){var d;return d=a(this),c=a.extend({remote:d.attr("data-remote")||d.attr("href"),gallery_parent_selector:d.attr("data-parent"),type:d.attr("data-type")},c,d.data()),new b(this,c),this})},a.fn.ekkoLightbox.defaults={gallery_parent_selector:"*:not(.row)",left_arrow_class:".glyphicon .glyphicon-chevron-left",right_arrow_class:".glyphicon .glyphicon-chevron-right",directional_arrows:!0,type:null,always_show_close:!0,onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onNavigate:function(){}}}).call(this);

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.1-beta.4
 *
 * Copyright 2014 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */


(function(){

  "use strict";

  //Declare root variable - window in the browser, global on the server
  var root = this,
    previous = root.Chart;

  //Occupy the global variable of Chart, and create a simple base class
  var Chart = function(context){
    var chart = this;
    this.canvas = context.canvas;

    this.ctx = context;

    //Variables global to the chart
    var width = this.width = context.canvas.width;
    var height = this.height = context.canvas.height;
    this.aspectRatio = this.width / this.height;
    //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
    helpers.retinaScale(this);

    return this;
  };
  //Globally expose the defaults to allow for user updating/changing
  Chart.defaults = {
    global: {
      // Boolean - Whether to animate the chart
      animation: true,

      // Number - Number of animation steps
      animationSteps: 60,

      // String - Animation easing effect
      animationEasing: "easeOutQuart",

      // Boolean - If we should show the scale at all
      showScale: true,

      // Boolean - If we want to override with a hard coded scale
      scaleOverride: false,

      // ** Required if scaleOverride is true **
      // Number - The number of steps in a hard coded scale
      scaleSteps: null,
      // Number - The value jump in the hard coded scale
      scaleStepWidth: null,
      // Number - The scale starting value
      scaleStartValue: null,

      // String - Colour of the scale line
      scaleLineColor: "rgba(0,0,0,.1)",

      // Number - Pixel width of the scale line
      scaleLineWidth: 1,

      // Boolean - Whether to show labels on the scale
      scaleShowLabels: true,

      // Interpolated JS string - can access value
      scaleLabel: "<%=value%>",

      // Boolean - Whether the scale should stick to integers, and not show any floats even if drawing space is there
      scaleIntegersOnly: true,

      // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: false,

      // String - Scale label font declaration for the scale label
      scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // Number - Scale label font size in pixels
      scaleFontSize: 12,

      // String - Scale label font weight style
      scaleFontStyle: "normal",

      // String - Scale label font colour
      scaleFontColor: "#666",

      // Boolean - whether or not the chart should be responsive and resize when the browser does.
      responsive: false,

                        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                        maintainAspectRatio: true,

      // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
      showTooltips: true,

      // Array - Array of string names to attach tooltip events
      tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],

      // String - Tooltip background colour
      tooltipFillColor: "rgba(0,0,0,0.8)",

      // String - Tooltip label font declaration for the scale label
      tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // Number - Tooltip label font size in pixels
      tooltipFontSize: 14,

      // String - Tooltip font weight style
      tooltipFontStyle: "normal",

      // String - Tooltip label font colour
      tooltipFontColor: "#fff",

      // String - Tooltip title font declaration for the scale label
      tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // Number - Tooltip title font size in pixels
      tooltipTitleFontSize: 14,

      // String - Tooltip title font weight style
      tooltipTitleFontStyle: "bold",

      // String - Tooltip title font colour
      tooltipTitleFontColor: "#fff",

      // Number - pixel width of padding around tooltip text
      tooltipYPadding: 6,

      // Number - pixel width of padding around tooltip text
      tooltipXPadding: 6,

      // Number - Size of the caret on the tooltip
      tooltipCaretSize: 8,

      // Number - Pixel radius of the tooltip border
      tooltipCornerRadius: 6,

      // Number - Pixel offset from point x to tooltip edge
      tooltipXOffset: 10,

      // String - Template string for single tooltips
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

      // String - Template string for single tooltips
      multiTooltipTemplate: "<%= value %>",

      // String - Colour behind the legend colour block
      multiTooltipKeyBackground: '#fff',

      // Function - Will fire on animation progression.
      onAnimationProgress: function(){},

      // Function - Will fire on animation completion.
      onAnimationComplete: function(){}

    }
  };

  //Create a dictionary of chart types, to allow for extension of existing types
  Chart.types = {};

  //Global Chart helpers object for utility methods and classes
  var helpers = Chart.helpers = {};

    //-- Basic js utility methods
  var each = helpers.each = function(loopable,callback,self){
      var additionalArgs = Array.prototype.slice.call(arguments, 3);
      // Check to see if null or undefined firstly.
      if (loopable){
        if (loopable.length === +loopable.length){
          var i;
          for (i=0; i<loopable.length; i++){
            callback.apply(self,[loopable[i], i].concat(additionalArgs));
          }
        }
        else{
          for (var item in loopable){
            callback.apply(self,[loopable[item],item].concat(additionalArgs));
          }
        }
      }
    },
    clone = helpers.clone = function(obj){
      var objClone = {};
      each(obj,function(value,key){
        if (obj.hasOwnProperty(key)) objClone[key] = value;
      });
      return objClone;
    },
    extend = helpers.extend = function(base){
      each(Array.prototype.slice.call(arguments,1), function(extensionObject) {
        each(extensionObject,function(value,key){
          if (extensionObject.hasOwnProperty(key)) base[key] = value;
        });
      });
      return base;
    },
    merge = helpers.merge = function(base,master){
      //Merge properties in left object over to a shallow clone of object right.
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift({});
      return extend.apply(null, args);
    },
    indexOf = helpers.indexOf = function(arrayToSearch, item){
      if (Array.prototype.indexOf) {
        return arrayToSearch.indexOf(item);
      }
      else{
        for (var i = 0; i < arrayToSearch.length; i++) {
          if (arrayToSearch[i] === item) return i;
        }
        return -1;
      }
    },
    where = helpers.where = function(collection, filterCallback){
      var filtered = [];

      helpers.each(collection, function(item){
        if (filterCallback(item)){
          filtered.push(item);
        }
      });

      return filtered;
    },
    findNextWhere = helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex){
      // Default to start of the array
      if (!startIndex){
        startIndex = -1;
      }
      for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
        var currentItem = arrayToSearch[i];
        if (filterCallback(currentItem)){
          return currentItem;
        }
      };
    },
    findPreviousWhere = helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex){
      // Default to end of the array
      if (!startIndex){
        startIndex = arrayToSearch.length;
      }
      for (var i = startIndex - 1; i >= 0; i--) {
        var currentItem = arrayToSearch[i];
        if (filterCallback(currentItem)){
          return currentItem;
        }
      };
    },
    inherits = helpers.inherits = function(extensions){
      //Basic javascript inheritance based on the model created in Backbone.js
      var parent = this;
      var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function(){ return parent.apply(this, arguments); };

      var Surrogate = function(){ this.constructor = ChartElement;};
      Surrogate.prototype = parent.prototype;
      ChartElement.prototype = new Surrogate();

      ChartElement.extend = inherits;

      if (extensions) extend(ChartElement.prototype, extensions);

      ChartElement.__super__ = parent.prototype;

      return ChartElement;
    },
    noop = helpers.noop = function(){},
    uid = helpers.uid = (function(){
      var id=0;
      return function(){
        return "chart-" + id++;
      };
    })(),
    warn = helpers.warn = function(str){
      //Method for warning of errors
      if (window.console && typeof window.console.warn == "function") console.warn(str);
    },
    amd = helpers.amd = (typeof define == 'function' && define.amd),
    //-- Math methods
    isNumber = helpers.isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    max = helpers.max = function(array){
      return Math.max.apply( Math, array );
    },
    min = helpers.min = function(array){
      return Math.min.apply( Math, array );
    },
    cap = helpers.cap = function(valueToCap,maxValue,minValue){
      if(isNumber(maxValue)) {
        if( valueToCap > maxValue ) {
          return maxValue;
        }
      }
      else if(isNumber(minValue)){
        if ( valueToCap < minValue ){
          return minValue;
        }
      }
      return valueToCap;
    },
    getDecimalPlaces = helpers.getDecimalPlaces = function(num){
      if (num%1!==0 && isNumber(num)){
        return num.toString().split(".")[1].length;
      }
      else {
        return 0;
      }
    },
    toRadians = helpers.radians = function(degrees){
      return degrees * (Math.PI/180);
    },
    // Gets the angle from vertical upright to the point about a centre.
    getAngleFromPoint = helpers.getAngleFromPoint = function(centrePoint, anglePoint){
      var distanceFromXCenter = anglePoint.x - centrePoint.x,
        distanceFromYCenter = anglePoint.y - centrePoint.y,
        radialDistanceFromCenter = Math.sqrt( distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);


      var angle = Math.PI * 2 + Math.atan2(distanceFromYCenter, distanceFromXCenter);

      //If the segment is in the top left quadrant, we need to add another rotation to the angle
      if (distanceFromXCenter < 0 && distanceFromYCenter < 0){
        angle += Math.PI*2;
      }

      return {
        angle: angle,
        distance: radialDistanceFromCenter
      };
    },
    aliasPixel = helpers.aliasPixel = function(pixelWidth){
      return (pixelWidth % 2 === 0) ? 0 : 0.5;
    },
    splineCurve = helpers.splineCurve = function(FirstPoint,MiddlePoint,AfterPoint,t){
      //Props to Rob Spencer at scaled innovation for his post on splining between points
      //http://scaledinnovation.com/analytics/splines/aboutSplines.html
      var d01=Math.sqrt(Math.pow(MiddlePoint.x-FirstPoint.x,2)+Math.pow(MiddlePoint.y-FirstPoint.y,2)),
        d12=Math.sqrt(Math.pow(AfterPoint.x-MiddlePoint.x,2)+Math.pow(AfterPoint.y-MiddlePoint.y,2)),
        fa=t*d01/(d01+d12),// scaling factor for triangle Ta
        fb=t*d12/(d01+d12);
      return {
        inner : {
          x : MiddlePoint.x-fa*(AfterPoint.x-FirstPoint.x),
          y : MiddlePoint.y-fa*(AfterPoint.y-FirstPoint.y)
        },
        outer : {
          x: MiddlePoint.x+fb*(AfterPoint.x-FirstPoint.x),
          y : MiddlePoint.y+fb*(AfterPoint.y-FirstPoint.y)
        }
      };
    },
    calculateOrderOfMagnitude = helpers.calculateOrderOfMagnitude = function(val){
      return Math.floor(Math.log(val) / Math.LN10);
    },
    calculateScaleRange = helpers.calculateScaleRange = function(valuesArray, drawingSize, textSize, startFromZero, integersOnly){

      //Set a minimum step of two - a point at the top of the graph, and a point at the base
      var minSteps = 2,
        maxSteps = Math.floor(drawingSize/(textSize * 1.5)),
        skipFitting = (minSteps >= maxSteps);

      var maxValue = max(valuesArray),
        minValue = min(valuesArray);

      // We need some degree of seperation here to calculate the scales if all the values are the same
      // Adding/minusing 0.5 will give us a range of 1.
      if (maxValue === minValue){
        maxValue += 0.5;
        // So we don't end up with a graph with a negative start value if we've said always start from zero
        if (minValue >= 0.5 && !startFromZero){
          minValue -= 0.5;
        }
        else{
          // Make up a whole number above the values
          maxValue += 0.5;
        }
      }

      var valueRange = Math.abs(maxValue - minValue),
        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange),
        graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
        graphMin = (startFromZero) ? 0 : Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
        graphRange = graphMax - graphMin,
        stepValue = Math.pow(10, rangeOrderOfMagnitude),
        numberOfSteps = Math.round(graphRange / stepValue);

      //If we have more space on the graph we'll use it to give more definition to the data
      while((numberOfSteps > maxSteps || (numberOfSteps * 2) < maxSteps) && !skipFitting) {
        if(numberOfSteps > maxSteps){
          stepValue *=2;
          numberOfSteps = Math.round(graphRange/stepValue);
          // Don't ever deal with a decimal number of steps - cancel fitting and just use the minimum number of steps.
          if (numberOfSteps % 1 !== 0){
            skipFitting = true;
          }
        }
        //We can fit in double the amount of scale points on the scale
        else{
          //If user has declared ints only, and the step value isn't a decimal
          if (integersOnly && rangeOrderOfMagnitude >= 0){
            //If the user has said integers only, we need to check that making the scale more granular wouldn't make it a float
            if(stepValue/2 % 1 === 0){
              stepValue /=2;
              numberOfSteps = Math.round(graphRange/stepValue);
            }
            //If it would make it a float break out of the loop
            else{
              break;
            }
          }
          //If the scale doesn't have to be an int, make the scale more granular anyway.
          else{
            stepValue /=2;
            numberOfSteps = Math.round(graphRange/stepValue);
          }

        }
      }

      if (skipFitting){
        numberOfSteps = minSteps;
        stepValue = graphRange / numberOfSteps;
      }

      return {
        steps : numberOfSteps,
        stepValue : stepValue,
        min : graphMin,
        max : graphMin + (numberOfSteps * stepValue)
      };

    },
    /* jshint ignore:start */
    // Blows up jshint errors based on the new Function constructor
    //Templating methods
    //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
    template = helpers.template = function(templateString, valuesObject){
       // If templateString is function rather than string-template - call the function for valuesObject
      if(templateString instanceof Function){
        return templateString(valuesObject);
      }

      var cache = {};
      function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
        cache[str] = cache[str] :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +

          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'") +
          "');}return p.join('');"
        );

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
      }
      return tmpl(templateString,valuesObject);
    },
    /* jshint ignore:end */
    generateLabels = helpers.generateLabels = function(templateString,numberOfSteps,graphMin,stepValue){
      var labelsArray = new Array(numberOfSteps);
      if (labelTemplateString){
        each(labelsArray,function(val,index){
          labelsArray[index] = template(templateString,{value: (graphMin + (stepValue*(index+1)))});
        });
      }
      return labelsArray;
    },
    //--Animation methods
    //Easing functions adapted from Robert Penner's easing equations
    //http://www.robertpenner.com/easing/
    easingEffects = helpers.easingEffects = {
      linear: function (t) {
        return t;
      },
      easeInQuad: function (t) {
        return t * t;
      },
      easeOutQuad: function (t) {
        return -1 * t * (t - 2);
      },
      easeInOutQuad: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
        return -1 / 2 * ((--t) * (t - 2) - 1);
      },
      easeInCubic: function (t) {
        return t * t * t;
      },
      easeOutCubic: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t + 1);
      },
      easeInOutCubic: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
        return 1 / 2 * ((t -= 2) * t * t + 2);
      },
      easeInQuart: function (t) {
        return t * t * t * t;
      },
      easeOutQuart: function (t) {
        return -1 * ((t = t / 1 - 1) * t * t * t - 1);
      },
      easeInOutQuart: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
        return -1 / 2 * ((t -= 2) * t * t * t - 2);
      },
      easeInQuint: function (t) {
        return 1 * (t /= 1) * t * t * t * t;
      },
      easeOutQuint: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
      },
      easeInOutQuint: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
        return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
      },
      easeInSine: function (t) {
        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
      },
      easeOutSine: function (t) {
        return 1 * Math.sin(t / 1 * (Math.PI / 2));
      },
      easeInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
      },
      easeInExpo: function (t) {
        return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
      },
      easeOutExpo: function (t) {
        return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
      },
      easeInOutExpo: function (t) {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
      },
      easeInCirc: function (t) {
        if (t >= 1) return t;
        return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
      },
      easeOutCirc: function (t) {
        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
      },
      easeInOutCirc: function (t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      easeInElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) return 0;
        if ((t /= 1) == 1) return 1;
        if (!p) p = 1 * 0.3;
        if (a < Math.abs(1)) {
          a = 1;
          s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
      },
      easeOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) return 0;
        if ((t /= 1) == 1) return 1;
        if (!p) p = 1 * 0.3;
        if (a < Math.abs(1)) {
          a = 1;
          s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
      },
      easeInOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = 1 * (0.3 * 1.5);
        if (a < Math.abs(1)) {
          a = 1;
          s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
      },
      easeInBack: function (t) {
        var s = 1.70158;
        return 1 * (t /= 1) * t * ((s + 1) * t - s);
      },
      easeOutBack: function (t) {
        var s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
      },
      easeInOutBack: function (t) {
        var s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
      },
      easeInBounce: function (t) {
        return 1 - easingEffects.easeOutBounce(1 - t);
      },
      easeOutBounce: function (t) {
        if ((t /= 1) < (1 / 2.75)) {
          return 1 * (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
          return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
        } else if (t < (2.5 / 2.75)) {
          return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
        } else {
          return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
        }
      },
      easeInOutBounce: function (t) {
        if (t < 1 / 2) return easingEffects.easeInBounce(t * 2) * 0.5;
        return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
      }
    },
    //Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimFrame = helpers.requestAnimFrame = (function(){
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
    })(),
    cancelAnimFrame = helpers.cancelAnimFrame = (function(){
      return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function(callback) {
          return window.clearTimeout(callback, 1000 / 60);
        };
    })(),
    animationLoop = helpers.animationLoop = function(callback,totalSteps,easingString,onProgress,onComplete,chartInstance){

      var currentStep = 0,
        easingFunction = easingEffects[easingString] || easingEffects.linear;

      var animationFrame = function(){
        currentStep++;
        var stepDecimal = currentStep/totalSteps;
        var easeDecimal = easingFunction(stepDecimal);

        callback.call(chartInstance,easeDecimal,stepDecimal, currentStep);
        onProgress.call(chartInstance,easeDecimal,stepDecimal);
        if (currentStep < totalSteps){
          chartInstance.animationFrame = requestAnimFrame(animationFrame);
        } else{
          onComplete.apply(chartInstance);
        }
      };
      requestAnimFrame(animationFrame);
    },
    //-- DOM methods
    getRelativePosition = helpers.getRelativePosition = function(evt){
      var mouseX, mouseY;
      var e = evt.originalEvent || evt,
        canvas = evt.currentTarget || evt.srcElement,
        boundingRect = canvas.getBoundingClientRect();

      if (e.touches){
        mouseX = e.touches[0].clientX - boundingRect.left;
        mouseY = e.touches[0].clientY - boundingRect.top;

      }
      else{
        mouseX = e.clientX - boundingRect.left;
        mouseY = e.clientY - boundingRect.top;
      }

      return {
        x : mouseX,
        y : mouseY
      };

    },
    addEvent = helpers.addEvent = function(node,eventType,method){
      if (node.addEventListener){
        node.addEventListener(eventType,method);
      } else if (node.attachEvent){
        node.attachEvent("on"+eventType, method);
      } else {
        node["on"+eventType] = method;
      }
    },
    removeEvent = helpers.removeEvent = function(node, eventType, handler){
      if (node.removeEventListener){
        node.removeEventListener(eventType, handler, false);
      } else if (node.detachEvent){
        node.detachEvent("on"+eventType,handler);
      } else{
        node["on" + eventType] = noop;
      }
    },
    bindEvents = helpers.bindEvents = function(chartInstance, arrayOfEvents, handler){
      // Create the events object if it's not already present
      if (!chartInstance.events) chartInstance.events = {};

      each(arrayOfEvents,function(eventName){
        chartInstance.events[eventName] = function(){
          handler.apply(chartInstance, arguments);
        };
        addEvent(chartInstance.chart.canvas,eventName,chartInstance.events[eventName]);
      });
    },
    unbindEvents = helpers.unbindEvents = function (chartInstance, arrayOfEvents) {
      each(arrayOfEvents, function(handler,eventName){
        removeEvent(chartInstance.chart.canvas, eventName, handler);
      });
    },
    getMaximumWidth = helpers.getMaximumWidth = function(domNode){
      var container = domNode.parentNode;
      // TODO = check cross browser stuff with this.
      return container.clientWidth;
    },
    getMaximumHeight = helpers.getMaximumHeight = function(domNode){
      var container = domNode.parentNode;
      // TODO = check cross browser stuff with this.
      return container.clientHeight;
    },
    getMaximumSize = helpers.getMaximumSize = helpers.getMaximumWidth, // legacy support
    retinaScale = helpers.retinaScale = function(chart){
      var ctx = chart.ctx,
        width = chart.canvas.width,
        height = chart.canvas.height;

      if (window.devicePixelRatio) {
        ctx.canvas.style.width = width + "px";
        ctx.canvas.style.height = height + "px";
        ctx.canvas.height = height * window.devicePixelRatio;
        ctx.canvas.width = width * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    },
    //-- Canvas methods
    clear = helpers.clear = function(chart){
      chart.ctx.clearRect(0,0,chart.width,chart.height);
    },
    fontString = helpers.fontString = function(pixelSize,fontStyle,fontFamily){
      return fontStyle + " " + pixelSize+"px " + fontFamily;
    },
    longestText = helpers.longestText = function(ctx,font,arrayOfStrings){
      ctx.font = font;
      var longest = 0;
      each(arrayOfStrings,function(string){
        var textWidth = ctx.measureText(string).width;
        longest = (textWidth > longest) ? textWidth : longest;
      });
      return longest;
    },
    drawRoundedRectangle = helpers.drawRoundedRectangle = function(ctx,x,y,width,height,radius){
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };


  //Store a reference to each instance - allowing us to globally resize chart instances on window resize.
  //Destroy method on the chart will remove the instance of the chart from this reference.
  Chart.instances = {};

  Chart.Type = function(data,options,chart){
    this.options = options;
    this.chart = chart;
    this.id = uid();
    //Add the chart instance to the global namespace
    Chart.instances[this.id] = this;

    // Initialize is always called when a chart type is created
    // By default it is a no op, but it should be extended
    if (options.responsive){
      this.resize();
    }
    this.initialize.call(this,data);
  };

  //Core methods that'll be a part of every chart type
  extend(Chart.Type.prototype,{
    initialize : function(){return this;},
    clear : function(){
      clear(this.chart);
      return this;
    },
    stop : function(){
      // Stops any current animation loop occuring
      helpers.cancelAnimFrame.call(root, this.animationFrame);
      return this;
    },
    resize : function(callback){
      this.stop();
      var canvas = this.chart.canvas,
        newWidth = getMaximumWidth(this.chart.canvas),
        newHeight = this.options.maintainAspectRatio ? newWidth / this.chart.aspectRatio : getMaximumHeight(this.chart.canvas);

      canvas.width = this.chart.width = newWidth;
      canvas.height =  this.chart.height = newHeight;

      retinaScale(this.chart);

      if (typeof callback === "function"){
        callback.apply(this, Array.prototype.slice.call(arguments, 1));
      }
      return this;
    },
    reflow : noop,
    render : function(reflow){
      if (reflow){
        this.reflow();
      }
      if (this.options.animation && !reflow){
        helpers.animationLoop(
          this.draw,
          this.options.animationSteps,
          this.options.animationEasing,
          this.options.onAnimationProgress,
          this.options.onAnimationComplete,
          this
        );
      }
      else{
        this.draw();
        this.options.onAnimationComplete.call(this);
      }
      return this;
    },
    generateLegend : function(){
      return template(this.options.legendTemplate,this);
    },
    destroy : function(){
      this.clear();
      unbindEvents(this, this.events);
      delete Chart.instances[this.id];
    },
    showTooltip : function(ChartElements, forceRedraw){
      // Only redraw the chart if we've actually changed what we're hovering on.
      if (typeof this.activeElements === 'undefined') this.activeElements = [];

      var isChanged = (function(Elements){
        var changed = false;

        if (Elements.length !== this.activeElements.length){
          changed = true;
          return changed;
        }

        each(Elements, function(element, index){
          if (element !== this.activeElements[index]){
            changed = true;
          }
        }, this);
        return changed;
      }).call(this, ChartElements);

      if (!isChanged && !forceRedraw){
        return;
      }
      else{
        this.activeElements = ChartElements;
      }
      this.draw();
      if (ChartElements.length > 0){
        // If we have multiple datasets, show a MultiTooltip for all of the data points at that index
        if (this.datasets && this.datasets.length > 1) {
          var dataArray,
            dataIndex;

          for (var i = this.datasets.length - 1; i >= 0; i--) {
            dataArray = this.datasets[i].points || this.datasets[i].bars || this.datasets[i].segments;
            dataIndex = indexOf(dataArray, ChartElements[0]);
            if (dataIndex !== -1){
              break;
            }
          }
          var tooltipLabels = [],
            tooltipColors = [],
            medianPosition = (function(index) {

              // Get all the points at that particular index
              var Elements = [],
                dataCollection,
                xPositions = [],
                yPositions = [],
                xMax,
                yMax,
                xMin,
                yMin;
              helpers.each(this.datasets, function(dataset){
                dataCollection = dataset.points || dataset.bars || dataset.segments;
                if (dataCollection[dataIndex] && dataCollection[dataIndex].hasValue()){
                  Elements.push(dataCollection[dataIndex]);
                }
              });

              helpers.each(Elements, function(element) {
                xPositions.push(element.x);
                yPositions.push(element.y);


                //Include any colour information about the element
                tooltipLabels.push(helpers.template(this.options.multiTooltipTemplate, element));
                tooltipColors.push({
                  fill: element._saved.fillColor || element.fillColor,
                  stroke: element._saved.strokeColor || element.strokeColor
                });

              }, this);

              yMin = min(yPositions);
              yMax = max(yPositions);

              xMin = min(xPositions);
              xMax = max(xPositions);

              return {
                x: (xMin > this.chart.width/2) ? xMin : xMax,
                y: (yMin + yMax)/2
              };
            }).call(this, dataIndex);

          new Chart.MultiTooltip({
            x: medianPosition.x,
            y: medianPosition.y,
            xPadding: this.options.tooltipXPadding,
            yPadding: this.options.tooltipYPadding,
            xOffset: this.options.tooltipXOffset,
            fillColor: this.options.tooltipFillColor,
            textColor: this.options.tooltipFontColor,
            fontFamily: this.options.tooltipFontFamily,
            fontStyle: this.options.tooltipFontStyle,
            fontSize: this.options.tooltipFontSize,
            titleTextColor: this.options.tooltipTitleFontColor,
            titleFontFamily: this.options.tooltipTitleFontFamily,
            titleFontStyle: this.options.tooltipTitleFontStyle,
            titleFontSize: this.options.tooltipTitleFontSize,
            cornerRadius: this.options.tooltipCornerRadius,
            labels: tooltipLabels,
            legendColors: tooltipColors,
            legendColorBackground : this.options.multiTooltipKeyBackground,
            title: ChartElements[0].label,
            chart: this.chart,
            ctx: this.chart.ctx
          }).draw();

        } else {
          each(ChartElements, function(Element) {
            var tooltipPosition = Element.tooltipPosition();
            new Chart.Tooltip({
              x: Math.round(tooltipPosition.x),
              y: Math.round(tooltipPosition.y),
              xPadding: this.options.tooltipXPadding,
              yPadding: this.options.tooltipYPadding,
              fillColor: this.options.tooltipFillColor,
              textColor: this.options.tooltipFontColor,
              fontFamily: this.options.tooltipFontFamily,
              fontStyle: this.options.tooltipFontStyle,
              fontSize: this.options.tooltipFontSize,
              caretHeight: this.options.tooltipCaretSize,
              cornerRadius: this.options.tooltipCornerRadius,
              text: template(this.options.tooltipTemplate, Element),
              chart: this.chart
            }).draw();
          }, this);
        }
      }
      return this;
    },
    toBase64Image : function(){
      return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
    }
  });

  Chart.Type.extend = function(extensions){

    var parent = this;

    var ChartType = function(){
      return parent.apply(this,arguments);
    };

    //Copy the prototype object of the this class
    ChartType.prototype = clone(parent.prototype);
    //Now overwrite some of the properties in the base class with the new extensions
    extend(ChartType.prototype, extensions);

    ChartType.extend = Chart.Type.extend;

    if (extensions.name || parent.prototype.name){

      var chartName = extensions.name || parent.prototype.name;
      //Assign any potential default values of the new chart type

      //If none are defined, we'll use a clone of the chart type this is being extended from.
      //I.e. if we extend a line chart, we'll use the defaults from the line chart if our new chart
      //doesn't define some defaults of their own.

      var baseDefaults = (Chart.defaults[parent.prototype.name]) ? clone(Chart.defaults[parent.prototype.name]) : {};

      Chart.defaults[chartName] = extend(baseDefaults,extensions.defaults);

      Chart.types[chartName] = ChartType;

      //Register this new chart type in the Chart prototype
      Chart.prototype[chartName] = function(data,options){
        var config = merge(Chart.defaults.global, Chart.defaults[chartName], options || {});
        return new ChartType(data,config,this);
      };
    } else{
      warn("Name not provided for this chart, so it hasn't been registered");
    }
    return parent;
  };

  Chart.Element = function(configuration){
    extend(this,configuration);
    this.initialize.apply(this,arguments);
    this.save();
  };
  extend(Chart.Element.prototype,{
    initialize : function(){},
    restore : function(props){
      if (!props){
        extend(this,this._saved);
      } else {
        each(props,function(key){
          this[key] = this._saved[key];
        },this);
      }
      return this;
    },
    save : function(){
      this._saved = clone(this);
      delete this._saved._saved;
      return this;
    },
    update : function(newProps){
      each(newProps,function(value,key){
        this._saved[key] = this[key];
        this[key] = value;
      },this);
      return this;
    },
    transition : function(props,ease){
      each(props,function(value,key){
        this[key] = ((value - this._saved[key]) * ease) + this._saved[key];
      },this);
      return this;
    },
    tooltipPosition : function(){
      return {
        x : this.x,
        y : this.y
      };
    },
    hasValue: function(){
      return isNumber(this.value);
    }
  });

  Chart.Element.extend = inherits;


  Chart.Point = Chart.Element.extend({
    display: true,
    inRange: function(chartX,chartY){
      var hitDetectionRange = this.hitDetectionRadius + this.radius;
      return ((Math.pow(chartX-this.x, 2)+Math.pow(chartY-this.y, 2)) < Math.pow(hitDetectionRange,2));
    },
    draw : function(){
      if (this.display){
        var ctx = this.ctx;
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;

        ctx.fillStyle = this.fillColor;

        ctx.fill();
        ctx.stroke();
      }


      //Quick debug for bezier curve splining
      //Highlights control points and the line between them.
      //Handy for dev - stripped in the min version.

      // ctx.save();
      // ctx.fillStyle = "black";
      // ctx.strokeStyle = "black"
      // ctx.beginPath();
      // ctx.arc(this.controlPoints.inner.x,this.controlPoints.inner.y, 2, 0, Math.PI*2);
      // ctx.fill();

      // ctx.beginPath();
      // ctx.arc(this.controlPoints.outer.x,this.controlPoints.outer.y, 2, 0, Math.PI*2);
      // ctx.fill();

      // ctx.moveTo(this.controlPoints.inner.x,this.controlPoints.inner.y);
      // ctx.lineTo(this.x, this.y);
      // ctx.lineTo(this.controlPoints.outer.x,this.controlPoints.outer.y);
      // ctx.stroke();

      // ctx.restore();



    }
  });

  Chart.Arc = Chart.Element.extend({
    inRange : function(chartX,chartY){

      var pointRelativePosition = helpers.getAngleFromPoint(this, {
        x: chartX,
        y: chartY
      });

      //Check if within the range of the open/close angle
      var betweenAngles = (pointRelativePosition.angle >= this.startAngle && pointRelativePosition.angle <= this.endAngle),
        withinRadius = (pointRelativePosition.distance >= this.innerRadius && pointRelativePosition.distance <= this.outerRadius);

      return (betweenAngles && withinRadius);
      //Ensure within the outside of the arc centre, but inside arc outer
    },
    tooltipPosition : function(){
      var centreAngle = this.startAngle + ((this.endAngle - this.startAngle) / 2),
        rangeFromCentre = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
      return {
        x : this.x + (Math.cos(centreAngle) * rangeFromCentre),
        y : this.y + (Math.sin(centreAngle) * rangeFromCentre)
      };
    },
    draw : function(animationPercent){

      var easingDecimal = animationPercent || 1;

      var ctx = this.ctx;

      ctx.beginPath();

      ctx.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle);

      ctx.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, true);

      ctx.closePath();
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.strokeWidth;

      ctx.fillStyle = this.fillColor;

      ctx.fill();
      ctx.lineJoin = 'bevel';

      if (this.showStroke){
        ctx.stroke();
      }
    }
  });

  Chart.Rectangle = Chart.Element.extend({
    draw : function(){
      var ctx = this.ctx,
        halfWidth = this.width/2,
        leftX = this.x - halfWidth,
        rightX = this.x + halfWidth,
        top = this.base - (this.base - this.y),
        halfStroke = this.strokeWidth / 2;

      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
      if (this.showStroke){
        leftX += halfStroke;
        rightX -= halfStroke;
        top += halfStroke;
      }

      ctx.beginPath();

      ctx.fillStyle = this.fillColor;
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.strokeWidth;

      // It'd be nice to keep this class totally generic to any rectangle
      // and simply specify which border to miss out.
      ctx.moveTo(leftX, this.base);
      ctx.lineTo(leftX, top);
      ctx.lineTo(rightX, top);
      ctx.lineTo(rightX, this.base);
      ctx.fill();
      if (this.showStroke){
        ctx.stroke();
      }
    },
    height : function(){
      return this.base - this.y;
    },
    inRange : function(chartX,chartY){
      return (chartX >= this.x - this.width/2 && chartX <= this.x + this.width/2) && (chartY >= this.y && chartY <= this.base);
    }
  });

  Chart.Tooltip = Chart.Element.extend({
    draw : function(){

      var ctx = this.chart.ctx;

      ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);

      this.xAlign = "center";
      this.yAlign = "above";

      //Distance between the actual element.y position and the start of the tooltip caret
      var caretPadding = 2;

      var tooltipWidth = ctx.measureText(this.text).width + 2*this.xPadding,
        tooltipRectHeight = this.fontSize + 2*this.yPadding,
        tooltipHeight = tooltipRectHeight + this.caretHeight + caretPadding;

      if (this.x + tooltipWidth/2 >this.chart.width){
        this.xAlign = "left";
      } else if (this.x - tooltipWidth/2 < 0){
        this.xAlign = "right";
      }

      if (this.y - tooltipHeight < 0){
        this.yAlign = "below";
      }


      var tooltipX = this.x - tooltipWidth/2,
        tooltipY = this.y - tooltipHeight;

      ctx.fillStyle = this.fillColor;

      switch(this.yAlign)
      {
      case "above":
        //Draw a caret above the x/y
        ctx.beginPath();
        ctx.moveTo(this.x,this.y - caretPadding);
        ctx.lineTo(this.x + this.caretHeight, this.y - (caretPadding + this.caretHeight));
        ctx.lineTo(this.x - this.caretHeight, this.y - (caretPadding + this.caretHeight));
        ctx.closePath();
        ctx.fill();
        break;
      case "below":
        tooltipY = this.y + caretPadding + this.caretHeight;
        //Draw a caret below the x/y
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + caretPadding);
        ctx.lineTo(this.x + this.caretHeight, this.y + caretPadding + this.caretHeight);
        ctx.lineTo(this.x - this.caretHeight, this.y + caretPadding + this.caretHeight);
        ctx.closePath();
        ctx.fill();
        break;
      }

      switch(this.xAlign)
      {
      case "left":
        tooltipX = this.x - tooltipWidth + (this.cornerRadius + this.caretHeight);
        break;
      case "right":
        tooltipX = this.x - (this.cornerRadius + this.caretHeight);
        break;
      }

      drawRoundedRectangle(ctx,tooltipX,tooltipY,tooltipWidth,tooltipRectHeight,this.cornerRadius);

      ctx.fill();

      ctx.fillStyle = this.textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.text, tooltipX + tooltipWidth/2, tooltipY + tooltipRectHeight/2);
    }
  });

  Chart.MultiTooltip = Chart.Element.extend({
    initialize : function(){
      this.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);

      this.titleFont = fontString(this.titleFontSize,this.titleFontStyle,this.titleFontFamily);

      this.height = (this.labels.length * this.fontSize) + ((this.labels.length-1) * (this.fontSize/2)) + (this.yPadding*2) + this.titleFontSize *1.5;

      this.ctx.font = this.titleFont;

      var titleWidth = this.ctx.measureText(this.title).width,
        //Label has a legend square as well so account for this.
        labelWidth = longestText(this.ctx,this.font,this.labels) + this.fontSize + 3,
        longestTextWidth = max([labelWidth,titleWidth]);

      this.width = longestTextWidth + (this.xPadding*2);


      var halfHeight = this.height/2;

      //Check to ensure the height will fit on the canvas
      //The three is to buffer form the very
      if (this.y - halfHeight < 0 ){
        this.y = halfHeight;
      } else if (this.y + halfHeight > this.chart.height){
        this.y = this.chart.height - halfHeight;
      }

      //Decide whether to align left or right based on position on canvas
      if (this.x > this.chart.width/2){
        this.x -= this.xOffset + this.width;
      } else {
        this.x += this.xOffset;
      }


    },
    getLineHeight : function(index){
      var baseLineHeight = this.y - (this.height/2) + this.yPadding,
        afterTitleIndex = index-1;

      //If the index is zero, we're getting the title
      if (index === 0){
        return baseLineHeight + this.titleFontSize/2;
      } else{
        return baseLineHeight + ((this.fontSize*1.5*afterTitleIndex) + this.fontSize/2) + this.titleFontSize * 1.5;
      }

    },
    draw : function(){
      drawRoundedRectangle(this.ctx,this.x,this.y - this.height/2,this.width,this.height,this.cornerRadius);
      var ctx = this.ctx;
      ctx.fillStyle = this.fillColor;
      ctx.fill();
      ctx.closePath();

      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this.titleTextColor;
      ctx.font = this.titleFont;

      ctx.fillText(this.title,this.x + this.xPadding, this.getLineHeight(0));

      ctx.font = this.font;
      helpers.each(this.labels,function(label,index){
        ctx.fillStyle = this.textColor;
        ctx.fillText(label,this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(index + 1));

        //A bit gnarly, but clearing this rectangle breaks when using explorercanvas (clears whole canvas)
        //ctx.clearRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);
        //Instead we'll make a white filled block to put the legendColour palette over.

        ctx.fillStyle = this.legendColorBackground;
        ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);

        ctx.fillStyle = this.legendColors[index].fill;
        ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);


      },this);
    }
  });

  Chart.Scale = Chart.Element.extend({
    initialize : function(){
      this.fit();
    },
    buildYLabels : function(){
      this.yLabels = [];

      var stepDecimalPlaces = getDecimalPlaces(this.stepValue);

      for (var i=0; i<=this.steps; i++){
        this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
      }
      this.yLabelWidth = (this.display && this.showLabels) ? longestText(this.ctx,this.font,this.yLabels) : 0;
    },
    addXLabel : function(label){
      this.xLabels.push(label);
      this.valuesCount++;
      this.fit();
    },
    removeXLabel : function(){
      this.xLabels.shift();
      this.valuesCount--;
      this.fit();
    },
    // Fitting loop to rotate x Labels and figure out what fits there, and also calculate how many Y steps to use
    fit: function(){
      // First we need the width of the yLabels, assuming the xLabels aren't rotated

      // To do that we need the base line at the top and base of the chart, assuming there is no x label rotation
      this.startPoint = (this.display) ? this.fontSize : 0;
      this.endPoint = (this.display) ? this.height - (this.fontSize * 1.5) - 5 : this.height; // -5 to pad labels

      // Apply padding settings to the start and end point.
      this.startPoint += this.padding;
      this.endPoint -= this.padding;

      // Cache the starting height, so can determine if we need to recalculate the scale yAxis
      var cachedHeight = this.endPoint - this.startPoint,
        cachedYLabelWidth;

      // Build the current yLabels so we have an idea of what size they'll be to start
      /*
       *  This sets what is returned from calculateScaleRange as static properties of this class:
       *
        this.steps;
        this.stepValue;
        this.min;
        this.max;
       *
       */
      this.calculateYRange(cachedHeight);

      // With these properties set we can now build the array of yLabels
      // and also the width of the largest yLabel
      this.buildYLabels();

      this.calculateXLabelRotation();

      while((cachedHeight > this.endPoint - this.startPoint)){
        cachedHeight = this.endPoint - this.startPoint;
        cachedYLabelWidth = this.yLabelWidth;

        this.calculateYRange(cachedHeight);
        this.buildYLabels();

        // Only go through the xLabel loop again if the yLabel width has changed
        if (cachedYLabelWidth < this.yLabelWidth){
          this.calculateXLabelRotation();
        }
      }

    },
    calculateXLabelRotation : function(){
      //Get the width of each grid by calculating the difference
      //between x offsets between 0 and 1.

      this.ctx.font = this.font;

      var firstWidth = this.ctx.measureText(this.xLabels[0]).width,
        lastWidth = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width,
        firstRotated,
        lastRotated;


      this.xScalePaddingRight = lastWidth/2 + 3;
      this.xScalePaddingLeft = (firstWidth/2 > this.yLabelWidth + 10) ? firstWidth/2 : this.yLabelWidth + 10;

      this.xLabelRotation = 0;
      if (this.display){
        var originalLabelWidth = longestText(this.ctx,this.font,this.xLabels),
          cosRotation,
          firstRotatedWidth;
        this.xLabelWidth = originalLabelWidth;
        //Allow 3 pixels x2 padding either side for label readability
        var xGridWidth = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6;

        //Max label rotate should be 90 - also act as a loop counter
        while ((this.xLabelWidth > xGridWidth && this.xLabelRotation === 0) || (this.xLabelWidth > xGridWidth && this.xLabelRotation <= 90 && this.xLabelRotation > 0)){
          cosRotation = Math.cos(toRadians(this.xLabelRotation));

          firstRotated = cosRotation * firstWidth;
          lastRotated = cosRotation * lastWidth;

          // We're right aligning the text now.
          if (firstRotated + this.fontSize / 2 > this.yLabelWidth + 8){
            this.xScalePaddingLeft = firstRotated + this.fontSize / 2;
          }
          this.xScalePaddingRight = this.fontSize/2;


          this.xLabelRotation++;
          this.xLabelWidth = cosRotation * originalLabelWidth;

        }
        if (this.xLabelRotation > 0){
          this.endPoint -= Math.sin(toRadians(this.xLabelRotation))*originalLabelWidth + 3;
        }
      }
      else{
        this.xLabelWidth = 0;
        this.xScalePaddingRight = this.padding;
        this.xScalePaddingLeft = this.padding;
      }

    },
    // Needs to be overidden in each Chart type
    // Otherwise we need to pass all the data into the scale class
    calculateYRange: noop,
    drawingArea: function(){
      return this.startPoint - this.endPoint;
    },
    calculateY : function(value){
      var scalingFactor = this.drawingArea() / (this.min - this.max);
      return this.endPoint - (scalingFactor * (value - this.min));
    },
    calculateX : function(index){
      var isRotated = (this.xLabelRotation > 0),
        // innerWidth = (this.offsetGridLines) ? this.width - offsetLeft - this.padding : this.width - (offsetLeft + halfLabelWidth * 2) - this.padding,
        innerWidth = this.width - (this.xScalePaddingLeft + this.xScalePaddingRight),
        valueWidth = innerWidth/(this.valuesCount - ((this.offsetGridLines) ? 0 : 1)),
        valueOffset = (valueWidth * index) + this.xScalePaddingLeft;

      if (this.offsetGridLines){
        valueOffset += (valueWidth/2);
      }

      return Math.round(valueOffset);
    },
    update : function(newProps){
      helpers.extend(this, newProps);
      this.fit();
    },
    draw : function(){
      var ctx = this.ctx,
        yLabelGap = (this.endPoint - this.startPoint) / this.steps,
        xStart = Math.round(this.xScalePaddingLeft);
      if (this.display){
        ctx.fillStyle = this.textColor;
        ctx.font = this.font;
        each(this.yLabels,function(labelString,index){
          var yLabelCenter = this.endPoint - (yLabelGap * index),
            linePositionY = Math.round(yLabelCenter);

          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          if (this.showLabels){
            ctx.fillText(labelString,xStart - 10,yLabelCenter);
          }
          ctx.beginPath();
          if (index > 0){
            // This is a grid line in the centre, so drop that
            ctx.lineWidth = this.gridLineWidth;
            ctx.strokeStyle = this.gridLineColor;
          } else {
            // This is the first line on the scale
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.lineColor;
          }

          linePositionY += helpers.aliasPixel(ctx.lineWidth);

          ctx.moveTo(xStart, linePositionY);
          ctx.lineTo(this.width, linePositionY);
          ctx.stroke();
          ctx.closePath();

          ctx.lineWidth = this.lineWidth;
          ctx.strokeStyle = this.lineColor;
          ctx.beginPath();
          ctx.moveTo(xStart - 5, linePositionY);
          ctx.lineTo(xStart, linePositionY);
          ctx.stroke();
          ctx.closePath();

        },this);

        each(this.xLabels,function(label,index){
          var xPos = this.calculateX(index) + aliasPixel(this.lineWidth),
            // Check to see if line/bar here and decide where to place the line
            linePos = this.calculateX(index - (this.offsetGridLines ? 0.5 : 0)) + aliasPixel(this.lineWidth),
            isRotated = (this.xLabelRotation > 0);

          ctx.beginPath();

          if (index > 0){
            // This is a grid line in the centre, so drop that
            ctx.lineWidth = this.gridLineWidth;
            ctx.strokeStyle = this.gridLineColor;
          } else {
            // This is the first line on the scale
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.lineColor;
          }
          ctx.moveTo(linePos,this.endPoint);
          ctx.lineTo(linePos,this.startPoint - 3);
          ctx.stroke();
          ctx.closePath();


          ctx.lineWidth = this.lineWidth;
          ctx.strokeStyle = this.lineColor;


          // Small lines at the bottom of the base grid line
          ctx.beginPath();
          ctx.moveTo(linePos,this.endPoint);
          ctx.lineTo(linePos,this.endPoint + 5);
          ctx.stroke();
          ctx.closePath();

          ctx.save();
          ctx.translate(xPos,(isRotated) ? this.endPoint + 12 : this.endPoint + 8);
          ctx.rotate(toRadians(this.xLabelRotation)*-1);
          ctx.font = this.font;
          ctx.textAlign = (isRotated) ? "right" : "center";
          ctx.textBaseline = (isRotated) ? "middle" : "top";
          ctx.fillText(label, 0, 0);
          ctx.restore();
        },this);

      }
    }

  });

  Chart.RadialScale = Chart.Element.extend({
    initialize: function(){
      this.size = min([this.height, this.width]);
      this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
    },
    calculateCenterOffset: function(value){
      // Take into account half font size + the yPadding of the top value
      var scalingFactor = this.drawingArea / (this.max - this.min);

      return (value - this.min) * scalingFactor;
    },
    update : function(){
      if (!this.lineArc){
        this.setScaleSize();
      } else {
        this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
      }
      this.buildYLabels();
    },
    buildYLabels: function(){
      this.yLabels = [];

      var stepDecimalPlaces = getDecimalPlaces(this.stepValue);

      for (var i=0; i<=this.steps; i++){
        this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
      }
    },
    getCircumference : function(){
      return ((Math.PI*2) / this.valuesCount);
    },
    setScaleSize: function(){
      /*
       * Right, this is really confusing and there is a lot of maths going on here
       * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
       *
       * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
       *
       * Solution:
       *
       * We assume the radius of the polygon is half the size of the canvas at first
       * at each index we check if the text overlaps.
       *
       * Where it does, we store that angle and that index.
       *
       * After finding the largest index and angle we calculate how much we need to remove
       * from the shape radius to move the point inwards by that x.
       *
       * We average the left and right distances to get the maximum shape radius that can fit in the box
       * along with labels.
       *
       * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
       * on each side, removing that from the size, halving it and adding the left x protrusion width.
       *
       * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
       * and position it in the most space efficient manner
       *
       * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
       */


      // Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
      // Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
      var largestPossibleRadius = min([(this.height/2 - this.pointLabelFontSize - 5), this.width/2]),
        pointPosition,
        i,
        textWidth,
        halfTextWidth,
        furthestRight = this.width,
        furthestRightIndex,
        furthestRightAngle,
        furthestLeft = 0,
        furthestLeftIndex,
        furthestLeftAngle,
        xProtrusionLeft,
        xProtrusionRight,
        radiusReductionRight,
        radiusReductionLeft,
        maxWidthRadius;
      this.ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
      for (i=0;i<this.valuesCount;i++){
        // 5px to space the text slightly out - similar to what we do in the draw function.
        pointPosition = this.getPointPosition(i, largestPossibleRadius);
        textWidth = this.ctx.measureText(template(this.templateString, { value: this.labels[i] })).width + 5;
        if (i === 0 || i === this.valuesCount/2){
          // If we're at index zero, or exactly the middle, we're at exactly the top/bottom
          // of the radar chart, so text will be aligned centrally, so we'll half it and compare
          // w/left and right text sizes
          halfTextWidth = textWidth/2;
          if (pointPosition.x + halfTextWidth > furthestRight) {
            furthestRight = pointPosition.x + halfTextWidth;
            furthestRightIndex = i;
          }
          if (pointPosition.x - halfTextWidth < furthestLeft) {
            furthestLeft = pointPosition.x - halfTextWidth;
            furthestLeftIndex = i;
          }
        }
        else if (i < this.valuesCount/2) {
          // Less than half the values means we'll left align the text
          if (pointPosition.x + textWidth > furthestRight) {
            furthestRight = pointPosition.x + textWidth;
            furthestRightIndex = i;
          }
        }
        else if (i > this.valuesCount/2){
          // More than half the values means we'll right align the text
          if (pointPosition.x - textWidth < furthestLeft) {
            furthestLeft = pointPosition.x - textWidth;
            furthestLeftIndex = i;
          }
        }
      }

      xProtrusionLeft = furthestLeft;

      xProtrusionRight = Math.ceil(furthestRight - this.width);

      furthestRightAngle = this.getIndexAngle(furthestRightIndex);

      furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);

      radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI/2);

      radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI/2);

      // Ensure we actually need to reduce the size of the chart
      radiusReductionRight = (isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
      radiusReductionLeft = (isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;

      this.drawingArea = largestPossibleRadius - (radiusReductionLeft + radiusReductionRight)/2;

      //this.drawingArea = min([maxWidthRadius, (this.height - (2 * (this.pointLabelFontSize + 5)))/2])
      this.setCenterPoint(radiusReductionLeft, radiusReductionRight);

    },
    setCenterPoint: function(leftMovement, rightMovement){

      var maxRight = this.width - rightMovement - this.drawingArea,
        maxLeft = leftMovement + this.drawingArea;

      this.xCenter = (maxLeft + maxRight)/2;
      // Always vertically in the centre as the text height doesn't change
      this.yCenter = (this.height/2);
    },

    getIndexAngle : function(index){
      var angleMultiplier = (Math.PI * 2) / this.valuesCount;
      // Start from the top instead of right, so remove a quarter of the circle

      return index * angleMultiplier - (Math.PI/2);
    },
    getPointPosition : function(index, distanceFromCenter){
      var thisAngle = this.getIndexAngle(index);
      return {
        x : (Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
        y : (Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
      };
    },
    draw: function(){
      if (this.display){
        var ctx = this.ctx;
        each(this.yLabels, function(label, index){
          // Don't draw a centre value
          if (index > 0){
            var yCenterOffset = index * (this.drawingArea/this.steps),
              yHeight = this.yCenter - yCenterOffset,
              pointPosition;

            // Draw circular lines around the scale
            if (this.lineWidth > 0){
              ctx.strokeStyle = this.lineColor;
              ctx.lineWidth = this.lineWidth;

              if(this.lineArc){
                ctx.beginPath();
                ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI*2);
                ctx.closePath();
                ctx.stroke();
              } else{
                ctx.beginPath();
                for (var i=0;i<this.valuesCount;i++)
                {
                  pointPosition = this.getPointPosition(i, this.calculateCenterOffset(this.min + (index * this.stepValue)));
                  if (i === 0){
                    ctx.moveTo(pointPosition.x, pointPosition.y);
                  } else {
                    ctx.lineTo(pointPosition.x, pointPosition.y);
                  }
                }
                ctx.closePath();
                ctx.stroke();
              }
            }
            if(this.showLabels){
              ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);
              if (this.showLabelBackdrop){
                var labelWidth = ctx.measureText(label).width;
                ctx.fillStyle = this.backdropColor;
                ctx.fillRect(
                  this.xCenter - labelWidth/2 - this.backdropPaddingX,
                  yHeight - this.fontSize/2 - this.backdropPaddingY,
                  labelWidth + this.backdropPaddingX*2,
                  this.fontSize + this.backdropPaddingY*2
                );
              }
              ctx.textAlign = 'center';
              ctx.textBaseline = "middle";
              ctx.fillStyle = this.fontColor;
              ctx.fillText(label, this.xCenter, yHeight);
            }
          }
        }, this);

        if (!this.lineArc){
          ctx.lineWidth = this.angleLineWidth;
          ctx.strokeStyle = this.angleLineColor;
          for (var i = this.valuesCount - 1; i >= 0; i--) {
            if (this.angleLineWidth > 0){
              var outerPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max));
              ctx.beginPath();
              ctx.moveTo(this.xCenter, this.yCenter);
              ctx.lineTo(outerPosition.x, outerPosition.y);
              ctx.stroke();
              ctx.closePath();
            }
            // Extra 3px out for some label spacing
            var pointLabelPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max) + 5);
            ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
            ctx.fillStyle = this.pointLabelFontColor;

            var labelsCount = this.labels.length,
              halfLabelsCount = this.labels.length/2,
              quarterLabelsCount = halfLabelsCount/2,
              upperHalf = (i < quarterLabelsCount || i > labelsCount - quarterLabelsCount),
              exactQuarter = (i === quarterLabelsCount || i === labelsCount - quarterLabelsCount);
            if (i === 0){
              ctx.textAlign = 'center';
            } else if(i === halfLabelsCount){
              ctx.textAlign = 'center';
            } else if (i < halfLabelsCount){
              ctx.textAlign = 'left';
            } else {
              ctx.textAlign = 'right';
            }

            // Set the correct text baseline based on outer positioning
            if (exactQuarter){
              ctx.textBaseline = 'middle';
            } else if (upperHalf){
              ctx.textBaseline = 'bottom';
            } else {
              ctx.textBaseline = 'top';
            }

            ctx.fillText(this.labels[i], pointLabelPosition.x, pointLabelPosition.y);
          }
        }
      }
    }
  });

  // Attach global event to resize each chart instance when the browser resizes
  helpers.addEvent(window, "resize", (function(){
    // Basic debounce of resize function so it doesn't hurt performance when resizing browser.
    var timeout;
    return function(){
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        each(Chart.instances,function(instance){
          // If the responsive flag is set in the chart instance config
          // Cascade the resize event down to the chart.
          if (instance.options.responsive){
            instance.resize(instance.render, true);
          }
        });
      }, 50);
    };
  })());


  if (amd) {
    define(function(){
      return Chart;
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = Chart;
  }

  root.Chart = Chart;

  Chart.noConflict = function(){
    root.Chart = previous;
    return Chart;
  };

}).call(this);

(function(){
  "use strict";

  var root = this,
    Chart = root.Chart,
    helpers = Chart.helpers;


  var defaultConfig = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };


  Chart.Type.extend({
    name: "Bar",
    defaults : defaultConfig,
    initialize:  function(data){

      //Expose options as a scope variable here so we can access it in the ScaleClass
      var options = this.options;

      this.ScaleClass = Chart.Scale.extend({
        offsetGridLines : true,
        calculateBarX : function(datasetCount, datasetIndex, barIndex){
          //Reusable method for calculating the xPosition of a given bar based on datasetIndex & width of the bar
          var xWidth = this.calculateBaseWidth(),
            xAbsolute = this.calculateX(barIndex) - (xWidth/2),
            barWidth = this.calculateBarWidth(datasetCount);

          return xAbsolute + (barWidth * datasetIndex) + (datasetIndex * options.barDatasetSpacing) + barWidth/2;
        },
        calculateBaseWidth : function(){
          return (this.calculateX(1) - this.calculateX(0)) - (2*options.barValueSpacing);
        },
        calculateBarWidth : function(datasetCount){
          //The padding between datasets is to the right of each bar, providing that there are more than 1 dataset
          var baseWidth = this.calculateBaseWidth() - ((datasetCount - 1) * options.barDatasetSpacing);

          return (baseWidth / datasetCount);
        }
      });

      this.datasets = [];

      //Set up tooltip events on the chart
      if (this.options.showTooltips){
        helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
          var activeBars = (evt.type !== 'mouseout') ? this.getBarsAtEvent(evt) : [];

          this.eachBars(function(bar){
            bar.restore(['fillColor', 'strokeColor']);
          });
          helpers.each(activeBars, function(activeBar){
            activeBar.fillColor = activeBar.highlightFill;
            activeBar.strokeColor = activeBar.highlightStroke;
          });
          this.showTooltip(activeBars);
        });
      }

      //Declare the extension of the default point, to cater for the options passed in to the constructor
      this.BarClass = Chart.Rectangle.extend({
        strokeWidth : this.options.barStrokeWidth,
        showStroke : this.options.barShowStroke,
        ctx : this.chart.ctx
      });

      //Iterate through each of the datasets, and build this into a property of the chart
      helpers.each(data.datasets,function(dataset,datasetIndex){

        var datasetObject = {
          label : dataset.label || null,
          fillColor : dataset.fillColor,
          strokeColor : dataset.strokeColor,
          bars : []
        };

        this.datasets.push(datasetObject);

        helpers.each(dataset.data,function(dataPoint,index){
          //Add a new point for each piece of data, passing any required data to draw.
          datasetObject.bars.push(new this.BarClass({
            value : dataPoint,
            label : data.labels[index],
            datasetLabel: dataset.label,
            strokeColor : dataset.strokeColor,
            fillColor : dataset.fillColor,
            highlightFill : dataset.highlightFill || dataset.fillColor,
            highlightStroke : dataset.highlightStroke || dataset.strokeColor
          }));
        },this);

      },this);

      this.buildScale(data.labels);

      this.BarClass.prototype.base = this.scale.endPoint;

      this.eachBars(function(bar, index, datasetIndex){
        helpers.extend(bar, {
          width : this.scale.calculateBarWidth(this.datasets.length),
          x: this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
          y: this.scale.endPoint
        });
        bar.save();
      }, this);

      this.render();
    },
    update : function(){
      this.scale.update();
      // Reset any highlight colours before updating.
      helpers.each(this.activeElements, function(activeElement){
        activeElement.restore(['fillColor', 'strokeColor']);
      });

      this.eachBars(function(bar){
        bar.save();
      });
      this.render();
    },
    eachBars : function(callback){
      helpers.each(this.datasets,function(dataset, datasetIndex){
        helpers.each(dataset.bars, callback, this, datasetIndex);
      },this);
    },
    getBarsAtEvent : function(e){
      var barsArray = [],
        eventPosition = helpers.getRelativePosition(e),
        datasetIterator = function(dataset){
          barsArray.push(dataset.bars[barIndex]);
        },
        barIndex;

      for (var datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++) {
        for (barIndex = 0; barIndex < this.datasets[datasetIndex].bars.length; barIndex++) {
          if (this.datasets[datasetIndex].bars[barIndex].inRange(eventPosition.x,eventPosition.y)){
            helpers.each(this.datasets, datasetIterator);
            return barsArray;
          }
        }
      }

      return barsArray;
    },
    buildScale : function(labels){
      var self = this;

      var dataTotal = function(){
        var values = [];
        self.eachBars(function(bar){
          values.push(bar.value);
        });
        return values;
      };

      var scaleOptions = {
        templateString : this.options.scaleLabel,
        height : this.chart.height,
        width : this.chart.width,
        ctx : this.chart.ctx,
        textColor : this.options.scaleFontColor,
        fontSize : this.options.scaleFontSize,
        fontStyle : this.options.scaleFontStyle,
        fontFamily : this.options.scaleFontFamily,
        valuesCount : labels.length,
        beginAtZero : this.options.scaleBeginAtZero,
        integersOnly : this.options.scaleIntegersOnly,
        calculateYRange: function(currentHeight){
          var updatedRanges = helpers.calculateScaleRange(
            dataTotal(),
            currentHeight,
            this.fontSize,
            this.beginAtZero,
            this.integersOnly
          );
          helpers.extend(this, updatedRanges);
        },
        xLabels : labels,
        font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
        lineWidth : this.options.scaleLineWidth,
        lineColor : this.options.scaleLineColor,
        gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
        gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
        padding : (this.options.showScale) ? 0 : (this.options.barShowStroke) ? this.options.barStrokeWidth : 0,
        showLabels : this.options.scaleShowLabels,
        display : this.options.showScale
      };

      if (this.options.scaleOverride){
        helpers.extend(scaleOptions, {
          calculateYRange: helpers.noop,
          steps: this.options.scaleSteps,
          stepValue: this.options.scaleStepWidth,
          min: this.options.scaleStartValue,
          max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
        });
      }

      this.scale = new this.ScaleClass(scaleOptions);
    },
    addData : function(valuesArray,label){
      //Map the values array for each of the datasets
      helpers.each(valuesArray,function(value,datasetIndex){
        //Add a new point for each piece of data, passing any required data to draw.
        this.datasets[datasetIndex].bars.push(new this.BarClass({
          value : value,
          label : label,
          x: this.scale.calculateBarX(this.datasets.length, datasetIndex, this.scale.valuesCount+1),
          y: this.scale.endPoint,
          width : this.scale.calculateBarWidth(this.datasets.length),
          base : this.scale.endPoint,
          strokeColor : this.datasets[datasetIndex].strokeColor,
          fillColor : this.datasets[datasetIndex].fillColor
        }));
      },this);

      this.scale.addXLabel(label);
      //Then re-render the chart.
      this.update();
    },
    removeData : function(){
      this.scale.removeXLabel();
      //Then re-render the chart.
      helpers.each(this.datasets,function(dataset){
        dataset.bars.shift();
      },this);
      this.update();
    },
    reflow : function(){
      helpers.extend(this.BarClass.prototype,{
        y: this.scale.endPoint,
        base : this.scale.endPoint
      });
      var newScaleProps = helpers.extend({
        height : this.chart.height,
        width : this.chart.width
      });
      this.scale.update(newScaleProps);
    },
    draw : function(ease){
      var easingDecimal = ease || 1;
      this.clear();

      var ctx = this.chart.ctx;

      this.scale.draw(easingDecimal);

      //Draw all the bars for each dataset
      helpers.each(this.datasets,function(dataset,datasetIndex){
        helpers.each(dataset.bars,function(bar,index){
          if (bar.hasValue()){
            bar.base = this.scale.endPoint;
            //Transition then draw
            bar.transition({
              x : this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
              y : this.scale.calculateY(bar.value),
              width : this.scale.calculateBarWidth(this.datasets.length)
            }, easingDecimal).draw();
          }
        },this);

      },this);
    }
  });


}).call(this);
(function(){
  "use strict";

  var root = this,
    Chart = root.Chart,
    //Cache a local reference to Chart.helpers
    helpers = Chart.helpers;

  var defaultConfig = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //The percentage of the chart that we cut out of the middle.
    percentageInnerCutout : 50,

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  };


  Chart.Type.extend({
    //Passing in a name registers this chart in the Chart namespace
    name: "Doughnut",
    //Providing a defaults will also register the deafults in the chart namespace
    defaults : defaultConfig,
    //Initialize is fired when the chart is initialized - Data is passed in as a parameter
    //Config is automatically merged by the core of Chart.js, and is available at this.options
    initialize:  function(data){

      //Declare segments as a static property to prevent inheriting across the Chart type prototype
      this.segments = [];
      this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) - this.options.segmentStrokeWidth/2)/2;

      this.SegmentArc = Chart.Arc.extend({
        ctx : this.chart.ctx,
        x : this.chart.width/2,
        y : this.chart.height/2
      });

      //Set up tooltip events on the chart
      if (this.options.showTooltips){
        helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
          var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];

          helpers.each(this.segments,function(segment){
            segment.restore(["fillColor"]);
          });
          helpers.each(activeSegments,function(activeSegment){
            activeSegment.fillColor = activeSegment.highlightColor;
          });
          this.showTooltip(activeSegments);
        });
      }
      this.calculateTotal(data);

      helpers.each(data,function(datapoint, index){
        this.addData(datapoint, index, true);
      },this);

      this.render();
    },
    getSegmentsAtEvent : function(e){
      var segmentsArray = [];

      var location = helpers.getRelativePosition(e);

      helpers.each(this.segments,function(segment){
        if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
      },this);
      return segmentsArray;
    },
    addData : function(segment, atIndex, silent){
      var index = atIndex || this.segments.length;
      this.segments.splice(index, 0, new this.SegmentArc({
        value : segment.value,
        outerRadius : (this.options.animateScale) ? 0 : this.outerRadius,
        innerRadius : (this.options.animateScale) ? 0 : (this.outerRadius/100) * this.options.percentageInnerCutout,
        fillColor : segment.color,
        highlightColor : segment.highlight || segment.color,
        showStroke : this.options.segmentShowStroke,
        strokeWidth : this.options.segmentStrokeWidth,
        strokeColor : this.options.segmentStrokeColor,
        startAngle : Math.PI * 1.5,
        circumference : (this.options.animateRotate) ? 0 : this.calculateCircumference(segment.value),
        label : segment.label
      }));
      if (!silent){
        this.reflow();
        this.update();
      }
    },
    calculateCircumference : function(value){
      return (Math.PI*2)*(value / this.total);
    },
    calculateTotal : function(data){
      this.total = 0;
      helpers.each(data,function(segment){
        this.total += segment.value;
      },this);
    },
    update : function(){
      this.calculateTotal(this.segments);

      // Reset any highlight colours before updating.
      helpers.each(this.activeElements, function(activeElement){
        activeElement.restore(['fillColor']);
      });

      helpers.each(this.segments,function(segment){
        segment.save();
      });
      this.render();
    },

    removeData: function(atIndex){
      var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
      this.segments.splice(indexToDelete, 1);
      this.reflow();
      this.update();
    },

    reflow : function(){
      helpers.extend(this.SegmentArc.prototype,{
        x : this.chart.width/2,
        y : this.chart.height/2
      });
      this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) - this.options.segmentStrokeWidth/2)/2;
      helpers.each(this.segments, function(segment){
        segment.update({
          outerRadius : this.outerRadius,
          innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
        });
      }, this);
    },
    draw : function(easeDecimal){
      var animDecimal = (easeDecimal) ? easeDecimal : 1;
      this.clear();
      helpers.each(this.segments,function(segment,index){
        segment.transition({
          circumference : this.calculateCircumference(segment.value),
          outerRadius : this.outerRadius,
          innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
        },animDecimal);

        segment.endAngle = segment.startAngle + segment.circumference;

        segment.draw();
        if (index === 0){
          segment.startAngle = Math.PI * 1.5;
        }
        //Check to see if it's the last segment, if not get the next and update the start angle
        if (index < this.segments.length-1){
          this.segments[index+1].startAngle = segment.endAngle;
        }
      },this);

    }
  });

  Chart.types.Doughnut.extend({
    name : "Pie",
    defaults : helpers.merge(defaultConfig,{percentageInnerCutout : 0})
  });

}).call(this);
(function(){
  "use strict";

  var root = this,
    Chart = root.Chart,
    helpers = Chart.helpers;

  var defaultConfig = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };


  Chart.Type.extend({
    name: "Line",
    defaults : defaultConfig,
    initialize:  function(data){
      //Declare the extension of the default point, to cater for the options passed in to the constructor
      this.PointClass = Chart.Point.extend({
        strokeWidth : this.options.pointDotStrokeWidth,
        radius : this.options.pointDotRadius,
        display: this.options.pointDot,
        hitDetectionRadius : this.options.pointHitDetectionRadius,
        ctx : this.chart.ctx,
        inRange : function(mouseX){
          return (Math.pow(mouseX-this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius,2));
        }
      });

      this.datasets = [];

      //Set up tooltip events on the chart
      if (this.options.showTooltips){
        helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
          var activePoints = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];
          this.eachPoints(function(point){
            point.restore(['fillColor', 'strokeColor']);
          });
          helpers.each(activePoints, function(activePoint){
            activePoint.fillColor = activePoint.highlightFill;
            activePoint.strokeColor = activePoint.highlightStroke;
          });
          this.showTooltip(activePoints);
        });
      }

      //Iterate through each of the datasets, and build this into a property of the chart
      helpers.each(data.datasets,function(dataset){

        var datasetObject = {
          label : dataset.label || null,
          fillColor : dataset.fillColor,
          strokeColor : dataset.strokeColor,
          pointColor : dataset.pointColor,
          pointStrokeColor : dataset.pointStrokeColor,
          points : []
        };

        this.datasets.push(datasetObject);


        helpers.each(dataset.data,function(dataPoint,index){
          //Add a new point for each piece of data, passing any required data to draw.
          datasetObject.points.push(new this.PointClass({
            value : dataPoint,
            label : data.labels[index],
            datasetLabel: dataset.label,
            strokeColor : dataset.pointStrokeColor,
            fillColor : dataset.pointColor,
            highlightFill : dataset.pointHighlightFill || dataset.pointColor,
            highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
          }));
        },this);

        this.buildScale(data.labels);


        this.eachPoints(function(point, index){
          helpers.extend(point, {
            x: this.scale.calculateX(index),
            y: this.scale.endPoint
          });
          point.save();
        }, this);

      },this);


      this.render();
    },
    update : function(){
      this.scale.update();
      // Reset any highlight colours before updating.
      helpers.each(this.activeElements, function(activeElement){
        activeElement.restore(['fillColor', 'strokeColor']);
      });
      this.eachPoints(function(point){
        point.save();
      });
      this.render();
    },
    eachPoints : function(callback){
      helpers.each(this.datasets,function(dataset){
        helpers.each(dataset.points,callback,this);
      },this);
    },
    getPointsAtEvent : function(e){
      var pointsArray = [],
        eventPosition = helpers.getRelativePosition(e);
      helpers.each(this.datasets,function(dataset){
        helpers.each(dataset.points,function(point){
          if (point.inRange(eventPosition.x,eventPosition.y)) pointsArray.push(point);
        });
      },this);
      return pointsArray;
    },
    buildScale : function(labels){
      var self = this;

      var dataTotal = function(){
        var values = [];
        self.eachPoints(function(point){
          values.push(point.value);
        });

        return values;
      };

      var scaleOptions = {
        templateString : this.options.scaleLabel,
        height : this.chart.height,
        width : this.chart.width,
        ctx : this.chart.ctx,
        textColor : this.options.scaleFontColor,
        fontSize : this.options.scaleFontSize,
        fontStyle : this.options.scaleFontStyle,
        fontFamily : this.options.scaleFontFamily,
        valuesCount : labels.length,
        beginAtZero : this.options.scaleBeginAtZero,
        integersOnly : this.options.scaleIntegersOnly,
        calculateYRange : function(currentHeight){
          var updatedRanges = helpers.calculateScaleRange(
            dataTotal(),
            currentHeight,
            this.fontSize,
            this.beginAtZero,
            this.integersOnly
          );
          helpers.extend(this, updatedRanges);
        },
        xLabels : labels,
        font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
        lineWidth : this.options.scaleLineWidth,
        lineColor : this.options.scaleLineColor,
        gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
        gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
        padding: (this.options.showScale) ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
        showLabels : this.options.scaleShowLabels,
        display : this.options.showScale
      };

      if (this.options.scaleOverride){
        helpers.extend(scaleOptions, {
          calculateYRange: helpers.noop,
          steps: this.options.scaleSteps,
          stepValue: this.options.scaleStepWidth,
          min: this.options.scaleStartValue,
          max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
        });
      }


      this.scale = new Chart.Scale(scaleOptions);
    },
    addData : function(valuesArray,label){
      //Map the values array for each of the datasets

      helpers.each(valuesArray,function(value,datasetIndex){
        //Add a new point for each piece of data, passing any required data to draw.
        this.datasets[datasetIndex].points.push(new this.PointClass({
          value : value,
          label : label,
          x: this.scale.calculateX(this.scale.valuesCount+1),
          y: this.scale.endPoint,
          strokeColor : this.datasets[datasetIndex].pointStrokeColor,
          fillColor : this.datasets[datasetIndex].pointColor
        }));
      },this);

      this.scale.addXLabel(label);
      //Then re-render the chart.
      this.update();
    },
    removeData : function(){
      this.scale.removeXLabel();
      //Then re-render the chart.
      helpers.each(this.datasets,function(dataset){
        dataset.points.shift();
      },this);
      this.update();
    },
    reflow : function(){
      var newScaleProps = helpers.extend({
        height : this.chart.height,
        width : this.chart.width
      });
      this.scale.update(newScaleProps);
    },
    draw : function(ease){
      var easingDecimal = ease || 1;
      this.clear();

      var ctx = this.chart.ctx;

      // Some helper methods for getting the next/prev points
      var hasValue = function(item){
        return item.value !== null;
      },
      nextPoint = function(point, collection, index){
        return helpers.findNextWhere(collection, hasValue, index) || point;
      },
      previousPoint = function(point, collection, index){
        return helpers.findPreviousWhere(collection, hasValue, index) || point;
      };

      this.scale.draw(easingDecimal);


      helpers.each(this.datasets,function(dataset){
        var pointsWithValues = helpers.where(dataset.points, hasValue);

        //Transition each point first so that the line and point drawing isn't out of sync
        //We can use this extra loop to calculate the control points of this dataset also in this loop

        helpers.each(dataset.points, function(point, index){
          if (point.hasValue()){
            point.transition({
              y : this.scale.calculateY(point.value),
              x : this.scale.calculateX(index)
            }, easingDecimal);
          }
        },this);


        // Control points need to be calculated in a seperate loop, because we need to know the current x/y of the point
        // This would cause issues when there is no animation, because the y of the next point would be 0, so beziers would be skewed
        if (this.options.bezierCurve){
          helpers.each(pointsWithValues, function(point, index){
            var tension = (index > 0 && index < pointsWithValues.length - 1) ? this.options.bezierCurveTension : 0;
            point.controlPoints = helpers.splineCurve(
              previousPoint(point, pointsWithValues, index),
              point,
              nextPoint(point, pointsWithValues, index),
              tension
            );

            // Prevent the bezier going outside of the bounds of the graph

            // Cap puter bezier handles to the upper/lower scale bounds
            if (point.controlPoints.outer.y > this.scale.endPoint){
              point.controlPoints.outer.y = this.scale.endPoint;
            }
            else if (point.controlPoints.outer.y < this.scale.startPoint){
              point.controlPoints.outer.y = this.scale.startPoint;
            }

            // Cap inner bezier handles to the upper/lower scale bounds
            if (point.controlPoints.inner.y > this.scale.endPoint){
              point.controlPoints.inner.y = this.scale.endPoint;
            }
            else if (point.controlPoints.inner.y < this.scale.startPoint){
              point.controlPoints.inner.y = this.scale.startPoint;
            }
          },this);
        }


        //Draw the line between all the points
        ctx.lineWidth = this.options.datasetStrokeWidth;
        ctx.strokeStyle = dataset.strokeColor;
        ctx.beginPath();

        helpers.each(pointsWithValues, function(point, index){
          if (index === 0){
            ctx.moveTo(point.x, point.y);
          }
          else{
            if(this.options.bezierCurve){
              var previous = previousPoint(point, pointsWithValues, index);

              ctx.bezierCurveTo(
                previous.controlPoints.outer.x,
                previous.controlPoints.outer.y,
                point.controlPoints.inner.x,
                point.controlPoints.inner.y,
                point.x,
                point.y
              );
            }
            else{
              ctx.lineTo(point.x,point.y);
            }
          }
        }, this);

        ctx.stroke();

        if (this.options.datasetFill && pointsWithValues.length > 0){
          //Round off the line by going to the base of the chart, back to the start, then fill.
          ctx.lineTo(pointsWithValues[pointsWithValues.length - 1].x, this.scale.endPoint);
          ctx.lineTo(pointsWithValues[0].x, this.scale.endPoint);
          ctx.fillStyle = dataset.fillColor;
          ctx.closePath();
          ctx.fill();
        }

        //Now draw the points over the line
        //A little inefficient double looping, but better than the line
        //lagging behind the point positions
        helpers.each(pointsWithValues,function(point){
          point.draw();
        });
      },this);
    }
  });


}).call(this);
(function(){
  "use strict";

  var root = this,
    Chart = root.Chart,
    //Cache a local reference to Chart.helpers
    helpers = Chart.helpers;

  var defaultConfig = {
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop : true,

    //String - The colour of the label backdrop
    scaleBackdropColor : "rgba(255,255,255,0.75)",

    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero : true,

    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY : 2,

    //Number - The backdrop padding to the side of the label in pixels
    scaleBackdropPaddingX : 2,

    //Boolean - Show line for each value in the scale
    scaleShowLine : true,

    //Boolean - Stroke a line around each segment in the chart
    segmentShowStroke : true,

    //String - The colour of the stroke on each segement.
    segmentStrokeColor : "#fff",

    //Number - The width of the stroke value in pixels
    segmentStrokeWidth : 2,

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect.
    animationEasing : "easeOutBounce",

    //Boolean - Whether to animate the rotation of the chart
    animateRotate : true,

    //Boolean - Whether to animate scaling the chart from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
  };


  Chart.Type.extend({
    //Passing in a name registers this chart in the Chart namespace
    name: "PolarArea",
    //Providing a defaults will also register the deafults in the chart namespace
    defaults : defaultConfig,
    //Initialize is fired when the chart is initialized - Data is passed in as a parameter
    //Config is automatically merged by the core of Chart.js, and is available at this.options
    initialize:  function(data){
      this.segments = [];
      //Declare segment class as a chart instance specific class, so it can share props for this instance
      this.SegmentArc = Chart.Arc.extend({
        showStroke : this.options.segmentShowStroke,
        strokeWidth : this.options.segmentStrokeWidth,
        strokeColor : this.options.segmentStrokeColor,
        ctx : this.chart.ctx,
        innerRadius : 0,
        x : this.chart.width/2,
        y : this.chart.height/2
      });
      this.scale = new Chart.RadialScale({
        display: this.options.showScale,
        fontStyle: this.options.scaleFontStyle,
        fontSize: this.options.scaleFontSize,
        fontFamily: this.options.scaleFontFamily,
        fontColor: this.options.scaleFontColor,
        showLabels: this.options.scaleShowLabels,
        showLabelBackdrop: this.options.scaleShowLabelBackdrop,
        backdropColor: this.options.scaleBackdropColor,
        backdropPaddingY : this.options.scaleBackdropPaddingY,
        backdropPaddingX: this.options.scaleBackdropPaddingX,
        lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
        lineColor: this.options.scaleLineColor,
        lineArc: true,
        width: this.chart.width,
        height: this.chart.height,
        xCenter: this.chart.width/2,
        yCenter: this.chart.height/2,
        ctx : this.chart.ctx,
        templateString: this.options.scaleLabel,
        valuesCount: data.length
      });

      this.updateScaleRange(data);

      this.scale.update();

      helpers.each(data,function(segment,index){
        this.addData(segment,index,true);
      },this);

      //Set up tooltip events on the chart
      if (this.options.showTooltips){
        helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
          var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];
          helpers.each(this.segments,function(segment){
            segment.restore(["fillColor"]);
          });
          helpers.each(activeSegments,function(activeSegment){
            activeSegment.fillColor = activeSegment.highlightColor;
          });
          this.showTooltip(activeSegments);
        });
      }

      this.render();
    },
    getSegmentsAtEvent : function(e){
      var segmentsArray = [];

      var location = helpers.getRelativePosition(e);

      helpers.each(this.segments,function(segment){
        if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
      },this);
      return segmentsArray;
    },
    addData : function(segment, atIndex, silent){
      var index = atIndex || this.segments.length;

      this.segments.splice(index, 0, new this.SegmentArc({
        fillColor: segment.color,
        highlightColor: segment.highlight || segment.color,
        label: segment.label,
        value: segment.value,
        outerRadius: (this.options.animateScale) ? 0 : this.scale.calculateCenterOffset(segment.value),
        circumference: (this.options.animateRotate) ? 0 : this.scale.getCircumference(),
        startAngle: Math.PI * 1.5
      }));
      if (!silent){
        this.reflow();
        this.update();
      }
    },
    removeData: function(atIndex){
      var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
      this.segments.splice(indexToDelete, 1);
      this.reflow();
      this.update();
    },
    calculateTotal: function(data){
      this.total = 0;
      helpers.each(data,function(segment){
        this.total += segment.value;
      },this);
      this.scale.valuesCount = this.segments.length;
    },
    updateScaleRange: function(datapoints){
      var valuesArray = [];
      helpers.each(datapoints,function(segment){
        valuesArray.push(segment.value);
      });

      var scaleSizes = (this.options.scaleOverride) ?
        {
          steps: this.options.scaleSteps,
          stepValue: this.options.scaleStepWidth,
          min: this.options.scaleStartValue,
          max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
        } :
        helpers.calculateScaleRange(
          valuesArray,
          helpers.min([this.chart.width, this.chart.height])/2,
          this.options.scaleFontSize,
          this.options.scaleBeginAtZero,
          this.options.scaleIntegersOnly
        );

      helpers.extend(
        this.scale,
        scaleSizes,
        {
          size: helpers.min([this.chart.width, this.chart.height]),
          xCenter: this.chart.width/2,
          yCenter: this.chart.height/2
        }
      );

    },
    update : function(){
      this.calculateTotal(this.segments);

      helpers.each(this.segments,function(segment){
        segment.save();
      });
      this.render();
    },
    reflow : function(){
      helpers.extend(this.SegmentArc.prototype,{
        x : this.chart.width/2,
        y : this.chart.height/2
      });
      this.updateScaleRange(this.segments);
      this.scale.update();

      helpers.extend(this.scale,{
        xCenter: this.chart.width/2,
        yCenter: this.chart.height/2
      });

      helpers.each(this.segments, function(segment){
        segment.update({
          outerRadius : this.scale.calculateCenterOffset(segment.value)
        });
      }, this);

    },
    draw : function(ease){
      var easingDecimal = ease || 1;
      //Clear & draw the canvas
      this.clear();
      helpers.each(this.segments,function(segment, index){
        segment.transition({
          circumference : this.scale.getCircumference(),
          outerRadius : this.scale.calculateCenterOffset(segment.value)
        },easingDecimal);

        segment.endAngle = segment.startAngle + segment.circumference;

        // If we've removed the first segment we need to set the first one to
        // start at the top.
        if (index === 0){
          segment.startAngle = Math.PI * 1.5;
        }

        //Check to see if it's the last segment, if not get the next and update the start angle
        if (index < this.segments.length - 1){
          this.segments[index+1].startAngle = segment.endAngle;
        }
        segment.draw();
      }, this);
      this.scale.draw();
    }
  });

}).call(this);
(function(){
  "use strict";

  var root = this,
    Chart = root.Chart,
    helpers = Chart.helpers;



  Chart.Type.extend({
    name: "Radar",
    defaults:{
      //Boolean - Whether to show lines for each scale point
      scaleShowLine : true,

      //Boolean - Whether we show the angle lines out of the radar
      angleShowLineOut : true,

      //Boolean - Whether to show labels on the scale
      scaleShowLabels : false,

      // Boolean - Whether the scale should begin at zero
      scaleBeginAtZero : true,

      //String - Colour of the angle line
      angleLineColor : "rgba(0,0,0,.1)",

      //Number - Pixel width of the angle line
      angleLineWidth : 1,

      //String - Point label font declaration
      pointLabelFontFamily : "'Arial'",

      //String - Point label font weight
      pointLabelFontStyle : "normal",

      //Number - Point label font size in pixels
      pointLabelFontSize : 10,

      //String - Point label font colour
      pointLabelFontColor : "#666",

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 3,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    },

    initialize: function(data){
      this.PointClass = Chart.Point.extend({
        strokeWidth : this.options.pointDotStrokeWidth,
        radius : this.options.pointDotRadius,
        display: this.options.pointDot,
        hitDetectionRadius : this.options.pointHitDetectionRadius,
        ctx : this.chart.ctx
      });

      this.datasets = [];

      this.buildScale(data);

      //Set up tooltip events on the chart
      if (this.options.showTooltips){
        helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
          var activePointsCollection = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];

          this.eachPoints(function(point){
            point.restore(['fillColor', 'strokeColor']);
          });
          helpers.each(activePointsCollection, function(activePoint){
            activePoint.fillColor = activePoint.highlightFill;
            activePoint.strokeColor = activePoint.highlightStroke;
          });

          this.showTooltip(activePointsCollection);
        });
      }

      //Iterate through each of the datasets, and build this into a property of the chart
      helpers.each(data.datasets,function(dataset){

        var datasetObject = {
          label: dataset.label || null,
          fillColor : dataset.fillColor,
          strokeColor : dataset.strokeColor,
          pointColor : dataset.pointColor,
          pointStrokeColor : dataset.pointStrokeColor,
          points : []
        };

        this.datasets.push(datasetObject);

        helpers.each(dataset.data,function(dataPoint,index){
          //Add a new point for each piece of data, passing any required data to draw.
          var pointPosition;
          if (!this.scale.animation){
            pointPosition = this.scale.getPointPosition(index, this.scale.calculateCenterOffset(dataPoint));
          }
          datasetObject.points.push(new this.PointClass({
            value : dataPoint,
            label : data.labels[index],
            datasetLabel: dataset.label,
            x: (this.options.animation) ? this.scale.xCenter : pointPosition.x,
            y: (this.options.animation) ? this.scale.yCenter : pointPosition.y,
            strokeColor : dataset.pointStrokeColor,
            fillColor : dataset.pointColor,
            highlightFill : dataset.pointHighlightFill || dataset.pointColor,
            highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
          }));
        },this);

      },this);

      this.render();
    },
    eachPoints : function(callback){
      helpers.each(this.datasets,function(dataset){
        helpers.each(dataset.points,callback,this);
      },this);
    },

    getPointsAtEvent : function(evt){
      var mousePosition = helpers.getRelativePosition(evt),
        fromCenter = helpers.getAngleFromPoint({
          x: this.scale.xCenter,
          y: this.scale.yCenter
        }, mousePosition);

      var anglePerIndex = (Math.PI * 2) /this.scale.valuesCount,
        pointIndex = Math.round((fromCenter.angle - Math.PI * 1.5) / anglePerIndex),
        activePointsCollection = [];

      // If we're at the top, make the pointIndex 0 to get the first of the array.
      if (pointIndex >= this.scale.valuesCount || pointIndex < 0){
        pointIndex = 0;
      }

      if (fromCenter.distance <= this.scale.drawingArea){
        helpers.each(this.datasets, function(dataset){
          activePointsCollection.push(dataset.points[pointIndex]);
        });
      }

      return activePointsCollection;
    },

    buildScale : function(data){
      this.scale = new Chart.RadialScale({
        display: this.options.showScale,
        fontStyle: this.options.scaleFontStyle,
        fontSize: this.options.scaleFontSize,
        fontFamily: this.options.scaleFontFamily,
        fontColor: this.options.scaleFontColor,
        showLabels: this.options.scaleShowLabels,
        showLabelBackdrop: this.options.scaleShowLabelBackdrop,
        backdropColor: this.options.scaleBackdropColor,
        backdropPaddingY : this.options.scaleBackdropPaddingY,
        backdropPaddingX: this.options.scaleBackdropPaddingX,
        lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
        lineColor: this.options.scaleLineColor,
        angleLineColor : this.options.angleLineColor,
        angleLineWidth : (this.options.angleShowLineOut) ? this.options.angleLineWidth : 0,
        // Point labels at the edge of each line
        pointLabelFontColor : this.options.pointLabelFontColor,
        pointLabelFontSize : this.options.pointLabelFontSize,
        pointLabelFontFamily : this.options.pointLabelFontFamily,
        pointLabelFontStyle : this.options.pointLabelFontStyle,
        height : this.chart.height,
        width: this.chart.width,
        xCenter: this.chart.width/2,
        yCenter: this.chart.height/2,
        ctx : this.chart.ctx,
        templateString: this.options.scaleLabel,
        labels: data.labels,
        valuesCount: data.datasets[0].data.length
      });

      this.scale.setScaleSize();
      this.updateScaleRange(data.datasets);
      this.scale.buildYLabels();
    },
    updateScaleRange: function(datasets){
      var valuesArray = (function(){
        var totalDataArray = [];
        helpers.each(datasets,function(dataset){
          if (dataset.data){
            totalDataArray = totalDataArray.concat(dataset.data);
          }
          else {
            helpers.each(dataset.points, function(point){
              totalDataArray.push(point.value);
            });
          }
        });
        return totalDataArray;
      })();


      var scaleSizes = (this.options.scaleOverride) ?
        {
          steps: this.options.scaleSteps,
          stepValue: this.options.scaleStepWidth,
          min: this.options.scaleStartValue,
          max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
        } :
        helpers.calculateScaleRange(
          valuesArray,
          helpers.min([this.chart.width, this.chart.height])/2,
          this.options.scaleFontSize,
          this.options.scaleBeginAtZero,
          this.options.scaleIntegersOnly
        );

      helpers.extend(
        this.scale,
        scaleSizes
      );

    },
    addData : function(valuesArray,label){
      //Map the values array for each of the datasets
      this.scale.valuesCount++;
      helpers.each(valuesArray,function(value,datasetIndex){
        var pointPosition = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(value));
        this.datasets[datasetIndex].points.push(new this.PointClass({
          value : value,
          label : label,
          x: pointPosition.x,
          y: pointPosition.y,
          strokeColor : this.datasets[datasetIndex].pointStrokeColor,
          fillColor : this.datasets[datasetIndex].pointColor
        }));
      },this);

      this.scale.labels.push(label);

      this.reflow();

      this.update();
    },
    removeData : function(){
      this.scale.valuesCount--;
      this.scale.labels.shift();
      helpers.each(this.datasets,function(dataset){
        dataset.points.shift();
      },this);
      this.reflow();
      this.update();
    },
    update : function(){
      this.eachPoints(function(point){
        point.save();
      });
      this.reflow();
      this.render();
    },
    reflow: function(){
      helpers.extend(this.scale, {
        width : this.chart.width,
        height: this.chart.height,
        size : helpers.min([this.chart.width, this.chart.height]),
        xCenter: this.chart.width/2,
        yCenter: this.chart.height/2
      });
      this.updateScaleRange(this.datasets);
      this.scale.setScaleSize();
      this.scale.buildYLabels();
    },
    draw : function(ease){
      var easeDecimal = ease || 1,
        ctx = this.chart.ctx;
      this.clear();
      this.scale.draw();

      helpers.each(this.datasets,function(dataset){

        //Transition each point first so that the line and point drawing isn't out of sync
        helpers.each(dataset.points,function(point,index){
          if (point.hasValue()){
            point.transition(this.scale.getPointPosition(index, this.scale.calculateCenterOffset(point.value)), easeDecimal);
          }
        },this);



        //Draw the line between all the points
        ctx.lineWidth = this.options.datasetStrokeWidth;
        ctx.strokeStyle = dataset.strokeColor;
        ctx.beginPath();
        helpers.each(dataset.points,function(point,index){
          if (index === 0){
            ctx.moveTo(point.x,point.y);
          }
          else{
            ctx.lineTo(point.x,point.y);
          }
        },this);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = dataset.fillColor;
        ctx.fill();

        //Now draw the points over the line
        //A little inefficient double looping, but better than the line
        //lagging behind the point positions
        helpers.each(dataset.points,function(point){
          if (point.hasValue()){
            point.draw();
          }
        });

      },this);

    }

  });





}).call(this);