window.runScript = () => {
  let appendLocation = $(document.createElement('div'));
  appendLocation.attr('class', 'ins-api-users');
  $('body').append(appendLocation);

  async function fetchUsers() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      //console.log(response.ok);
      if (!response.ok) {
        //ok=200-299
        throw new Error(
          `Responsta hata oluştu Hata Statüsü: ${response.status}`
        );
      }
      const json = await response.json();
      //console.log(json);
      displayUsers(json);
      saveToStorage(json);
    } catch (error) {
      throw new Error('Veriler yüklenirken hata oluştu!', error);
    }
  }

  function displayUsers(users) {
    appendLocation.empty();

    users.forEach(function (user) {
      const userCard = $('<div>')
        .addClass('user-card')
        .append(
          $('<h2>').text(`${user.name}`),
          $('<p>').html(
            `<span class="bold-text">Email:</span> <br> ${user.email}`
          ),
          $('<p>').html(
            `<span class="bold-text">Adres:</span> <br> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}, ${user.address.geo.lat} / ${user.address.geo.lng} `
          ),
          $('<button>')
            .addClass('delete-btn')
            .text('Delete')
            .click(function () {
              const storedData = JSON.parse(localStorage.getItem('data'));
              const currentUser = storedData ? storedData.userData : [];

              const updateUsers = currentUser.filter((u) => u.id !== user.id);
              saveToStorage(updateUsers);
              displayUsers(updateUsers);
            })
        );

      appendLocation.append(userCard);
    });
  }

  function saveToStorage(users) {
    let data = {
      userData: users,
      storageTime: Date.now() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem('data', JSON.stringify(data));
  }

  function checkLocalStorage() {
    const data = localStorage.getItem('data');

    if (data) {
      const parsedData = JSON.parse(data);
      const storageTime = parsedData.storageTime;

      if (storageTime && Date.now() < storageTime) {
        displayUsers(parsedData.userData);
      } else {
        fetchUsers();
      }
    } else {
      fetchUsers();
    }
  }

  const reloadButton = $('<button>')
    .addClass('reload-btn')
    .text('Kullanıcıları Yeniden Getir')
    .click(function () {
      fetchUsers();
      sessionStorage.setItem('reloadClicked', 'true');
      $(this).hide();
    });

  if (sessionStorage.getItem('reloadClicked') !== 'true') {
    $('body').append(reloadButton);
  }

  const observer = new MutationObserver(() => {
    const userList = appendLocation[0];
    //console.log('Observer tetiklendi, kullanıcı listesi:',userList.children.length);

    if (
      userList.children.length === 0 &&
      sessionStorage.getItem('reloadClicked') !== 'true'
    ) {
      //console.log('Kullanıcılar yok, buton gösteriliyor!');
      reloadButton.show();
    } else {
      //console.log('Kullanıcılar var, buton gizleniyor!');
      reloadButton.hide();
    }
  });

  observer.observe(appendLocation[0], { childList: true, subtree: true });

  $(document).ready(function () {
    checkLocalStorage();

    const styles = `
    body {
      background-color: #2d2d2d;
      color: #e0e0e0;
      font-family: Arial, sans-serif; 
      margin: 0;
      padding: 0;
    }

    h2 {
      color: #fff;
      text-shadow: 2px 2px 8px rgba(3, 178, 178, 0.3);
    }

    .ins-api-users {
      display: flex;
      flex-wrap: wrap;
      gap: 20px; 
      justify-content: center; 
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
    }

    .user-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #444444;
      border-radius: 10px; 
      box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3); 
      padding: 20px;
      width: 300px;
      transition: transform 0.4s ease;
      line-height: 1.35;
    }
    
    .user-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(255,255,255,0.5);
    }
    
    .bold-text {
    font-weight: bold;
    }

    .delete-btn {
      background-color:rgb(59, 133, 144);
      color: white;
      border-radius: 25px;
      padding: 8px 20px;
      text-align: center;
      font-size: 14px;
      border: none;
      align-self: flex-start;
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .delete-btn:hover {
      background-color:rgb(211, 120, 120);
      transform: translateY(-3px)
    }

    .reload-btn {
      background-color:rgb(73, 163, 61);
      color: white;
      border-radius: 25px;
      padding: 8px 20px;
      text-align: center;
      font-size: 14px;
      border: none;
      align-self: flex-start;
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .reload-btn:hover {
      background-color:rgb(72, 154, 92);
      transform: translateY(-3px)
    }
  `;

    $('<style>').text(styles).appendTo('head');
  });
};

if (!document.jQuery) {
  let script = document.createElement('script');
  script.src =
    'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
  document.head.appendChild(script);
  setTimeout(() => {
    window.runScript();
  }, 1000);
}
