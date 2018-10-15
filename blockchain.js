const Block = require('./blockClass');
const leveldb = require('./levelFunctions');
const SHA256 = require('crypto-js/sha256');

module.exports = class Blockchain {
    constructor() {
        this.getBlockHeight().then((height) => {
            if (height === -1) {
                this.addBlock(new Block("Genesis block")).then(() => console.log("Genesis block created"));
            }
        });
    }
    //
    async addBlock(newBlock) {
        const height = parseInt(await this.getBlockHeight());
        newBlock.height = height + 1;
        newBlock.time = new Date().getTime().toString().slice(0, -3);
        //
        if (newBlock.height > 0) {
            const previousBlock = await this.getBlock(height);
            newBlock.previousBlockHash = previousBlock.hash;
            console.log('Previous block hash: ' + newBlock.previousBlockHash);
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        console.log('New block hash: ' + newBlock.hash);
        //
        await leveldb.addBlock(newBlock.height, JSON.stringify(newBlock));
    } //addBlock
    //
    async getBlockHeight() {
        const height = await leveldb.getBlockHeight();
        return height;
    } //getBlockHeight
    //
    async getBlock(blockHeight) {
        const block = await leveldb.getBlock(blockHeight);
        //console.log(block);
        return block;
    } //getBlock
    //    
    async validateBlock(blockHeight) {
        // get block object
        let block = await this.getBlock(blockHeight);
        // get block hash
        let blockHash = block.hash;
        block.hash = '';
        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        // Compare
        if (blockHash===validBlockHash) {
            //console.log('Block ' + blockHeight + ' validation confirmed');
            return true;
        } else {
            console.log('Block ' + blockHeight + ' hash invalid:\n' + blockHash + '<>' + validBlockHash);
            return false;
        }
    } //validateBlock
    //
    async validateChain() {
        let errorLog = [];
        let previousHash = '';
        let chainArray = [];
        let validFlag2 = false;
        const height = await this.getBlockHeight();
        //
        for (let i = 0; i <= height; i++) {
            await this.getBlock(i).then((block) => {
                chainArray.push(block);
                let validFlag = this.validateBlock(block.height);
                validFlag.then((result) => {
                    //console.log(result);
                    validFlag2 = result;  
                })
                // checking if single block hash is valid
                if (!validFlag2) {
                    errorLog.push(i);
                // checking for a break in chain
                }
                if (block.previousBlockHash !== previousHash) {
                    errorLog.push(i);
                } 

                previousHash = block.hash;
                //print('Block' + chainArray);
                //return chainArray;

                });
            
        } //loop
        
        errorLog.shift(); // excluding genesis block, no previous hash 
        if (errorLog.length > 0) { 
            console.log('Block errors =' + errorLog.length);
            console.log('Block index:' + errorLog);
            console.log('Errors detected');
        } else {
            //console.log('No errors detected');
            //console.log(block);
        }
        console.log('chainArray Length: ################################################' + chainArray.length);
        console.log('chainArray Length: *****************' + JSON.stringify(chainArray));
        return chainArray;

    } //validateChain 

    async star_validation() {
        let star_blocks = [];
        const height = await this.getBlockHeight();
        //
        for (let i = 0; i <= height; i++) {
            await this.getBlock(i).then((block) => {
                star_blocks.push(block);
                console.log('*************************BLOCK INFO***********************************')
                console.log(JSON.stringify(star_blocks[i]));
            });
        } //for loop
        return star_blocks;
        }
} //Blockchain Class


