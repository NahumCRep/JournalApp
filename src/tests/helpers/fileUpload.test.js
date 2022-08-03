import { fileUpload } from "../../helpers"
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: 'nahumcasco-v',  
    api_key: '497644938253974',
    api_secret: 'Q2uCsBLsYBd9arTV8D55Bxh3dAE',
    secure: true,
})

describe('Tests on filUpload helper', () => { 

    test('should upload the file to cloudinary correctly', async () => {
       const imageUrl = 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80';

       const resp = await fetch(imageUrl);
       const blob = await resp.blob();
       const file = new File([blob], 'photo.jpg');
    
       const url = await fileUpload(file);
       expect(typeof url).toBe('string');

       // delete test images on cloudinary
       const segments = url.split('/'); 
       const imageID = segments[ segments.length - 1 ].replace('.jpg','');
       const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageID], {
        resource_type: 'image'
       });
    //    console.log(cloudResp);
    })

    test('should return null when isnt file sended', async () => {
       const url = await fileUpload();
       expect(url).toBe(null);
    })
})