const fs = require('fs');
const readline = require('readline');

const readStream1 = fs.createReadStream(__dirname + '/static/numbers1.txt', { encoding: 'utf8', highWaterMark: 1 });
const readStream2 = fs.createReadStream(__dirname + '/static/numbers2.txt', { encoding: 'utf8', highWaterMark: 1 });
const readStream3 = fs.createReadStream(__dirname + '/static/numbers3.txt', { encoding: 'utf8', highWaterMark: 1 });
const readStream4 = fs.createReadStream(__dirname + '/static/numbers4.txt', { encoding: 'utf8', highWaterMark: 1 });
const writeStream = fs.createWriteStream(__dirname + '/static/output.txt', { encoding: 'utf8' });

const bufferArray = [];
let iteration = 0;

const sortArray = () => {
    const min = Math.min(...bufferArray);
    const index = bufferArray.findIndex(item => item === min)
    bufferArray.splice(index, 1);
    if (min) writeStream.write(min + '\n');
    if(iteration%140000 === 0) console.log((iteration * 100)/ 14000000, '%' )
    if(bufferArray.length === 0) {
        writeStream.close();
        readStream1.close();
        readStream2.close();
        readStream3.close();
        readStream4.close();
    }
}

const pushTheItem = (number, readStream, nextStream) => {
    bufferArray.push(number);
    iteration += 1;
    if (iteration > 20) sortArray();
    if(!readStream.ended) readStream.pause();
    if(readStream.needToClear) {
        do{
            sortArray();
        } while (bufferArray.length > 0) 
    }
    nextStream.resume();
}

const readFile = async (readStream, nextStream) => {
    const rl = readline.createInterface({
        input: readStream
    });
    
    for await (const chunk of rl) {
        await pushTheItem(Number(chunk), readStream, nextStream);
    }
}

(async () => {
    readFile(readStream1, readStream2);
    readFile(readStream2, readStream3);
    readFile(readStream3, readStream4);
    readFile(readStream4, readStream1);

    readStream1.on('end', () => {
        readStream2.ended = true;
    });
    readStream2.on('end', () => {
        readStream3.ended = true;
    });
    readStream3.on('end', () => {
        readStream4.ended = true;
    });
    readStream4.on('end', () => {
        readStream4.needToClear = true;
    });
    writeStream.on('end', () => console.log(bufferArray))
})()
