base = function (options) {
    return this.init(options);
};

base.prototype = {
    init: function () {
        return this;
    }
};

base.setCookie = function(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};


base.subDay = function(n){
    var d = new Date();
    d.setDate(d.getDate()-n);
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
  }

base.setCookie = function (name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

base.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

base.eraseCookie = function (name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

base.setError = function (msg){
    $('.alert').removeClass('alert-success');
    $('.alert').addClass('alert-danger');
    $('.alert').css('display', 'block');
    $('.alert').html(msg);
}

base.setSuccess = function (){
    $('.alert').removeClass('alert-danger');
    $('.alert').addClass('alert-success');
    $('.alert').css('display', 'block');
    $('.alert').html('Convert Success !');
}

base.getDaysInMonth = function() {
    let month = (new Date()).getMonth() + 1;
    let year = (new Date()).getFullYear();
    let days = new Date(year, month, 0).getDate();
    let ds = [''];
    for(var i = 1 ; i <= days ; i++){
        ds.push(year + '-' + month + '-' + i);
    }
    return ds;
};

base.getMsg = function (msg){
    if(msg === 'Requested entity was not found.'){
        return 'SheetID not found.'
    }
    if(msg === 'The caller does not have permission'){
        return 'Does not have permission to access this sheet.';
    }
    return msg;
}

base.getStatus = function (message, server){

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