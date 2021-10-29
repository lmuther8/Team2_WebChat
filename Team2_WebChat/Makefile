#MakeFile to build and deploy the Sample US CENSUS Name Data using ajax
# For CSC3004 Software Development

user = muther1

all:  PutHTML PutCGI

PutCGI:
	chmod 757 webchat.py
	cp webchat.py /usr/lib/cgi-bin/$(user)_webchat.py

	echo "Current contents of your cgi-bin directory: "
	find /usr/lib/cgi-bin/ -type f -mmin -5 -ls

PutHTML:
	cp webchat.html /var/www/html/class/softdev/$(user)/webchat/
	cp webchat.css /var/www/html/class/softdev/$(user)/webchat/
	cp webchat.js /var/www/html/class/softdev/$(user)/webchat/
	ls -l /var/www/html/class/softdev/$(user)/webchat/
clean:
	rm -f *.o  webchat
