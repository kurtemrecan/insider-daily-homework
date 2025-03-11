$(document).ready(function () {
  const outputDiv = $('#output');

  //Metni kopyala
  $('button')
    .eq(0)
    .click(() => {
      const textCopy = 'Bu kopyalanacak metindir!';

      navigator.clipboard
        .writeText(textCopy) //clipboard api'yi kullanarak metni panoya kopylar ve promise döner
        .then(function () {
          outputDiv.text('Metin başarıyla koyalandı!');
        })
        .catch(function (error) {
          outputDiv.text('Metin kopyalanırken bir hata oluştu');
          console.warn('Clipboard API hatası: ', error);
        });
    });

  //Bildirim gönder
  $('button')
    .eq(1)
    .click(function () {});
});
