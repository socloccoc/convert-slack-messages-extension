classifyError = function (options) {
    return this.init(options);
};

classifyError.prototype = {
    init: function () {
        return this;
    }
};

classifyError.dam = function (errors, errorType) {
    var countN1 = 0; var countN2 = 0; var countC1 = 0; var countC2 = 0;  var countC3 = 0; var countA1 = 0; var countA2 = 0; var countA3 = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataC1 = [];
    var dataC2 = [];
    var dataC3 = [];
    var dataA1 = [];
    var dataA2 = [];
    var dataA3 = [];
    var dataO = [];
    for (var i = 0; i < errors.length; i++) {
        if ((errors[i][2].includes("opened") && errors[i][2].includes("ddex-db11") && errors[i][2].includes("ConditionRDB CPU Utilization Average") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #ddex-db11 ConditionRDB CPU Utilization Average ddex-dbPolicyddex alert policyThresholdProvider . CPU Utilization . Average > 70 for at least 5 minutes on 'ddex-db11'
            countN1 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("prod-midio-am") && errors[i][2].includes("ConditionProcessor load is too highPolicymidio") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #prod-midio-am ConditionProcessor load is too highPolicymidio alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'prod-midio-am'
            countN2 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("Log Monitoring") && errors[i][2].includes("/dam/prod/dwjp-jacket-schedule-planner"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dwjp-jacket-schedule-planner #... ERROR Schedule Failed / ERROR o.h.engine.jdbc.. #...
            countC1 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("Log Monitoring") && errors[i][2].includes("/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file") && errors[i][2].includes("TaskFailed"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file #... TaskFailed #... ExecutionFailed #...
            countC2 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("Log Monitoring") && errors[i][2].includes("aws/lambda/prod--dam--dam-to-dwjp--reporter"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/aws/lambda/prod--dam--dam-to-dwjp--reporter
            countC3 += 1;
        } else if ((errors[i][2].includes("CloudWatch Alarm Notifierアプリ") && errors[i][2].includes("/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm"))) {
            // CloudWatch Alarm Notifierアプリ #time @channel ALARM #/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm
            countA1 += 1;
        } else if ((errors[i][2].includes("CloudWatch Alarm Notifierアプリ") && errors[i][2].includes("/dam/test/etl-batch/error"))) {
            // CloudWatch Alarm Notifierアプリ #time @channel ALARM #/dam/test/etl-batch/error
            countA2 += 1;
        }else if ((errors[i][2].includes("CloudWatch Alarm Notifierアプリ") && errors[i][2].includes("prod-ddexencoder-total-Instances"))) {
            // CloudWatch Alarm Notifierアプリ #time @channel ALARM #prod-ddexencoder-total-Instances
            countA3 += 1;
        }
         else {
            countO += 1;
        }

        if (i === errors.length - 1) {
            dataN1.push({ [errors[i][0]]: countN1 })
            dataN2.push({ [errors[i][0]]: countN2 })
            dataC1.push({ [errors[i][0]]: countC1 })
            dataC2.push({ [errors[i][0]]: countC2 })
            dataC3.push({ [errors[i][0]]: countC3 })
            dataA1.push({ [errors[i][0]]: countA1 })
            dataA2.push({ [errors[i][0]]: countA2 })
            dataA3.push({ [errors[i][0]]: countA3 })
            dataO.push({ [errors[i][0]]: countO })
        } else {
            if (errors[i][0] != errors[i + 1][0]) {
                dataN1.push({ [errors[i][0]]: countN1 })
                dataN2.push({ [errors[i][0]]: countN2 })
                dataC1.push({ [errors[i][0]]: countC1 })
                dataC2.push({ [errors[i][0]]: countC2 })
                dataC3.push({ [errors[i][0]]: countC3 })
                dataA1.push({ [errors[i][0]]: countA1 })
                dataA2.push({ [errors[i][0]]: countA2 })
                dataA3.push({ [errors[i][0]]: countA3 })
                dataO.push({ [errors[i][0]]: countO })
                countN1 = 0; countN2 = 0;
                countC1 = 0; countC2 = 0; countC3 = 0;
                countA1 = 0; countA2 = 0; countA3 = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [errorType.N1];
    var arrayN2 = [errorType.N2];
    var arrayC1 = [errorType.C1];
    var arrayC2 = [errorType.C2];
    var arrayC3 = [errorType.C3];
    var arrayA1 = [errorType.A1];
    var arrayA2 = [errorType.A2];
    var arrayA3 = [errorType.A3];
    var arrayO = [errorType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueN2 = ''; let valueC1 = ''; let valueC2 = '';  let valueC3 = ''; let valueA1 = ''; let valueA2 = ''; let valueA3 = ''; let valueO = '';
        for (var j = 0; j < dataN1.length; j++) {
            let key = Object.keys(dataN1[j])[0];
            if (days[i] === key) {
                valueN1 = Object.values(dataN1[j])[0];
            }
        }
        arrayN1.push(valueN1)

        for (var j = 0; j < dataN2.length; j++) {
            let key = Object.keys(dataN2[j])[0];
            if (days[i] === key) {
                valueN2 = Object.values(dataN2[j])[0];
            }
        }
        arrayN2.push(valueN2)

        for (var j = 0; j < dataC1.length; j++) {
            let key = Object.keys(dataC1[j])[0];
            if (days[i] === key) {
                valueC1 = Object.values(dataC1[j])[0];
            }
        }
        arrayC1.push(valueC1)

        for (var j = 0; j < dataC2.length; j++) {
            let key = Object.keys(dataC2[j])[0];
            if (days[i] === key) {
                valueC2 = Object.values(dataC2[j])[0];
            }
        }
        arrayC2.push(valueC2)

        for (var j = 0; j < dataC3.length; j++) {
            let key = Object.keys(dataC3[j])[0];
            if (days[i] === key) {
                valueC3 = Object.values(dataC3[j])[0];
            }
        }
        arrayC3.push(valueC3)

        for (var j = 0; j < dataA1.length; j++) {
            let key = Object.keys(dataA1[j])[0];
            if (days[i] === key) {
                valueA1 = Object.values(dataA1[j])[0];
            }
        }
        arrayA1.push(valueA1)

        for (var j = 0; j < dataA2.length; j++) {
            let key = Object.keys(dataA2[j])[0];
            if (days[i] === key) {
                valueA2 = Object.values(dataA2[j])[0];
            }
        }
        arrayA2.push(valueA2)

        for (var j = 0; j < dataA3.length; j++) {
            let key = Object.keys(dataA3[j])[0];
            if (days[i] === key) {
                valueA3 = Object.values(dataA3[j])[0];
            }
        }
        arrayA3.push(valueA3)

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayN1, arrayN2, arrayA1, arrayA2, arrayA3, arrayC1, arrayC2, arrayC3, arrayO);
    return data;
};

classifyError.dwjp = function (errors, errorType) {
    var countN1 = 0; var countN2 = 0; var countC1 = 0; var countC2 = 0; var countC3 = 0; var countI = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataC1 = [];
    var dataC2 = [];
    var dataC3 = [];
    var dataI = [];
    var dataO = [];
    for (var i = 0; i < errors.length; i++) {
        // New Relicアプリ #time Incident #xxxxx opened noren-prod-db02ConditionProcessor load is too high noren-prod-dbPolicynoren alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'noren-prod-db02'
        if ((errors[i][2].includes("opened") && errors[i][2].includes("noren-prod-db02") && errors[i][2].includes("ConditionProcessor load is too high") && errors[i][2].includes("New Relic"))) {
            countN1 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("callsp-prod-web") && errors[i][2].includes("ConditionApdex (Low)") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened callsp-prod-webConditionApdex (Low)Policycall alert policyThresholdApdex < 0.3 at least once in 5 minutes on 'callsp-prod-web' ( #x KB )
            countN2 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("commands poll failed") && errors[i][2].includes("/dwango-jp/production/callsp-manage-messages") && errors[i][2].includes("Contains keywords to be alerted"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/callsp-manage-messages #... commands poll failed
            countC1 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("commands poll failed") && errors[i][2].includes("/dwango-jp/production/noren-manage-messages") && errors[i][2].includes("Contains keywords to be alerted"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-manage-messages #... commands poll failed
            countC2 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("no implicit conversion of nil into String") && errors[i][2].includes("/dwango-jp/production/noren-manage-app") && errors[i][2].includes("Contains keywords to be alerted"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-manage-app ERROR no implicit conversion of nil into String #...
            countC3 += 1;
        } else if ((errors[i][2].includes("incoming-webhookアプリ") && errors[i][2].includes("We detected anomalous behavior around the time this incident opened"))) {
            // incoming-webhookアプリ  #time We detected anomalous behavior around the time this incident opened callsp-prod-web External services total call time was much different than normal (#x min before)External services total call time (#x kB)
            countI += 1;
        } else {
            countO += 1;
        }

        if (i === errors.length - 1) {
            dataN1.push({ [errors[i][0]]: countN1 })
            dataN2.push({ [errors[i][0]]: countN2 })
            dataC1.push({ [errors[i][0]]: countC1 })
            dataC2.push({ [errors[i][0]]: countC2 })
            dataC3.push({ [errors[i][0]]: countC3 })
            dataI.push({ [errors[i][0]]: countI })
            dataO.push({ [errors[i][0]]: countO })
        } else {
            if (errors[i][0] != errors[i + 1][0]) {
                dataN1.push({ [errors[i][0]]: countN1 })
                dataN2.push({ [errors[i][0]]: countN2 })
                dataC1.push({ [errors[i][0]]: countC1 })
                dataC2.push({ [errors[i][0]]: countC2 })
                dataC3.push({ [errors[i][0]]: countC3 })
                dataI.push({ [errors[i][0]]: countI })
                dataO.push({ [errors[i][0]]: countO })
                countN1 = 0; countN2 = 0;
                countC1 = 0; countC2 = 0; countC3 = 0;
                countI = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [errorType.N1];
    var arrayN2 = [errorType.N2];
    var arrayC1 = [errorType.C1];
    var arrayC2 = [errorType.C2];
    var arrayC3 = [errorType.C3];
    var arrayI = [errorType.I];
    var arrayO = [errorType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueN2 = ''; let valueC1 = ''; let valueC2 = ''; let valueC3 = ''; let valueI = ''; let valueO = '';
        for (var j = 0; j < dataN1.length; j++) {
            let key = Object.keys(dataN1[j])[0];
            if (days[i] === key) {
                valueN1 = Object.values(dataN1[j])[0];
            }
        }
        arrayN1.push(valueN1)

        for (var j = 0; j < dataN2.length; j++) {
            let key = Object.keys(dataN2[j])[0];
            if (days[i] === key) {
                valueN2 = Object.values(dataN2[j])[0];
            }
        }
        arrayN2.push(valueN2)

        for (var j = 0; j < dataC1.length; j++) {
            let key = Object.keys(dataC1[j])[0];
            if (days[i] === key) {
                valueC1 = Object.values(dataC1[j])[0];
            }
        }
        arrayC1.push(valueC1)

        for (var j = 0; j < dataC2.length; j++) {
            let key = Object.keys(dataC2[j])[0];
            if (days[i] === key) {
                valueC2 = Object.values(dataC2[j])[0];
            }
        }
        arrayC2.push(valueC2)

        for (var j = 0; j < dataC3.length; j++) {
            let key = Object.keys(dataC3[j])[0];
            if (days[i] === key) {
                valueC3 = Object.values(dataC3[j])[0];
            }
        }
        arrayC3.push(valueC3)

        for (var j = 0; j < dataI.length; j++) {
            let key = Object.keys(dataI[j])[0];
            if (days[i] === key) {
                valueI = Object.values(dataI[j])[0];
            }
        }
        arrayI.push(valueI)

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayN1, arrayN2, arrayI, arrayC1, arrayC2, arrayC3, arrayO);
    return data;
}

classifyError.baas = function (errors, errorType) {
    var countN1 = 0; var countN2 = 0; var countC = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataC = [];
    var dataO = [];
    for (var i = 0; i < errors.length; i++) {
        // New Relicアプリ #time Incident #xxxxx opened Target IPxxxx ConditionProcessor load is too high cds-prodPolicycds alert policyThresholdLoad Average One Minute > 4 for at least 5 minutes on IPxxxx
        if ((errors[i][2].includes("opened") && errors[i][2].includes("ConditionProcessor load is too high cds-prod") && errors[i][2].includes("New Relic"))) {
            countN1 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("playready-web") && errors[i][2].includes("ConditionMemory Free %") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened Target #playready-webxx ConditionMemory Free % WARNING playreadyPolicycds alert policyThresholdMemory Free % < 20 for at least 1 minutes on 'playready-webxx'
            countN2 += 1;
        } else if ((errors[i][2].includes("CloudWatch Alarm Notifierアプリ") && errors[i][2].includes("@channel"))) {
            // CloudWatch Alarm Notifierアプリ #time @channel ALARM #target
            countC += 1;
        } else {
            countO += 1;
        }

        if (i === errors.length - 1) {
            dataN1.push({ [errors[i][0]]: countN1 })
            dataN2.push({ [errors[i][0]]: countN2 })
            dataC.push({ [errors[i][0]]: countC })
            dataO.push({ [errors[i][0]]: countO })
        } else {
            if (errors[i][0] != errors[i + 1][0]) {
                dataN1.push({ [errors[i][0]]: countN1 })
                dataN2.push({ [errors[i][0]]: countN2 })
                dataC.push({ [errors[i][0]]: countC })
                dataO.push({ [errors[i][0]]: countO })
                countN1 = 0;
                countN2 = 0;
                countC = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [errorType.N1];
    var arrayN2 = [errorType.N2];
    var arrayC = [errorType.C];
    var arrayO = [errorType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueC = ''; let valueN2 = ''; let valueO = '';
        for (var j = 0; j < dataN1.length; j++) {
            let key = Object.keys(dataN1[j])[0];
            if (days[i] === key) {
                valueN1 = Object.values(dataN1[j])[0];
            }
        }
        arrayN1.push(valueN1)

        for (var j = 0; j < dataN2.length; j++) {
            let key = Object.keys(dataN2[j])[0];
            if (days[i] === key) {
                valueN2 = Object.values(dataN2[j])[0];
            }
        }
        arrayN2.push(valueN2)

        for (var j = 0; j < dataC.length; j++) {
            let key = Object.keys(dataC[j])[0];
            if (days[i] === key) {
                valueC = Object.values(dataC[j])[0];
            }
        }
        arrayC.push(valueC)

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayN1, arrayN2, arrayC, arrayO);
    return data;
}

classifyError.saas = function (errors, errorType) {
    var countN1 = 0; var countN2 = 0; var countN3 = 0; var countA1 = 0; var countC1 = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataN3 = [];
    var dataA1 = [];
    var dataC1 = [];
    var dataO = [];
    for (var i = 0; i < errors.length; i++) {
        // New Relicアプリ #time Incident #xxxxx opened #ffewsn-dbs03 (/data)Conditionffewsn ffewsn-db* Disk Used %Policyffewsn ffewsn-db alert policyThresholdDisk Used % > 85 for at least 5 minutes on 'ffewsn-dbs03 (/data)'
        if ((errors[i][2].includes("opened") && errors[i][2].includes("ffewsn-dbs03") && errors[i][2].includes("ffewsn-db alert policyThresholdDisk Used % > 85") && errors[i][2].includes("New Relic"))) {
            countN1 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("ffewsn-dhc01") && errors[i][2].includes("Not Reporting at least once in 5 minutes") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #ffewsn-dhc01 Conditionffewsn ffewsn-dhc01 Host not reportingPolicyffewsn alert policyThresholdHost Not Reporting at least once in 5 minutes on 'ffewsn-dhc01'
            countN2 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("ffewsn-web01") && errors[i][2].includes("units for at least 5 minutes") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #ffewsn-web01 Conditionffewsn ffewsn-* Process : ntpdPolicyffewsn alert policyThresholdComponent/Processes/ntpd/Instance Count[processes] = 0 units for at least 5 minutes on 'ffewsn-web01'
            countN3 += 1;
        } else if ((errors[i][2].includes("CloudWatch Alarm Notifierアプリ") && errors[i][2].includes("/ffewsn/production/ffewsn-manage-batch-error/update-check") && errors[i][2].includes("にERRORを含むログが書き込まれました。確認してください。"))) {
            // CloudWatch Alarm Notifierアプリ @channel /ffewsn/production/ffewsn-manage-batch-error/update-check にERRORを含むログが書き込まれました。確認してください。
            countA1 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("/ffewsn/production/ffewsn-manage-batch-error") && errors[i][2].includes("素材データのインポート中に例外が発生しました exception 'FFewSnException'"))) {
            // cloudwatch-logs-alert-botアプリ #logGroup /ffewsn/production/ffewsn-manage-batch-error 素材データのインポート中に例外が発生しました exception 'FFewSnException'
            countC1 += 1;
        } else {
            countO += 1;
        }

        if (i === errors.length - 1) {
            dataN1.push({ [errors[i][0]]: countN1 })
            dataN2.push({ [errors[i][0]]: countN2 })
            dataN3.push({ [errors[i][0]]: countN3 })
            dataA1.push({ [errors[i][0]]: countA1 })
            dataC1.push({ [errors[i][0]]: countC1 })
            dataO.push({ [errors[i][0]]: countO })
        } else {
            if (errors[i][0] != errors[i + 1][0]) {
                dataN1.push({ [errors[i][0]]: countN1 })
                dataN2.push({ [errors[i][0]]: countN2 })
                dataN3.push({ [errors[i][0]]: countN3 })
                dataA1.push({ [errors[i][0]]: countA1 })
                dataC1.push({ [errors[i][0]]: countC1 })
                dataO.push({ [errors[i][0]]: countO })
                countN1 = 0; countN2 = 0; countN3 = 0;
                countC1;
                countA1;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [errorType.N1];
    var arrayN2 = [errorType.N2];
    var arrayN3 = [errorType.N3];
    var arrayA1 = [errorType.A1];
    var arrayC1 = [errorType.C1];
    var arrayO = [errorType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueN2 = ''; let valueN3 = ''; let valueA1 = ''; let valueC1 = ''; let valueO = '';
        for (var j = 0; j < dataN1.length; j++) {
            let key = Object.keys(dataN1[j])[0];
            if (days[i] === key) {
                valueN1 = Object.values(dataN1[j])[0];
            }
        }
        arrayN1.push(valueN1)

        for (var j = 0; j < dataN2.length; j++) {
            let key = Object.keys(dataN2[j])[0];
            if (days[i] === key) {
                valueN2 = Object.values(dataN2[j])[0];
            }
        }
        arrayN2.push(valueN2)

        for (var j = 0; j < dataN3.length; j++) {
            let key = Object.keys(dataN3[j])[0];
            if (days[i] === key) {
                valueN3 = Object.values(dataN3[j])[0];
            }
        }
        arrayN3.push(valueN3)

        for (var j = 0; j < dataA1.length; j++) {
            let key = Object.keys(dataA1[j])[0];
            if (days[i] === key) {
                valueA1 = Object.values(dataA1[j])[0];
            }
        }
        arrayA1.push(valueA1)

        for (var j = 0; j < dataC1.length; j++) {
            let key = Object.keys(dataC1[j])[0];
            if (days[i] === key) {
                valueC1 = Object.values(dataC1[j])[0];
            }
        }
        arrayC1.push(valueC1)

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayN1, arrayN2, arrayN3, arrayC1, arrayA1, arrayO);
    return data;
}

classifyError.sumo = function (errors, errorType) {
    var countN1 = 0; var countN2 = 0; var countN3 = 0; var countN4 = 0; var countC1 = 0; var countC2 = 0; var countI1 = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataN3 = [];
    var dataN4 = [];
    var dataC1 = [];
    var dataC2 = [];
    var dataI1 = [];
    var dataO = [];
    for (var i = 0; i < errors.length; i++) {
        // New Relicアプリ #time Incident #xxxxx opened #sumo-dski-tool Conditiond ski-tool Encoding NowPolicySumo Dski Tool alert policyThresholdProcess Running > 0 for at least 10 minutes on 'sumo-dski-tool'
        if ((errors[i][2].includes("opened") && errors[i][2].includes("sumo-dski-tool") && errors[i][2].includes("Running > 0 for at least 10 minutes") && errors[i][2].includes("New Relic"))) {
            countN1 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("sumo-dski-tool") && errors[i][2].includes("Average One Minute > 3.5 for at least 10 minutes") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #sumo-dski-tool Condition Processor load is too high Policy Sumo Dski Tool alert policyThresholdLoad Average One Minute > 3.5 for at least 10 minutes on 'sumo-dski-tool'
            countN2 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("Sumo Urushi") && errors[i][2].includes("percentage > 15% at least once in 5 minutes") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #Sumo Urushi Condition Error percentage (High)PolicySumo Urushi alert policyThresholdError percentage > 15% at least once in 5 minutes on 'Sumo Urushi'
            countN3 += 1;
        }  else if ((errors[i][2].includes("opened") && errors[i][2].includes("Sumo Push") && errors[i][2].includes("memory usage > 90% for at least 15 minutes") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #Sumo Push #ip ConditionHeap memory usage (High)Policy Sumo Push alert policy Threshold Heap memory usage > 90% for at least 15 minutes on 'Sumo Push #ip'
            countN4 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("/sumo/test/sumo-cli") && errors[i][2].includes("failed to import news") && errors[i][2].includes("Contains keywords to be alerted"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/test/sumo-cli ... ERROR failed to import news
            countC1 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("/sumo/production/data-replica-api-error") && errors[i][2].includes('PHP Warning') && errors[i][2].includes("Contains keywords to be alerted"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/production/data-replica-api-error PHP Warning
            countC2 += 1;
        } else if ((errors[i][2].includes("incoming-webhookアプリ") && errors[i][2].includes("Sumo Dski-tool") && errors[i][2].includes('Web transactions total call time was much different than normal'))) {
            // incoming-webhookアプリ #time We detected anomalous behavior around the time this incident opened. Application running on the alerting host #Sumo Dski-toolWeb transactions total call time was much different than normal (12 min before) Web transactions total call time (7 kB)
            countI1 += 1;
        } else {
            countO += 1;
        }

        if (i === errors.length - 1) {
            dataN1.push({ [errors[i][0]]: countN1 })
            dataN2.push({ [errors[i][0]]: countN2 })
            dataN3.push({ [errors[i][0]]: countN3 })
            dataN4.push({ [errors[i][0]]: countN4 })
            dataC1.push({ [errors[i][0]]: countC1 })
            dataC2.push({ [errors[i][0]]: countC2 })
            dataI1.push({ [errors[i][0]]: countI1 })
            dataO.push({ [errors[i][0]]: countO })
        } else {
            if (errors[i][0] != errors[i + 1][0]) {
                dataN1.push({ [errors[i][0]]: countN1 })
                dataN2.push({ [errors[i][0]]: countN2 })
                dataN3.push({ [errors[i][0]]: countN3 })
                dataN4.push({ [errors[i][0]]: countN4 })
                dataC1.push({ [errors[i][0]]: countC1 })
                dataC2.push({ [errors[i][0]]: countC2 })
                dataI1.push({ [errors[i][0]]: countI1 })
                dataO.push({ [errors[i][0]]: countO })
                countN1 = 0; countN2 = 0; countN3 = 0; countN4 = 0;
                countC1 = 0; countC2 = 0;
                countI1 = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [errorType.N1];
    var arrayN2 = [errorType.N2];
    var arrayN3 = [errorType.N3];
    var arrayN4 = [errorType.N4];
    var arrayC1 = [errorType.C1];
    var arrayC2 = [errorType.C2];
    var arrayI1 = [errorType.I1];
    var arrayO = [errorType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueN2 = ''; let valueN3 = ''; let valueN4 = ''; let valueC1 = ''; let valueC2 = ''; let valueI1 = ''; let valueO = '';
        for (var j = 0; j < dataN1.length; j++) {
            let key = Object.keys(dataN1[j])[0];
            if (days[i] === key) {
                valueN1 = Object.values(dataN1[j])[0];
            }
        }
        arrayN1.push(valueN1)

        for (var j = 0; j < dataN2.length; j++) {
            let key = Object.keys(dataN2[j])[0];
            if (days[i] === key) {
                valueN2 = Object.values(dataN2[j])[0];
            }
        }
        arrayN2.push(valueN2)

        for (var j = 0; j < dataN3.length; j++) {
            let key = Object.keys(dataN3[j])[0];
            if (days[i] === key) {
                valueN3 = Object.values(dataN3[j])[0];
            }
        }
        arrayN3.push(valueN3)

        for (var j = 0; j < dataN4.length; j++) {
            let key = Object.keys(dataN4[j])[0];
            if (days[i] === key) {
                valueN4 = Object.values(dataN4[j])[0];
            }
        }
        arrayN4.push(valueN4)

        for (var j = 0; j < dataC1.length; j++) {
            let key = Object.keys(dataC1[j])[0];
            if (days[i] === key) {
                valueC1 = Object.values(dataC1[j])[0];
            }
        }
        arrayC1.push(valueC1)

        for (var j = 0; j < dataC2.length; j++) {
            let key = Object.keys(dataC2[j])[0];
            if (days[i] === key) {
                valueC2 = Object.values(dataC2[j])[0];
            }
        }
        arrayC2.push(valueC2)

        for (var j = 0; j < dataI1.length; j++) {
            let key = Object.keys(dataI1[j])[0];
            if (days[i] === key) {
                valueI1 = Object.values(dataI1[j])[0];
            }
        }
        arrayI1.push(valueI1)

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayN1, arrayN2, arrayN3, arrayN4, arrayC1, arrayC2, arrayI1, arrayO);
    return data;
}
