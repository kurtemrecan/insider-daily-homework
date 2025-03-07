$(document).ready(function () {
  const userCount = 6;
  $('#loading').hide();

  $('#load-profiles').on('click', function () {
    //buton için ui kütüphanesinden alinmis shake animasyonu
    $(this).addClass('animate__animated animate__shakeX');
    setTimeout(() => {
      $(this).removeClass('animate__animated animate__shakeX');
    }, 400);

    $('#loading').show();
    $.get(`https://randomuser.me/api/?results=${userCount}`)
      .done(function (data) {
        const users = data.results;
        $('.profiles-container').empty();
        $('.profiles-slider').empty();
        $('#loading').hide();

        users.forEach((user, index) => {
          const cardHtml = `
            <div class="card" data-user='${JSON.stringify(user)}'>
              <img src="${user.picture.large}" alt="user-image" />
              <h5>${user.name.first} ${user.name.last}</h5>
              <p>${user.email}</p>
              <p>${user.phone}</p>
              <p>${user.location.country}</p>
            </div>`;

          $('.profiles-container').append(cardHtml);

          // slider carousel
          const sliderHtml = `
            <div class="slider-card slider">
              <img src="${user.picture.large}" alt="user-image" />
              <h5>${user.name.first} ${user.name.last}</h5>
              <p>${user.email}</p>
            </div>`;

          $('.profiles-slider').append(sliderHtml);

          //kartlar için efekt ve animasyonlar
          $('.card').hover(function () {
            $(this).stop().fadeTo(200, 1).css('background-color', '#f39c12');
          });

          $('.card')
            .eq(index)
            .hide()
            .fadeIn(3000)
            .delay(100 * index) // kartlar arası gecikme
            .slideDown(4000); // yavaşça aşağıya doğru gelsin
        });

        $('h3').fadeIn(); //başlığı gösterdik

        // slider carousel
        $('.profiles-slider').slick({
          dots: true,
          arrows: true,
          infinite: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 1500,
        });

        // fancybox modalı
        $('.card').on('click', function () {
          const user = JSON.parse($(this).attr('data-user')); // kullanıcı verisini alıp dönüştürdük

          const modalHTML = `
            <div class="fancybox-content">
              <img src="${user.picture.large}" alt="user-image" />
              <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Gender:</strong> ${user.gender}</p>
              <p><strong>Age:</strong> ${user.dob.age}</p>
              <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
              <p><strong>Phone:</strong> ${user.phone}</p>
              <p><strong>Street:</strong> ${user.location.street.name}, ${user.location.street.number}</p>
            </div>
          `;
          Fancybox.show([{ src: modalHTML, type: 'html' }], {
            animationEffect: 'fade',
            animationDuration: 500,
            keyboard: true,
            arrows: true,
            loop: true,
          });
        });

        $('#loading').hide();
      })
      .fail(function (xhr) {
        console.log('Hata oluştu: ', xhr);
        $('#loading').text('Yüklenirken hata oluştu!').show();
      });
  });
});
