import Tool from './Tool';

class wxPublic {
  /**
   * type为数字，或者数组
   */
  getSms (type){
    let tool = new Tool()
    if(tool.isTypedArray(type)){
      let array = tool.isTypedArray(type)
      for (let a of array){

      }
    }

  }
  /**
   * 数组去重
   * array数组内容全为String类型
   * 
   */
  ArrayDeduplication(array){
    if (tool.isTypedArray(array)){
      let data = array.reduce((accu, curr) => {
        const sameNameEle = accu.find(e => e === curr)
        if (!sameNameEle) {
          accu.push(curr)
        }
        return accu
      }, [])
      return data
    }else{
      return array
    }
  }


}
export default wxPublic