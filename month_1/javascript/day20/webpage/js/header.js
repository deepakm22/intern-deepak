const header = document.getElementById("header")
header.innerHTML =`
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #0a4275;">
        <a><img src="assets/img/logo1.png" width="40" height="40"  class="d-inline-block align-top" alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
            <a class="nav-link" href="#" id="pages">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="pages">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="pages">Services</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="pages">Contact</a>
        </li>
        </ul>
              <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
</nav`;