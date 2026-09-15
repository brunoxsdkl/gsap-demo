gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.defaults({ ease: 'power3.out' });

gsap.set('.logo span', { scale: 0.6, transformOrigin: 'left center' });

const intro = gsap.timeline({ defaults: { duration: 0.6 } });
intro
  .from('.logo', { y: -80, opacity: 0, duration: 0.9 })
  .from('.logo span', { scale: 1.8, opacity: 0, duration: 0.7 }, '-=0.5')
  .from('.tagline', { y: 20, opacity: 0 }, '-=0.3')
  .from('.stage', { opacity: 0, y: 30 }, '-=0.3');

const dots = gsap.timeline({ repeat: -1, paused: true, yoyo: true });
dots.to('.dot', { scale: 1.4, opacity: 1, stagger: 0.12, duration: 0.35, ease: 'back.out(2)' });
dots.to('.dot', { scale: 0.9, stagger: 0.12, duration: 0.3 }, '+=0.4');

document.getElementById('playAll').addEventListener('click', () => dots.play());

gsap.to('.card', {
  opacity: 1, y: -26, stagger: 0.15, duration: 0.8,
  scrollTrigger: { trigger: '#cards', start: 'top 80%', toggleActions: 'play none none none' },
});

const counterObj = { v: 0 };
gsap.to(counterObj, {
  v: 100, ease: 'none',
  scrollTrigger: { trigger: '.pin-section', start: 'top top', end: '+=120%', pin: true, scrub: true },
  onUpdate() {
    const n = gsap.utils.clamp(0, 100, counterObj.v);
    document.getElementById('counter').textContent = Math.round(n) + '%';
    gsap.set('#bar', { width: n + '%' });
  },
});

if (reduce) {
  gsap.set(['.card', '.dot', '.logo span', '.tagline', '.stage'], { opacity: 1, scale: 1, y: 0 });
}
