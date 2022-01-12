const bip39 = require("bip39");
const hdkey = require("hdkey");
const ethUtil = require("ethereumjs-util");
const mnemonic = bip39.generateMnemonic();

  async function createKeyPair(){ 
const seed = await bip39.mnemonicToSeed(mnemonic);
const root = hdkey.fromMasterSeed(seed);

const addrNode = root.derive(`m/44'/60'/0'/0/0`);
const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
const addr = ethUtil.publicToAddress(pubKey).toString("hex");
const address = ethUtil.toChecksumAddress(ethUtil.addHexPrefix(addr));
const pk = addrNode._privateKey.toString("hex") 

console.log("mnemonic---->",mnemonic)
console.log("public address---->",address)
console.log("private key------>",pk)
  }


  createKeyPair()