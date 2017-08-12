const color = {
  DEFAULT: '#ddd',
  SUCCESS: '#2ecc71',
  INFO: '#3498db',
  WARNING: '#f0ad4e',
  DANGER: '#e74c3c'
}

export const tasks = {
  Pending: {text: '等待中', color: color.DEFAULT},
  Todo: {text: '计划中', color: color.DEFAULT},
  Doing: {text: '执行中', color: color.INFO},
  Done: {text: '完成', color: color.SUCCESS},
  Delay: {text: '已延期', color: color.WARNING},
  Canceled: {text: '已取消', color: color.DANGER}
}

export default [
  'Pending',
  'Todo',
  'Doing',
  'Done',
  'Delay',
  'Canceled'
]
