import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const VF_ORIGIN = "https://forcetrails-dev-ed--c.vf.force.com";
export default class PostMessageLwc extends LightningElement {

  // Connect message handler when component is loaded
  connectedCallback() {
    this.messageHandler = this.handleMessage.bind(this);
    this.addMessageHandler();
  }

  // remove message handler after component is unloaded
  disconnectedCallback() {
    this.removeMessageHandler();
  }

  // add event handler to receive messages from iframe (VF)
  addMessageHandler() {
    this.messageHandler = this.handleMessage.bind(this);
    window.addEventListener("message", this.messageHandler, false);
  }

  // remove the event handler
  removeMessageHandler() {
    if (this.messageHandler) {
      window.removeEventListener("message", this.messageHandler, false);
      this.messageHandler = null;
    }
  }

  // Post message to VF page 
  handleSendMessage() {
    this.template.querySelector('iframe').contentWindow.postMessage(parseInt(Math.random() * 1000, 10), VF_ORIGIN);
    console.log("⚡ LWC: Message sent from LWC to VF");
  }

  // event handler function that runs after event is received by LWC component
  handleMessage(event) {
    console.log("⚡ LWC: In LWC event handler");
    /*  change the origin according to you   */
    if (event.origin !== VF_ORIGIN) {
      console.log("⚡ LWC: Unknown origin: " + event.origin);
      return;
    }

    console.log("⚡ Message from VF: " + event.data);

    this.dispatchEvent(new ShowToastEvent({
      title: "Success",
      message: "⚡ LWC: Message from VF: " + JSON.stringify(event.data),
      variant: "success"
    }));
  }
} 
