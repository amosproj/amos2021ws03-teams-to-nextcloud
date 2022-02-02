export function msgTag(dircount,dirlength,filecount,filelength){
    let dirString = "";
    let fileString = "";
    if(dirlength > 0){
        dirString = dircount+"/"+dirlength+" folder";
        if(dirlength > 1){
            dirString += "s";
        }
    }
    if(filelength > 0){
        fileString = filecount+"/"+filelength+" file";
        if(filelength > 1){
            fileString += "s";
        }
    }
    if(dirlength > 0 && filelength > 0){
        dirString += " and "
    }
    
  return `Downloading ${dirString} ${fileString}`;
}