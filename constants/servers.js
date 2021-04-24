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
            "N" : "New Relicアプリ #time Incident #xxxxx opened Target #target",
            "C" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target",
            "A" : "CloudWatch Alarm Notifierアプリ #time @channel ALARM #channel",
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
            "C" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target",
            "A" : "CloudWatch Alarm Notifierアプリ #time @channel ALARM #channel"
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
            "N" : "New Relicアプリ #time Incident #xxxxx opened Target #target",
            "C" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target",
            "A" : "CloudWatch Alarm Notifierアプリ #time @channel ALARM #channel"
        }
    },
    "sumo" : {
        "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "\ncloudwatch-logs-alert-botアプリ  ",
            "CloudWatch Alarm Notifierアプリ  " : "\nCloudWatch Alarm Notifierアプリ  ",
            "New Relicアプリ  " : "\nNew Relicアプリ  ",
            "incoming-webhookアプリ  " : "\nincoming-webhookアプリ  "
         },
         "rule" : {
            "cloudwatch-logs-alert-botアプリ  " : "",
            "CloudWatch Alarm Notifierアプリ  " : "",
            "New Relicアプリ  " : "",
            "incoming-webhookアプリ  " : ""
         },
         "errorType" : {
            "N" : "New Relicアプリ #time Incident #xxxxx opened Target #target",
            "C" : "cloudwatch-logs-alert-botアプリ #time Log Monitoring - Contains keywords to be alerted. ログ全文は上記リンクから logGroup #target",
            "A" : "CloudWatch Alarm Notifierアプリ #time @channel ALARM #channel"
        }
    }
    
}