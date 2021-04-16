const API_KEY = 'AIzaSyAiSLDVX3qSSMgaA7UeZ3nR4msSFUlWnqE';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const MONTHNAMES = ['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

$(document).ready(function() {
    $('input[name="sheet_id"]').on('change', function(){
        setCookie('sheet_id', $(this).val(), 9999);
    })
    if(getCookie('sheet_id')){
        $('input[name="sheet_id"]').val(getCookie('sheet_id'));
    }
    $('.alert').css('display', 'none');
    $('#btn-convert').on('click', function(){
    try{
        let sheet_id = $('input[name="sheet_id"]').val();
        if(sheet_id == ''){
            setError('SheetId is required!');
            return;
        }
        let server = $('select[name="server"]').val();
        let month = (new Date()).getMonth() + 1;
        let year = (new Date()).getFullYear();
        let sheet_name = server+'!A2:D';
        let body = $('textarea[name="body"]').val();
        if(body == ''){
            setError('Body is required!');
            return;
        }
        let server_rule = SERVERS[server].rule;
        body = body.replaceAll("\n", "");
        body = body.allReplace(server_rule);
        let messages = body.split("\n");
        let input = [];
        messages.forEach(message => {
        if(message){
            if(message.length > 10000){
            message = message.substring(0, 10000)
            }
            let msg = message.allReplace(SERVERS[server].replace);
            let time = msg.substring(0, 5);
            
            let date = '';
            if(server === 'dam'){
            if (message.includes('dam email')) {
                let msgEx = message.split(month+'月');
                if(msgEx[1]){
                    let msgEx2 = msgEx[1].split('日');
                    date = year+'-'+month+'-'+msgEx2[0];
                }
                msgEx = message.split('昨日の');

                if(msgEx[1]){
                    date = subDay(1);
                }

                msgEx = message.split('今日の');
                if(msgEx[1]){
                date = subDay(0);
                }
            }
            }

            // dwjp
            if(server === 'dwjp'){
            if (message.includes('cloudwatch-logs-alert-bot')) {
                let msgEx = message.split('/'+MONTHNAMES[month-1]+'/'+year);
                if(msgEx[1]){
                    let day = msgEx[0].substring(-2, 2);
                    date = year+'-'+month+'-'+day;
                }
            }
            }

            // saas
            if(server === 'saas'){
            if (message.includes('saas emailアプリ')) {
                let msgEx = message.split(month+'月');

                if(msgEx[1]){
                    let msgEx2 = msgEx[1].split('日');
                    date = year+'-'+month+'-'+msgEx2[0];
                }

                msgEx = message.split('昨日の');
                if(msgEx[1]){
                    date = subDay(1);
                }

                msgEx = message.split('今日の');
                if(msgEx[1]){
                    date = subDay(0)
                }
            }
            }
        
            // sumo
            if(server === 'sumo'){
                if (message.includes('cloudwatch-logs-alert-bot')) {
                    let msgEx = message.split(year+'-'+month+'-');
                    if(msgEx[1]){
                        day = msgEx[1].substring(0, 2);
                        date = year+'-'+month+'-'+day;
                    }
                }
            }
            let status = getStatus(message, server);
            input.push([date, time, message, status]);
        }
        });
        updateSheet(sheet_id, sheet_name, input);
    }catch(error){
        setError(error.message)
    }
  });
});

function getStatus(message, server){

  if(server === 'sumo'){
      if (message.includes('saas email')) {
          return 'email';
      }

      if (message.includes('incoming-webhook')) {
          return 'error';
      }

      if ( (message.includes("opened") && message.includes("Target") && message.includes("New Relic") )) {
          return 'error';
      }

      if (message.includes("closed") && message.includes("Target") && message.includes("New Relic") ) {
          return 'ignore';
      }

      if (message.includes("/sumo/production/dski-tool-error") ||
          message.includes("/sumo/production/urushi-app") ||
          message.includes("/sumo/production/data-replica-heartbeat/alarm") ||
          message.includes("/sumo/production/batch-heartbeat/alarm") ||
          message.includes("/sumo/production/dski-web-application-error") ||
          message.includes("/sumo/production/urushi-app") ||
          message.includes("WordpressFeedColumnRepository.scala")
      )
      {
          return 'ignore';
      }

      return "error";
  }

  if(server === 'saas'){
      if (message.includes('saas email')) {
          return 'email';
      }

      if ( (message.includes("opened") && message.includes("Target") && message.includes("New Relic") ) || message.includes("ログ全文は上記リンクから")) {
          return 'error';
      }

      if (message.includes("closed") && message.includes("Target") && message.includes("New Relic") ) {
          return 'ignore';
      }

      if (message.includes("3時間以上ジャケ写の同期が行われていません。") ||
          message.includes("バッチが停止していないか確認してください。") ||
          message.includes("MOSログインポートバッチ") ||
          message.includes("Service_SpAffiliate_SendConversion") ||
          message.includes("Pegasus向けのログをS3へアップロード(月次整合)") ||
          message.includes("DLランキング集計(素材別ランキング生成)") ||
          message.includes("DLランキング集計(楽曲別ランキング生成)") ||
          message.includes("DLランキング集計(CRBTログ集計2)") ||
          message.includes("DLランキング集計(CRBTログ集計)") ||
          message.includes("DLランキング集計(MOSログ集計)") ||
          message.includes("DLランキング集計(タイアップ別ランキング生成)")
      )
      {
          return 'ignore';
      }

      return "error";
  }

  if(server === 'baas'){
      if (message.includes('emailアプリ')) {
          return 'email';
      }

      if ( (message.includes("opened") && message.includes("Target") && message.includes("New Relic") )) {
          return 'error';
      }

      if (message.includes("closed") && message.includes("Target") && message.includes("New Relic") ) {
          return 'ignore';
      }

      if (message.includes("Processor load is too high cds-prod") ||
          message.includes("/connect/production/connect-web-error/connect-web-application-errors") ||
          message.includes("/sintral/production/sinwa-app-error") ||
          message.includes("ess-db-secondary.aws-in.dwango.jp") ||
          message.includes("baas-ess-api ess-admin.in.dwango.jp/api/v1/_factory/buffer") ||
          message.includes("Monitor failed for location dwango_internal") ||
          message.includes("DLランキング集計(楽曲別ランキング生成)") ||
          message.includes("DLランキング集計(CRBTログ集計2)") ||
          message.includes("DLランキング集計(CRBTログ集計)") ||
          message.includes("DLランキング集計(MOSログ集計)") ||
          message.includes("DLランキング集計(タイアップ別ランキング生成)")
      )
      {
          return 'ignore';
      }

      return "error";
  }

  if(server === 'jpstore'){
      if (message.includes('emailアプリ')) {
          return 'email';
      }

      if ( (message.includes("opened") && message.includes("Target") && message.includes("New Relic") )) {
          return 'error';
      }

      if ( (message.includes("Google Cloud Monitoring"))) {
          return 'error';
      }

      if (message.includes("closed") && message.includes("Target") && message.includes("New Relic") ) {
          return 'ignore';
      }

      return "error";
  }

  if(server === 'dam'){
      if (message.includes('dam email')) {
          return 'email';
      }

      if (
          message.includes('dam/production/difference_reporter') ||
          message.includes('インポーターの取込失敗監視')

      ) {
          return 'ignore';
      }

      if ( (message.includes("opened") && message.includes("Target") && message.includes("New Relic") ) || message.includes("ログ全文は上記リンクから")) {
          return 'error';
      }

      if (message.includes("closed") && message.includes("Target") && message.includes("New Relic") ) {
          return 'ignore';
      }

      return "error";
  }

  if(server === 'dwjp'){
      if (message.includes('dwjp notification')) {
          return 'email';
      }

      if ( (message.includes("opened") && message.includes("Target") && message.includes("New Relic") )) {
          return 'error';
      }

      if (message.includes("job noren/production_batch") && message.includes("cloudwatch-logs-alert-bot") ) {
          return 'ignore';
      }

      if (message.includes("/dwango-jp/production/noren-web-app") && message.includes("cloudwatch-logs-alert-bot") ) {
          return 'ignore';
      }

      if (message.includes("noren/production_batch") && message.includes("incoming-webhook") ) {
          return 'ignore';
      }

      if (message.includes("closed") && message.includes("Target") && message.includes("New Relic") ) {
          return 'ignore';
      }

      if (message.includes("/aws/lambda/prod-dwjp-ranking-check-cluster-step-status") && message.includes("cloudwatch-logs-alert-bot") ) {
          return 'ignore';
      }

      if (message.includes("/dwango-jp/production/cot-app") && message.includes("cloudwatch-logs-alert-bot") ) {
          return 'ignore';
      }

      if (message.includes("/job noren/production_batch") && message.includes("cloudwatch-logs-alert-bot") ) {
          return 'ignore';
      }

      return "error";
  }
}

function onGAPILoad() {
    gapi.client.init({
      // Don't pass client nor scope as these will init auth2, which we don't want
      apiKey: API_KEY,
      discoveryDocs: DISCOVERY_DOCS,
    }).then(function () {
      console.log('gapi initialized')
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        gapi.auth.setToken({
          'access_token': token,
        });
      })
    }, function(error) {
        setError(error.result.error.message)
    });
  }

  function updateSheet(sheet_id, sheet_name, data) {
    const body = {values: data};
     // Append values to the spreadsheet
    gapi.client.sheets.spreadsheets.values.clear({
      spreadsheetId: sheet_id,
      range: sheet_name,
    }).then((response) => {
      console.log(`clear success`)
      // Append values to the spreadsheet
      gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: sheet_id,
          range: sheet_name,
          valueInputOption: 'USER_ENTERED',
          resource: body
      }).then((response) => {
          console.log(`${response.result.updates.updatedCells} cells appended.`)
          setSuccess();
      }, function(error){
        setError(error.result.error.message)
      });
    }, function(error) {
        setError(error.result.error.message)
    });
  }

  String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
  };

  function subDay(n){
    var d = new Date();
    d.setDate(d.getDate()-n);
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
  }

  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setError(msg){
    $('.alert').removeClass('alert-success');
    $('.alert').addClass('alert-danger');
    $('.alert').css('display', 'block');
    $('.alert').html(msg);
}

function setSuccess(){
    $('.alert').removeClass('alert-danger');
    $('.alert').addClass('alert-success');
    $('.alert').css('display', 'block');
    $('.alert').html('Convert Success !');
}

