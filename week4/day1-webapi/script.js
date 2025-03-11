$(document).ready(function () {
  const outputDiv = $('#output');

  //Metni kopyala
  $('.copy-btn').click(() => {
    const textCopy = $('#copyInput').val();

    navigator.clipboard
      .writeText(textCopy) //clipboard api'yi kullanarak metni panoya kopylar ve promise döner
      .then(function () {
        outputDiv.text(
          `Metin başarıyla koyalandı! Kopyalanan metin: ${textCopy}`
        );
      })
      .catch(function (error) {
        outputDiv.text('Metin kopyalanırken bir hata oluştu');
        console.warn('Clipboard API hatası: ', error);
      });
  });

  //pil göstergesi
  $('.battery-btn').click(function () {
    if (navigator.getBattery) {
      // bu battery apiyi kullanır
      navigator.getBattery().then(function (battery) {
        const level = battery.level * 100; //pil seviyesini 0 ile 1 arasında döndürüryor bu yüzden 100 ile çarparak yüzdelik değeri elde ediyoruz
        const charging = battery.charging ? 'Şarj oluyor' : 'Şarj olmuyor';
        outputDiv.text(`Pil Durumu: ${level}% - ${charging}`);
      });
    } else {
      outputDiv.text('Pil API desteklenmiyor.');
    }
  });

  // konuşmayı tanı
  $('.speech-btn').click(function () {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition(); //chrome ve bazı tarayıcılarda kullanılır
      recognition.lang = 'tr-TR'; // türkçe dil desteği
      recognition.interimResults = false; // geçici sonuçlara kapadık, true yapsaydık diğer kelimeleri de algılayabiliri gecici olarak
      recognition.maxAlternatives = 1; //kelimenin istediğimiz kadar benzer alternatiflerini bulur

      recognition.start(); // konusma tanımayı başlatır

      //kelimeyi tanıdığında calısır
      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        outputDiv.text('Tanınan Konuşma: ' + transcript);
      };

      recognition.onerror = function (event) {
        outputDiv.text('Hata: ' + event.error);
      };

      //oned sadece log mesajı döndürür
      recognition.onend = function () {
        console.log('Konuşma tanıma bitti.');
      };
    } else {
      outputDiv.text('Konuşma Tanıma API desteklenmiyor.');
    }
  });
});
