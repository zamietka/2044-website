export function ghostCursor(options) {
    let hasWrapperEl = options && options.element;
    let element = hasWrapperEl || document.body;
  
    let randomDelay = options && options.randomDelay;
    let minDelay = options && options.minDelay || 5;
    let maxDelay = options && options.maxDelay || 50;
  
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: width / 2 };
    let particles = [];
    let canvas, context, animationFrame;
  
    let baseImage = new Image();
    baseImage.src =
    "/images/cursor2.png";
    
  
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
  
    // Re-initialise or destroy the cursor when the prefers-reduced-motion setting changes
    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };
  
    function init() {
      // Don't show the cursor trail if the user has prefers-reduced-motion enabled
      if (prefersReducedMotion.matches) {
        console.log(
          "This browser has prefers reduced motion turned on, so the cursor did not init"
        );
        return false;
      }
  
      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.pointerEvents = "none";
  
      if (hasWrapperEl) {
        canvas.style.position = "absolute";
        element.appendChild(canvas);
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.style.position = "fixed";
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }
  
      bindEvents();
      loop();
    }
  
    // Bind events that are needed
    function bindEvents() {
      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("touchmove", onTouchMove, { passive: true });
      element.addEventListener("touchstart", onTouchMove, { passive: true });
      window.addEventListener("resize", onWindowResize);
    }
  
    function onWindowResize(e) {
      width = window.innerWidth;
      height = window.innerHeight;
  
      if (hasWrapperEl) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    }
  
    function onTouchMove(e) {
      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY, baseImage);
        }
      }
    }
  
    let getDelay = () => Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    let lastTimeParticleAdded = Date.now(),
        interval = getDelay();
  
    function onMouseMove(e) {
      if (randomDelay) {
        if (lastTimeParticleAdded + interval > Date.now()) return;
        lastTimeParticleAdded = Date.now();
        interval = getDelay();
      }
  
      if (hasWrapperEl) {
        const boundingRect = element.getBoundingClientRect();
        cursor.x = e.clientX - boundingRect.left;
        cursor.y = e.clientY - boundingRect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
  
      addParticle(cursor.x, cursor.y, baseImage);
    }
  
    function addParticle(x, y, image) {
      particles.push(new Particle(x, y, image));
    }
  
    function updateParticles() {
      if (particles.length == 0) {
        return;
      }
      
      context.clearRect(0, 0, width, height);
  
      // Update
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(context);
      }
  
      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles.splice(i, 1);
        }
      }
  
      if (particles.length == 0) {
        context.clearRect(0, 0, width, height);
      }
    }
  
    function loop() {
      updateParticles();
      animationFrame = requestAnimationFrame(loop);
    }
  
    function destroy() {
      canvas.remove();
      cancelAnimationFrame(animationFrame);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchstart", onTouchMove);
      window.addEventListener("resize", onWindowResize);
    };
  
    /**
     * Particles
     */
  
    function Particle(x, y, image) {
      const lifeSpan = 10;
      this.initialLifeSpan = lifeSpan; //ms
      this.lifeSpan = lifeSpan; //ms
      this.position = { x: x, y: y };
  
      this.image = image;
  
      this.update = function (context) {
        this.lifeSpan--;
        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
  
        context.globalAlpha = opacity;
        context.drawImage(
          this.image,
          this.position.x, // - (this.canv.width / 2) * scale,
          this.position.y //- this.canv.height / 2,
        );
      };
    }
  
    init();
  
    return {
      destroy: destroy
    }
  }