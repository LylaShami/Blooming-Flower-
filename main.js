

(function($){
  "use strict";

  // Vars
  var $body = $('body'),
    $siteNavbar = $('.site-navbar'),
    $siteNavbarCollapse = $('#navbarCollapse'),
    $siteNavbarToggler = $('.site-navbar .navbar-toggler-alternative'),
    slideAnimaionRun = false;

  function getWindowWidth(){
    return Math.max($(window).width(), window.innerWidth);
  }

  function getWindowHeight(){
    return Math.max($(window).height(), window.innerHeight );
  }

  function getDocumentWidth(){
    return Math.max($(document).width(), document.body.clientWidth);
  }

  // [1. Loader]
  window.addEventListener( 'load', function(){
    document.querySelector('body').classList.add('loaded');
  });

  // [2. Slide website layout]
  function muriel_websiteSliderLayout(){
    if( !$body.hasClass('slide-website') )
      return true;

    var $websiteSliderItem = $('.website-slider-item'),
      websiteSliderItemLength = $websiteSliderItem.length,
      websiteSliderItemsWidth = websiteSliderItemLength * getDocumentWidth();

    $websiteSliderItem.css( 'width', getDocumentWidth() );
    $('.website-slider-inner').css( 'width', websiteSliderItemsWidth );
  }

  // [3. Navigation]
  function muriel_navigation(){

    // Navigation collapse
    $siteNavbarCollapse.on( 'show.bs.collapse', function(){
      $siteNavbar.addClass('navbar-toggled-show');
      muriel_navigationChangeClasses('toggled');
    });

    $siteNavbarCollapse.on( 'hidden.bs.collapse', function(){
      $siteNavbar.removeClass('navbar-toggled-show');

      if( $siteNavbar.hasClass('scrolled') ){
        muriel_navigationChangeClasses('scrolled');
      } else {
        muriel_navigationChangeClasses();
      }
    });

    // Close nav on click outside of '.site-navbar'
    $(document).on( 'click', function(e){
      if ( $('.site-navbar').is(e.target) || $(e.target).parents('.site-navbar').length > 0 || $('.site-navbar').is(e.target) || $(e.target).hasClass('navbar-toggler') ){
        return;
      };

      if ( $siteNavbarToggler.attr('aria-expanded') === 'true' ){
        $siteNavbarToggler.trigger('click');
      }
    });

    // Show selected slide part on click
    $(document).on( 'click', '.site-navbar a, a.scrollto', function(e){
      if( !$body.hasClass('slide-website') )
        return true;

      if (this.hash !== ''){
        if( $( this.hash ).length > 0 && $( this.hash ).hasClass('website-slider-item') ){
          e.preventDefault();

          muriel_showWebsiteSliderItem(this.hash);
        }
      }
    });

    // Arrow keys support
    document.addEventListener( 'keydown', function(e){
      if( !$body.hasClass('slide-website') )
        return true;

      if ($('input,select,textarea').is(':focus')){
        return true;
      }

      if( ( !e.keyCode == 37 || !e.keyCode == 39 ) && e.repeat )
        return true;

      var currentPart = $('.site-navbar li.active');
      if( $('.site-navbar li.active').length === 0 ){
        currentPart = $('.site-navbar li').first();
      }

      if( e.keyCode == 37 && !e.repeat ){ // prev
        var prev_target = currentPart.prev().find('a').attr('href');

        muriel_showWebsiteSliderItem(prev_target);
      } else if( e.keyCode == 39 && !e.repeat ){ // next
        var next_target = currentPart.next().find('a').attr('href');

        muriel_showWebsiteSliderItem(next_target);
      }
    });

  }

  function muriel_navigationOnScroll(){
    var scrollPos = $(window).scrollTop();

    if ( scrollPos > 0 ){
      if ( $siteNavbar.hasClass('scrolled') ){
        return true;
      }

      $siteNavbar.addClass('scrolled');
      $siteNavbar.removeClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        muriel_navigationChangeClasses('toggled');
      } else {
        muriel_navigationChangeClasses('scrolled');
      }
    } else {
      $siteNavbar.removeClass('scrolled');
      $siteNavbar.addClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        muriel_navigationChangeClasses('toggled');
      } else {
        muriel_navigationChangeClasses();
      }
    }
  }

  function muriel_navigationResize(){
    var scrollPos = $(window).scrollTop();

    if( getWindowWidth() >= 992 ){
      if ( $siteNavbarToggler.attr('aria-expanded') == 'true' ){
        $siteNavbar.removeClass('navbar-toggled-show');
        $siteNavbarCollapse.removeClass('show').css( 'display', '' );
        $siteNavbarToggler.attr('aria-expanded','false').addClass('collapsed');
      }
    }
  
    if ( scrollPos > 0 ){
      $siteNavbar.addClass('scrolled');
      $siteNavbar.removeClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        muriel_navigationChangeClasses('toggled');
      } else {
        muriel_navigationChangeClasses('scrolled');
      }
    } else {
      $siteNavbar.removeClass('scrolled');
      $siteNavbar.addClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        muriel_navigationChangeClasses('toggled');
      } else {
        muriel_navigationChangeClasses();
      }
    }
  }

  var nav_event_old;
  function muriel_navigationChangeClasses(nav_event){
    if( nav_event_old === nav_event )
      return false;

    if( nav_event === 'toggled' ){
      $('[data-navbar-toggled]').each(function(){
        var el = $(this),
          base = el.attr('data-navbar-base') ? el.attr('data-navbar-base') : '',
          toggled = el.attr('data-navbar-toggled') ? el.attr('data-navbar-toggled') : '',
          scrolled = el.attr('data-navbar-scrolled') ? el.attr('data-navbar-scrolled') : '';

        el.removeClass(base,scrolled).addClass(toggled);
      });
    } else if( nav_event === 'scrolled' ){
      $('[data-navbar-scrolled]').each(function(){
        var el = $(this),
          base = el.attr('data-navbar-base') ? el.attr('data-navbar-base') : '',
          toggled = el.attr('data-navbar-toggled') ? el.attr('data-navbar-toggled') : '',
          scrolled = el.attr('data-navbar-scrolled') ? el.attr('data-navbar-scrolled') : '';

        el.removeClass(base,toggled).addClass(scrolled);
      });
    } else {
      $('[data-navbar-base]').each(function(){
        var el = $(this),
          base = el.attr('data-navbar-base') ? el.attr('data-navbar-base') : '',
          toggled = el.attr('data-navbar-toggled') ? el.attr('data-navbar-toggled') : '',
          scrolled = el.attr('data-navbar-scrolled') ? el.attr('data-navbar-scrolled') : '';

        el.removeClass(toggled,scrolled).addClass(base);
      });
    }

    nav_event_old = nav_event;
  }

  function muriel_showWebsiteSliderItem(target){
    if( !$body.hasClass('slide-website') )
      return false;

    if( slideAnimaionRun )
      return false;

    if( $( target ).length > 0 && $( target ).hasClass('website-slider-item') ){
      if ( $( target ).hasClass('active') )
        return false;

      slideAnimaionRun = true;

      var position = $(target).index();
      if ( position > 0 ){
        position = position * -1;
      }
      var  move = position * getDocumentWidth();

      $('.website-slider-inner').css('transform', 'translate3d('+move+'px, 0px, 0px)');
      $('.website-slider-item').removeClass('active');
      $('.site-navbar li').removeClass('active');
      $('.site-navbar a[href="'+target+'"]').parents('li').addClass('active');
      setTimeout(function(){

        if( !$body.hasClass('mobile') ){
          $('.website-slider-item .animated').each( function(){
            var elem = $(this),
              animation = elem.data('animation');
            elem.removeClass( animation + ' visible' );
          });
        }

        $(target).addClass('active');

        if( !$body.hasClass('mobile') ){
          $(target).find('.animated').each( function(){
            var elem = $(this),
              animation = elem.data('animation');
            if ( !elem.hasClass('visible') ){
              var animationDelay = elem.data('animation-delay');
              if ( animationDelay ){
                setTimeout(function(){
                  elem.addClass( animation + ' visible' );
                }, animationDelay);
              } else {
                elem.addClass( animation + ' visible' );
              }
            }
          });
        }

        slideAnimaionRun = false;

      }, 500);
    }
  }

  function muriel_websiteSliderResize(){
    if( !$body.hasClass('slide-website') )
      return true;

    var currentPart = $('.site-navbar li.active').find('a').attr('href');
    if( $('.site-navbar li.active').length === 0 ){
      currentPart = $('.site-navbar li').first().find('a').attr('href');
    }
    var position = $(currentPart).index();
    if ( position > 0 ){
      position = position * -1;
    }
    var  move = position * getDocumentWidth();

    $('.website-slider-inner').css('transform', 'translate3d('+move+'px, 0px, 0px)');
  }

  function muriel_showFirstWebsiteSliderItem(){
    if( !$body.hasClass('slide-website') )
      return true;

    var windowHash = window.location.hash ? window.location.hash : '',
      loadSlide;

    if( windowHash === '#!' ){
      loadSlide = '#' + $('.website-slider-item').first().attr('id');
    } else if( $(windowHash).length > 0 && $(windowHash).hasClass('website-slider-item') ){
      loadSlide = windowHash;
    } else {
      loadSlide = '#' + $('.website-slider-item').first().attr('id');
    }

    muriel_showWebsiteSliderItem(loadSlide);
  }

  // [4. Backgrounds]
  function muriel_backgrounds(){

    // Image
    var $bgImage = $('.bg-image-holder');
    if($bgImage.length){
      $bgImage.each(function(){
        var $self = $(this);
        var src = $self.children('img').attr('src');

        $self.css('background-image','url('+src+')').children('img').hide();
      });
    }

    // Video Background
    if( $body.hasClass('mobile') ){
      $('.video-wrapper').css('display', 'none');
    }

    // Granim
    $('[data-gradient-bg]').each( function( index, element ){
      var granimParent = $(this),
        granimID = 'granim-'+index+'',
        colours = granimParent.attr('data-gradient-bg'),
        colours = colours.replace(' ',''),
        colours = colours.replace(/'/g, '"')
        colours = JSON.parse( colours );

      // Add canvas
      granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

      var granimInstance = new Granim({
        element: '#'+granimID,
        name: 'basic-gradient',
        direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states : {
          "default-state": {
            gradients: colours
          }
        }
      });
    });

  }

  // [5. Countdown]
  function muriel_countdown(){
    var countdown = $('.countdown[data-countdown]');

    if (countdown.length > 0) {
      countdown.each(function() {
        var $countdown = $(this),
          finalDate = $countdown.data('countdown');
        $countdown.countdown(finalDate, function(event) {
          $countdown.html(event.strftime(
            '<div class="countdown-container row"><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%-D</div><span class="title">Day%!d</span></div></div><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%H</div><span class="title">Hours</span></div></div><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%M</div><span class="title">Minutes</span></div></div><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%S</div><span class="title">Seconds</span></div></div></div>'
          ));
        });
      });
    }
  }

  // [6. Subscribe Form]
  function muriel_subscribeForm(){
    var $subscribeForm = $('.subscribe-form');

    if ( $subscribeForm.length > 0 ){
      $subscribeForm.each( function(){
        var el = $(this),
          elResult = el.find('.subscribe-form-result');

        el.find('form').validate({
          submitHandler: function(form) {
            elResult.fadeOut( 500 );

            $(form).ajaxSubmit({
              target: elResult,
              dataType: 'json',
              resetForm: true,
              success: function( data ) {
                elResult.html( data.message ).fadeIn( 500 );
                if( data.alert != 'error' ) {
                  $(form).clearForm();
                  setTimeout(function(){
                    elResult.fadeOut( 500 );
                  }, 5000);
                };
              }
            });
          }
        });

      });
    }
  }

  // [7. Contact Form]
  function muriel_contactForm(){
    var $contactForm = $('.contact-form');

    if ( $contactForm.length > 0 ){
      $contactForm.each( function(){
        var el = $(this),
          elResult = el.find('.contact-form-result');

        el.find('form').validate({
          submitHandler: function(form) {
            elResult.fadeOut( 500 );

            $(form).ajaxSubmit({
              target: elResult,
              dataType: 'json',
              success: function( data ) {
                elResult.html( data.message ).fadeIn( 500 );
                if( data.alert != 'error' ) {
                  $(form).clearForm();
                  setTimeout(function(){
                    elResult.fadeOut( 500 );
                  }, 5000);
                };
              }
            });
          }
        });

      });
    }
  }

  // [8. Bootstrap]
  function muriel_bootstrap() {

    // Botostrap Tootltips
        $('[data-toggle="tooltip"]').tooltip();

        // Bootstrap Popovers
        $('[data-toggle="popover"]').popover();

  }

  $(document).ready(function($){
    muriel_websiteSliderLayout();
    muriel_navigation();
    muriel_backgrounds();
    muriel_countdown();
    muriel_subscribeForm();
    muriel_contactForm();
    muriel_showFirstWebsiteSliderItem();
  });

  $(window).on('load', function(){
    muriel_websiteSliderLayout();
  });

  var clear_muriel_websiteSliderLayout;
  var clear_muriel_websiteSliderResize;

  $(window).on('resize', function(){
    muriel_navigationResize();

    clear_muriel_websiteSliderLayout = setTimeout( muriel_websiteSliderLayout(), 20 );
    clear_muriel_websiteSliderResize = setTimeout( muriel_websiteSliderResize(), 20 );
  });

  $(window).on('scroll', function(){
    muriel_navigationOnScroll();
  });

})(jQuery);