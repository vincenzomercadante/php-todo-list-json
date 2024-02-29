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

    taskCompleted(index) {
      const status = this.tasks[index].status == "todo" ? "done" : "todo";
      const item = { i: index, value: status };

      const data = { item };
      const params = { headers: { "Content-Type": "multipart/form-data" } };

      axios
        .post(
          "http://localhost/php-todo-list-json/backend/api/change_task_status.php",
          data,
          params
        )
        .then((res) => {
          this.tasks[index] = res.data;
        });
    },

    taskDeleted(index) {
      const status = this.tasks[index].status == "deleted";
      const item = { i: index, value: status };

      const data = { item };
      const params = { headers: { "Content-Type": "multipart/form-data" } };

      axios
        .post(
          "http://localhost/php-todo-list-json/backend/api/delete_task.php",
          data,
          params
        )
        .then((res) => {
          this.tasks[index] = res.data;
        });
    },
  },

  mounted() {
    this.fetchList();
  },
});

app.mount("#app");
