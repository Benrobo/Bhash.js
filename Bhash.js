/**

Created: Benaiah Alumona
Date: jan 6, 2022
Release under the MIT License

This lib makes use of the crypto module in nodejs.

The crypto module is mostly useful as a tool for implementing cryptographic protocols such as TLS and https. For most users, the built-in tls module and https module should more than suffice. However, for the user that only wants to use small parts of what's needed for full-scale cryptography or is crazy/desperate enough to implement a protocol using OpenSSL and Node.js

the crypto module in nodejs offers us much capability when dealing with hashing, decrypting and encrypting, also dealing with signing of credentials.

making use of the createCipheriv() and createDecipheriv() method from the crypto objects, we can deal with encrypting / decrypting of text.

How :- encryption works by making a cipher unique random text from one public or private key.Also, by using the same key to encrypt and decrypt a message, so both the sender and the receiver must know and use the same private key. DES has been superseded by the more secure AES algorithm. 

the createCipheriv() method from the crypto module enable us to create a unique randomly cipher text based on the algorithim used.


crypto.createCipheriv(algorithm, key, iv)
crypto.createDecipheriv(algorithm, key, iv)

take note that the letters there isnt '4' rather it means " Initialization vectors ". the Initialization vectors should be unpredictable and unique, typically required to be random or pseudorandom.

The key used must be a Buffer String or an Array.

We can simply create our own iv by making use of the crypto.createHash(algorithm).update(key).digest()

using the above method would produce a binary data by default on less we forcefully set what type of returned data should be, then in this way we can make use of "hex | binary | base64". this would provide a result based on the format of the digest() method.

The below picture shows how a basic encrypting and decrypting a text works

OK now, youve just explained how hashing and encrypting works, how can we apply this in when building applications.

Take email for example. Email encryption works by employing something called public key cryptography. Each person with an email address has a pair of keys associated with that email address, and these keys are required in order to encrypt or decrypt an email. One of the keys is known as a “public key”, and is stored on a keyserver where it is tied to your name and email address and can be accessed by anyone. The other key is your private key, which is not shared publicly with anyone.

When an email is sent, it is encrypted by a computer using the public key and the contents of the email are turned into a complex, indecipherable scramble that is very difficult to crack. This public key cannot be used to decrypt the sent message, only to encrypt it. Only the person with the proper corresponding private key has the ability to decrypt the email and read its contents.

This is just a basic explanation of enc/dec, there are other complex terminologies related to how it works, Knowing the basic of hashing, dec, and enc would lead you to understand how other complex methods works and how to securely transfer data within your application, the code below also shows how encrypting and decrypting works using nodejs.

Thanks for reading.
**/

const crypto = require("crypto");

class Bhash {
  constructor(key) {
    if (!key || key === "" || key === null) {
      throw Error(
        "Hash.encrypt() method requires a key but got none"
      );
    }

    if (key === undefined) {
      throw Error(
        "Hash.encrypt() method requires a key but got undefined"
      );
    }

    if (typeof key === "function") {
      throw Error(
        "Hash.encrypt() method requires a key but got a 'function'"
      );
    }

    this.key = key;
    this.bufferCount = Buffer.allocUnsafe(16);
    this.iv = crypto.createHash("sha256").update(this.key).digest();

    this.iv.copy(this.bufferCount);
  }

  encrypt(text) {
    if (!text) {
      throw Error(
        "Hash.encrypt() method required both a key and a text for encrypting"
      );
    }

    if (typeof text === "function") {
      throw Error("Hash.encrypt() requires a 'string' instead got an function");
    }

    try {
      const bufferKey = crypto.createHash("sha256").update(this.key).digest();
      const cipher = crypto.createCipheriv(
        "aes256",
        bufferKey,
        this.bufferCount
      );
      const encryptedMsg = [];

      //   loop through each characters in the text, and update the cipherIv with this characters to be encrypted
      text.split("").forEach((txt) => {
        encryptedMsg.push(cipher.update(txt, "binary", "hex"));
      });

      encryptedMsg.push(cipher.final("hex").toString());

      return {
        eMsg: encryptedMsg.join(""),
      };
    } catch (e) {
      return { msg: "Failed to encrypt data", error: e };
    }
  }

  decrypt(eMsg) {
    if (!eMsg || eMsg === "") {
      throw Error(
        "Hash.decrypt() method requires an encrypted text for decrypting but got none"
      );
    }

    if (eMsg === undefined) {
      throw Error(
        "Hash.decrypt() method requires an encrypted text for decrypting but got 'undefined''"
      );
    }

    try {
      const bufferKey = crypto.createHash("sha256").update(this.key).digest();
      const decipher = crypto.createDecipheriv(
        "aes256",
        bufferKey,
        this.bufferCount
      );

      const deMsg = [];

      eMsg.split(" ").forEach((msg) => {
        deMsg.push(decipher.update(msg, "hex", "binary"));
      });

      deMsg.push(decipher.final("binary"));

      return {
        eMsg: deMsg.join(" "),
      };
    } catch (e) {
      return { msg: "Failed to decrypt data", error: e };
    }
  }
}

// module.exports = new Bhash("your key here");


const hsh = new Bhash("your key here")

const msg = "I need your password"

const eMsg = hsh.encrypt(msg)

const dMsg = hsh.decrypt(eMsg.eMsg);

console.log(eMsg, dMsg);

