classifyIngore = function (options) {
    return this.init(options);
};

classifyIngore.prototype = {
    init: function () {
        return this;
    }
};

classifyIngore.dam = function (ignore, ignoreType) {
    var countN1 = 0; var countC1 = 0; var countO = 0;
    var dataN1 = [];
    var dataC1 = [];
    var dataO = [];
    for (var i = 0; i < ignore.length; i++) {
        if ((ignore[i][2].includes("aws/lambda/prod--dam--fargate-task-kicker"))) {
            // cloudwatch-logs-alert-botアプリ #time logGroup aws/lambda/prod--dam--fargate-task-kicker ERROR statusCode:500 failed to submit job :run_taskが失敗しました...:hanko_sumi:11 件の返信27日前スレッドを表示する
            countC1 += 1;
        } else if ((ignore[i][2].includes("opened") && ignore[i][2].includes("drdy-test-app01") && ignore[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #drdy-test-app01 Condition Memory Free % WARNING drdyPolicyddex encoder alert policy Threshold Memory Free % < 20 for at least 1 minutes on 'drdy-test-app01'
            countN1 += 1;
        } else {
            countO += 1;
        }

        if (i === ignore.length - 1) {
            dataN1.push({ [ignore[i][0]]: countN1 })
            dataC1.push({ [ignore[i][0]]: countC1 })
            dataO.push({ [ignore[i][0]]: countO })
        } else {
            if (ignore[i][0] != ignore[i + 1][0]) {
                dataN1.push({ [ignore[i][0]]: countN1 })
                dataC1.push({ [ignore[i][0]]: countC1 })
                dataO.push({ [ignore[i][0]]: countO })
                countN1 = 0;
                countC1 = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [ignoreType.N1];
    var arrayC1 = [ignoreType.C1];
    var arrayO = [ignoreType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueC1 = ''; let valueO = '';
        for (var j = 0; j < dataN1.length; j++) {
            let key = Object.keys(dataN1[j])[0];
            if (days[i] === key) {
                valueN1 = Object.values(dataN1[j])[0];
            }
        }
        arrayN1.push(valueN1)

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
    data.push(arrayN1, arrayC1, arrayO);
    return data;
};

classifyIngore.dwjp = function (ignore, ignoreType) {
    var countC1 = 0; var countC2 = 0; var countO = 0;
    var dataC1 = [];
    var dataC2 = [];
    var dataO = [];
    for (var i = 0; i < ignore.length; i++) {
        if ((ignore[i][2].includes("cloudwatch-logs-alert-botアプリ") && ignore[i][2].includes("/dwango-jp/production/noren-web-app"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-web-app #... ERROR #... Error: execution expired
            countC1 += 1;
        } else if ((ignore[i][2].includes("cloudwatch-logs-alert-botアプリ") && ignore[i][2].includes("/dwango-jp/production/cot-app"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/cot-app #... ERROR #... Error: execution expired
            countC2 += 1;
        } else {
            countO += 1;
        }

        if (i === ignore.length - 1) {
            dataC1.push({ [ignore[i][0]]: countC1 })
            dataC2.push({ [ignore[i][0]]: countC2 })
            dataO.push({ [ignore[i][0]]: countO })
        } else {
            if (ignore[i][0] != ignore[i + 1][0]) {
                dataC1.push({ [ignore[i][0]]: countC1 })
                dataC2.push({ [ignore[i][0]]: countC2 })
                countC1 = 0; countC2 = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayC1 = [ignoreType.C1];
    var arrayC2 = [ignoreType.C2];
    var arrayO = [ignoreType.O];
    for (var i = 1; i < days.length; i++) {
        let valueC1 = ''; let valueC2 = ''; let valueO = '';

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

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayC1, arrayC2, arrayO);
    return data;
}

classifyIngore.baas = function (ignore, ignoreType) {
    var countN1 = 0; var countN2 = 0; var countC = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataC = [];
    var dataO = [];
    for (var i = 0; i < ignore.length; i++) {
        // New Relicアプリ #time Incident #xxxxx opened Target IPxxxx ConditionProcessor load is too high cds-prodPolicycds alert policyThresholdLoad Average One Minute > 4 for at least 5 minutes on IPxxxx
        if ((ignore[i][2].includes("opened") && ignore[i][2].includes("ConditionProcessor load is too high cds-prod") && ignore[i][2].includes("New Relic"))) {
            countN1 += 1;
        } else if ((ignore[i][2].includes("opened") && ignore[i][2].includes("playready-web") && ignore[i][2].includes("ConditionMemory Free %") && ignore[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened Target #playready-webxx ConditionMemory Free % WARNING playreadyPolicycds alert policyThresholdMemory Free % < 20 for at least 1 minutes on 'playready-webxx'
            countN2 += 1;
        } else if ((ignore[i][2].includes("CloudWatch Alarm Notifierアプリ") && ignore[i][2].includes("@channel"))) {
            // CloudWatch Alarm Notifierアプリ #time @channel ALARM #target
            countC += 1;
        } else {
            countO += 1;
        }

        if (i === ignore.length - 1) {
            dataN1.push({ [ignore[i][0]]: countN1 })
            dataN2.push({ [ignore[i][0]]: countN2 })
            dataC.push({ [ignore[i][0]]: countC })
            dataO.push({ [ignore[i][0]]: countO })
        } else {
            if (ignore[i][0] != ignore[i + 1][0]) {
                dataN1.push({ [ignore[i][0]]: countN1 })
                dataN2.push({ [ignore[i][0]]: countN2 })
                dataC.push({ [ignore[i][0]]: countC })
                dataO.push({ [ignore[i][0]]: countO })
                countN1 = 0;
                countN2 = 0;
                countC = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [ignoreType.N1];
    var arrayN2 = [ignoreType.N2];
    var arrayC = [ignoreType.C];
    var arrayO = [ignoreType.O];
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

classifyIngore.saas = function (ignore, ignoreType) {
    var countN1 = 0; var countN2 = 0; var countN3 = 0; var countA1 = 0; var countC1 = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataN3 = [];
    var dataA1 = [];
    var dataC1 = [];
    var dataO = [];
    for (var i = 0; i < ignore.length; i++) {
        // New Relicアプリ #time Incident #xxxxx opened #ffewsn-dbs03 (/data)Conditionffewsn ffewsn-db* Disk Used %Policyffewsn ffewsn-db alert policyThresholdDisk Used % > 85 for at least 5 minutes on 'ffewsn-dbs03 (/data)'
        if ((ignore[i][2].includes("opened") && ignore[i][2].includes("ffewsn-dbs03") && ignore[i][2].includes("ffewsn-db alert policyThresholdDisk Used % > 85") && ignore[i][2].includes("New Relic"))) {
            countN1 += 1;
        } else if ((ignore[i][2].includes("opened") && ignore[i][2].includes("ffewsn-dhc01") && ignore[i][2].includes("Not Reporting at least once in 5 minutes") && ignore[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #ffewsn-dhc01 Conditionffewsn ffewsn-dhc01 Host not reportingPolicyffewsn alert policyThresholdHost Not Reporting at least once in 5 minutes on 'ffewsn-dhc01'
            countN2 += 1;
        } else if ((ignore[i][2].includes("opened") && ignore[i][2].includes("ffewsn-web01") && ignore[i][2].includes("units for at least 5 minutes") && ignore[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #ffewsn-web01 Conditionffewsn ffewsn-* Process : ntpdPolicyffewsn alert policyThresholdComponent/Processes/ntpd/Instance Count[processes] = 0 units for at least 5 minutes on 'ffewsn-web01'
            countN3 += 1;
        } else if ((ignore[i][2].includes("CloudWatch Alarm Notifierアプリ") && ignore[i][2].includes("/ffewsn/production/ffewsn-manage-batch-error/update-check") && ignore[i][2].includes("にERRORを含むログが書き込まれました。確認してください。"))) {
            // CloudWatch Alarm Notifierアプリ @channel /ffewsn/production/ffewsn-manage-batch-error/update-check にERRORを含むログが書き込まれました。確認してください。
            countA1 += 1;
        } else if ((ignore[i][2].includes("cloudwatch-logs-alert-botアプリ") && ignore[i][2].includes("/ffewsn/production/ffewsn-manage-batch-error") && ignore[i][2].includes("素材データのインポート中に例外が発生しました exception 'FFewSnException'"))) {
            // cloudwatch-logs-alert-botアプリ #logGroup /ffewsn/production/ffewsn-manage-batch-error 素材データのインポート中に例外が発生しました exception 'FFewSnException'
            countC1 += 1;
        } else {
            countO += 1;
        }

        if (i === ignore.length - 1) {
            dataN1.push({ [ignore[i][0]]: countN1 })
            dataN2.push({ [ignore[i][0]]: countN2 })
            dataN3.push({ [ignore[i][0]]: countN3 })
            dataA1.push({ [ignore[i][0]]: countA1 })
            dataC1.push({ [ignore[i][0]]: countC1 })
            dataO.push({ [ignore[i][0]]: countO })
        } else {
            if (ignore[i][0] != ignore[i + 1][0]) {
                dataN1.push({ [ignore[i][0]]: countN1 })
                dataN2.push({ [ignore[i][0]]: countN2 })
                dataN3.push({ [ignore[i][0]]: countN3 })
                dataA1.push({ [ignore[i][0]]: countA1 })
                dataC1.push({ [ignore[i][0]]: countC1 })
                dataO.push({ [ignore[i][0]]: countO })
                countN1 = 0; countN2 = 0; countN3 = 0;
                countC1;
                countA1;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [ignoreType.N1];
    var arrayN2 = [ignoreType.N2];
    var arrayN3 = [ignoreType.N3];
    var arrayA1 = [ignoreType.A1];
    var arrayC1 = [ignoreType.C1];
    var arrayO = [ignoreType.O];
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

classifyIngore.sumo = function (ignore, ignoreType) {
    var countC1 = 0; var countO = 0;
    var dataC1 = [];
    var dataO = [];
    for (var i = 0; i < ignore.length; i++) {
        if ((ignore[i][2].includes("cloudwatch-logs-alert-botアプリ") && ignore[i][2].includes("/sumo/production/urushi-app"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/production/urushi-app ... ERROR  logger:scalikejdbc.Statement Executor$$anon$1 method:error message:SQL ex....
            countC1 += 1;
        } else {
            countO += 1;
        }

        if (i === ignore.length - 1) {
            dataC1.push({ [ignore[i][0]]: countC1 })
            dataO.push({ [ignore[i][0]]: countO })
        } else {
            if (ignore[i][0] != ignore[i + 1][0]) {
                dataC1.push({ [ignore[i][0]]: countC1 })
                dataO.push({ [ignore[i][0]]: countO })
                countC1 = 0;
                countO = 0;
            }
        }
    }
    var days = base.getDaysInMonth()
    var arrayC1 = [ignoreType.C1];
    var arrayO = [ignoreType.O];
    for (var i = 1; i < days.length; i++) {
        let valueC1 = ''; let valueO = '';

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
    data.push(arrayC1, arrayO);
    return data;
}
