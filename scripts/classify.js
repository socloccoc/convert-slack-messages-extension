classify = function (options) {
    return this.init(options);
};

classify.prototype = {
    init: function () {
        return this;
    }
};


classify.dam = function (errors, errorType) {
    var countN1 = 0; var countN2 = 0; var countC1 = 0; var countC2 = 0; var countA = 0; var countO = 0;
    var dataN1 = [];
    var dataN2 = [];
    var dataC1 = [];
    var dataC2 = [];
    var dataA = [];
    var dataO = [];
    for (var i = 0; i < errors.length; i++) {
        if ((errors[i][2].includes("opened") && errors[i][2].includes("ddex-db11") && errors[i][2].includes("ConditionRDB CPU Utilization Average") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #ddex-db11 ConditionRDB CPU Utilization Average ddex-dbPolicyddex alert policyThresholdProvider . CPU Utilization . Average > 70 for at least 5 minutes on 'ddex-db11'
            countN1 += 1;
        } else if ((errors[i][2].includes("opened") && errors[i][2].includes("prod-midio-am") && errors[i][2].includes("ConditionProcessor load is too highPolicymidio") && errors[i][2].includes("New Relic"))) {
            // New Relicアプリ #time Incident #xxxxx opened #prod-midio-am ConditionProcessor load is too highPolicymidio alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'prod-midio-am'
            countN2 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("Log Monitoring") && errors[i][2].includes("/dam/prod/dwjp-jacket-schedule-planner") && errors[i][2].includes("Schedule Failed"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dwjp-jacket-schedule-planner #... ERROR Schedule Failed #...
            countC1 += 1;
        } else if ((errors[i][2].includes("cloudwatch-logs-alert-botアプリ") && errors[i][2].includes("Log Monitoring") && errors[i][2].includes("/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file") && errors[i][2].includes("TaskFailed"))) {
            // cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file #... TaskFailed #... ExecutionFailed #...
            countC2 += 1;
        } else if ((errors[i][2].includes("CloudWatch Alarm Notifierアプリ") && errors[i][2].includes("/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm"))) {
            // CloudWatch Alarm Notifierアプリ #time @channel ALARM #/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm
            countA += 1;
        } else {
            countO += 1;
        }

        if (i === errors.length - 1) {
            dataN1.push({ [errors[i][0]]: countN1 })
            dataN2.push({ [errors[i][0]]: countN2 })
            dataC1.push({ [errors[i][0]]: countC1 })
            dataC2.push({ [errors[i][0]]: countC2 })
            dataA.push({ [errors[i][0]]: countA })
            dataO.push({ [errors[i][0]]: countO })
        } else {
            if (errors[i][0] != errors[i + 1][0]) {
                dataN1.push({ [errors[i][0]]: countN1 })
                dataN2.push({ [errors[i][0]]: countN2 })
                dataC1.push({ [errors[i][0]]: countC1 })
                dataC2.push({ [errors[i][0]]: countC2 })
                dataA.push({ [errors[i][0]]: countA })
                dataO.push({ [errors[i][0]]: countO })
                countN1 = 0;
                countN2 = 0;
                countC1 = 0;
                countC2 = 0;
                countA = 0;
                countO = 0;
            }
        }

    }
    var days = base.getDaysInMonth()
    var arrayN1 = [errorType.N1];
    var arrayN2 = [errorType.N2];
    var arrayC1 = [errorType.C1];
    var arrayC2 = [errorType.C2];
    var arrayA = [errorType.A];
    var arrayO = [errorType.O];
    for (var i = 1; i < days.length; i++) {
        let valueN1 = ''; let valueN2 = ''; let valueC1 = ''; let valueC2 = ''; let valueA = ''; let valueO = '';
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

        for (var j = 0; j < dataA.length; j++) {
            let key = Object.keys(dataA[j])[0];
            if (days[i] === key) {
                valueA = Object.values(dataA[j])[0];
            }
        }
        arrayA.push(valueA)

        for (var j = 0; j < dataO.length; j++) {
            let key = Object.keys(dataO[j])[0];
            if (days[i] === key) {
                valueO = Object.values(dataO[j])[0];
            }
        }
        arrayO.push(valueO)
    }
    var data = [days];
    data.push(arrayN1, arrayN2, arrayA, arrayC1, arrayC2, arrayO);
    return data;
};
