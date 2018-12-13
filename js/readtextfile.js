function loadTextFile() {
  $(function() {
    //テキストファイルのパスは../data.txtではだめ。
    //相対パスの基点はhtmlファイル。
    $.get('data.txt', function(data) {
      $("#trial").text(data);
    })
  })
}