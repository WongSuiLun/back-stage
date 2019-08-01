class StringUtil {
  /**
   *判断字符串是否只有英文字母
   * @author haopengzh
   * @date 2018-12-14
   * @param {String} input
   * @returns
   * @memberof StringUtil
   */
  isAlpha (input) {
    return /^[a-z]+$/i.test(input)
  }
}
export default new StringUtil()
