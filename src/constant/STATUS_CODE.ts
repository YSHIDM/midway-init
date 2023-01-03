export const STATUS_CODE = {
  SUCCESS: {
    COMMON: {
      OK: {
        code: 2000,
        msg: '成功',
      },
    },
    LOGIN: {
      OK: {
        code: 2001,
        msg: '登录成功',
      },
    },
    LOGOUT: {
      OK: {
        code: 2002,
        msg: '登出成功',
      },
      OUTED: {
        code: 2003,
        msg: '已经登出',
      },
    },
  },
  ERROR: {
    // 用户认证 登录 40000 - 40099
    AUTHENTICATION: {
      BAD_TOKEN: {
        code: 40001,
        msg: '错误的token',
      },
      NEED_TOKEN: {
        code: 40002,
        msg: '需要token',
      },
      TOKEN_EXPIRE: {
        code: 40003,
        msg: '过期的token',
      },
      SIGNIN_TIMEOUT: {
        code: 40004,
        msg: '注册时间超时',
      },
    },
    // 公共 40100 - 40199
    COMMON: {
      FILTER_IS_NOT_JSON: {
        code: 40114,
        msg: '过滤条件不是 JSON 字符串',
      },
    },
    // 用户 40200 - 40299
    USER: {
      REPEAT_NICKNAME: {
        code: 40200,
        msg: '用户昵称重复',
      },
      NO_USER: {
        code: 40201,
        msg: '用户不存在',
      },
      PW_ERROR: {
        code: 40202,
        msg: '密码错误',
      }
    }
  },
}