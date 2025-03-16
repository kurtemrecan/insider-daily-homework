Kodun içinde yorum satıları yokmuş gibi ui yı incelledim.

Daha sonra koda baktım ve potansiyel hataların nerelerden gelebileceğine dair kafamda bir başlangıç noktası belirledim.

Potansiyel hataları gözlemleyebilmek adına sepete ekleme silme vb işlemler yaptım.

Öncelikle sepete ekle butonların işlevselliğini incelemek için (button classı addToCart’tı), öncelikle addToCard fonksiyonuna breakpoint koydum daha sonra satır satır incelemeye başladım, ardından ürünü gördüğünü checkledim ve bir sonraki satıra geçtim, addItem() fonksiyonunun içine girdim. Seçili oran ürünümü görüyordum, ilk iki if koşullarının ikisine girmedi daha sonra 3. if koşulumu da başarıyla geçti. calculateTotal bölümünde bir sorun olduğunu farkettim ve içine girdim ;çünkü sepette toplama işlemimde bir hata vardı. İtem’ları görüyordu fakat toplamada unutulan bir şey vardı o da miktar çarpımıydı. Bu yüzden ne kadar tıklarsam tıklayım sepete ekle butonuna sadece bir kez fiyat ekliyordu.

```jsx
return sum + item.price * item.quantity;
```

Bunu hallettikten sonra addToCart() fonksiyonunda bir sonraki satıra geçtim ve stockUpdate isimli eventi farkettim ve bununda içine girdim. İçinde renderProducts isimli bir fonksiyon vardı burada

stoğun güncellenmesi gerekiyordu fakat bunla ilgili bir kod göremedim daha sonra ilgili satıra

```jsx
product.stock -= quantity;
```

kodunu ekledim. Artık ürün sepete eklenince stok adeti azalıyordu ama bu seferde stok adeti 1den düşmüyordu bu da quantity değeri başta1 olarak tanımladığı ve ilgili satırda <= işareti kullanıldığı için şu değişikliği yaptım:

```jsx
product.stock < quantity;
```

Bunlardan sonra bir sıkıntı daha oluştu bu da stock miktar kısımı ve sepete ekle butonu ürünü silmeme rağmen güncellenmiyordu. Bende addItem()’dan çıkıp addToCart() fonksiyonunda bir satır daha atladım ve farkettimki stockUpdate isimli event var ve bunu işlevsel kılanda silme butonu

Daha sonra break pointimi temizledim ve silme butonun işlevselliğini kontrol etmek amacıyla inspect atıp hangi fonsiyonu tetiklediğini buldum. Bu removeItem fonksiyonuydu ve source bölümüne gidip ilgili alana bir breakpoint daha koydum ve daha sonra fonksiyonu çalıştırmak adına sil butonuna tıkladım ve satır satır incelemeye başladım, fonksiyondan çıkmasına ragmen herhangi bir tetiklenme olmadı ve farkettim ki şu satır eksik

```jsx
document.dispatchEvent(new Event('stockUpdate'));
```

Artık sepete ekle buttonu da aktif oluyor.

Daha sonra ui güncellemelerindeki potansiyel hataları kontrol ettim

İndirim uygularken karşılaştığım bir debug oldu, hatalı indirim yapması. Buna ulaşabilmek adına indirim uygula butonuna inspect attım ve type submit olduğunu gördüm bu bir form butonuydu ve id’si discount-form olan setUpEventHandlers()’ta applyDiscount() fonksiyonunu keşfettim ve hemen oraya bir breakpoint koydum. İndirim kodunu doğru girdim ve if içine başarıyla giriş yaptım artık sırada hangi fonksiyonalitede hata var onu keşfetmekte. Satır satır incelememi yaparken calculateTotal() fonksiyonunda hata olduğunu farkettim ve ilgili satırı şu şekilde değiştirdim:

```jsx
this.total = this.total - (this.total *= 0.1);
```

İndirim uygularken karşılaştığım bir başka debug ise, geçersiz bir kod girdiğimde çıkan mesajın tekrarlanmasıydı bunu çözmek adına mesaja inspect atıp showError fonksiyonuna girdim ve içeride farkettim ki her hatada ekrana mesajı bastır şeklinde bir hata tespitettim ve ilgili satır:

```jsx
errorElement.textContent = message + '\n';
```

Bu şekilde düzellttim ve daha sonra doğru kodu girdiğinde mesajın kaybolması için applyDiscount() fonksiyonuna:

```jsx
this.showError('');
```

satırını ekledim.
Her şey için teşekkür ederim.
