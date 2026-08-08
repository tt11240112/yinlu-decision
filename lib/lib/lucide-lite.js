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
    circle.setAttribute('cx','12'); circle.setAttribute('cy','12'); circle.setAttribute('r','10');
    circle.setAttribute('fill','currentColor');
    svg.appendChild(circle);
    return svg;
  }
  window.lucide = {
    createIcons: function(){
      document.querySelectorAll('[data-lucide]').forEach(function(el){
        try {
          var name = el.getAttribute('data-lucide') || '';
          var svg = createIcon(name);
          if (el.className) svg.setAttribute('class', el.className);
          if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
          if (el.hasAttribute('aria-hidden')) svg.setAttribute('aria-hidden', el.getAttribute('aria-hidden'));
          el.parentNode.replaceChild(svg, el);
        } catch (e) {
          console.error('lucide-lite icon error', e);
        }
      });
    }
  };
})();
