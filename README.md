![OnlyKey BrowserCrypt](images/logo-with-text.png)
========

**Still in early development.**

## ABOUT

A prototype Chrome extension enabling encryption over any web platform, with the help of [keybase.io](https://keybase.io/) and [OnlyKey](https://crp.to/p/).

## HOW IT WORKS

With Keybase user/key management is made easy and with OnlyKey private keys remain offline and protected. They are not accessible to the browser or the local computer. By using U2F the extension can send messages to OnlyKey to be securely decrypted and signed offline. This provides similar function to a token/smart card but no drivers or software required. With this extension and an OnlyKey secure messages can be sent using Windows, Mac, Linux, Chromebook.

Please, feel free to commit fixes!

## REQUIREMENTS

* Add the extension to Chrome or Chromium Browser
* Signup with [keybase](https://keybase.io)
* Generate or import public key to Keybase
* Import private key to OnlyKey
* Have friends host public keys on Keybase
* Send and receive encrypted messages with friends, click to encrypt and then confirm on OnlyKey

## SECURITY GOALS

**Empower the people**: Give people the ability to securely send and receive messages using any computer with no complicated software/drivers required.

**Serverless**: All processing done via javascript in users own browser locally (no server to hack).

**Private**: No logins required. No tracking!!! No emails. No ads. No demographics. No local proof of who was using this extension as anyone can enter any username and/or list of friends from publicly available Keybase profiles. 

**Strong Crypto** - Everything should be sent via HTTPS to/from the web application. Data between local browser and OnlyKey should be encrypted using AES/ECDH shared secret (Not fully implemented).

**Open source & audit-able** - What you see is what you get this repository is a Github page hosted directly on Github. 

## PROTOCOL

A detailed description of the underlying communication protocol can be found here - https://github.com/onlykey/onlykey.github.io

## Thanks to!

This work began with a fork of [Anycrypt](http://lettergram.github.io/AnyCrypt/) written by [Austin Walters](http://austingwalters.com).
