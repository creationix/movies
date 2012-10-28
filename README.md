# Home Movies

This server streams movies over http.  Any mobile device or modern browser can play the movies complete with seeking.

## Adding Content

Convert your videos using handbrake on the iPad setting (the css is optimized for this resolution).  Put the m4v files in a folder called "videos".

Then run the `makethumbs.sh` script to create thumbnails of each video at 30, 90, and 180 seconds.

## Installing Dependencies

This is s node program, so install node and grab the deps using `npm install`.

## Setting up DDNS

In server.js there is a script to setup ddns through the linode api.  Read the comment in there and create the linode-config.js file it needs.  If you don't want ddns, comment out or remove that part.

## Running

Either run the app using `node server.js`.  Or if this is on a permament home server, create an upstart script or something.  My script is included for reference.
