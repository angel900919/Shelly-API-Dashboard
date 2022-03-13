**Shelly Family Overview**

Shelly EM
Shelly EM

Shelly EM: Overview
Shelly EM measures electrical consumption on two channels (shared phase) and allows for controlling one low-power external appliance.

Shelly EM supports up to 20 schedule rules.

Product page

Factory Reset
To perform a factory reset, if doing so from the web interface or application is not possible -- press and hold the built-in user button until the LED starts blinking rapidly.

Shelly EM: MQTT
When configured for MQTT Shelly EM reports data on:

shellies/shellyem-<deviceid>/emeter/<i>/energy energy counter in Watt-minute
shellies/shellyem-<deviceid>/emeter/<i>/returned_energy energy returned to the grid in Watt-minute
shellies/shellyem-<deviceid>/emeter/<i>/total total energy in Wh (accumulated in device's non-volatile memory)
shellies/shellyem-<deviceid>/emeter/<i>/total_returned total energy returned to the grid in Wh (accumulated in device's non-volatile memory)
shellies/shellyem-<deviceid>/emeter/<i>/power instantaneous active power in Watts
shellies/shellyem-<deviceid>/emeter/<i>/reactive_power instantaneous reactive power in Watts
shellies/shellyem-<deviceid>/emeter/<i>/voltage grid voltage in Volts
shellies/shellyem-<deviceid>/emeter/<i>/pf power factor (dimensionless)
shellies/shellyem-<deviceid>/relay/0 reports status: on, off or overpower
Note, that energy and returned_energy do not survive power cycle or reboot -- this is how the value is implemented on other Shellies. Shelly EM features a persisted version which is not affected by power cycling or lack of connectivity. To get the persisted counters use total and total_returned.

Commands are accepted on:

shellies/shellyem-<deviceid>/relay/0/command accepts on, off or toggle
shellies/shellyem-<deviceid>/emeter/<i>/command accepts message reset_totals to reset total and total_returned energy counters to 0
shellies/shellyem-<deviceid>/command accepts message reset_data to reset all device data
Shelly EM: CoIoT
Example CoIoT description (/cit/d) and status (/cit/s):

Shelly EM SHEM
Shelly EM: /settings
GET /settings

{
    "actions": {
        "active": false,
        "names": [
            "out_on_url",
            "out_off_url",
            "over_power_url",
            "under_power_url"
        ]
    },
    "relays": [
        {
            "name": null,
            "ison": false,
            "has_timer": false,
            "overpower": false,
            "default_state": "off",
            "auto_on": 0,
            "auto_off": 0,
            "schedule": false,
            "schedule_rules": []
        }
    ],
    "emeters": [
        {
            "appliance_type": "General",
            "ctraf_type": 50,
            "max_power": 0
        },
        {
            "appliance_type": "General",
            "ctraf_type": 50,
            "max_power": 0
        }
    ],
    "led_status_disable": false,
    "eco_mode_enabled": false
}
Attributes
Attribute	Type	Description
led_status_disable	bool	Whether LED status indication is enabled
eco_mode_enabled	bool	Whether ECO mode is enabled
actions	hash	List with all supported url actions. For detailed actions descriptions, see /settings/actions
relays	array of hashes	Relay settings, see /settings/relay/0
emeters	array of hashes	EM channels configuration, see /settings/emeter/{index}
Common parameters apply for the /settings endpoint. Additionally:

Parameters
Parameter	Type	Description
led_status_disable	bool	Disable LED status indication
eco_mode_enabled	bool	Enable/Disable ECO mode
actions	hash	For setting actions, see /settings/actions
set_time	string	Time and date manual setting in format [yyyy][mm][dd][hh][mm][ss][utc_offset_sec], for example settings/?set_time=20200328151600-120 means 2020-03-28 15:16:00
Shelly EM: /settings/actions
GET /settings/actions

{
  "actions": {
    "out_on_url": [
      {
        "index": 0,
        "urls": [],
        "enabled": false
      }
    ],
    "out_off_url": [
      {
        "index": 0,
        "urls": [],
        "enabled": false
      }
    ],
    "over_power_url": [
      {
        "index": 0,
        "urls": [],
        "enabled": false,
        "over_power_url_threshold": 0
      }
    ],
    "under_power_url": [
      {
        "index": 0,
        "urls": [],
        "enabled": false,
        "under_power_url_threshold": 0
      }
    ]
  }
}
Shelly EM supports the following actions, which can be set as described at /settings/actions:

Actions
Action	Index	Description
out_on_url	0	URL to access when output is activated
out_off_url	0	URL to access when output is deactivated
over_power_url	0	URL to invoke when over_power_url_threshold is reached
under_power_url	0	URL to invoke when under_power_url_threshold is reached
Additional parameters
Parameter	Type	Description
over_power_url_threshold	number	Threshold in W to trigger over_power_url when crossed
under_power_url_threshold	number	Threshold in W to trigger under_power_url when crossed
Shelly EM: /settings/relay/0
GET /settings/relay/0

{
    "name": null,
    "ison": false,
    "has_timer": false,
    "overpower": false,
    "default_state": "off",
    "auto_on": 0,
    "auto_off": 0,
    "schedule": false,
    "schedule_rules": []
}
This is identical to /settings/relay/{index} endpoints on most other Shelly devices with built in relays. The returned document is identical to the data returned in /settings for the single output channel in the relays array. The channel index exists to preserve API compatibility with multi-channel Shelly devices. Attributes in the response match the set of accepted parameters.

Attributes
Attribute	Type	Description
name	string	Relay name
ison	bool	Relay state
has_timer	bool	Whether there is an active timer
overpower	bool	Whether an overpower condition has occurred
default_state	string	State on power-on, one of off, on, last, switch
auto_on	number	Automatic flip back timer, seconds
auto_off	number	Automatic flip back timer, seconds
schedule	bool	Whether scheduling is enabled
schedule_rules	array of strings	Rules for schedule activation
Parameters
Parameter	Type	Description
reset	any	Submitting a non-empty value will reset settings for the output to factory defaults
name	string	Set relay name
default_state	string	Accepted values: off, on, last, switch
auto_on	number	Automatic flip back timer, seconds. Will engage after turning OFF
auto_off	number	Automatic flip back timer, seconds. Will engage after turning ON
schedule	bool	Enable schedule timer
schedule_rules	array of strings	Rules for schedule activation, e.g. 0000-0123456-on
Shelly EM: /settings/emeter/{index}
GET /settings/emeter/0

{
    "appliance_type": "General",
    "ctraf_type": 50,
    "max_power": 0
}
This endpoint allows for configuring over/under-power actions and max power protection.

Attributes
Attribute	Type	Description
appliance_type	string	Custom configurable appliance type
ctraf_type	number	Current transformer type, 50 or 120 - currently unused
max_power	number	Maximum allowed power before contactor is switched off, W
Parameters
Parameter	Type	Description
appliance_type	string	Set custom configurable appliance type
ctraf_type	number	Set current transformer type, 50 or 120 - currently unused
max_power	number	Set maximum allowed power before contactor is switched off, W
Shelly EM: /status
GET /status

{
    "relays": [
        {
            "ison": false,
            "has_timer": false,
            "timer_started": 0,
            "timer_duration": 0,
            "timer_remaining": 0,
            "overpower": false,
            "is_valid": true,
            "source": "http"
        }
    ],
    "emeters": [
        {
            "power": 0,
            "reactive": 0,
            "pf": 0,
            "voltage": 0,
            "is_valid": true,
            "total": 0,
            "total_returned": 0
        },
        {
            "power": 0,
            "reactive": 0,
            "pf": 0,
            "voltage": 0,
            "is_valid": true,
            "total": 0,
            "total_returned": 0
        }
    ]
}
In addition to common status info, EM adds:

Attributes
Attribute	Type	Description
relays	array of hashes	Status of the internal relay, see /relay/0
emeters	array of hashes	Current meter readings, see /emeter/{index}
Shelly EM: /relay/0
GET /relay/0

{
    "ison": false,
    "has_timer": false,
    "timer_started": 0,
    "timer_duration": 0,
    "timer_remaining": 0,
    "overpower": false,
    "is_valid": true,
    "source": "http"
}
Returns the state of the internal relay.

Attributes
Attribute	Type	Description
ison	bool	Whether the channel is turned ON or OFF
has_timer	bool	Whether a timer is currently armed for this channel
timer_started	number	Unix timestamp of timer start; 0 if timer inactive or time not synced
timer_duration	number	Timer duration, s
timer_remaining	number	experimental If there is an active timer, shows seconds until timer elapses; 0 otherwise
overpower	bool	Whether an overpower condition has occurred
is_valid	bool	Whether power result is valid
source	string	Source of the last relay command
Parameters
Parameter	Type	Description
turn	string	Accepted values are on, off. This will turn ON/OFF the respective output channel when request is sent
timer	number	A one-shot flip-back timer in seconds
Shelly EM: /emeter/{index}
GET /emeter/0

{
    "power": 0,
    "reactive": 0,
    "pf": 0,
    "voltage": 0,
    "is_valid": true,
    "total": 0,
    "total_returned": 0
}
Attributes
Attribute	Type	Description
power	number	Instantaneous power, Watts
reactive	number	Instantaneous reactive power, Watts
pf	number	Power factor (dimensionless)
voltage	number	RMS voltage, Volts
is_valid	bool	Whether the associated meter is functioning properly
total	number	Total consumed energy, Wh
total_returned	number	Total returned energy, Wh
Parameters
Parameter	Type	Description
reset_totals	any	When requested will reset total and total_returned energy counters to 0
Shelly EM: /emeter/{index}/em_data.csv
This provides an export of the data gathered by the device. For each measurement channel, a CSV file is generated with the following columns:

Date/time UTC
Active energy Wh
Returned energy Wh
Min V
Max V
This will always contain data for the entire time range stored on the device.

Shelly EM: /reset_data
GET /reset_data

{
    "reset_data": 1
}
When requested will reset all device data.

