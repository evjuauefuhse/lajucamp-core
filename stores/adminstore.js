export const useAdminEventTasksStore = defineStore('adminEventTasks', () => {
    const tasks = ref({})
    
    function add(event, task) {
        tasks.value[event] = task
    }

    function del(event) {
        delete tasks.value[event]
    }

    const reasons = {
        SPANS_MULTIPLE_DAYS: "Start- und Endzeitpunkt müssen am selben Tag liegen."
    }



    return { tasks, add, del, reasons }
  })