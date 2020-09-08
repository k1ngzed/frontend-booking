import Vue from "vue";

// styles
import "./styles";

import App from "./App.vue";
import router from "./router";
import { createProvider } from "./vue-apollo";

// plugins
import "./plugins";

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
