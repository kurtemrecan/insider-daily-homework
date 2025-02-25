/* 
  -Bir dizi (array) kullanarak ürünleri sepete eklemeli ve listelemeli. (name, price) 
  -reduce() metodunu kullanarak sepetin toplam fiyatını hesaplamalı.
  -Kullanıcıdan dinamik olarak ürün eklemesini isteyebiliriz (*)
  -Bir ürünü sepetten çıkarmalarını sağlayacak bir fonksiyon nasıl yazılabilir
   bunu araştırmalı ve yapabiliyorsa yapmalı. (*)
*/
function sepeteGit() {
  let sepet = [];
  // let totalPrice = 0; reduce kullandığımız için gerek kalmadı

  while (true) {
    let name = prompt('Sepete eklemek istediğiniz ürünü yazın: ');
    if (name == 'q') break;
    let price = Number(prompt('Ürünün fiyatı: '));

    sepet.push({ name, price });
    alert(`${name} ürünü sepete eklendi. Fiyat: ${price} TL`);
  }

  totalPrice = sepet.reduce((total, product) => total + product.price, 0);
  console.log('Sepetiniz: ', sepet);
  console.log('Toplam Fiyat: ', totalPrice, ' TL ');
}
