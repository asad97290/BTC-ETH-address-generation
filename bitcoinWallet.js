const wif = require("wif");
const bip39 = require("bip39");
const createHash = require("create-hash");
const bs58check = require("bs58check");
const hdkey = require("hdkey");
const btcnodejs = require("bitcoinjs-lib");


async function createBitcoinAddress() {

    // const mnemonic = await bip39.generateMnemonic();
  const mnemonic = "evil uniform angle gain wheel eternal strategy play betray bar cabbage bulk"
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);

  // for test net
  // const _addrnode = root.derive("m/44'/1'/0'/0/0");

  // for main net
  const _addrnode = root.derive("m/44'/0'/0'/0/0");

  const step1 = _addrnode._publicKey;

  const step2 = createHash("sha256").update(step1).digest();
  const step3 = createHash("rmd160").update(step2).digest();
//   /*
//   Mainnet
//   pubKeyHash: 0x00,
//   Testnet
//   pubKeyHash: 0x6f,
// */
  var step4 = Buffer.allocUnsafe(21);
  step4.writeUInt8(0x00, 0);

  step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
  const _address = bs58check.encode(step4);

  var _privateKey = Buffer.from(_addrnode._privateKey.toString("hex"), "hex");

   // for the mainnet use: wif.encode(128 , ...
   // for the testnet use: wif.encode(239 , ...

   var key = wif.encode(128, _privateKey, true);

  var obj = wif.decode(key);

  let pk = wif.encode(obj);
  
  const { address } = btcnodejs.payments.p2wpkh({ pubkey: _addrnode._publicKey, network:btcnodejs.networks.bitcoin});
  
  
  console.log("mnemonic ----->", mnemonic);
  console.log("private key ----->", pk);
  console.log("legacy address---------->",_address)
  console.log("new latest address---------->",address)

}

createBitcoinAddress();

