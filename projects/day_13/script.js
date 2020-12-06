// debounce limits the amount of times of function is ran. 
// such as listening for the scrolls

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const sliderImages = document.querySelectorAll('.slide-in')

  function checkSlide(e) {
    sliderImages.forEach(slideImage => {
        // halfway through image
        const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
        // bottom of the image
        const imageBottom = slideImage.offsetTop + slideImage.height

        // will check if image is half shown
        const isHalfShown = slideInAt > slideImage.offsetTop;

        // will check if we scrolled past image
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            slideImage.classList.add('active')
        } else {
            slideImage.classList.remove('active')
        }
    })
  }

  window.addEventListener('scroll', debounce(checkSlide))