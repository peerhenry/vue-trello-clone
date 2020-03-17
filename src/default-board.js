const uuid = () =>
  Math.random()
    .toString(16)
    .slice(2)

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'This is the first task and it has a dummy description',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'in progress',
      tasks: [
        {
          description: '',
          name: 'a task in progress',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'done',
      tasks: [],
    },
  ],
}
