var SERVERS = {
    "dam" : {
        "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  " : "\nCloudWatch Alarm Notifierアプリ  ",
            "dam emailアプリ  " : "\ndam emailアプリ  ",
            "New Relicアプリ  " : "\nNew Relicアプリ  "
        },
        "replace" : {
            "cloudwatch-logs-alert-botアプリ  " : "",
            "CloudWatch Alarm Notifierアプリ  " : "",
            "dam emailアプリ  " : "",
            "New Relicアプリ  " : ""
        },
        "errorType" : {
            "N1" : "New Relicアプリ #time Incident #xxxxx opened #ddex-db11 ConditionRDB CPU Utilization Average ddex-dbPolicyddex alert policyThresholdProvider . CPU Utilization . Average > 70 for at least 5 minutes on 'ddex-db11'",
            "N2" : "New Relicアプリ #time Incident #xxxxx opened #prod-midio-am ConditionProcessor load is too highPolicymidio alert policyThresholdLoad Average One Minute > 2 for at least 5 minutes on 'prod-midio-am'",
            "C1" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dwjp-jacket-schedule-planner #... ERROR Schedule Failed #...",
            "C2" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #/dam/prod/dam-to-dwjp--scheduled-ffewsn-import-file #... TaskFailed #... ExecutionFailed #...",
            "A" : "CloudWatch Alarm Notifierアプリ #time @channel ALARM #/ddex/production/ddex-batch-batch_importer_info/auto_delivery/missingAlarm",
            "O" : "Other"
        }
    },
    "dwjp" : {
        "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  " : "\nCloudWatch Alarm Notifierアプリ  ",
            "incoming-webhookアプリ  " : "\nincoming-webhookアプリ  ",
            "dwjp notificationアプリ  " : "\ndwjp notificationアプリ  ",
            "New Relicアプリ  " : "\nNew Relicアプリ  "
        },
        "replace" : {
            "cloudwatch-logs-alert-botアプリ  " : "",
            "CloudWatch Alarm Notifierアプリ  " : "",
            "incoming-webhookアプリ  " : "",
            "dwjp notificationアプリ  " : "",
            "New Relicアプリ  " : ""
        },
        "errorType" : {
            "N" : "New Relicアプリ #time Incident #xxxxx opened Target #target",
            "C" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target",
            "I" : "incoming-webhookアプリ  #time We detected anomalous behavior around the time this incident opened #target",
            "O" : "Other"
        }
    },
    "baas" : {
        "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  " : "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  " : "\nNew Relicアプリ  "
        },
        "replace" : {
            "cloudwatch-logs-alert-botアプリ  " : "",
            "CloudWatch Alarm Notifierアプリ  " : "",
            "New Relicアプリ  " : ""
        },
        "errorType" : {
            "N" : "New Relicアプリ #time Incident #xxxxx opened Target #target",
            "C" : "CloudWatch Alarm Notifierアプリ #time @channel ALARM #target",
            "O" : "Other"
        }
    },
    "saas" : {
        "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  " : "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  " : "\nNew Relicアプリ  ",
            "saas emailアプリ  " : "\nsaas emailアプリ  "
        },
        "replace" : {
            "cloudwatch-logs-alert-botアプリ  " : "",
            "CloudWatch Alarm Notifierアプリ  " : "",
            "New Relicアプリ  " : "",
            "saas emailアプリ  " : ""
        },
        "errorType" : {
            "N1" : "New Relicアプリ #time Incident #xxxxx opened #Target ffewsn-dbs03",
            "N2" : "New Relicアプリ #time Incident #xxxxx opened #Target ffewsn-dhc01",
            "N3" : "New Relicアプリ #time Incident #xxxxx opened #Target ffewsn-web01",
            "O" : "Other"
        }
    },
    "sumo" : {
        "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  " : "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  " : "\nNew Relicアプリ  ",
            "incoming-webhookアプリ  " : "\nincoming-webhookアプリ  "
         },
         "replace" : {
            "cloudwatch-logs-alert-botアプリ  " : "",
            "CloudWatch Alarm Notifierアプリ  " : "",
            "New Relicアプリ  " : "",
            "incoming-webhookアプリ  " : ""
         },
         "errorType" : {
            "N" : "New Relicアプリ #time Incident #xxxxx opened Target #target",
            "C" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target",
            "O" : "Other"
        }
    }
    
}