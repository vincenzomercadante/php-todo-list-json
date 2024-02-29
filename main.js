const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      tasks: [],
      newTask: {
        text: "",
        status: "todo",
      },
    };
  },

  methods: {
    fetchList() {
      axios
        .get("http://localhost/php-todo-list-json/backend/api/get_list.php")
        .then((res) => {
          this.tasks = res.data;
        });
    },
  },

  mounted() {
    this.fetchList();
  },
});

app.mount("#app");
