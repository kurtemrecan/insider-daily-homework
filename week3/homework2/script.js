$(document).ready(function () {
  let start = 0;
  let limit = 5;
  let isLoading = false;
  let debounce;

  loadPost();

  function loadPost() {
    if (isLoading) return;
    isLoading = true;
    $('#loading').show();

    $.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    )
      .done((data) => {
        if (data.length > 0) {
          data.forEach((post) => {
            $('#postContainer').append(
              `<div class="post">
                            <h5>${post.title}</h5>
                            <p>${post.body}</p>
                            <small>Post ID: ${post.id}</small>
                         </div>`
            );
          });
          start += limit;
        } else {
          $('#loading').text('Veri bulunamadı').show();
        }
        isLoading = false;
        $('#loading').hide();
      })
      .fail((xhr) => {
        console.log('hata:', xhr);
        $('#loading').text('Yüklenirken bir hata oluştu!').show();
        //alert('Yüklenirken bir hata oluştu!');
      });
  }

  //çok gerekli değil ama kullanmak istedim
  function debouncePost() {
    clearTimeout(debounce); // bir diğer scrollda önceki zamanlayıcıyı iptal ettik

    debounce = setTimeout(() => {
      loadPost();
    }, 300);
  }

  //scrollTop kaydırma mesafesini ölçer
  $(window).scroll(function () {
    if (
      $(document).height() - $(window).height() - $(window).scrollTop() <
      100
    ) {
      if (!isLoading) {
        debouncePost();
      }
    }
  });
});
