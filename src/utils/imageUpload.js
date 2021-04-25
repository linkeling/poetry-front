import th from "element-ui/src/locale/lang/th";
import imageConversion from 'image-conversion'

export const dataURItoBlob=(dataURI, type)=>{
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for(let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: type});
};

//图片上传
export const beforeAvatarUpload=(file)=>{
    let size=file.size/1024/1024;
    console.log(size);
    let imgQuality=getQuality(size);
    return new Promise(resolve => {
        const reader = new FileReader()
        const image = new Image()
        image.onload = (imageEvent) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const width = image.width * imgQuality
            const height = image.height * imgQuality
            canvas.width = width;
            canvas.height = height;
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(file.type);
            const blobData =dataURItoBlob(dataUrl, file.type);
            resolve(blobData)
        }
        reader.onload = (e => { image.src = e.target.result; });
        reader.readAsDataURL(file);
    })
};

const getQuality =(size)=> {
    let quality=1
    if(size>=0.5 && size<1){
        quality=0.4
    }
    if(size>=1 && size<2){
        quality=0.3
    }
    if(size>=2 && size<4){
        quality=0.2
    }
    if(size>=4 && size<6){
        quality=0.15
    }
    if(size>=6 && size<=8){
        quality=0.1
    }
    return quality;
}