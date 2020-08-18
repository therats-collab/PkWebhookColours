/**
 * @name PluralKitWebhookColours
 * @authorLink https://github.com/0xlgs
 * @website https://github.com/0xlgs/PluralKitWebhookColours
 */

class PluralKitWebhookColours {
  getName() {return "PluralKit Webhook Colours";}
  getDescription() {return "Modifies PluralKit webhook colours to match the colour a member has set in their profile.\n(Member must not be private!)";}
  getVersion() {return "0.2";}
  getAuthor() {return "lgs";}

  load() {}
  start() {}
  stop() {}

  observer(changes) {
    var node;
    var message;
    try {
      var nodeList = changes.addedNodes;
      for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i];
        message = item.__reactInternalInstance$.memoizedProps.children[1].props.message;
        if (message.author.bot) {
          var PkRequest = new Request('https://api.pluralkit.me/v1/msg/' + message.id);
          fetch(PkRequest)
          .then(response => { if (response.status === 200) { return response.text(); } else { } })
          .then(response => { try { item.children[0].children[1].children[0].style.color = `#${JSON.parse(response).member.color}`; } catch (e) {}; });
        }
      }
    } catch (e) {};
  }
}
