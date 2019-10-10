<script>
export default {
  data() {
    return {
      blogTitle: "render",
      disable: true
    };
  },
  render: function(createElement) {
    let renderChild;
    if (this.disable) {
      renderChild = createElement("h1", this.blogTitle);
    }
    let renderButton = createElement(
      "button",
      {
        on: {
          click: this.clickHandler
        }
      },
      "切换"
    );
    return createElement("div", {}, [renderChild, renderButton]);
  },
  methods: {
    clickHandler() {
      this.disable = !this.disable;
    }
  }
};
</script>

<style>
</style>
