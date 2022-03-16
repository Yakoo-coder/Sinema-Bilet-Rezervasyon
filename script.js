var container = document.querySelector(".container");
var count = document.getElementById("count");
var amount = document.getElementById("amount");
var select = document.getElementById("movie");
var seats = document.querySelectorAll('.seat:not(.reserved');

getFromLocalStorage();
calculateTotal();

//Toggle - Toggle bir obje görünür halde ise gizler,gizli haldeyse gösterir.

container.addEventListener("click", function (e) {
  let seatAndSelected =
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved");
  if (seatAndSelected) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  let selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatArr.push(seat);
  });

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  let selectedSeatIndex = selectedSeatArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  })
  console.log(selectedSeatIndex);

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndex);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }


  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(index) {
  localStorage.setItem('selectedSeats', JSON.stringify(index))
  localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}
