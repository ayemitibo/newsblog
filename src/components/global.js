function upperFirst(s = "") {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
export default {
  install(Vue) {
    const requireModule = require.context("./atoms", false, /\.vue$/);
    // const requireModule = require.context("./molecules", false, /\.vue$/);
    requireModule.keys().forEach(filename => {
      const name = upperFirst(filename.replace(/^\.\/(.*)\.\w+$/, "$1"));
      const component = requireModule(filename);
      Vue.component("Base" + name, component.default || component);
    });
  }
};
