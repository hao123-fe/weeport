const color = {
  DEFAULT: '#777',
  SUCCESS: '#2ecc71',
  INFO: '#3498db',
  WARNING: '#f0ad4e',
  DANGER: '#e74c3c'
}

export default {
  PENDING: {text: '待定中', color: color.DEFAULT},
  PLANNING: {text: '计划中', color: color.DEFAULT},
  DEMANDING: {text: '需求中', color: color.INFO},
  DEVELOPING: {text: '开发中', color: color.INFO},
  TESTING: {text: '已提测', color: color.INFO},
  DEPLOYING: {text: '待上线', color: color.INFO},
  DEPLOYED: {text: '已上线', color: color.SUCCESS},
  EXCUTING: {text: '执行中', color: color.INFO},
  ENDED: {text: '已终止', color: color.DANGER},
  DELAY: {text: '已延期', color: color.WARNING},
  COMPLETED: {text: '已完成', color: color.SUCCESS}
}
