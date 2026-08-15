(function(){
  var iconPaths = {
    'calendar-days': ['M8 2v4','M16 2v4','M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2','M3 10h18','M8 14h.01','M12 14h.01','M16 14h.01','M8 18h.01','M12 18h.01'],
    'calendar-plus': ['M8 2v4','M16 2v4','M3 10h18','M5 4h14a2 2 0 0 1 2 2v7','M13 21H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2','M19 16v6','M16 19h6'],
    'chevron-left': ['m15 18-6-6 6-6'],
    'chevron-right': ['m9 18 6-6-6-6'],
    'chevron-down': ['m6 9 6 6 6-6'],
    'search': ['M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16','m21 21-4.3-4.3'],
    'trash-2': ['M3 6h18','M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2','M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6','M10 11v6','M14 11v6'],
    'x': ['M18 6 6 18','m6 6 12 12'],
    'sparkles': ['m12 3-1.9 4.7L5.4 9.6l4.7 1.9L12 16l1.9-4.5 4.7-1.9-4.7-1.9Z','M5 3v4','M3 5h4','M19 17v4','M17 19h4'],
    'message-circle-question': ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z','M9.1 9a3 3 0 1 1 5.8 1c0 2-3 3-3 3','M12 17h.01'],
    'messages-square': ['M7 8h10','M7 12h6','M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z'],
    'message-square-off': ['m2 2 20 20','M8.5 3H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2','M9 17H7l-4 4V5a2 2 0 0 1 .6-1.4','M8 9h.01','M12 13h.01'],
    'shield-check': ['M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z','m9 12 2 2 4-4'],
    'check': ['m20 6-11 11-5-5'],
    'git-compare-arrows': ['m13 17 5-5-5-5','M18 12H6','m11 7-5 5 5 5','M6 12h12'],
    'scan-search': ['M3 7V5a2 2 0 0 1 2-2h2','M17 3h2a2 2 0 0 1 2 2v2','M21 17v2a2 2 0 0 1-2 2h-2','M7 21H5a2 2 0 0 1-2-2v-2','M8 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0','m16 16-2.5-2.5'],
    'bug': ['M8 2v4','M16 2v4','M3 13h4','M17 13h4','M6 9H3','M21 9h-3','M6 17H3','M21 17h-3','M8 6h8a2 2 0 0 1 2 2v8a6 6 0 0 1-12 0V8a2 2 0 0 1 2-2'],
    'refresh-cw': ['M21 12a9 9 0 0 0-15.5-6.2L3 8','M3 3v5h5','M3 12a9 9 0 0 0 15.5 6.2L21 16','M16 16h5v5'],
    'send': ['m22 2-7 20-4-9-9-4Z','M22 2 11 13']
  };

  function createIcon(name){
    var ns='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('width','17');
    svg.setAttribute('height','17');
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('focusable','false');
    svg.style.display = 'inline-block';
    svg.style.verticalAlign = 'middle';
    if(iconPaths[name]){
      svg.setAttribute('fill','none');
      svg.setAttribute('stroke','currentColor');
      svg.setAttribute('stroke-width','2');
      svg.setAttribute('stroke-linecap','round');
      svg.setAttribute('stroke-linejoin','round');
      iconPaths[name].forEach(function(data){
        var path=document.createElementNS(ns,'path');
        path.setAttribute('d',data);
        svg.appendChild(path);
      });
    } else {
      var circle=document.createElementNS(ns,'circle');
      circle.setAttribute('cx','12');circle.setAttribute('cy','12');circle.setAttribute('r','10');
      circle.setAttribute('fill','currentColor');
      svg.appendChild(circle);
    }
    return svg;
  }
  window.lucide = {
    createIcons: function(){
      // Replace <i data-lucide="name"></i> with a simple placeholder SVG
      document.querySelectorAll('[data-lucide]').forEach(function(el){
        try {
          var tag = el.tagName.toLowerCase();
          var name = el.getAttribute('data-lucide') || '';
          var svg = createIcon(name);
          // copy classes so CSS sizing/color can apply
          if (el.className) svg.setAttribute('class', el.className);
          // copy inline styles
          if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
          // preserve aria-hidden / role if present
          if (el.hasAttribute('aria-hidden')) svg.setAttribute('aria-hidden', el.getAttribute('aria-hidden'));
          el.parentNode.replaceChild(svg, el);
        } catch (e) {
          // ignore individual icon errors
          console.error('lucide-lite icon error', e);
        }
      });
    }
  };
})();
