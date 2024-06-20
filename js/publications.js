/* ============================== LIGHT-DARK-SWITCH ==============================*/
/*use settings, default to light, allow manual switch*/
document.addEventListener('DOMContentLoaded', (event) => {

  const htmlElement = document.documentElement;
  const switchElement = document.getElementById('darkModeSwitch');
  htmlElement.setAttribute('data-bs-theme', 'light');

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.setAttribute('data-bs-theme', 'dark');
    switchElement.setAttribute('checked', '');
  }
  switchElement.addEventListener('change', function () {
      if (this.checked) {
          htmlElement.setAttribute('data-bs-theme', 'dark');
       } else {
          htmlElement.setAttribute('data-bs-theme', 'light');
       }
  });
});

/*add publications*/
d3.csv("../assets/AMpubs_html.csv")
  .then(function(data) {
    console.log(data);
    data.sort(function(a, b) {
      var keyA = new Date(a.year), keyB = new Date(b.year);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

    for (let i = 0; i < data.length; i++) {
        addPublication(data[i]);
      }
});

/* -------------------------- FUNCTIONS */
/*add publication to list*/
function addPublication(irow) {
    let pub_list = document.getElementById("publication_list");
    let pub_item = document.createElement('li');
    pub_item.className = "list-group-item ps-5 border-0 pubindent";
    pub_item.style.maxWidth = "900px";

    if (irow.doi != '') {
      var doi_link = ' [<a href=' + irow.doi + '>doi</a>]';
    } else {
      var doi_link = '';
    }
    if (irow.url != '') {
      var url_link = ' [<a href=' + irow.url + '>url</a>]';
    } else {
      var url_link = '';
    }
    if (irow.preprint != '') {
      var preprint_link = ' [<a href=' + irow.preprint + '>preprint</a>]';
    } else {
      var preprint_link = '';
    }
    if (irow.repo != '') {
      var repo_link = ' [<a href=' + irow.repo + '>repository</a>]';
    } else {
      var repo_link = '';
    }
    
     pub_item.innerHTML = irow.publication + doi_link + url_link + preprint_link + repo_link

    pub_list.appendChild(pub_item);
}

