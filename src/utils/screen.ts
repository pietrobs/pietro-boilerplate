

  export const getDisplayMedia = async (onStop?: () => void, onError?: () => void) => {
    let stream;  
    try{
          stream = await (navigator.mediaDevices as any).getDisplayMedia();
          
          assignStreamStopListener(stream, () => {
              if(onStop){
                onStop()
              }
            });
            return stream;
        }catch(err){
            console.log("getDisplayMedia", err);
            if(onError){
              onError();
            }
        }
        return stream;
  }

  export const assignStreamStopListener = (stream: MediaStream, callback: any) => {
    stream.getTracks().forEach((track) => {
      if (track.onended != null) {
        const c: any = track.onended;
        track.onended = () => {
          c();
          callback();
        };
      } else {
        track.onended = callback;
      }
    });
    stream.addEventListener("ended", callback);
    stream.addEventListener("inactive", callback);
  };
  