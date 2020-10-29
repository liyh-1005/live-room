export default {
  VERSION: '1.2.1',
  COS_APPID: 1259648581,
  DETECT_TYPE: {
    CAMERA: 'camera',
    SPEAKER: 'speaker',
    MICROPHONE: 'microphone',
    RESULT: 'result'
  },

  MAX_VIDEO_COUNT: 6,
  MAX_AUDIO_COUNT: 64,

  DETECT_TYPE_TITLE: {
    CAMERA: '摄像头检测',
    SPEAKER: '扬声器检测',
    MICROPHONE: '麦克风检测'
  },

  TOOL_STATUS: {
    EXPAND: 1, // 展开状态
    COLLAPSE: 0 // 折叠状态
  },

  STORAGE_KEY: {
    COMPANY: 'Q_EDU_SAAS_COMPANY',
    COMPANYID: 'Q_EDU_SAAS_COMPANYID',
    CITY: 'Q_EDU_SAAS_CITY',
    CLASSID: 'Q_EDU_SAAS_CLASSID',
    VIDEOMODE: 'Q_EDU_SAAS_VIDEOMODE',
    SDKAPPID: 'Q_EDU_SAAS_SDKAPPID',
    USERID: 'Q_EDU_SAAS_USERID',
    USERINFO: 'Q_EDU_SAAS_USERINFO',
    NICKNAME: 'Q_EDU_SAAS_NICKNAME',
    TEACHERNAME: 'Q_EDU_SAAS_TEACHERNAME',
    USERSIG: 'Q_EDU_SAAS_USERSIG',
    TOKEN: 'Q_EDU_SAAS_TOKEN',
    USERTOKEN: 'Q_EDU_SAAS_USERTOKEN',
    PASSWORD: 'Q_EDU_SAAS_PASSWORD',
    DEVICE_DETECT: 'Q_EDU_SAAS_DEVICE_DETECT',
    CLASSPASSWORD: 'Q_EDU_SAAS_CLASSPASSWORD',
    USERACCOUNT: 'Q_EDU_SAAS_USERACCOUNT',
    GUESTFLAG: 'Q_EDU_SAAS_GUESTFLAG',
    DRAW: 'Q_EDU_SAAS_DRAW',
    DEMOLOGININFO: 'Q_EDU_SAAS_DEMO_LOGIN_INFO',
    ROLE: 'Q_EDU_SAAS_USER_ROLE',
    BINDORG: 'Q_EDU_SAAS_BINDORG',
    SHOWMICTIPS: 'Q_EDU_SAAS_USER_SHOWMICTIPS',
    SHOWCLASSTIPS: 'Q_EDU_SAAS_USER_SHOWCLASSTIPS',
    BINDGROUP: 'Q_EDU_SAAS_USER_BINDGROUP',
    SHOWJOINEXIT: 'Q_EDU_SAAS_USER_SHOWJOINEXIT',
    LOGINROLE: 'Q_EDU_SAAS_LOGINROLE'
  },

  DOCUMENT_TYPE: {
    PUBLIC: 'public',
    PRIVATE: 'private'
  },

  // 运行环境
  RUNTIME_ENV: {
    BROWSER: 'BROWSER', // 浏览器
    ELECTRON: 'ELECTRON' // electron
  },

  // 消息类型
  CHANNEL_TYPE: {
    CHAT: 'CHAT',
    CTRL: 'Ctrl',
    BOARD: 'BOARD'
  },

  // 设置二级窗口的tab
  SETTING_TABS: {
    'DEVICE-DETECT': 'device-detect',
    // 'CAPTION': 'caption',
    LAYOUT: 'layout'
  },

  SETTING_TABS_TITLE: {
    'DEVICE-DETECT': '设备检测',
    CAPTION: '字幕',
    LAYOUT: '布局'
  },

  CLASS_STATUS: {
    END: 'end', //已经结束的课堂
    ING: 'ing', //进行中的课堂
    WILL: 'will' //未开始的课堂
  },

  // 课堂角色
  CLASS_ROLE: {
    SUPERADMIN: 'superadmin', //'超级管理员',
    ADMIN: 'admin', //'普通管理员',
    TEACHER: 'teacher', //'教师',
    ASSISTANT: 'assistant', //'助教',
    STUDENT: 'student', //'学生',
    SUPERVISOR: 'supervisor', //'巡课员',
    VISITOR: 'visitor' //'游客',
  },

  // 课堂角色
  CLASS_ROLE_TEXT: {
    superadmin: '超级管理员',
    admin: '普通管理员',
    teacher: '教师',
    assistant: '助教',
    student: '学生',
    supervisor: '巡课员',
    visitor: '游客'
  },

  // 转码状态
  TRANSCODE_STATUS: {
    uploading: '上传中',
    prepare: '准备',
    queued: '准备', //这里没有bug，两个都是 准备
    processing: '转码中',
    prepared: '完成',
    finished: '完成'
  },

  // 可用状态
  TRANSCODE_VALID_STATUS: ['prepared', 'finished'],

  PAGINATION_SIZE: 10, // 分页数

  //Class view status
  MessageBoxStatus: 'saas_msgboxstatus',
  BoardBoxStatus: 'saas_boardboxstatus',
  VideoBoxStatus: 'saas_videoboxstatus',

  EVENT: {
    IM: {
      SEND_CHAT_MSG_SUCC: 'send_chat_msg_succ',
      SEND_CHAT_MSG_ERROR: 'send_chat_msg_error',
      SEND_CHAT_MSG_EMPTY_MSG_ERROR: 'send_chat_msg_empty_msg_error',
      SEND_CHAT_MAX_LENGTH_MSG_ERROR: 'send_chat_max_length_msg_error',
      RECEIVE_C2C_MSG: 'receive_c2c_msg'
    }
  },

  LAYOUT: {
    SINGLE: 1,
    MULTIPLE: 2
  },

  CLASS_VIDEO_TYPE: {
    LIVE: 'live',
    TRTC: 'trtc',
    FAST: 'fast',
    LIVEBOARD: 'liveboard'
  },

  ROLE: {
    MASTER: 'master',
    CLIENT: 'client'
  },
  TRANSCODE_ERR_MSG: {
    '-1': 'PPT下载的url格式错误 请检查PPT下载URL',
    '-2': 'PPT打开过程中发生未知错误 请检查PPT格式是否正确',
    '-3': 'PPT打开超时 请检查 PPT格式是否正确',
    '-4': 'PPT打开无响应 请检查 PPT格式是否正确',
    '-5': 'PPT文件被加密 不支持转换已加密的PPT',
    '-6': '未知PPT格式 请检查 PPT格式是否正确',
    '-7': 'PPT打开时发生异常 请检查 PPT格式是否正确',
    '-8': 'PPT为只读格式 不支持只读PPT，请检查 PPT格式是否正确',
    '-9': 'PPT转码失败 请检查 PPT格式是否正确',
    '-10': 'PPTX格式解析错误 请检查 PPT格式是否正确',
    '-11': 'PPT下载失败，未知错误 请检查PPT下载 URL 是否有效',
    '-12': 'h5上传失败 请联系客服人员或重试',
    '-13': 'PPT转换服务未加载 请联系客服人员',
    '-15': 'PPT转码文件生成失败 请联系客服人员或重试',
    '-16': 'PPT转换模式异常 PPT格式不支持或联系客服人员',
    '-17': 'PPT超过最大的转换页数限制（目前为500） 不支持转换超过500页的PPT',
    // '-18': 'PPT转换失败，错误未知PPT格式不支持或联系客服人员',
    '-19': 'PPT被加密 不支持加密的PPT',
    '-20': 'PPT未知属性错误 请检查 PPT格式是否正确',
    '-21': 'PPT检测属性超时 请检查 PPT格式是否正确',
    '-22': 'PPT转换异常 请检查 PPT格式是否正确或重试',
    '-23': 'PPT下载链接含有非法字符 请检查PPT下载链接是否正确',
    '-24': 'PPT下载链接打开失败 请检查PPT下载地址是否有效',
    '-25': 'PPT下载链接打开超时 请检查PPT下载链接是否有效或下载服务器网络状况',
    '-26': 'PPT下载数据失败 请检查PPT下载服务器网络状况',
    '-27': 'PPT下载数据超时 请检查PPT下载服务器网络状况或是否PPT过大，导致下载超时',
    '-101': 'task info文件读取失败 请联系维护人员',
    '-102': 'task info格式不正确 请联系维护人员',
    '-103': 'task info的error_code不等于0 请联系维护人员',
    '-104': 'task 的url为空 请联系维护人员',
    '-105': 'task 的下载url错误 请检查转码文件下载链接',
    '-106': '不支持的文件名后缀 请检查文件名后缀名',
    '-107': '文件下载失败，未知错误 请检查下载链接地址是否有效',
    '-108': '下载链接非法 请检查转码文件下载链接',
    '-109': '下载链接打开失败 请检查下载链接地址是否有效',
    '-110': '下载链接打开超时 请检查下载链接地址是否有效',
    '-111': '下载失败 请检查下载链接地址是否有效',
    '-112': '下载超时 请检查下载链接带宽',
    '-113': '本地临时文件夹创建失败 请联系维护人员',
    '-114': '文件上传转码后台失败 请联系维护人员',
    '-115': 'cos 请求转码失败 文件格式不支持',
    '-116': 'cos 请求转码失败 文件格式不支持',
    '-117': 'cos 转码失败超时 文件格式不支持',
    '-118': 'cos 转码过程中失败 文件格式不支持',
    '-119': '上传转码后的文件，到cdn cos失败 请联系维护人员或重试',
    '-120': 'cos转码，未知错误 文件格式不支持',
    '-121': '超过最大页数 不支持超过500页的文件转码',
    '-122': '转码服务器打开本地文件失败,请联系维护人员或重试',
    '-123': '转码服务器写本地文件失败,请联系维护人员或重试',
    '-124': '转码服务器文件内容为空,请联系维护人员或重试',
    '-125': '获取图片分辨率失败,请联系维护人员或重试',
    '-126': 'pdf打开失败,pdf文件格式错误或pdf加密，不支持转码',
    '-127': 'pdf文件加密,不支持加密pdf文件转码',
    '-128': '获取pdf页数失败，pdf文件格式不支持',
    '-129': 'pdf转码未知错误 ，pdf文件格式不支持',
    '-130': 'office转码本地错误；包括转码任务格式，任务完成格式等，请联系维护人员或重试',
    '-131': 'office文件加密 ，文件格式不支持',
    '-132': 'office文件未知属性错误，文件格式不支持',
    '-133': 'office文件打开超时，文件格式不支持或重试',
    '-134': 'office文件打开异常，文件格式不支持',
    '-135': 'office文件转存异常，文件格式不支持',
    '-136': 'office转换taskid对应失败，请联系维护人员或重试',
    '-137': '获取office文件分辨率失败，请联系维护人员或重试',
    '-138': '转码后的本地文件错误，请联系维护人员或重试',
    '-139': '转码丢失了页数，请联系维护人员或重试',
  },


  TRTC_QUALITY: {
    VERY_BAD: 'very_bad',
    BAD: 'bad',
    POOR: 'poor',
    GOOD: 'good',
    EXCELLENT: 'excellent'
  },

  DEMO_SCHOOL: [1891895, 1176513, 1789317]
}