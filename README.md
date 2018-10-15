# Private blockchain with Express API for Notarization
I have used javascript to develop the backend for a private blockchain and a front end API to interact with this blockchain. I chose express because of it's user acceptance by the corporate world.

# Getting Started

You will need node.js in order to run this blockchain. In addition, I would recommend using postman to test the GET and POST requests. This project will use the PORT: http://localhost:8000/block

The blockchain is also persisted with leveldb. 

# Dependencies
I have attached my .JSON file so the packages can be viewed.

## Files:

app.js - The file contains the Express Web APO <br>

blockchain.js - The file contains the blockchain class module and is enhanced with a star_validation function<br>

blockClass.js - The file contains the block class module<br>

levelFunctions.js - The file contains functions using levelDB but I did not persist the DB for this project<br>

## Testing
I used Postman.  See the UDACITY.postman_collection.json for results.

Running the tests The functionality of the express API consists of the GET and POST Method.

The GET method will return the block details for the ID in the webaddress below:

http://localhost:8000/block/0

An example of this output would be:

{ "hash": "c97ec16c7412eaf326f7bb64a30a2cf8d363b1488289ddd3b9a3f511f380e789", "height": 0, "body": "Genesis Block", "time": "1536942119", "previousBlockHash": "" }

The POST function will post a new block to the blockchain by selecting POST in Postman to the following link:

http://localhost:8000/block/

An example of the outcome would be:

Block has been added to the chain!{"hash":"1350c7c5eadb7e5189771699a753887fbcce6f30580e2db6c1a2ded53c941d6f","height":15,"body":"Testing block with test string data","time":"1537363451","previousBlockHash":"753e6006bbd75297915873fac27ee0378cb25aff87e6f9825e6d8aef1f9853d2"}

Built With Node.js Express Level_DB Contributing

## Versioning We use SemVer for versioning.

## Authors David Havera
