### BHash.js

This lib makes use of the crypto module in nodejs.

The crypto module is mostly useful as a tool for implementing cryptographic protocols such as TLS and https. For most users, the built-in tls module and https module should more than suffice. However, for the user that only wants to use small parts of what's needed for full-scale cryptography or is crazy/desperate enough to implement a protocol using OpenSSL and Node.js

### Examples

```javascript
const hsh = new Bhash("your key here");

const msg = "I need your password";
```

#### Encrypting

```javascript
const eMsg = hsh.encrypt(msg);

// result

{
  eMsg: "b0376047839441518813536bc524be33f43267c33334ef63b9c59c8e8   10a52e7";
}
```

#### Decrypting

```javascript
const dMsg = hsh.decrypt(
  "b0376047839441518813536bc524be33f43267c33334ef63b9c59c8e810a52e7"
);

// result

{
  decrypted: "I need your pass word";
}
```

#### NOthig much

#### Disclaimer

This isnt meant for production, just meant for learning and practice sake. But if you think you can contribute to it, fill free to make a Pull Request.
