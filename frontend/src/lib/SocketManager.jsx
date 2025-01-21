import {
  IMAGENOTIFICATION,
  PROCESSEDMESSAGE,
  WS_BASE_URL,
} from "../config/constants";

class SocketManager {
  static instance;
  socket;
  isReady;
  buffer;
  retryConnectionInterval;
  manualClose;
  retryTimeOut;

  constructor() {
    this.isReady = false;
    this.socket = new WebSocket(WS_BASE_URL);
    this.buffer = [];
    this.retryConnectionInterval = 5000;
    this.manualClose = false;
    this.retryTimeOut = null;

    this.init();
  }

  /**
   * @returns {SocketManager}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new SocketManager();
    }
    return this.instance;
  }

  init() {
    this.socket.onopen = () => {
      this.isReady = true;
      this.flushBuffer();
    };

    this.socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      switch (parsedMessage.method) {
        case PROCESSEDMESSAGE:
          // Handle the rendering of messages using the chatStore.
          break;
        case IMAGENOTIFICATION:
          // Handle the rendering of image url using the chatStore.
          break;
      }
    };

    this.socket.onclose = () => {
      this.isReady = false;
      if (!this.manualClose) {
        this.retryConnection();
      }
    };
  }

  flushBuffer() {
    this.buffer.forEach((message) => this.socket.send(message));
    this.buffer = [];
  }

  send(message) {
    if (this.isReady) {
      this.socket.send(message);
    } else {
      this.buffer.push(message);
    }
  }

  close() {
    this.manualClose = true;
    this.isReady = false;
    clearTimeout(this.retryTimeOut);
    this.cleanUp();
    this.socket.close();
  }

  cleanUp() {
    if (this.socket) {
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onclose = null;
    }
  }

  retryConnection() {
    this.retryTimeOut = setTimeout(() => {
      this.manualClose = false;
      this.init();
    }, this.retryConnectionInterval);
  }
}

export default SocketManager;
