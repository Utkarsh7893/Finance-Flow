const key='7HqJKfuPsMp8hUkF668GxWwmuhstw91lyqIce80BNSU';


export async function fetchApi(){

    const response=await fetch(`https://api.unsplash.com/search/photos?page=1&query=love&orientation=portrait&client_id=${key}`);

    if(!response.ok){
        throw new Error(`URL not found ${response.status}, ${response.statusText}`);
    }
    const data=await response.json();
    if(data.results&&data.results.length>0){
        const images=data.results.map(img=>img.urls.raw);
        const image=images[Math.floor(Math.random() * images.length)];
        return image;
    }else{
        throw new Error('URL not found');
    }
}