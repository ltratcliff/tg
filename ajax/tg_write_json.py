#!/usr/bin/python

import cgi
import cgitb
import datetime
import json

cgitb.enable()

def write_json():
    """
    write to json file for timeglider persistence
    """
    form = cgi.FieldStorage()
    form_data = {"title": form["title"].value,
                 'startdate': form['startdate'].value,
                 'enddate': form['enddate'].value,
                 'description': form['description'].value,
                 'importance': form['importance'].value,
                 'icon': form['icon'].value,
                 'timelines': ['dgsTimeline']
                 }
    with open('/var/www/html/tg/json/dgs_events.json', 'r+') as wh:
        json_file = json.loads(wh.read())
        form_data['id'] = len(json_file[0]['events']) + 1
        form_data['startdate'] = datetime.datetime.strptime(form_data['startdate'],
                                                            '%m/%d/%Y').date().isoformat()
        form_data['enddate'] = datetime.datetime.strptime(form_data['enddate'],
                                                          '%m/%d/%Y').date().isoformat()
        json_file[0]['events'].append(form_data)
        wh.seek(0)
        wh.write(json.dumps(json_file, sort_keys=True, indent=4, separators=(',', ': ')))

    return form_data



def rm_json_entry():
    """
    Remove entry of json
    """
    pass

def return_web_json(data):
    """
    print json message for web browser
    :param data: form_data
    :return:
    """
    print('Content-Type: application/json\n\n')
    print(json.dumps(data))


data = write_json()
return_web_json(data)