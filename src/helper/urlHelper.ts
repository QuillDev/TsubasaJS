export const checkUrl = (url:string) => {
    try {
        new URL(url);
        return true;
    }
    catch(_){
        return false 
    }
}