function loadJsonFile() {
  $(function() {
    $.getJSON('data.json', function(data) {
      var ulObj = $("#trial")
      var len = data.length;

      for (var i = 0; i < len; i++) {
        ulObj.append($("<li>").attr({"id": data[i].id}).text(data[i].name));
      }
    });
  })
}
