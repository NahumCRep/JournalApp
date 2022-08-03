
export const fileUpload = async (file) => {
    // if(!file) throw new Error('no hay ningun archivo a subir');
    if(!file) return null;

    const cloudURL = 'https://api.cloudinary.com/v1_1/nahumcasco-v/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal'); 
    formData.append('file', file); 

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData,
        })

        if(!resp.ok) throw new Error('no se pudo subir la imagen');
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (error) {
        throw new Error(error.message)
    }
}