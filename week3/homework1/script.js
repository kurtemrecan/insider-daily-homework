$(document).ready(function () {
  let students = [
    { name: 'Emre', class: '11C', lesson: 'Math' },
    { name: 'Büşra', class: '12A', lesson: 'Art' },
    { name: 'Kerem', class: '11B', lesson: 'English' },
  ];

  function updateTable() {
    $('#studentTable').empty(); // önceki tabloyu temizledik tüm veri tekrar tekrar bastırılmasın diye
    students.forEach((student, index) => {
      $('#studentTable').append(`
          <tr>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.lesson}</td>
            <td><button class="delete" data-index="${index}">Delete</button></td>
          </tr>
        `);
    });
  }

  updateTable();

  $('#studentForm').submit(function (event) {
    event.preventDefault();
    let name = $('#name').val().trim();
    let studentClass = $('#class').val().trim();
    let lesson = $('#lesson').val().trim();

    if (name && studentClass && lesson) {
      students.push({ name, class: studentClass, lesson });
      updateTable();
      this.reset();
    } else {
      alert('Please fill in all fields!');
    }
  });

  $('#studentTable').on('click', '.delete', function () {
    let index = $(this).data('index');
    students.splice(index, 1);
    updateTable();
  });

  $('#studentTable').on('mouseover', 'tr', function () {
    $(this).css('background-color', '#f0f0f0');
  });

  $('#studentTable').on('mouseleave', 'tr', function () {
    $(this).css('background-color', '');
  });
});
