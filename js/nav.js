document.addEventListener("DOMContentLoaded", function() {
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".sidenav").forEach(function(elem) {
          elem.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".sidenav a").forEach(function(elem) {
          elem.addEventListener("click", function(event) {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };

    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman Tidak Dapat Ditemukan</p>";
        } else {
          content.innerHTML = "<p>Ups...Halaman Tidak Dapat Diakses</p>";
        }
      }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
  }
});
