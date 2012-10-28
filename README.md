# Home Movies

This server streams movies over http.  Any mobile device or modern browser can play the movies complete with seeking.

## Adding Content

Convert your videos using handbrake on the iPad setting (the css is optimized for this resolution).  Put the m4v files in a folder called "videos".

Then run the `makethumbs.sh` script to create thumbnails of each video at 30, 90, and 180 seconds.

## Installing Dependencies

This is s node program, so install node and grab the deps using `npm install`.

## Running

Either run the app using `node server.js`.  Or if this is on a permament home server, create an upstart script or something.  My script is included for reference.
