var custom_keyid;

const OnlyKeyConnector = (() => {
	'use strict';

	const menuRootId = 'OnlyKey.menuRootId';
	const encryptMenuId = 'OnlyKey.encryptMenuRootId';

	function addRootContextMenu() {
		chrome.contextMenus.create({"id": menuRootId, "title": "OnlyKey", "contexts":["selection"]});
	}

	function get_pin (byte) {
	  if (byte < 6) return 1;
	  else {
	    return (byte % 5) + 1;
	  }
	}

	var pin;
	var poll_type, poll_delay;
	var username = "";
	var user_key = {};
	var placeholder_private_key = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Mailvelope v1.8.0
Comment: https://www.mailvelope.com

xcaGBFms0QoBEAC9hQ0tnhwnSYlLQmVTsvVWyYnnS8woQnLLr0gz9gb2ZSxE
gh7SMQewx5xff7zsxhcRoID00tarP4KueEOx2sPwFFgbK5jhN1UDEA0zG3oA
/bkEet6c7Q4Y25wlp0eYRpW2KIEdVH9uzNyUS7S5Phw8QtvxWLI+rudmhrNk
Pvjm4c7kPT1TpfCYDMQmF7RVSaXYDH6vE/gqLKjiD/71LQZmQzDtLkvC2fh4
frBhdZUVHmIuZaDZ/8QtcslODovqAe6stBtCsgZ1lEx8otbTpt88PIYbPNGi
kiHrbjK3CYusoq1Rl4/LN/jFkJnO9J8KpfA5R+lnQ6GfzacQ3BfpkQ7Ib2Tu
NSwHOe5nSGIpbsujWh6GAmRzo+AOHmbUj6gbuaA8qIdD+VDXNh/O4g26be+l
RO12pz6VOCk2W+Gmvwmbk789atmNOIk0eUeJ/jPFyXVqM5DMfHuBssydqQr8
9EoQo+id2ev8glfmx1kT7oiN5d/WCpEq4SSxf7TxNawqIEK5LAgv6dONd8e0
GsTxibRVxqrTDc8q07dIgXU4nybCBHRrcd1gj785uJcSsuSSB5TnRRmcst+q
BsunUZbM8iw9g8OUqZj2k70utgIaP5kIIFhMgne9iLYd/g47pMLdoAWcQXdL
pwcHfB3jF8ukuQCpHg1FaKP8oU1jO6Yrk9FHwwARAQAB/gkDCHD+rb/6JEKx
YOw4tTZ1yyHEQRjSoFuwx2vsi1T96TTF4JlTvncVkaFsbvYrTdybEUjc8e6a
UuKDZoMKzr3VBJXbXXhtZLZlWhd+LWN4bFixn9wifoGHN9ptNzobMo3dibjA
cMkNB6ocxWrlbvq44WNYXPezFIloSzf6vb2puZjVcd1nJSLxHY5HaykTdqwi
2TCQhOTa3EBwlQpNNgUdetA3erf22r+FesfYSVjUt8bO6b7jwaXHUAg0RU9D
SCLPCrAqz4WY9RUxziMiUY531LeKffpALwoA8Qwt9F4i03ecrBw7XKbHvL9O
KRcg+3HUNxT9+3P3v4r3Vyqa80g2iYfiA/yd5f6wKWiYbuhaHiHnFljnPqjr
ufSB1hWJoQVfK7Lau/PIZQqZ3vpo3xQJkG7QyYF5hM5ZKlFd9vqxUQhn2mI4
zC1aOhg/CDLvatspb2J9JxH457YxWsXK4garUl0g6EYTdSZRalLfQ1EHpvzM
jSwwFN8d+UgaqO/X/I3G4oHfnaNRY4YdpIpAZZ1JvKS7v2O/r5ct46bVKQUg
TKffG+4QI/g9sizhmBzOTFWO2i8wdu5gvVxvl7dnPrgxyPBlZK9lryBW2++l
YsjQ41TxPmdzZGfzE3MPvQZ+Sni5QXA3icKDWzEcp8Zd8KukVyvKnVJiMM5F
mpvtcQbhnphpiFFt9aEPO1soid02lNG3qlO97EpS1KExZOW95hF9u2F2q9p/
0BTcahyxjoE1oinakjg/BEqcF8TgaEmpTtDYoljz87vpRyEHKAOl3IXyiubB
WMyZfraF6hZ3mRGKofOX8A7hdqFx1j/6myzywf1JsRSa6u8Dp4m38mDKKhcf
ERqDcVWuJafZBWOXPcdxIVBDmopTn7uM8Ii0wEYWBFqgf6dN2p6BprDcm2Om
qiqhDE3UoqjQXgHqh7Bn8AjpfqSkXFRsrkOhcbyqzYGt+kEbnFPFP1QhyWSj
60p7eMxW7bG6rJcyOWvq5GZaaVime3+sXTV37vYzuNWc0RQ3FklKbiLvVCjL
NHbWOUtQpHE/i39UUK31/Rncqzgoenn6ThqXZZZl+LP8FFIOZ80VnlSxM71U
d7XRqk1wjFE7NBzbtTypaDXbm3Wilq9SJ68kfOxZUC9asAvU5B1teiVshFA2
QmMTCz0hng8/HldlntUOVQjmh/gC5E52cva6QF0Cu8JKfVGoAC5wEIuV3gVx
Zu+IVEtHWpCA8bOudtYx4QZvKVCbjSaK6Rf1UE+cUfLESCnXt9BHzcPq0q90
WVMXNVSS0CQ84FCk3zAZgnrZBmOFuiXvXXqrpS8w2k8LFiP5or4ZCYTc0qUp
pSFk8QBnfdX63IXifBQtuaD1Iz49Lf2Vpfxv+F/qXaPQ6Bl3bfv1QY9nNh48
+OVZBpnMas8W4co/Ke7GiOJKqScpcW/MlaKZVLR2ywthC4vpTjFBiK3epLOF
J63bR/0TV5Koj62CdyVENtecbfWce5yx9s5AAdKDoA3Q18mMm13OJb868Nu0
O2ZlAXb/3PMWp8zS6zd6gP8Aw8q1a+NlZVtyFA7aaBEQyRbHMG/Qeyy6wmlE
nP/rfuWVuPLmSD7GsS6TkofmLsk/fuWbuAFBnYuoWM+XrRwWX0SOmZJzYELV
shnhPaTO+71B4vsCbuQVfNcMYBmpt7iAG23Ky1FNnKy8jszwq4S2XPRukT0+
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
=ayNx
-----END PGP PRIVATE KEY BLOCK-----`;

	var ring = new kbpgp.keyring.KeyRing;

	var friend_keys = {};
	var friend_list = new Array();
	var friend_check = {};

	var p256 = new ECC('p256');
	var sha256 = function(s) { return p256.hash().update(s).digest(); };

	/**
	 *  Loads friends saved in chromes local memory
	 */
	var loadAnyCryptData = function() {
		return new Promise((resolve, reject) => {
		    // Import data from chrome storage
		    let msg = '';
		    chrome.storage.local.get("anycrypt", items => {
				if (chrome.runtime.error) {
					return handlePromiseErr(`Chrome runtime error`);
				}

				try {
				    if(items.anycrypt.friends) {
						friend_list = items.anycrypt.friends;
				    }
				    if(items.anycrypt.username) {
						username = items.anycrypt.username;
				    }
				} catch(err) {
				    return handlePromiseErr(err);
				}

				return resolve();
		    });
		});
	}

	function handlePromiseErr(err, rejectFn) {
		console.error(err);
		return rejectFn(err);
	}

	/**
	 * Addition to CryptoJS to enable string to u8array
	 */
	CryptoJS.enc.u8array = {
	    stringify: function (wordArray) {
		var words = wordArray.words;
		var sigBytes = wordArray.sigBytes;
		var u8 = new Uint8Array(sigBytes);
		for (var i = 0; i < sigBytes; i++) {
		    var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		    u8[i]=byte;
		}

		return u8;
	    },

	    parse: function (u8arr) {
		var len = u8arr.length;
		var words = [];
		for (var i = 0; i < len; i++) {
		    words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
		}

		return CryptoJS.lib.WordArray.create(words, len);
	    }
	};

	/**
	 *  Connect to get user keys
	 */
	const loadPrivatePlaceholder = function() {
	    kbpgp.KeyManager.import_from_armored_pgp({
			armored: placeholder_private_key
	    }, function(err, user) {
			if (!err) {
        if (user.is_pgp_locked()) {
            let passphrase = 'test123';
            user.unlock_pgp({
            passphrase: passphrase
        }, function(err) {
					    if (!err) {
						user_key = user;
						console.log("Loaded placeholder private key");
					    }
					});
			    } else {
					user_key = user;
					console.log("Loaded placeholder private key w/o passphrase");
			    }
			} else {
			    console.log(err);
			}
	    });
	}

	/**
	 *  Send message to selected test
	 */
	const sendMessage = function(data) {
	    var message = ""

	    if(data.decrypted_message){
			message = data.decrypted_message;
	    } else {
			message = data.encrypted_message;
	    }

	    chrome.tabs.query({
	    	currentWindow: true,
	    	active: true
	    }, function (tab) {
		    chrome.tabs.sendRequest(tab[0].id, message);
		});
	}

	/**
	 *  Encrypt the message
	 */
	const encrypt = function (id, message) {
	    var params = {
			msg: message,
			encrypt_for: [friend_keys[id]],
			sign_with: user_key
	    };

	    //if(something){ //Have a checkbox for sign and encrypt
		//	params["sign_with"] = user_key;
	    //}

	    // let header = ['FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF','FF'];
	    // console.info("HEADER LENGTH: " + header.length);
     	// OnlyKeyConnector.requestMessagePort({ action: 'ENCRYPT', data: header });
	    // return false;

	    kbpgp.box(params, function(err, result_string, result_buffer) {
			if(!err){
			    let data = {}
			    data["encrypted_message"] = result_string.replace(new RegExp("\n", "g"), "zzz\n");
		     	console.info("result_string" + result_string);
			    sendMessage(data);
			}else{
			    console.log(err);
			}
	    });
	}

	/**
	 *  Decrypt the encrypted string
	 *
	 *  encrypted - Encrypted string
	 *  Callback function
	 */
	const decrypt = function(encrypted, sendResponse) {
	    var encrypted_string = encrypted.replace(new RegExp("zzz ", "g"), "\n");
	    encrypted_string = encrypted_string.replace(new RegExp("zzz\n", "g"), "\n");
	    encrypted_string = encrypted_string.replace(new RegExp("zzz", "g"), "\n");

	    var decrypted_string = "";
	    var data = {"decrypted_message": "ENCRYPTED MESSAGE: Not for you," };
	    data["decrypted_message"] += "\n or you need to add the sender to your AnyCrypt friends";

	    data["encrypted_message"] = encrypted_string; // encrypted string added for reference

	    kbpgp.unbox({keyfetch: ring, armored: encrypted_string}, function(err, literals) {
			if (err != null) {
			    data["error"] = true;
			    sendResponse(data);
			    return console.log("Problem: " + err);
			} else {
			    try{
					var ds = km = null;
					ds = literals[0].get_data_signer();
			    } catch(err) {
					console.log(err);
					return;
			    }

			    if (ds) { km = ds.get_key_manager(); }

			    // Get signed by name
			    if (km) {
					console.log("Signed by PGP fingerprint");
					try {
					    data["fingerprint"] = km.get_pgp_fingerprint().toString('hex');
					    data["signed_by"] = km.userids[0].components.email.split("@")[0];
					} catch(err) {
					    console.log(err);
					}
			    }

			    decrypted_string = literals[0].toString();

			    if(user_key.is_pgp_locked()){
					console.log("String is locked!!!");
			    }

			    data["decrypted_message"] = decrypted_string;

			    sendResponse(data);
			}
	    });
	}



	function onRequestEncrypt(info, tab) {
	    encrypt(info.menuItemId, info.selectionText);
	};

	function onRequestDecrypt(info, tab) {
	    decrypt(info.selectionText, sendMessage);
	};

	function loadSettings(id) {
		setContextMenus(() => {
		    loadAnyCryptData().then(function() {
				loadPrivatePlaceholder();
				if (!(username && friend_list.length)) {
					console.error('Missing keybase username and/or friends :-/');
					return false;
				}

				friend_list.push(username);

				setContextMenus(() => {
					for (var i = 0; i < friend_list.length; i++) {
					    if (!friend_check.hasOwnProperty(friend_list[i])) {
							// Generate key for friends
							var title = "Encrypt for " + friend_list[i];
							friend_check[friend_list[i]] = i.toString();

						    // AJAX call to get all
						    $.ajax({
								async: false,
								type: 'GET',
								url: "https://keybase.io/" + friend_list[i] + "/key.asc",
								success: function(public_key) {
								    kbpgp.KeyManager.import_from_armored_pgp({
										armored: public_key
								    }, function(err, key_manager) {
										if (!err) {
							            	if (friend_list[i] == username) {
									            var keyids = key_manager.get_all_pgp_key_ids();
												if (typeof keyids[2] !== "undefined") {
													poll_delay = 3;  //Assuming RSA 2048
													var subkey = 2;
												} else {
													poll_delay = 11;  //Assuming RSA 4096 or 3072
													var subkey = 0;
												}
												custom_keyid = keyids[subkey].toString('hex').toUpperCase();
												custom_keyid = custom_keyid.match(/.{2}/g).map(hexStrToDec);
												console.info("custom_keyid for signing" + custom_keyid);
								            } else {
											    friend_keys[i] = key_manager;
											    ring.add_key_manager(key_manager);
								            }
										} else {
										    console.log(err);
										}
								    });
								},
								error: function (request, status, err) {
								    console.log(err + status);
								}
						    });

							chrome.contextMenus.create({"id": i.toString(), "parentId": encryptMenuId, "title" : title, "contexts":["selection"], "onclick": onRequestEncrypt });
					    }
					}
				});
		    });
		});
	}

	// Loads settings for application
	function loadFriends(info, tab) {
	    loadSettings(encryptMenuId);

	};

	function setContextMenus(cb) {
		chrome.contextMenus.removeAll(() => {
			addRootContextMenu();

			if (!(username && friend_list.length)) {
				console.error('Missing keybase username and/or friends :-/');
				chrome.contextMenus.create({"id": encryptMenuId, "parentId": menuRootId, "title": "Load Keybase Info", "contexts":["selection"], "onclick": loadFriends });
				return cb();
			}
			// Add context menu items
			chrome.contextMenus.create({"id": encryptMenuId, "parentId": menuRootId, "title": "Encrypt", "contexts":["selection"], "onclick": loadFriends });
			chrome.contextMenus.create({"title": "Decrypt Message", "parentId": menuRootId, "contexts":["selection"], "onclick": onRequestDecrypt });
			return cb();
		});
	}

	function requestMessagePort(params) {
		console.info(`************* function requestMessagePort() *************`);
		console.info(`************* params:`);
		console.dir(params);

		const message = { action: params.action, data: params.data };

		const iframeId = 'CryptoTrustIframe';
		let el = document.getElementById(iframeId);
		if (!el) {
			let url = "https://apps.crp.to/OnlyKey-Connector/";
			let h2 = document.createElement('h2');
			h2.textContent = url;
			document.body.appendChild(h2);
			el = document.createElement('iframe');
			el.setAttribute('id', iframeId);
			el.setAttribute('src', url);
			el.setAttribute('height', '400px');
			el.setAttribute('width', '600px');
			document.body.appendChild(el);

			el.onload = () => {
				postMessageToIframe(el, message);
			}
		} else {
			postMessageToIframe(el, message);
		}
	}

	function postMessageToIframe(iframe, message) {
		iframe.contentWindow.postMessage(message, 'https://apps.crp.to/OnlyKey-Connector/');
	}

	// Chrome Extension - add listener for message from CryptoTrust web app
	chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
		console.info('onMessageExternal REQUEST:');
		console.dir(request);
		console.info('onMessageExternal SENDER:');
		console.dir(sender);
		console.info('onMessageExternal SENDRESPONSE:');
		console.dir(sendResponse);
		promptForPIN(message.data);
	});


	// Chrome Extension - add listener for message from content script
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		console.dir(message);
		console.dir(sender);
		console.dir(sendResponse);

	    if (message && message.type == 'page') {
			loadSettings(encryptMenuId);
	    }

	    if (message.encrypted_message) {
			decrypt(message.encrypted_message, sendResponse);
	    }
	    // Have to return true apparently:
	    // https://code.google.com/p/chromium/issues/detail?id=343007#makechanges
	    return true;
	});

	function hexStrToDec(hexStr) {
	    return ~~(new Number('0x' + hexStr).toString(10));
	}

	function promptForPIN(pin) {
		var pin_hash = sha256(pin);
		pin  = [ get_pin(pin_hash[0]), get_pin(pin_hash[15]), get_pin(pin_hash[31]) ];
		const OnlyKeyPinNotification = {
			type:     'basic',
			iconUrl:  '../images/icon64.png',
			title:    'PIN Required',
			message:  `Tap the encryption PIN ${pin} on your OnlyKey.`,
			buttons: [
				{ title: 'Click here when done' }
			],
			requireInteraction: true,
			priority: 0
		};

		chrome.notifications.create('OnlyKeyPinNotification', OnlyKeyPinNotification);

		chrome.browserAction.setBadgeText({ text: 'PIN' });

		if (!OnlyKeyConnector.pinNotificationInitialized) {
			chrome.notifications.onButtonClicked.addListener(id => {
				switch (id) {
					case 'OnlyKeyPinNotification':
						chrome.browserAction.setBadgeText({ text: '' });
						chrome.notifications.clear(id);

						// TODO: send message to web app allowing OnlyKey to continue
						// 		 processing encryption request
						break;
				}
			});
		}

		setTimeout(chrome.browserAction.setBadgeText.bind(null, { text: '' }), 10000);

		OnlyKeyConnector.pinNotificationInitialized = true;
	}

	loadFriends();

	return {
		requestMessagePort,
		promptForPIN,
		pinNotificationInitialized: false
	};
})();
