const color = {
  SUCCESS: '#2ecc71',
  INFO: '#3498db',
  WARNING: '#e74c3c',
  DANGER: '#e74c3c'
}

export default {
  PENDING: {text: '待定中', color: color.INFO},
  PLANNING: {text: '计划中', color: color.INFO},
  DEMANDING: {text: '需求中', color: color.INFO},
  DEVELOPING: {text: '开发中', color: color.INFO},
  TESTING: {text: '已提测', color: color.INFO},
  DEPLOYING: {text: '待上线', color: color.INFO},
  DEPLOYED: {text: '已上线', color: color.SUCCESS},
  EXCUTING: {text: '执行中', color: color.INFO},
  ENDED: {text: '已终止', color: color.DANGER},
  SUSPENDED: {text: '已延期', color: color.WARNING},
  COMPLETED: {text: '已完成', color: color.SUCCESS}
}
