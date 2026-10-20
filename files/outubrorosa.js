(function(){
  var d=document,root=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  try{
    // barra de progresso de leitura
    var prog=d.getElementById('prog');
    function onScroll(){var h=root.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+'%'}
    addEventListener('scroll',onScroll,{passive:true});onScroll();

    // pétalas caindo no topo
    if(!rm){var hero=d.querySelector('.hero');
      for(var i=0;i<14;i++){var p=d.createElement('span');p.className='petal';
        p.style.left=Math.random()*100+'%';p.style.animationDuration=(9+Math.random()*9)+'s';
        p.style.animationDelay=(-Math.random()*14)+'s';
        p.style.setProperty('--dx',(Math.random()*120-60)+'px');p.style.setProperty('--r',(Math.random()*540-270)+'deg');
        p.style.transform='scale('+(.6+Math.random()*.9)+')';hero.appendChild(p)}}

    // surgir ao rolar
    d.querySelectorAll('.card,.head,.note,.alert,.poster,details,.final .wrap>*').forEach(function(el,i){el.classList.add('rv');el.style.setProperty('--d',(i%3)*.08+'s')});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    d.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

    // contadores, rosca e barra animados
    var fmt=function(n,dec){return n.toFixed(dec).replace('.',',')};
    var donut=d.getElementById('donut'),bar=d.querySelector('.bar i');
    if(!rm){donut.style.strokeDasharray='0 251.3';bar.style.width='0'}
    var info=d.querySelector('.info');
    new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();
      if(!rm){donut.style.transition='stroke-dasharray 1.4s ease';donut.style.strokeDasharray='75.4 251.3';
        bar.style.transition='width 1.4s ease';bar.style.width='90%';
        info.querySelectorAll('[data-count]').forEach(function(el){
          var to=+el.dataset.count,dec=+(el.dataset.dec||0),t0=performance.now();
          (function step(t){var k=Math.min((t-t0)/1400,1);el.textContent=fmt(to*(1-Math.pow(1-k,3)),dec);if(k<1)requestAnimationFrame(step)})(t0)})}
    },{threshold:.3}).observe(info);

    // destaque do item de menu da seção atual
    var links=[].slice.call(d.querySelectorAll('nav a'));
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)so.observe(s)});
  }catch(e){root.classList.remove('js')}
})();