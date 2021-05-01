base = function (options) {
    return this.init(options);
};

base.prototype = {
    init: function () {
        return this;
    }
};

base.cookieHandle = function () {
    $('input[name="sheet_id"]').on('change', function () {
        base.setCookie('sheet_id', $(this).val(), 9999);
    })
    if (base.getCookie('sheet_id')) {
        $('input[name="sheet_id"]').val(base.getCookie('sheet_id'));
    }
    $('select[name="server"]').on('change', function () {
        base.setCookie('server', $(this).val(), 9999);
    })
    if (base.getCookie('server')) {
        $('select[name="server"]').val(base.getCookie('server'));
    }
    $('select[name="month"]').on('change', function () {
        base.setCookie('month', $(this).val(), 9999);
    })
    if (base.getCookie('month')) {
        $('select[name="month"]').val(base.getCookie('month'));
    }
    $('select[name="year"]').on('change', function () {
        base.setCookie('year', $(this).val(), 9999);
    })
    if (base.getCookie('year')) {
        $('select[name="year"]').val(base.getCookie('year'));
    }
    $('select[name="action"]').on('change', function () {
        base.setCookie('action', $(this).val(), 9999);
    })
    if (base.getCookie('action')) {
        $('select[name="action"]').val(base.getCookie('action'));
    }
}

base.setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};


base.subDay = function (n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

base.setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

base.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

base.eraseCookie = function (name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

base.setError = function (msg) {
    $('.alert').removeClass('alert-success');
    $('.alert').addClass('alert-danger');
    $('.alert').css('display', 'block');
    $('.alert').html(msg);
}

base.setSuccess = function () {
    $('.alert').removeClass('alert-danger');
    $('.alert').addClass('alert-success');
    $('.alert').css('display', 'block');
    $('.alert').html('Convert Success !');
}

base.getDaysInMonth = function () {
    let month = $('select[name="month"]').val();
    let year = $('select[name="year"]').val();
    let days = new Date(year, month, 0).getDate();
    let ds = [''];
    for (var i = 1; i <= days; i++) {
        ds.push(year + '-' + month + '-' + i);
    }
    return ds;
};

base.getMsg = function (msg) {
    if (msg === 'Requested entity was not found.') {
        return 'SheetID not found.'
    }
    if (msg === 'The caller does not have permission') {
        return 'Does not have permission to access this sheet.';
    }
    return msg;
}

base.getStatus = function (message, server) {

    if (server === 'sumo') {
        if (message.includes('saas email')) {
            return 'email';
        }

        if (message.includes('incoming-webhook')) {
            return 'error';
        }

        if ((message.includes("opened") && message.includes("Target") && message.includes("New Relic"))) {
            return 'error';
        }

        if (message.includes("closed") && message.includes("Target") && message.includes("New Relic")) {
            return 'ignore';
        }

        if (message.includes("/sumo/production/dski-tool-error") ||
            message.includes("/sumo/production/urushi-app") ||
            message.includes("/sumo/production/data-replica-heartbeat/alarm") ||
            message.includes("/sumo/production/batch-heartbeat/alarm") ||
            message.includes("/sumo/production/dski-web-application-error") ||
            message.includes("/sumo/production/urushi-app") ||
            message.includes("WordpressFeedColumnRepository.scala")
        ) {
            return 'ignore';
        }

        return "error";
    }

    if (server === 'saas') {
        if (message.includes('saas email')) {
            return 'email';
        }

        if ((message.includes("opened") && message.includes("Target") && message.includes("New Relic")) || message.includes("ログ全文は上記リンクから")) {
            return 'error';
        }

        if (message.includes("closed") && message.includes("Target") && message.includes("New Relic")) {
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
        ) {
            return 'ignore';
        }

        return "error";
    }

    if (server === 'baas') {
        if (message.includes('emailアプリ')) {
            return 'email';
        }

        if ((message.includes("opened") && message.includes("Target") && message.includes("New Relic"))) {
            return 'error';
        }

        if (message.includes("closed") && message.includes("Target") && message.includes("New Relic")) {
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
        ) {
            return 'ignore';
        }

        return "error";
    }

    if (server === 'jpstore') {
        if (message.includes('emailアプリ')) {
            return 'email';
        }

        if ((message.includes("opened") && message.includes("Target") && message.includes("New Relic"))) {
            return 'error';
        }

        if ((message.includes("Google Cloud Monitoring"))) {
            return 'error';
        }

        if (message.includes("closed") && message.includes("Target") && message.includes("New Relic")) {
            return 'ignore';
        }

        return "error";
    }

    if (server === 'dam') {
        if (message.includes('dam email')) {
            return 'email';
        }

        if (
            message.includes('dam/production/difference_reporter') ||
            message.includes('インポーターの取込失敗監視') ||
            message.includes('drdy-test-app01')

        ) {
            return 'ignore';
        }

        if ((message.includes("opened") && message.includes("Target") && message.includes("New Relic")) || message.includes("ログ全文は上記リンクから")) {
            return 'error';
        }

        if (message.includes("closed") && message.includes("Target") && message.includes("New Relic")) {
            return 'ignore';
        }

        return "error";
    }

    if (server === 'dwjp') {
        if (message.includes('dwjp notification')) {
            return 'email';
        }

        if ((message.includes("opened") && message.includes("Target") && message.includes("New Relic"))) {
            return 'error';
        }

        if (message.includes("job noren/production_batch") && message.includes("cloudwatch-logs-alert-bot")) {
            return 'ignore';
        }

        if (message.includes("/dwango-jp/production/noren-web-app") && message.includes("cloudwatch-logs-alert-bot")) {
            return 'ignore';
        }

        if (message.includes("noren/production_batch") && message.includes("incoming-webhook")) {
            return 'ignore';
        }

        if (message.includes("closed") && message.includes("Target") && message.includes("New Relic")) {
            return 'ignore';
        }

        if (message.includes("/aws/lambda/prod-dwjp-ranking-check-cluster-step-status") && message.includes("cloudwatch-logs-alert-bot")) {
            return 'ignore';
        }

        if (message.includes("/dwango-jp/production/cot-app") && message.includes("cloudwatch-logs-alert-bot")) {
            return 'ignore';
        }

        if (message.includes("/job noren/production_batch") && message.includes("cloudwatch-logs-alert-bot")) {
            return 'ignore';
        }

        return "error";
    }
}

base.getType = function (message, server) {
    if (server === 'dam') {
        if ((message.includes("opened") && message.includes("ddex-db11") && message.includes("ConditionRDB CPU Utilization Average") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #ddex-db11 ConditionRDB CPU Utilization Average ddex-dbPolicyddex alert policyThresholdProvider . CPU Utilization . Average > 70 for at least 5 minutes on 'ddex-db11'"
        } else if ((message.includes("opened") && message.includes("prod-midio-am") && message.includes("ConditionProcessor load is too highPolicymidio") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #prod-midio-am ConditionProcessor load is too highPolicymidio alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'prod-midio-am'"
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("Log Monitoring") && message.includes("/dam/prod/dwjp-jacket-schedule-planner"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dwjp-jacket-schedule-planner #... ERROR Schedule Failed / ERROR o.h.engine.jdbc.. #..."
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("Log Monitoring") && message.includes("/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file") && message.includes("TaskFailed"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file #... TaskFailed #... ExecutionFailed #..."
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("Log Monitoring") && message.includes("aws/lambda/prod--dam--dam-to-dwjp--reporter"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/aws/lambda/prod--dam--dam-to-dwjp--reporter"
        } else if ((message.includes("CloudWatch Alarm Notifierアプリ") && message.includes("/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm"))) {
            return "CloudWatch Alarm Notifierアプリ #time @channel ALARM #/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm"
        } else {
            return "Other"
        }
    }

    if (server === 'dwjp') {
        if ((message.includes("opened") && message.includes("noren-prod-db02") && message.includes("ConditionProcessor load is too high") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened noren-prod-db02ConditionProcessor load is too high noren-prod-dbPolicynoren alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'noren-prod-db02'";
        } else if ((message.includes("opened") && message.includes("callsp-prod-web") && message.includes("ConditionApdex (Low)") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened callsp-prod-webConditionApdex (Low)Policycall alert policyThresholdApdex < 0.3 at least once in 5 minutes on 'callsp-prod-web' ( #x KB )"
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("commands poll failed") && message.includes("/dwango-jp/production/callsp-manage-messages") && message.includes("Contains keywords to be alerted"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/callsp-manage-messages #... commands poll failed"
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("commands poll failed") && message.includes("/dwango-jp/production/noren-manage-messages") && message.includes("Contains keywords to be alerted"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-manage-messages #... commands poll failed"
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("no implicit conversion of nil into String") && message.includes("/dwango-jp/production/noren-manage-app") && message.includes("Contains keywords to be alerted"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-manage-app ERROR no implicit conversion of nil into String #..."
        } else if ((message.includes("incoming-webhookアプリ") && message.includes("We detected anomalous behavior around the time this incident opened"))) {
            return "incoming-webhookアプリ  #time We detected anomalous behavior around the time this incident opened callsp-prod-web External services total call time was much different than normal (#x min before)External services total call time (#x kB)"
        } else {
            return "Other"
        }
    }

    if (server === 'baas') {
        if ((message.includes("opened") && message.includes("ConditionProcessor load is too high cds-prod") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened Target IPxxxx ConditionProcessor load is too high cds-prodPolicycds alert policyThresholdLoad Average One Minute > 4 for at least 5 minutes on IPxxxx"
        } else if ((message.includes("opened") && message.includes("playready-web") && message.includes("ConditionMemory Free %") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened Target #playready-webxx ConditionMemory Free % WARNING playreadyPolicycds alert policyThresholdMemory Free % < 20 for at least 1 minutes on 'playready-webxx'"
        } else if ((message.includes("CloudWatch Alarm Notifierアプリ") && message.includes("@channel"))) {
            return "CloudWatch Alarm Notifierアプリ #time @channel ALARM #target"
        } else {
            return "Other"
        }
    }

    if (server === 'saas') {
        if ((message.includes("opened") && message.includes("ffewsn-dbs03") && message.includes("ffewsn-db alert policyThresholdDisk Used % > 85") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #ffewsn-dbs03 (/data)Conditionffewsn ffewsn-db* Disk Used %Policyffewsn ffewsn-db alert policyThresholdDisk Used % > 85 for at least 5 minutes on 'ffewsn-dbs03 (/data)'"
        } else if ((message.includes("opened") && message.includes("ffewsn-dhc01") && message.includes("Not Reporting at least once in 5 minutes") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #ffewsn-dhc01 Conditionffewsn ffewsn-dhc01 Host not reportingPolicyffewsn alert policyThresholdHost Not Reporting at least once in 5 minutes on 'ffewsn-dhc01'"
        } else if ((message.includes("opened") && message.includes("ffewsn-web01") && message.includes("units for at least 5 minutes") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #ffewsn-web01 Conditionffewsn ffewsn-* Process : ntpdPolicyffewsn alert policyThresholdComponent/Processes/ntpd/Instance Count[processes] = 0 units for at least 5 minutes on 'ffewsn-web01'"
        } else {
            return "Other"
        }
    }

    if (server === 'sumo') {
        if ((message.includes("opened") && message.includes("sumo-dski-tool") && message.includes("Running > 0 for at least 10 minutes") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #sumo-dski-tool Conditiond ski-tool Encoding NowPolicySumo Dski Tool alert policyThresholdProcess Running > 0 for at least 10 minutes on 'sumo-dski-tool'"
        } else if ((message.includes("opened") && message.includes("sumo-dski-tool") && message.includes("Average One Minute > 3.5 for at least 10 minutes") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #sumo-dski-tool Condition Processor load is too high Policy Sumo Dski Tool alert policyThresholdLoad Average One Minute > 3.5 for at least 10 minutes on 'sumo-dski-tool'"
        } else if ((message.includes("opened") && message.includes("Sumo Urushi") && message.includes("percentage > 15% at least once in 5 minutes") && message.includes("New Relic"))) {
            return "New Relicアプリ #time Incident #xxxxx opened #Sumo Urushi Condition Error percentage (High)PolicySumo Urushi alert policyThresholdError percentage > 15% at least once in 5 minutes on 'Sumo Urushi'"
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("/sumo/test/sumo-cli") && message.includes("failed to import news") && message.includes("Contains keywords to be alerted"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/test/sumo-cli ... ERROR failed to import news"
        } else if ((message.includes("cloudwatch-logs-alert-botアプリ") && message.includes("/sumo/production/data-replica-api-error") && message.includes('PHP Warning') && message.includes("Contains keywords to be alerted"))) {
            return "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/production/data-replica-api-error PHP Warning"
        } else {
            return "Other"
        }
    }

}