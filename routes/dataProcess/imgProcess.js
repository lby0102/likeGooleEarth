// 读取文件的r g b a 数据
function getImgData(p){
    return new Promise((resolve,reject)=>{
        fs.createReadStream(p)
            .pipe(new PNG({
                filterType: 4
            }))
            .on('parsed', function() {
                var data= new Buffer.alloc(4*this.width*this.height);
                this.data.copy(data);
                resolve({
                    data:data,
                    width:this.width,
                    height:this.height
                });
            }
        );
    })
}
 
 
// 将数据保存到文件
function ImgDataToSave(imgData){
    let {width,height,data} = imgData;
    var newPng=new PNG({
        filterType: 4,
        width:width,
        height:height
    });
    newPng.data = data;
    var dst = fs.createWriteStream('export/'+outDir+'.png');
    newPng.pack().pipe(dst);
}
 
// 获取图片后灰度处理
getImgData(pngFile).then((res)=>{
    let {width,height,data} = res;
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            var idx = (width * i + j) << 2;
            var avg =  data[idx] + data[idx+1] + data[idx+2];
            avg =  parseInt(avg/3);
            data[idx]  = avg;
            data[idx+1] = avg;
            data[idx+2] = avg;
        }
    }
 
    ImgDataToSave({
        width,
        height,
        data
    });
}).catch((e)=>{
    console.log("错误:",e);
});