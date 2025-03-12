//verileri çekiyoruz
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    //console.log(response.ok);
    if (!response.ok) {
      //ok=200-299
      throw new Error(`Responsta hata oluştu Hata Statüsü: ${response.status}`);
    }
    const json = await response.json();
    //console.log(json);
    displayUsers(json);
    saveToStorage(json);
  } catch (error) {
    console.error('Veriler yüklenirken hata oluştu!', error);
  }
}

//verileri görüntülüyoruz
function displayUsers(users) {
  const apiUsers = $('.ins-api-users');
  apiUsers.empty();

  users.forEach(function (user) {
    const userCard = $('<div>')
      .addClass('user-card')
      .append(
        $('<h2>').text(`Ad: ${user.name}`),
        $('<p>').text(`Email: ${user.email}`),
        $('<p>').text(
          `Adres: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}, ${user.address.geo.lat} / ${user.address.geo.lng} `
        ),
        $('<button>')
          .addClass('delete-btn')
          .text('Delete')
          .click(function () {
            const currentUser = JSON.parse(localStorage.getItem('userData'));
            const updateUsers = currentUser.filter((u) => u.id !== user.id);
            saveToStorage(updateUsers);
            displayUsers(updateUsers);
          })
      );

    apiUsers.append(userCard);
  });
}

function saveToStorage(users) {
  localStorage.setItem('userData', JSON.stringify(users));
  localStorage.setItem('storageTime', Date.now() + 10 * 1000); // şimdiki zamandan itibaren 24 saat(milisaniye cinsten oluşturduk date.nowdan ötürü)
}

function checkLocalStorage() {
  const userData = localStorage.getItem('userData');
  const storageTime = localStorage.getItem('storageTime');

  if (storageTime && Date.now() < parseInt(storageTime)) {
    console.log("localStorage'dan veri okunuyor");
    const users = JSON.parse(userData);
    displayUsers(users);
  } else {
    fetchUsers();
  }
}

$(document).ready(function () {
  checkLocalStorage();
});

/*
kalanlar;
-Basit Bir Arayüz Oluşturma (variable tanımlayıp style tagiyle mi yoksa doğruda css() metodu kullanarak mı)
*/
