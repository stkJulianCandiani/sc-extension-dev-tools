const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const archiver = require('archiver');
const fsExtensions = require('@sc-utils/fs-extensions');

function getVolumeName(options) {
    let name = options.target.baseName + options.target.extension;
    if (options.isMultiVolume) {
        name = name + '.' + `${options.currentVolumeIndex}`.padStart(3, '0');
    }

    return path.join(options.target.folder, name);
}

function Writer(options) {
    let current_file;
    let current_file_length = 0;

    options.currentVolumeIndex = 0;

    function isFull(chunkLength) {
        return options.isMultiVolume && current_file_length + chunkLength > options.maxVolumeLength;
    }

    function start(path) {
        current_file = fs.openSync(path, 'w');
        current_file_length = 0;
    }

    function close() {
        current_file && fs.closeSync(current_file);
    }

    function write(chunk, encoding, done) {
        try {
            if (!current_file || isFull(chunk.length)) {
                close();

                options.currentVolumeIndex++;
                start(getVolumeName(options));
            }

            fs.writeSync(current_file, chunk, 0, chunk.length);
            current_file_length += chunk.length;
            done();
        } catch (error) {
            done(error);
        }
    }

    return {
        write: write
    };
}

function generateArchive(options, cb) {
    // defaults
    options.sources = options.sources || [];
    options.target = options.target || 'archive.zip';
    options.archiveType = options.archiveType || 'zip';
    options.isMultiVolume = options.isMultiVolume || false;

    const target = fsExtensions.parsePath(options.target);
    options.target = target;
    fsExtensions.createFolder(target.folder);

    const archive = archiver(options.archiveType, {
        zlib: { level: 9 } // Sets the compression level
    });

    const stream = require('stream');
    const my_stream = new stream.Writable();
    const writer = Writer(options);
    my_stream._write = writer.write;

    my_stream.on('finish', cb);

    archive.pipe(my_stream);

    _.each(options.sources, function(source) {
        _.each(source.src, function(src) {
            if (src) {
                var workingDirectory = path.dirname(src).replace(/[^/]*$/, '');
                archive.glob(src.replace(workingDirectory, ''), { cwd: workingDirectory, dot: false });
            }
        });
    });

    archive.finalize().catch(cb);
}

/*
 * Example usage

	generateArchive({
			target: '../folder/me.tar'
		,	isMultiVolume: true
		,	archiveType: 'tar'
		,	maxVolumeLength: 1024 * 1024 * 5
		,	sources: [{expand: true, src: ['C:\\next-gen\\Modules\\**\\*']}]
	}, function(){
		console.log('end callback');
	});

*/
module.exports = generateArchive;
