#!/usr/bin/env python3
# James Skon, 2019, Adapted by Alana, Jack, Luke, and Ulysses 2021
#!/usr/bin/env python
import os
from os import path
import sys

import cgi;
import cgitb
cgitb.enable()

fifoname="team2Chat"  # Unique name for fifos
sendFifoFile = "/home/fifo/"+fifoname+"_sendFifo"
getFifoFile = "/home/fifo/"+fifoname+"_getFifo"
def print_header():
    print ("""Content-type: text/html\n""")

def callChatServer(id,message):
    #Create Fifos if they don't exist
    if not path.exists(sendFifoFile):
        os.mkfifo(sendFifoFile)
        os.chmod(sendFifoFile, 0o777)
    if not path.exists(getFifoFile):
        os.mkfifo(getFifoFile)
        os.chmod(getFifoFile, 0o777)

    sendFifo=open(sendFifoFile, "w")
    getFifo=open(getFifoFile, "r")
    sendFifo.write(id+"_"+message)
    sendFifo.close()

    result=""
    for line in getFifo:
        result+=line
    getFifo.close()
    return(result)


def main():
    print_header()
    form = cgi.FieldStorage()
    if (form.getvalue("message") and form.getvalue("id")):
        id=form.getvalue("id")
        message=form.getvalue("message")
        #result=callChatServer(id,message)
        result=callChatServer(id,message)
        result=result.replace("\n", "<br/>")
        print(result)
    else:
        print("Error in submission")

main()
