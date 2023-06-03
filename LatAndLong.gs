// 引数として住所を受け取り、その緯度と経度を返す関数
function getGeocode(address) {
  var response = Maps.newGeocoder().geocode(address);

  // 結果の確認
  if (response.status == 'OK') {
    var result = response.results[0];
    var latitude = result.geometry.location.lat;
    var longitude = result.geometry.location.lng;
    return [latitude, longitude];
  } else {
    return [null, null];
  }
}

// スクリプトの主要部分
function main() {
  // スプレッドシートの取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();
  
  for (var i = 1; i < values.length; i++) {
    var address = values[i][0]; // 住所が1列目にあると仮定
    var geocode = getGeocode(address);
    
    // 結果をスプレッドシートに書き込む
    if (geocode[0] == null || geocode[1] == null) {
      sheet.getRange(i + 1, 2).setValue('false');
    } else {
      sheet.getRange(i + 1, 2).setValue(geocode[0] + ',' + geocode[1]);
    }
  }
}
