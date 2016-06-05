#!/usr/bin/python

import sys
import json
import cgi
import cgitb; cgitb.enable()

form = cgi.FieldStorage()
data = { 'title': form['title'].value,
        'startdate': form['startdate'].value,
        'enddate': form['enddate'].value,
        'description': form['description'].value,
        'importance': form['importance'].value,
        'icon': form['icon'].value
       }


#recv_json = json.load(sys.stdin)

print 'Content-Type: application/json\n\n'
print json.dumps(data)

#print 'Content-Type: text/plain\n\n'
#print sys.stdin.read()
