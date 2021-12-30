export const setSharingGif = (url) => {
    if (typeof window !== "undefined") localStorage.setItem("CHOOSING_GIF", url);
};
  
export const getSharingGif = () => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("CHOOSING_GIF")
        ? localStorage.getItem("CHOOSING_GIF")
        : undefined;
    } 
    return undefined;
};
  
export const setSharingTextStyleId = (id) => {
    if (typeof window !== "undefined") localStorage.setItem("CHOOSING_TEXT_STYLE", id);
};
  
export const getSharingTextStyleId = () => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("CHOOSING_TEXT_STYLE")
        ? localStorage.getItem("CHOOSING_TEXT_STYLE")
        : undefined;
    } 
    return undefined;
};
<<<<<<< HEAD

export const setSharingSound = (url) => {
    if (typeof window !== "undefined") localStorage.setItem("CHOOSING_SOUND", url);
};
  
export const getSharingSound = () => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("CHOOSING_SOUND")
        ? localStorage.getItem("CHOOSING_SOUND")
        : undefined;
    } 
    return undefined;
};
=======
>>>>>>> Hiep
