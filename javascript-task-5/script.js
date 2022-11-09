const readline = require('readline');
const fs = require('fs');

const MAX_SIZE = 104857600;
const BUFFER_SIZE = 1048576;
const MAX_NUMBER = 130000;

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

let current = 0;
let done = 0;
const interval = setInterval(() => console.log('Write origin file', Math.floor(current / MAX_SIZE * 100), '% completed'), 1000)
let interval2;
const write = (writer, data) => {
    current += data.length;
    if (!writer.write(data)) {
        return new Promise((resolve) => {
            writer.once('drain', resolve)
        })
    }
}

const create = async () => {
    const write_stream = fs.createWriteStream('numbers')
    while (current < MAX_SIZE) {
        const promise = write(write_stream, randomInteger(1, MAX_NUMBER) + '\n')
        if (promise) {
            await promise;
        }
    }
    write_stream.close();
}

const split = async () => {
    let counter = 0;
    const readStream = fs.createReadStream('numbers', { highWaterMark: BUFFER_SIZE });
    readStream.on('data', (chunk) => {
        counter++;
        const part = chunk.toString().split('\n').filter(item => item !== '');
        if (part.length > 0 && counter <= MAX_SIZE / BUFFER_SIZE) {
            part.sort((a, b) => a - b);
            readStream.pause();
            const writeStream = fs.createWriteStream('files/numbers' + counter);
            writeStream.write(part.join('\n'));
            writeStream.close();
            readStream.resume();
        }
    })
    const onEnd = () => {
        readStream.close()
        console.log('File split complete');
        sortAndJoin();
    }
    readStream.on('end', onEnd)
}

const streams = [];
const bufferArray = [];
let iteration = 0;
let numberOfFiles = 0;
const commonWriteStream = fs.createWriteStream(__dirname + '/output.txt', { encoding: 'utf8' });

const sortArray = () => {
    const min = Math.min(...bufferArray);
    const index = bufferArray.findIndex(item => item === min)
    bufferArray.splice(index, 1);
    if (min) {
        const result = min + '\n';
        done += result.length;
        commonWriteStream.write(result);
    } 
    if(bufferArray.length === 0) {
        commonWriteStream.close();
        console.log('All done!!!')
        clearInterval(interval2)
    }
}

const pushTheItem = (number, rl) => {
    bufferArray.push(number);
    iteration += 1;
    if (iteration > numberOfFiles * 10) sortArray();
    rl.resume();
    if(streams.length === 0) {
        do{
            sortArray();
        } while (bufferArray.length > 0) 
    }
}

const readFile = async (readStream) => {
    const rl = readline.createInterface({
        input: readStream
    });

    readStream.on('end', () => {
        const ind = streams.findIndex(stream => readStream.path === stream.path)
        streams.splice(ind, 1)
        readStream.close();
    })

    for await (const chunk of rl) {
        rl.pause();
        pushTheItem(Number(chunk), rl);
    }
}

const sortAndJoin = async () => {
    interval2 = setInterval(() => console.log('Write result file', Math.floor(done / MAX_SIZE * 100), '% completed'), 1000)
    fs.readdir('files', (err, files) => {
        numberOfFiles = files.length;
        files.forEach((filename) => {
            const readStream = fs.createReadStream(__dirname + "/files/" + filename, { encoding: 'utf8', highWaterMark: 1 });
            streams.push(readStream);
        })
        streams.forEach((stream, index) => {
            readFile(stream, index);
        })
    })
};

(async () => {
    await create();
    clearInterval(interval);
    console.log('File creation complete');
    await split();
})();

