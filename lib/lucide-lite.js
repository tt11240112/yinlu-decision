(function(){
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
    var circle=document.createElementNS(ns,'circle');
    circle.setAttribute('cx','12');circle.setAttribute('cy','12');circle.setAttribute('r','10');
    circle.setAttribute('fill','currentColor');
    svg.appendChild(circle);
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
