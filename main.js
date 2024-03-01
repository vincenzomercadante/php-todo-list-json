const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      tasks: [],
      newTask: {
        text: "",
        status: "todo",
      },

      filterValue: "",
    };
  },

  methods: {
    /**
     *
     * fetch the task list from the database (json)
     *
     */
    fetchList() {
      axios.get("./backend/api/get_list.php").then((res) => {
        this.tasks = res.data;
      });
    },

    /**
     *
     * Save a new Task on the database
     *
     */
    saveTask() {
      const item = { ...this.newTask };

      this.newTask.text = "";

      const data = { item };

      axios
        .post("./backend/api/add_task.php", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.tasks = res.data;
        });
    },

    /**
     * Change the task staus from an index
     *
     * @param {number} index value that define the task th euser will modified
     */
    taskCompleted(index) {
      const status = this.tasks[index].status == "todo" ? "done" : "todo";
      const item = { i: index, value: status };

      const data = { item };
      const params = { headers: { "Content-Type": "multipart/form-data" } };

      axios
        .post("./backend/api/change_task_status.php", data, params)
        .then((res) => {
          this.tasks[index] = res.data;
        });
    },

    /**
     *
     * Delete the selected task from the database
     *
     * @param {number} index value that define the task i will delete
     */
    taskDeleted(index) {
      if (this.tasks[index].status == "deleted") {
        const item = { i: index };

        const data = { item };
        const params = { headers: { "Content-Type": "multipart/form-data" } };

        axios
          .post("./backend/api/delete_task.php", data, params)
          .then((res) => {
            this.tasks = res.data;
          });
      } else {
        const status = (this.tasks[index].status = "deleted");
        const item = { i: index, value: status };

        const data = { item };
        const params = { headers: { "Content-Type": "multipart/form-data" } };

        axios
          .post("./backend/api/delete_task.php", data, params)
          .then((res) => {
            this.tasks[index] = res.data;
          });
      }
    },

    /**
     * Filter the task from a value typed by the user
     */
    filterArray() {
      const item = this.filterValue;

      this.filterValue = "";

      const data = { item };

      const params = { headers: { "Content-Type": "multipart/form-data" } };

      axios.post("./backend/api/filter-array.php", data, params).then((res) => {
        this.tasks = res.data;
      });
    },

    /**
     * restore task from delete status
     *
     * @param {number} @index value that define the task i will restore
     *
     */
    taskRestored(index) {
      const status = "todo";
      const item = { i: index, value: status };

      const data = { item };
      const params = { headers: { "Content-Type": "multipart/form-data" } };

      axios.post("./backend/api/restore-task.php", data, params).then((res) => {
        this.tasks[index] = res.data;
      });
    },
  },

  mounted() {
    this.fetchList();
  },
});

app.mount("#app");
