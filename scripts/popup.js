const API_KEY = 'AIzaSyAiSLDVX3qSSMgaA7UeZ3nR4msSFUlWnqE';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const MONTHNAMES = ['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

$(document).ready(function() {
    base.cookieHandle();
    $('.alert').css('display', 'none');
    $('button[id="btn-classify"]').on('click', function(){
        let sheet_id = $('input[name="sheet_id"]').val();
        let server = $('select[name="server"]').val();
        let sheet_name = server+'!A2:E';
        classifyMessage(sheet_id, sheet_name, server, 0)
    });
    $('button[id="btn-convert"]').on('click', function(){
        try{
            let sheet_id = $('input[name="sheet_id"]').val();
            if(sheet_id == ''){
                base.setError('SheetId is required!');
                return;
            }
            let server = $('select[name="server"]').val();
            let month = $('select[name="month"]').val();
            let year = $('select[name="year"]').val();
            let action = $('select[name="action"]').val();
            let sheet_name = server+'!A2:D';
            let body = $('textarea[name="body"]').val();
            if(body == ''){
                base.setError('Body is required!');
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
                            date = base.subDay(1);
                        }

                        msgEx = message.split('今日の');
                        if(msgEx[1]){
                            date = base.subDay(0);
                        }
                    }
                }

                // dwjp
                if(server === 'dwjp'){
                    if (message.includes('cloudwatch-logs-alert-bot')) {
                        let msgEx = message.split('/'+MONTHNAMES[month-1]+'/'+year);
                        if(msgEx[1]){
                            let day = msgEx[0].substring(msgEx[0].length - 2, msgEx[0].length);
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
                            date = base.subDay(1);
                        }

                        msgEx = message.split('今日の');
                        if(msgEx[1]){
                            date = base.subDay(0)
                        }
                    }
                }
            
                // sumo
                if(server === 'sumo'){
                    if (message.includes('cloudwatch-logs-alert-bot')) {
                        if(month < 10){
                            m = '0'+month;
                        }else{
                            m = month;
                        }
                        let msgEx = message.split(year+'-'+m+'-');
                        if(msgEx[1]){
                            day = msgEx[1].substring(0, 2);
                            date = year+'-'+m+'-'+day;
                        }
                    }
                }
                let status = base.getStatus(message, server);
                let type = base.getType(message, server);
                input.push([date, time, message, status, type]);
            }
            });
            updateSheet(sheet_id, sheet_name, input, action);
        }catch(error){
            base.setError(error.message)
        }
  });
});

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
        base.setError(base.getMsg(error.result.error.message))
    });
  }

  function updateSheet(sheet_id, sheet_name, data, action, is_convert = true) {
    const body = {values: data};
    // is classify or new convert
     if(!is_convert || action == 1){
        gapi.client.sheets.spreadsheets.values.clear({
            spreadsheetId: sheet_id,
            range: sheet_name,
          }).then((response) => {
            // Append values to the spreadsheet
            gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: sheet_id,
                range: sheet_name,
                valueInputOption: 'USER_ENTERED',
                resource: body
            }).then((response) => {
                base.setSuccess();
            }, function(error){
              base.setError(base.getMsg(error.result.error.message))
            });
          }, function(error) {
              base.setError(base.getMsg(error.result.error.message))
          });
     }else{
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: sheet_id,
            range: sheet_name,
            valueInputOption: 'USER_ENTERED',
            resource: body
        }).then((response) => {
            base.setSuccess();
        }, function(error){
          base.setError(base.getMsg(error.result.error.message))
        });
     }
  }

  function classifyMessage(sheet_id, sheet_name, server, action){
    var request = gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheet_id,
        range: sheet_name,
    });
    request.then((res) => {
        var data = res.result.values;
        var errorType = SERVERS[server].errorType;
        var errors = data.filter(msg => msg[3] === "error")
        if(sheet_name.includes("dam")){
            let data = classify.dam(errors, errorType);
            updateSheet(sheet_id, server+'!G2:AZ', data, action, false);
        }

        if(sheet_name.includes("dwjp")){
            let data = classify.dwjp(errors, errorType);
            updateSheet(sheet_id, server+'!G2:AZ', data, action, false);
        }

        if(sheet_name.includes("baas")){
            let data = classify.baas(errors, errorType);
            updateSheet(sheet_id, server+'!G2:AZ', data , action, false);
        }

        if(sheet_name.includes("saas")){
            let data = classify.saas(errors, errorType);
            updateSheet(sheet_id, server+'!G2:AZ', data, action, false);
        }

        if(sheet_name.includes("sumo")){
            var countN = 0; var countC = 0; var countO = 0;
            var dataN= [];
            var dataC = [];
            var dataO = [];
            for (var i = 0 ; i < errors.length ; i++){
                // New Relicアプリ #time Incident #xxxxx opened Target #target
                if ( (errors[i][2].includes("opened") && errors[i][2].includes("Target") && errors[i][2].includes("New Relic") )) {
                    countN += 1; 
                } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("Log Monitoring") && errors[i][2].includes("Contains keywords to be alerted") )) {
                    // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target
                    countC += 1;
                } else{
                    countO += 1;
                }

                if(i === errors.length - 1){
                    dataN.push({[errors[i][0]] : countN})
                    dataC.push({[errors[i][0]] : countC})
                    dataO.push({[errors[i][0]] : countO})
                }else{
                    if(errors[i][0] != errors[i+1][0]){
                        dataN.push({[errors[i][0]] : countN})
                        dataC.push({[errors[i][0]] : countC})
                        dataO.push({[errors[i][0]] : countO})
                        countN = 0;
                        countC = 0;
                        countO = 0;
                    }
                }

            }
            var days = base.getDaysInMonth()
            var arrayN = [errorType.N];
            var arrayC = [errorType.C];
            var arrayO = [errorType.O];
            for(var i = 1 ; i < days.length ; i++){
                let valueN = '';let valueC = '';let valueI = '';let valueO = '';
                for(var j = 0 ; j < dataN.length ; j++){
                    let key = Object.keys(dataN[j])[0];
                    if(days[i] === key){
                        valueN = Object.values(dataN[j])[0];
                    }
                }
                arrayN.push(valueN)

                for(var j = 0 ; j < dataC.length ; j++){
                    let key = Object.keys(dataC[j])[0];
                    if(days[i] === key){
                        valueC = Object.values(dataC[j])[0];
                    }
                }
                arrayC.push(valueC)

                for(var j = 0 ; j < dataO.length ; j++){
                    let key = Object.keys(dataO[j])[0];
                    if(days[i] === key){
                        valueO = Object.values(dataO[j])[0];
                    }
                }
                arrayO.push(valueO)
            }
            var data = [days];
            data.push(arrayN, arrayC, arrayO);
            updateSheet(sheet_id, server+'!G2:AZ', data, action, false);
        }
    }, function(reason) {
        base.setCookie(base.getMsg(reason.result.error.message));
    })
  }

  String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
  };

