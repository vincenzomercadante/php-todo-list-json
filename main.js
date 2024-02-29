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

    saveTask() {
      const item = this.newTask;

      const data = { item };

      axios
        .post(
          "http://localhost/php-todo-list-json/backend/api/add_task.php",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
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
