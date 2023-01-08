use photo gallery parent:
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

 const [photos, setPhotos] = useState({});

<LightgalleryProvider>

  <NewProductCard 
      data={product}
      photos={photos}
      setPhotos={setPhotos}  
      />

  <div hidden={true}>
      {Object.keys(photos).map((photoCollection, index)=>{
          return photos[photoCollection].map((item, innerIndex)=>{
            return(
            <LightgalleryItem key={index} group={photoCollection} src={item}>
              <img src={item} style={{ width: "100%" }} alt={""}/>
            </LightgalleryItem>
            );
          })
        })
      }
  </div>
</LightgalleryProvider>