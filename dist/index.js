
let ofile = document.querySelector("#file");
let osend = document.querySelector(".send");
osend.addEventListener("click", function (e) {
  let file = ofile.files[0]
  new Fileslice(file).fileslice()
}, false)
function Fileslice(file) {
  this.file = file //文件
}
Fileslice.prototype.fileslice = async function () {
  if (!this.file) return console.log('先上传文件');
  let timer = new Date().getTime()
  let start = 0  //从0字节开始切
  let chunk = this.file.size % (100 * 64 * 1024) //每一次切多少
  let end = this.file.size //总文件大小
  console.log(chunk);
  while (start < end) { //循环切 当切到大于文件尾时 跳出
    let bolo = this.file.slice(start, chunk + start)
    let data = new FormData() //创建formdata对象上传
    data.append("file", bolo)
    data.append("msg", timer + this.file.name) //文件名
    try {
      chunkon = await axios({
        method: 'post',
        url: '/uploadBig',
        headers: {
          "content-type": "multipart/form-data",
        },
        data
      })
      start += chunk
      console.log((start / end * 100).toFixed(0) + '%');
    } catch (error) {
      console.log('错误');
    }
  }
  let { data: res } = chunkon
  console.log('完成', res.data);

}

