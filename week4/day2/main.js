$(document).ready(function () {
  async function fetchUsers() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      if (!response.ok) {
        //ok=200-299
        throw new Error(
          'Responseta hata oluştu Hata Statüsü: ',
          response.status
        );
      }
      const json = await response.json();
      console.log(json);
      //...
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu: ', error);
    }
  }
  fetchUsers();
});
