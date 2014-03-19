/** File: chatRoster.js
 * Candy - Chats are not dead yet.
 *
 * Authors:
 *   - Patrick Stadler <patrick.stadler@gmail.com>
 *   - Michael Weibel <michael.weibel@gmail.com>
 *
 * Copyright:
 *   (c) 2011 Amiado Group AG. All rights reserved.
 *   (c) 2012 Patrick Stadler & Michael Weibel. All rights reserved.
 */

/** Class: Candy.Core.ChatRoster
 * Chat Roster
 */
Candy.Core.ChatRoster = function () {
	/** Object: items
	 * Roster items
	 */
	this.items = {};

	/** Function: add
	 * Add user to roster
	 *
	 * Parameters:
	 *   (Candy.Core.ChatUser) user - User to add
	 */
	this.add = function(user) {
		this.items[user.getJid()] = user;
	};

	/** Function: remove
	 * Remove user from roster
	 *
	 * Parameters:
	 *   (String) jid - User jid
	 */
	this.remove = function(jid) {
		delete this.items[jid];
	};

	/** Function: get
	 * Get user from roster
	 *
	 * Parameters:
	 *   (String) jid - User jid
	 *
	 * Returns:
	 *   (Candy.Core.ChatUser) - User
	 */
	this.get = function(jid) {
		return this.items[jid];
	};

	/** Function: getAll
	 * Get all items
	 *
	 * Returns:
	 *   (Object) - all roster items
	 */
	this.getAll = function() {
		return this.items;
	};

	this.findByJid = function(jid, strict) {
		if(!strict)
			jid = Strophe.getBareJidFromJid(jid); // use bare jid
		for(var cid in this.items) {
			if(this.items[cid].data.real_jid && Strophe.getBareJidFromJid(this.items[cid].data.real_jid) == jid)
				return this.items[cid];
		}

		return undefined;
	};

	this.findByNick = function(nick, strict) { // should simply look for "roomJid/"+nick, but does not hold roomJid, so..
		for(var cid in this.items) {
			if(this.items[cid].getNick() == nick || !strict && this.items[cid].getNick().toLowerCase() == nick.toLowerCase())
				return this.items[cid];
		}
	};

	this.findNicksThatStartWith = function(part) {
		var list = [];
		part = part.toLowerCase();
		for(var cid in this.items) {
			var nick = this.items[cid].getNick();
			if(nick.substr(0, part.length).toLowerCase() == part)
				list.push(nick);
		}
		return list;
	}
};
