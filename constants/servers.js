var SERVERS = {
    "dam": {
        "rule": {
            "cloudwatch-logs-alert-botアプリ  ": "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  ": "\nCloudWatch Alarm Notifierアプリ  ",
            "dam emailアプリ  ": "\ndam emailアプリ  ",
            "New Relicアプリ  ": "\nNew Relicアプリ  "
        },
        "replace": {
            "cloudwatch-logs-alert-botアプリ  ": "",
            "CloudWatch Alarm Notifierアプリ  ": "",
            "dam emailアプリ  ": "",
            "New Relicアプリ  ": ""
        },
        "errorType": {
            "N1": "New Relicアプリ #time Incident #xxxxx opened #ddex-db11 ConditionRDB CPU Utilization Average ddex-dbPolicyddex alert policyThresholdProvider . CPU Utilization . Average > 70 for at least 5 minutes on 'ddex-db11'",
            "N2": "New Relicアプリ #time Incident #xxxxx opened #prod-midio-am ConditionProcessor load is too highPolicymidio alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'prod-midio-am'",
            "C1": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dwjp-jacket-schedule-planner #... ERROR Schedule Failed / ERROR o.h.engine.jdbc.. #...",
            "C2": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file #... TaskFailed #... ExecutionFailed #...",
            "C3": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/aws/lambda/prod--dam--dam-to-dwjp--reporter",
            "A1": "CloudWatch Alarm Notifierアプリ #time @channel ALARM #/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm",
            "A2": "CloudWatch Alarm Notifierアプリ #time @channel ALARM #/dam/test/etl-batch/error",
            "A3": "CloudWatch Alarm Notifierアプリ #time @channel ALARM #prod-ddexencoder-total-Instances",
            "O": "Other"
        },
        "ignoreType": {
            "N1": "New Relicアプリ #time Incident #xxxxx opened #drdy-test-app01 Condition Memory Free % WARNING drdyPolicyddex encoder alert policy Threshold Memory Free % < 20 for at least 1 minutes on 'drdy-test-app01'",
            "C1": "cloudwatch-logs-alert-botアプリ #time logGroup aws/lambda/prod--dam--fargate-task-kicker ERROR statusCode:500 failed to submit job :run_taskが失敗しました...:hanko_sumi:11 件の返信27日前スレッドを表示する",
            "O": "Other"
        }
    },
    "dwjp": {
        "rule": {
            "cloudwatch-logs-alert-botアプリ  ": "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  ": "\nCloudWatch Alarm Notifierアプリ  ",
            "incoming-webhookアプリ  ": "\nincoming-webhookアプリ  ",
            "dwjp notificationアプリ  ": "\ndwjp notificationアプリ  ",
            "New Relicアプリ  ": "\nNew Relicアプリ  "
        },
        "replace": {
            "cloudwatch-logs-alert-botアプリ  ": "",
            "CloudWatch Alarm Notifierアプリ  ": "",
            "incoming-webhookアプリ  ": "",
            "dwjp notificationアプリ  ": "",
            "New Relicアプリ  ": ""
        },
        "errorType": {
            "N1": "New Relicアプリ #time Incident #xxxxx opened noren-prod-db02ConditionProcessor load is too high noren-prod-dbPolicynoren alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'noren-prod-db02'",
            "N2": "New Relicアプリ #time Incident #xxxxx opened callsp-prod-webConditionApdex (Low)Policycall alert policyThresholdApdex < 0.3 at least once in 5 minutes on 'callsp-prod-web' ( #x KB )",
            "C1": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/callsp-manage-messages #... commands poll failed",
            "C2": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-manage-messages #... commands poll failed",
            "C3": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-manage-app ERROR no implicit conversion of nil into String #...",
            "I": "incoming-webhookアプリ  #time We detected anomalous behavior around the time this incident opened callsp-prod-web External services total call time was much different than normal (#x min before)External services total call time (#x kB)",
            "O": "Other"
        },
        "ignoreType": {
            "C1": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/noren-web-app #... ERROR #... Error: execution expired",
            "C2": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup /dwango-jp/production/cot-app #... ERROR #... Error: execution expired",
            "O": "Other"
        }
    },
    "baas": {
        "rule": {
            "cloudwatch-logs-alert-botアプリ  ": "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  ": "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  ": "\nNew Relicアプリ  "
        },
        "replace": {
            "cloudwatch-logs-alert-botアプリ  ": "",
            "CloudWatch Alarm Notifierアプリ  ": "",
            "New Relicアプリ  ": ""
        },
        "errorType": {
            "N1": "New Relicアプリ #time Incident #xxxxx opened Target IPxxxx ConditionProcessor load is too high cds-prodPolicycds alert policyThresholdLoad Average One Minute > 4 for at least 5 minutes on IPxxxx",
            "N2": "New Relicアプリ #time Incident #xxxxx opened Target #playready-webxx ConditionMemory Free % WARNING playreadyPolicycds alert policyThresholdMemory Free % < 20 for at least 1 minutes on 'playready-webxx'",
            "C": "CloudWatch Alarm Notifierアプリ #time @channel ALARM #target",
            "O": "Other"
        }
    },
    "saas": {
        "rule": {
            "cloudwatch-logs-alert-botアプリ  ": "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  ": "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  ": "\nNew Relicアプリ  ",
            "saas emailアプリ  ": "\nsaas emailアプリ  "
        },
        "replace": {
            "cloudwatch-logs-alert-botアプリ  ": "",
            "CloudWatch Alarm Notifierアプリ  ": "",
            "New Relicアプリ  ": "",
            "saas emailアプリ  ": ""
        },
        "errorType": {
            "N1": "New Relicアプリ #time Incident #xxxxx opened #ffewsn-dbs03 (/data)Conditionffewsn ffewsn-db* Disk Used %Policyffewsn ffewsn-db alert policyThresholdDisk Used % > 85 for at least 5 minutes on 'ffewsn-dbs03 (/data)'",
            "N2": "New Relicアプリ #time Incident #xxxxx opened #ffewsn-dhc01 Conditionffewsn ffewsn-dhc01 Host not reportingPolicyffewsn alert policyThresholdHost Not Reporting at least once in 5 minutes on 'ffewsn-dhc01'",
            "N3": "New Relicアプリ #time Incident #xxxxx opened #ffewsn-web01 Conditionffewsn ffewsn-* Process : ntpdPolicyffewsn alert policyThresholdComponent/Processes/ntpd/Instance Count[processes] = 0 units for at least 5 minutes on 'ffewsn-web01'",
            "A1": "CloudWatch Alarm Notifierアプリ @channel /ffewsn/production/ffewsn-manage-batch-error/update-check にERRORを含むログが書き込まれました。確認してください。",
            "C1": "cloudwatch-logs-alert-botアプリ #logGroup /ffewsn/production/ffewsn-manage-batch-error 素材データのインポート中に例外が発生しました exception 'FFewSnException'",
            "O": "Other"
        }
    },
    "sumo": {
        "rule": {
            "cloudwatch-logs-alert-botアプリ  ": "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  ": "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  ": "\nNew Relicアプリ  ",
            "incoming-webhookアプリ  ": "\nincoming-webhookアプリ  "
        },
        "replace": {
            "cloudwatch-logs-alert-botアプリ  ": "",
            "CloudWatch Alarm Notifierアプリ  ": "",
            "New Relicアプリ  ": "",
            "incoming-webhookアプリ  ": ""
        },
        "errorType": {
            "N1": "New Relicアプリ #time Incident #xxxxx opened #sumo-dski-tool Conditiond ski-tool Encoding NowPolicySumo Dski Tool alert policyThresholdProcess Running > 0 for at least 10 minutes on 'sumo-dski-tool'",
            "N2": "New Relicアプリ #time Incident #xxxxx opened #sumo-dski-tool Condition Processor load is too high Policy Sumo Dski Tool alert policyThresholdLoad Average One Minute > 3.5 for at least 10 minutes on 'sumo-dski-tool'",
            "N3": "New Relicアプリ #time Incident #xxxxx opened #Sumo Urushi Condition Error percentage (High)PolicySumo Urushi alert policyThresholdError percentage > 15% at least once in 5 minutes on 'Sumo Urushi'",
            "N4": "New Relicアプリ #time Incident #xxxxx opened #Sumo Push #ip ConditionHeap memory usage (High)Policy Sumo Push alert policy Threshold Heap memory usage > 90% for at least 15 minutes on 'Sumo Push #ip'",
            "C1": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/test/sumo-cli ... ERROR failed to import news",
            "C2": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/production/data-replica-api-error PHP Warning",
            "I1": "incoming-webhookアプリ #time We detected anomalous behavior around the time this incident opened. Application running on the alerting host #Sumo Dski-toolWeb transactions total call time was much different than normal (12 min before) Web transactions total call time (7 kB)",
            "O": "Other"
        },
        "ignoreType": {
            "C1": "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/sumo/production/urushi-app ... ERROR  logger:scalikejdbc.Statement Executor$$anon$1 method:error message:SQL ex....",
            "O": "Other"
        },
    }

}