/* prompt() ile kullanıcıdan isim, yaş ve meslek almalı ve bir nesne (object) içinde saklamalı. */

function kullanici() {
  let isim = prompt('Adınız nedir?');
  let yas = prompt('Yaşınız kaç?');
  let meslek = prompt('Mesleğiniz nedir?');

  let kullaniciBilgileri = {
    isim: isim,
    yas: Number(yas), //Number demezsek yaşı String bir şekilde döner!!
    meslek: meslek,
  };
  alert(`Kullanıcı Bilgileri: {name: ${isim}, age: ${yas}, job: ${meslek}}`);
  console.log('Kullanıcı Bilgileri: ', kullaniciBilgileri);
}
/*commit deneme*/
