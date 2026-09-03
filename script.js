'use strict';

/* =========================================================
   PORTFOLIO WEBSITE
   CORRECTED COMPLETE JAVASCRIPT
   ========================================================= */

(function () {

  /* =========================================================
     DOM READY
     ========================================================= */

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  ready(function () {

    /* =========================================================
       HELPER FUNCTIONS
       ========================================================= */

    function select(selector, parent) {
      return (parent || document).querySelector(selector);
    }

    function selectAll(selector, parent) {
      return Array.prototype.slice.call(
        (parent || document).querySelectorAll(selector)
      );
    }

    function normalize(value) {
      if (value === null || value === undefined) {
        return '';
      }

      return String(value)
        .trim()
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }


    /* =========================================================
       SIDEBAR
       ========================================================= */

    var sidebar = select('[data-sidebar]');
    var sidebarButton = select('[data-sidebar-btn]');

    if (sidebar && sidebarButton) {

      sidebarButton.setAttribute('aria-expanded', 'false');

      sidebarButton.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        var opened = sidebar.classList.contains('active');

        sidebar.classList.toggle('active', !opened);

        sidebarButton.setAttribute(
          'aria-expanded',
          !opened ? 'true' : 'false'
        );

      });

    }


    /* =========================================================
       CLOSE SIDEBAR OUTSIDE CLICK
       ========================================================= */

    document.addEventListener('click', function (event) {

      if (!sidebar || !sidebarButton) {
        return;
      }

      if (
        sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) &&
        !sidebarButton.contains(event.target)
      ) {

        sidebar.classList.remove('active');

        sidebarButton.setAttribute(
          'aria-expanded',
          'false'
        );

      }

    });


    /* =========================================================
       CERTIFICATE / TESTIMONIAL MODAL
       ========================================================= */

    var testimonialItems =
      selectAll('[data-testimonials-item]');

    var modalContainer =
      select('[data-modal-container]');

    var modalOverlay =
      select('[data-overlay]');

    var modalCloseButton =
      select('[data-modal-close-btn]');

    var modalImage =
      select('[data-modal-img]');

    var modalTitle =
      select('[data-modal-title]');

    var modalText =
      select('[data-modal-text]');


    function openModal(item) {

      if (!item || !modalContainer) {
        return;
      }

      var avatar = select(
        '[data-testimonials-avatar]',
        item
      );

      var title = select(
        '[data-testimonials-title]',
        item
      );

      var text = select(
        '[data-testimonials-text]',
        item
      );


      if (avatar && modalImage) {

        modalImage.src =
          avatar.currentSrc || avatar.src;

        modalImage.alt =
          avatar.alt || 'Certificate';

      }


      if (title && modalTitle) {

        modalTitle.textContent =
          title.textContent.trim();

      }


      if (text && modalText) {

        modalText.innerHTML =
          text.innerHTML;

      }


      modalContainer.classList.add('active');

      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }

      document.body.classList.add('modal-open');

    }


    function closeModal() {

      if (modalContainer) {
        modalContainer.classList.remove('active');
      }

      if (modalOverlay) {
        modalOverlay.classList.remove('active');
      }

      document.body.classList.remove('modal-open');

    }


    testimonialItems.forEach(function (item) {

      item.addEventListener('click', function () {
        openModal(item);
      });

    });


    if (modalCloseButton) {

      modalCloseButton.addEventListener('click', function (event) {

        event.preventDefault();
        closeModal();

      });

    }


    if (modalOverlay) {

      modalOverlay.addEventListener('click', function () {
        closeModal();
      });

    }


    document.addEventListener('keydown', function (event) {

      if (event.key === 'Escape') {
        closeModal();
      }

    });


    /* =========================================================
       PORTFOLIO FILTER
       ========================================================= */

    var filterSelect =
      select('[data-select]');

    var filterSelectBox =
      select('.filter-select-box');

    var selectValue =
      select('[data-select-value]');

    var selectItems =
      selectAll('[data-select-item]');

    var filterButtons =
      selectAll('[data-filter-btn]');

    var projects =
      selectAll('[data-filter-item]');

    var projectList =
      select('.project-list');


    var categoryNames = {

      all: 'All',

      business:
        'Business / Corporate Websites',

      ecommerce:
        'Ecommerce Websites'

    };


    function getCategory(value) {

      var text = normalize(value);

      if (!text) {
        return 'all';
      }


      if (
        text === 'all' ||
        text.indexOf('all') !== -1
      ) {
        return 'all';
      }


      if (
        text === 'business' ||
        text.indexOf('business') !== -1 ||
        text.indexOf('corporate') !== -1
      ) {
        return 'business';
      }


      if (
        text === 'ecommerce' ||
        text.indexOf('ecommerce') !== -1 ||
        text.indexOf('e-commerce') !== -1
      ) {
        return 'ecommerce';
      }


      return text;

    }


    function getFilterValue(element) {

      if (!element) {
        return 'all';
      }


      var dataFilter =
        element.getAttribute('data-filter');

      if (dataFilter) {
        return getCategory(dataFilter);
      }


      var dataCategory =
        element.getAttribute('data-category');

      if (dataCategory) {
        return getCategory(dataCategory);
      }


      return getCategory(
        element.textContent
      );

    }


    function openFilterDropdown() {

      if (!filterSelect) {
        return;
      }

      filterSelect.classList.add('active');

      filterSelect.setAttribute(
        'aria-expanded',
        'true'
      );

    }


    function closeFilterDropdown() {

      if (!filterSelect) {
        return;
      }

      filterSelect.classList.remove('active');

      filterSelect.setAttribute(
        'aria-expanded',
        'false'
      );

    }


    function updateDesktopButtons(category) {

      filterButtons.forEach(function (button) {

        var buttonCategory =
          getFilterValue(button);

        var active =
          buttonCategory === category;

        button.classList.toggle(
          'active',
          active
        );

        button.setAttribute(
          'aria-pressed',
          active ? 'true' : 'false'
        );

      });

    }


    function updateMobileValue(category) {

      if (!selectValue) {
        return;
      }

      selectValue.textContent =
        categoryNames[category] || 'All';

    }


    function updateMobileOptions(category) {

      selectItems.forEach(function (item) {

        var itemCategory =
          getFilterValue(item);

        var active =
          itemCategory === category;

        item.classList.toggle(
          'active',
          active
        );

        item.setAttribute(
          'aria-selected',
          active ? 'true' : 'false'
        );

      });

    }


    function animateProject(project, index) {

      project.classList.remove(
        'portfolio-filter-show'
      );

      void project.offsetWidth;

      project.style.setProperty(
        '--portfolio-delay',
        (index * 60) + 'ms'
      );

      project.classList.add(
        'portfolio-filter-show'
      );

    }


    function filterPortfolio(selectedCategory) {

      var category =
        getCategory(selectedCategory);

      var visibleProjects = [];


      projects.forEach(function (project) {

        var projectCategory =
          getCategory(
            project.getAttribute('data-category')
          );

        var show =
          category === 'all' ||
          projectCategory === category;


        project.classList.remove(
          'portfolio-filter-show'
        );


        if (show) {

          project.style.display = 'block';

          project.classList.add('active');

          project.setAttribute(
            'aria-hidden',
            'false'
          );

          visibleProjects.push(project);

        } else {

          project.style.display = 'none';

          project.classList.remove('active');

          project.setAttribute(
            'aria-hidden',
            'true'
          );

        }

      });


      updateDesktopButtons(category);

      updateMobileValue(category);

      updateMobileOptions(category);

      closeFilterDropdown();


      if (projectList) {

        projectList.setAttribute(
          'data-visible-count',
          String(visibleProjects.length)
        );

      }


      window.requestAnimationFrame(function () {

        visibleProjects.forEach(function (project, index) {

          animateProject(
            project,
            index
          );

        });

      });


      setTimeout(function () {
        setupScrollAnimations();
      }, 100);

    }


    /* =========================================================
       DESKTOP FILTER BUTTONS
       ========================================================= */

    filterButtons.forEach(function (button) {

      button.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        filterPortfolio(
          getFilterValue(button)
        );

      });

    });


    /* =========================================================
       MOBILE FILTER DROPDOWN
       ========================================================= */

    if (filterSelect) {

      filterSelect.setAttribute(
        'aria-expanded',
        'false'
      );


      filterSelect.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (
          filterSelect.classList.contains('active')
        ) {
          closeFilterDropdown();
        } else {
          openFilterDropdown();
        }

      });


      filterSelect.addEventListener('keydown', function (event) {

        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {

          event.preventDefault();

          if (
            filterSelect.classList.contains('active')
          ) {
            closeFilterDropdown();
          } else {
            openFilterDropdown();
          }

        }


        if (event.key === 'Escape') {
          closeFilterDropdown();
        }

      });

    }


    /* =========================================================
       MOBILE FILTER OPTIONS
       ========================================================= */

    selectItems.forEach(function (item) {

      item.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        filterPortfolio(
          getFilterValue(item)
        );

      });

    });


    /* =========================================================
       CLOSE FILTER OUTSIDE CLICK
       ========================================================= */

    document.addEventListener('click', function (event) {

      if (!filterSelectBox) {
        return;
      }

      if (!filterSelectBox.contains(event.target)) {
        closeFilterDropdown();
      }

    });


    /* =========================================================
       INITIAL PORTFOLIO
       ========================================================= */

    if (projects.length > 0) {
      filterPortfolio('all');
    }


    /* =========================================================
       PAGE NAVIGATION
       ========================================================= */

    var navigationLinks =
      selectAll('[data-nav-link]');

    var pages =
      selectAll('[data-page]');


    navigationLinks.forEach(function (link) {

      link.addEventListener('click', function (event) {

        event.preventDefault();


        var target =
          normalize(
            link.getAttribute('data-page') ||
            link.textContent
          );


        pages.forEach(function (page) {

          var pageName =
            normalize(
              page.getAttribute('data-page')
            );

          page.classList.toggle(
            'active',
            pageName === target
          );

        });


        navigationLinks.forEach(function (navLink) {

          navLink.classList.toggle(
            'active',
            navLink === link
          );

        });


        /* Close sidebar */

        if (sidebar) {
          sidebar.classList.remove('active');
        }

        if (sidebarButton) {

          sidebarButton.setAttribute(
            'aria-expanded',
            'false'
          );

        }


        /* Close filter */

        closeFilterDropdown();


        /* Scroll page to top */

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });


        setTimeout(function () {
          setupScrollAnimations();
        }, 100);

      });

    });


    /* =========================================================
       TECHNICAL SKILLS
       ========================================================= */

    var skillBars =
      selectAll('.skill-progress-fill');


    function prepareSkills() {

      skillBars.forEach(function (bar) {

        var width =
          bar.getAttribute('data-width');


        /* Get width from inline CSS */

        if (!width) {

          var style =
            bar.getAttribute('style') || '';

          var match =
            style.match(
              /width\s*:\s*([^;]+)/i
            );

          if (match) {
            width = match[1].trim();
          }

        }


        /* Get value from parent */

        if (!width) {

          var skillItem =
            bar.closest('.skills-item');

          if (skillItem) {

            var dataElement =
              select('[data-value]', skillItem);

            if (dataElement) {

              width =
                dataElement.getAttribute(
                  'data-value'
                );

            }

          }

        }


        if (!width) {
          width = '0%';
        }


        if (/^[0-9]+$/.test(width)) {
          width += '%';
        }


        bar.setAttribute(
          'data-target-width',
          width
        );


        bar.style.width = '0%';

      });

    }


    function animateSkills() {

      var skillLists =
        selectAll('.skills-list');


      skillLists.forEach(function (list) {

        var bars =
          selectAll(
            '.skill-progress-fill',
            list
          );


        bars.forEach(function (bar, index) {

          var width =
            bar.getAttribute(
              'data-target-width'
            ) || '0%';


          setTimeout(function () {

            bar.style.width = width;

          }, index * 100);

        });

      });

    }


    prepareSkills();


    /* =========================================================
       SKILL INTERSECTION OBSERVER
       ========================================================= */

    if ('IntersectionObserver' in window) {

      var skillLists =
        selectAll('.skills-list');


      skillLists.forEach(function (list) {

        var observer =
          new IntersectionObserver(
            function (entries, observerInstance) {

              entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                  return;
                }


                list.classList.add('is-visible');

                animateSkills();

                observerInstance.unobserve(
                  entry.target
                );

              });

            },
            {
              threshold: 0.15
            }
          );


        observer.observe(list);

      });

    } else {

      animateSkills();

    }


    /* =========================================================
       SCROLL REVEAL
       ========================================================= */

    var revealSelectors = [

      '.article-title',
      '.about-text p',
      '.testimonials-title',
      '.testimonials-item',
      '.timeline .title-wrapper',
      '.timeline-item',
      '.skills-title',
      '.skills-item',
      '.my_cv a',
      '.filter-list',
      '.filter-select-box',
      '.project-item',
      '.mapbox',
      '.form-title',
      '.input-wrapper',
      'textarea.form-input',
      '.form-btn'

    ];


    var revealObserver = null;


    function setupScrollAnimations() {

      var elements = [];


      revealSelectors.forEach(function (selector) {

        var found =
          selectAll(selector);

        found.forEach(function (element) {

          if (elements.indexOf(element) === -1) {
            elements.push(element);
          }

        });

      });


      if (!elements.length) {
        return;
      }


      if (revealObserver) {
        revealObserver.disconnect();
      }


      if (!('IntersectionObserver' in window)) {

        elements.forEach(function (element) {

          element.classList.add('is-visible');

        });

        return;

      }


      revealObserver =
        new IntersectionObserver(
          function (entries, observer) {

            entries.forEach(function (entry) {

              if (!entry.isIntersecting) {
                return;
              }


              entry.target.classList.add(
                'is-visible'
              );


              observer.unobserve(
                entry.target
              );

            });

          },
          {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
          }
        );


      elements.forEach(function (element, index) {

        if (
          element.classList.contains('project-item') &&
          element.style.display === 'none'
        ) {
          return;
        }


        element.classList.add('scroll-reveal');


        element.classList.remove(
          'reveal-left',
          'reveal-right',
          'reveal-scale'
        );


        if (index % 4 === 1) {
          element.classList.add('reveal-left');
        }


        if (index % 4 === 2) {
          element.classList.add('reveal-scale');
        }


        if (index % 4 === 3) {
          element.classList.add('reveal-right');
        }


        element.style.setProperty(
          '--reveal-delay',
          (
            Math.min(index % 6, 5) * 55
          ) + 'ms'
        );


        revealObserver.observe(element);

      });

    }


    /* =========================================================
       CONTACT FORM
       ========================================================= */

    var form =
      select('#contact-form');

    var formInputs =
      selectAll('[data-form-input]');

    var formButton =
      select('[data-form-btn]');


    /* Email subject */

    var emailSubject =
      'New Portfolio Enquiry';


    /* =========================================================
       FORM STATE
       ========================================================= */

    function updateFormState() {

      if (!form || !formButton) {
        return;
      }

      formButton.disabled =
        !form.checkValidity();

    }


    formInputs.forEach(function (input) {

      input.addEventListener(
        'input',
        updateFormState
      );

      input.addEventListener(
        'change',
        updateFormState
      );

    });


    /* =========================================================
       MOBILE NUMBER VALIDATION
       ========================================================= */

    var phoneInput =
      select('#phone');


    function validatePhone() {

      if (!phoneInput) {
        return true;
      }


      var phone =
        phoneInput.value.trim();


      var phonePattern =
        /^[6-9][0-9]{9}$/;


      if (phone === '') {

        phoneInput.setCustomValidity(
          'Mobile number is required.'
        );

        return false;

      }


      if (!phonePattern.test(phone)) {

        phoneInput.setCustomValidity(
          'Enter a valid 10-digit Indian mobile number.'
        );

        return false;

      }


      phoneInput.setCustomValidity('');

      return true;

    }


    if (phoneInput) {

      phoneInput.addEventListener(
        'input',
        function () {

          /* Numbers only */

          this.value =
            this.value.replace(/\D/g, '');


          /* Maximum 10 digits */

          if (this.value.length > 10) {

            this.value =
              this.value.slice(0, 10);

          }


          validatePhone();

          updateFormState();

        }
      );


      phoneInput.addEventListener(
        'blur',
        function () {

          validatePhone();

          updateFormState();

        }
      );

    }


    /* =========================================================
       EMAIL VALIDATION
       ========================================================= */

    var emailInput =
      select('input[type="email"]');


    if (emailInput) {

      emailInput.addEventListener(
        'input',
        updateFormState
      );

    }


    /* =========================================================
       EMAILJS INITIALIZATION
       ========================================================= */

    if (
      window.emailjs &&
      typeof window.emailjs.init === 'function'
    ) {

      try {

        window.emailjs.init({
          publicKey: 'VrVUOVw52_FteyZ7P'
        });

      } catch (error) {

        try {

          window.emailjs.init(
            'VrVUOVw52_FteyZ7P'
          );

        } catch (secondError) {

          console.warn(
            'EmailJS initialization failed.',
            secondError
          );

        }

      }

    }


    /* =========================================================
       EMAILJS CONTACT FORM
       ========================================================= */

    if (form) {

      form.addEventListener(
        'submit',
        function (event) {

          event.preventDefault();


          /* Validate phone */

          validatePhone();


          /* Validate complete form */

          if (!form.checkValidity()) {

            form.reportValidity();

            return;

          }


          /* Check EmailJS */

          if (
            !window.emailjs ||
            typeof window.emailjs.sendForm !== 'function'
          ) {

            alert(
              'Email service is unavailable. Please try again later.'
            );

            return;

          }


          /* Disable button */

          if (formButton) {

            formButton.disabled = true;

            formButton.classList.add(
              'is-sending'
            );

          }


          /* =====================================================
             CREATE SUBJECT FIELD
             ===================================================== */

          var subjectField =
            form.querySelector(
              'input[name="subject"]'
            );


          if (!subjectField) {

            subjectField =
              document.createElement('input');

            subjectField.type = 'hidden';

            subjectField.name = 'subject';

            form.appendChild(subjectField);

          }


          subjectField.value =
            emailSubject;


          /* =====================================================
             EMAILJS SEND
             ===================================================== */

          window.emailjs
            .sendForm(
              'service_5vkumg9',
              'template_pjvspf6',
              form
            )

            .then(function () {

              alert(
                'Message sent successfully!'
              );


              form.reset();

              /* Clear custom phone validation */

              if (phoneInput) {
                phoneInput.setCustomValidity('');
              }


              updateFormState();

            })

            .catch(function (error) {

              console.error(
                'EmailJS Error:',
                error
              );


              alert(
                'Failed to send message. Please try again.'
              );

            })

            .finally(function () {

              if (formButton) {

                formButton.classList.remove(
                  'is-sending'
                );

              }


              updateFormState();

            });

        }
      );

    }


    /* =========================================================
       IMAGE ERROR HANDLING
       ========================================================= */

    var images =
      selectAll('img');


    images.forEach(function (image) {

      image.addEventListener(
        'error',
        function () {

          image.classList.add(
            'image-load-error'
          );

        },
        {
          once: true
        }
      );

    });


    /* =========================================================
       THREE.JS BACKGROUND
       ========================================================= */

    function initThreeBackground() {

      var canvasHost =
        select('#bg-canvas');


      if (
        !canvasHost ||
        typeof window.THREE === 'undefined'
      ) {
        return;
      }


      /* Respect reduced motion */

      if (
        window.matchMedia &&
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
      ) {
        return;
      }


      try {

        var THREE =
          window.THREE;


        var scene =
          new THREE.Scene();


        var camera =
          new THREE.PerspectiveCamera(
            70,
            window.innerWidth /
              window.innerHeight,
            1,
            2200
          );


        var mobile =
          window.innerWidth < 700;


        camera.position.z =
          mobile ? 700 : 620;


        var renderer =
          new THREE.WebGLRenderer({
            alpha: true,
            antialias: !mobile
          });


        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            mobile ? 1.25 : 1.5
          )
        );


        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );


        canvasHost.innerHTML = '';

        canvasHost.appendChild(
          renderer.domElement
        );


        /* =====================================================
           PARTICLES
           ===================================================== */

        var particleCount;


        if (window.innerWidth < 480) {

          particleCount = 500;

        } else if (window.innerWidth < 700) {

          particleCount = 800;

        } else if (window.innerWidth < 1200) {

          particleCount = 1400;

        } else {

          particleCount = 2200;

        }


        var geometry =
          new THREE.BufferGeometry();


        var positions =
          new Float32Array(
            particleCount * 3
          );


        for (
          var i = 0;
          i < positions.length;
          i += 3
        ) {

          positions[i] =
            (
              Math.random() - 0.5
            ) * 2200;


          positions[i + 1] =
            (
              Math.random() - 0.5
            ) * 1800;


          positions[i + 2] =
            (
              Math.random() - 0.5
            ) * 1800;

        }


        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(
            positions,
            3
          )
        );


        var material =
          new THREE.PointsMaterial({

            color: 0x42a5f5,

            size:
              mobile ? 1 : 1.5,

            transparent: true,

            opacity: 0.45,

            depthWrite: false

          });


        var particles =
          new THREE.Points(
            geometry,
            material
          );


        scene.add(particles);


        /* =====================================================
           WIREFRAME SPHERE
           ===================================================== */

        var sphere =
          new THREE.Mesh(

            new THREE.IcosahedronGeometry(
              mobile ? 70 : 100,
              2
            ),

            new THREE.MeshBasicMaterial({

              color: 0x1565c0,

              wireframe: true,

              transparent: true,

              opacity: 0.16

            })

          );


        sphere.position.x =
          mobile ? 180 : 300;


        sphere.position.y =
          -100;


        sphere.position.z =
          -180;


        scene.add(sphere);


        /* =====================================================
           MOUSE MOVEMENT
           ===================================================== */

        var targetX = 0;
        var targetY = 0;

        var currentX = 0;
        var currentY = 0;


        if (!mobile) {

          document.addEventListener(
            'mousemove',
            function (event) {

              targetX =
                (
                  event.clientX -
                  window.innerWidth / 2
                ) * 0.02;


              targetY =
                (
                  event.clientY -
                  window.innerHeight / 2
                ) * 0.015;

            },
            {
              passive: true
            }
          );

        }


        /* =====================================================
           ANIMATION
           ===================================================== */

        var animationId = 0;

        var running = true;


        function animate() {

          if (!running) {
            return;
          }


          animationId =
            requestAnimationFrame(
              animate
            );


          currentX +=
            (
              targetX - currentX
            ) * 0.03;


          currentY +=
            (
              targetY - currentY
            ) * 0.03;


          particles.rotation.y +=
            0.0004;


          particles.rotation.x +=
            0.00012;


          sphere.rotation.x +=
            0.0008;


          sphere.rotation.y +=
            0.0012;


          camera.position.x +=
            (
              currentX * 0.15 -
              camera.position.x
            ) * 0.01;


          camera.position.y +=
            (
              -currentY * 0.10 -
              camera.position.y
            ) * 0.01;


          camera.lookAt(
            scene.position
          );


          renderer.render(
            scene,
            camera
          );

        }


        animate();


        /* =====================================================
           PAGE VISIBILITY
           ===================================================== */

        document.addEventListener(
          'visibilitychange',
          function () {

            if (document.hidden) {

              running = false;

              cancelAnimationFrame(
                animationId
              );

            } else {

              if (!running) {

                running = true;

                animate();

              }

            }

          }
        );


        /* =====================================================
           RESIZE
           ===================================================== */

        var resizeTimer = null;


        window.addEventListener(
          'resize',
          function () {

            clearTimeout(
              resizeTimer
            );


            resizeTimer =
              setTimeout(
                function () {

                  camera.aspect =
                    window.innerWidth /
                    window.innerHeight;


                  camera.updateProjectionMatrix();


                  renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                  );

                },
                150
              );

          },
          {
            passive: true
          }
        );


      } catch (error) {

        console.warn(
          'Three.js disabled:',
          error
        );


        canvasHost.innerHTML = '';

      }

    }


    /* =========================================================
       START
       ========================================================= */

    setupScrollAnimations();

    updateFormState();


    if (
      document.readyState === 'complete'
    ) {

      initThreeBackground();

    } else {

      window.addEventListener(
        'load',
        initThreeBackground,
        {
          once: true
        }
      );

    }

  });

})();
