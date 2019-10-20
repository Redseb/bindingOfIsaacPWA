function search() {
    // Declare variables
    var input, filter, parentDiv, item, title, i, txtValue;
    input = document.getElementById('searchBox');
    filter = input.value.toUpperCase();
    parentDiv = document.getElementById("content");
    item = parentDiv.getElementsByClassName('item');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < item.length; i++) {
      title = item[i].getElementsByClassName("title")[0];
      txtValue = title.textContent || title.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        item[i].style.display = "";
      } else {
        item[i].style.display = "none";
      }
    }
  }