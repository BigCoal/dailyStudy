/*
 * @Author: your name
 * @Date: 2022-04-26 16:35:59
 * @LastEditTime: 2022-05-01 16:09:27
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /techDocumentAdmin/docs/pages/算法/链表/判断链表是否有环.js
 */

function linkHasRing(){
    
}


function main() {
    const arr = randomArray(6, 100);
    console.log(arr);
  
    const singleLink = ArrayToSingleLinks(arr);
    console.log(JSON.stringify(singleLinkGroupReserve(singleLink, 3)));
  }
  
  main();
  