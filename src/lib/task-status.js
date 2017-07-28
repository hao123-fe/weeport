const color = {
  DEFAULT: '#777',
  SUCCESS: '#2ecc71',
  INFO: '#3498db',
  WARNING: '#f0ad4e',
  DANGER: '#e74c3c'
}

export default {
  PENDING: {text: '等待中', color: color.DEFAULT},
  TODO: {text: '计划中', color: color.INFO},
  DOING: {text: '执行中', color: color.INFO},
  DONE: {text: '完成', color: color.SUCCESS},
  DELAY: {text: '已延期', color: color.WARNING},
  CANCELED: {text: '已取消', color: color.DANGER}
}
