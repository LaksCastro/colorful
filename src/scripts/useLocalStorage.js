let instance = null;

function initLocalStorage() {
  instance = {
    EVENTS: {
      CHANGE_FAVORITE: "change_favorite",
    },
    listeners: [],
    on: function (eventType, callback) {
      this.listeners.push({
        type: eventType,
        callback,
      });
    },
    getPalettes: function () {
      const palettes = this.JSON2JAVASCRIPT(
        localStorage.getItem("colorful-palettes")
      );
      return palettes || [];
    },
    setPalettes: function (palettes) {
      localStorage.setItem("colorful-palettes", this.JAVASCRIPT2JSON(palettes));

      const newPalettes = this.JSON2JAVASCRIPT(
        localStorage.getItem("colorful-palettes")
      );

      this.listeners.forEach(
        (listener) =>
          listener.type === this.EVENTS.CHANGE_FAVORITE &&
          listener.callback(newPalettes)
      );

      return newPalettes;
    },
    JSON2JAVASCRIPT: function (json) {
      return JSON.parse(json);
    },
    JAVASCRIPT2JSON: function (jsObj) {
      return JSON.stringify(jsObj);
    },
  };
  return instance;
}

function useLocalStorage() {
  return instance;
}

export { useLocalStorage };
export default initLocalStorage;
